import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import ts from "typescript";

const resolvePackage = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const moduleCache = new Map();
const eventApiState = { error: null, overrideRows: null };

// Keep the real Supabase query builder and service mapping. Replace only HTTP
// responses and the Next.js request-bound client factory for this Node runner.
// These are unit checks; the SQL role checks verify real database permissions.
function createEventTestClient() {
  return createSupabaseClient("https://content-checks.invalid", "test-only-key", {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: { fetch: fetchEventFixtures },
  });
}

async function fetchEventFixtures(input, init) {
  const request = input instanceof Request ? input : null;
  const url = new URL(request ? request.url : input);
  assert.equal(url.origin, "https://content-checks.invalid");
  assert.equal(url.pathname, "/rest/v1/events");
  assert.equal(init?.method ?? request?.method ?? "GET", "GET");

  const params = url.searchParams;
  assert.match(params.get("select") ?? "", /event_translations!inner\(/);
  const localeFilter = params.get("event_translations.locale") ?? "";
  assert.match(localeFilter, /^eq\.(tr|en)$/);
  const locale = localeFilter.slice(3);
  const statusFilter = params.get("status") ?? "";
  assert.match(statusFilter, /^in\.\(.+\)$/);
  const statuses = statusFilter.slice(4, -1).split(",");
  assert.deepEqual([...statuses].sort(), ["cancelled", "completed", "published"]);
  assert.equal(params.get("order"), "event_date.asc.nullslast,id.asc");

  const rows = eventData.demoEventRecords.flatMap(({ translations, ...event }) => {
    const translation = translations[locale];
    if (!statuses.includes(event.status) || !translation) return [];
    return [{
      id: event.id,
      slug: event.slug,
      event_date: event.eventDate,
      cover_image: event.coverImage,
      status: event.status,
      is_demo: event.isDemo,
      event_translations: [{
        title: translation.title,
        short_description: translation.shortDescription,
        description: translation.description,
        location: translation.location,
        cover_image_alt: translation.coverImageAlt,
      }],
    }];
  });
  rows.sort((a, b) => {
    if (a.event_date === null && b.event_date !== null) return 1;
    if (b.event_date === null && a.event_date !== null) return -1;
    const difference = a.event_date === null ? 0 :
      Date.parse(a.event_date) - Date.parse(b.event_date);
    return difference || a.id.localeCompare(b.id);
  });

  return new Response(JSON.stringify(
    eventApiState.error ?? eventApiState.overrideRows ?? rows,
  ), {
    status: eventApiState.error ? 400 : 200,
    headers: { "Content-Type": "application/json" },
  });
}

// Execute the real data services without generating files or requiring a new runner.
function loadSource(filename) {
  const resolved = [filename, `${filename}.ts`, path.join(filename, "index.ts")]
    .find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  assert.ok(resolved, `Cannot resolve source module: ${filename}`);
  if (moduleCache.has(resolved)) return moduleCache.get(resolved).exports;

  const loadedModule = { exports: {} };
  moduleCache.set(resolved, loadedModule);
  const { outputText } = ts.transpileModule(fs.readFileSync(resolved, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: resolved,
  });
  const sourceRequire = (specifier) => {
    if (specifier === "@/lib/supabase/server") {
      return { createClient: async () => createEventTestClient() };
    }
    if (specifier.startsWith("@/")) {
      return loadSource(path.join(root, "src", specifier.slice(2)));
    }
    if (specifier.startsWith(".")) {
      return loadSource(path.resolve(path.dirname(resolved), specifier));
    }
    return resolvePackage(specifier);
  };
  new Function("require", "module", "exports", outputText)(
    sourceRequire, loadedModule, loadedModule.exports,
  );
  return loadedModule.exports;
}

const content = loadSource(path.join(root, "src/services/content"));
const eventData = loadSource(path.join(root, "src/data/demo-events"));
const publicData = loadSource(path.join(root, "src/data/public-content"));
const { getUpcomingEvents, groupEventsByDate, isPublicEvent } = loadSource(
  path.join(root, "src/lib/events"),
);
const { formatEventDate } = loadSource(path.join(root, "src/lib/format-event-date"));
const ids = (records) => records.map((record) => record.id);

async function withField(record, field, value, check) {
  const previous = record[field];
  try {
    record[field] = value;
    await check();
  } finally {
    record[field] = previous;
  }
}

async function checkVisibility() {
  const event = eventData.demoEventRecords[0];
  await withField(event, "status", "draft", async () => {
    assert.ok(!(await content.getPublicEvents("tr")).some((item) => item.id === event.id));
    assert.equal(await content.getPublicEventBySlug(event.slug, "tr"), undefined);
  });
  for (const status of ["published", "completed", "cancelled"]) {
    await withField(event, "status", status, async () => {
      assert.ok((await content.getPublicEvents("en")).some((item) => item.id === event.id));
      assert.equal((await content.getPublicEventBySlug(event.slug, "en")).status, status);
    });
  }

  const announcement = publicData.announcementRecords[0];
  await withField(announcement, "status", "draft", async () => {
    assert.ok(!(await content.getPublicAnnouncements("en")).some((item) => item.id === announcement.id));
    assert.equal(await content.getPublicAnnouncementBySlug(announcement.slug, "en"), undefined);
  });
  assert.equal(await content.getPublicEventBySlug("missing-event", "tr"), undefined);
  assert.equal(await content.getPublicAnnouncementBySlug("missing-announcement", "en"), undefined);

  for (const [records, field, getter] of [
    [publicData.teamMemberRecords, "active", content.getTeamMembers],
    [publicData.activityAreaRecords, "active", content.getActivityAreas],
    [publicData.galleryRecords, "published", content.getGalleryItems],
    [publicData.sponsorRecords, "active", content.getSponsors],
  ]) {
    await withField(records[0], field, false, async () => {
      assert.ok(!(await getter("tr")).some((item) => item.id === records[0].id));
    });
  }
}

async function checkLocalizationAndOrdering() {
  const rawRecords = [eventData.demoEventRecords, publicData.announcementRecords,
    publicData.teamMemberRecords, publicData.activityAreaRecords,
    publicData.galleryRecords, publicData.sponsorRecords];
  const snapshot = JSON.stringify(rawRecords);

  for (const [getter, translatedField] of [
    [content.getPublicEvents, "title"],
    [content.getPublicAnnouncements, "title"],
    [content.getTeamMembers, "name"],
    [content.getActivityAreas, "title"],
    [content.getGalleryItems, "title"],
    [content.getSponsors, "name"],
  ]) {
    const tr = await getter("tr");
    const en = await getter("en");
    assert.ok(tr.length > 0, "Expected development fixtures");
    assert.deepEqual(ids(tr), ids(en), "Locale must not change record identity or order");
    assert.deepEqual(tr.map((item) => item.slug), en.map((item) => item.slug));
    for (let index = 0; index < tr.length; index += 1) {
      assert.notEqual(tr[index][translatedField], en[index][translatedField]);
      assert.equal(tr[index].isDemo, true, "Sample records must remain explicitly marked");
    }
    if (tr[0].order !== undefined) {
      assert.deepEqual(tr.map((item) => item.order), tr.map((item) => item.order).sort((a, b) => a - b));
    }
  }

  const announcements = await content.getPublicAnnouncements("tr");
  const dated = announcements.filter((item) => item.publishedAt !== null);
  assert.deepEqual(dated.map((item) => item.publishedAt),
    dated.map((item) => item.publishedAt).sort((a, b) => Date.parse(b) - Date.parse(a)));
  const firstUndated = announcements.findIndex((item) => item.publishedAt === null);
  if (firstUndated !== -1) {
    assert.ok(announcements.slice(firstUndated).every((item) => item.publishedAt === null));
  }
  assert.equal(JSON.stringify(rawRecords), snapshot, "Public reads must not mutate source records");

  const areas = await content.getActivityAreas("en");
  areas[0].tools.push("temporary test value");
  assert.ok(!(await content.getActivityAreas("en"))[0].tools.includes("temporary test value"));
  const trSite = await content.getSiteContent("tr");
  const enSite = await content.getSiteContent("en");
  for (const field of ["heroTitle", "heroDescription", "aboutTitle", "aboutDescription", "joinTitle", "joinDescription"]) {
    assert.notEqual(trSite[field], enSite[field], `${field} needs an English translation`);
  }
  enSite.heroTitle = "temporary test value";
  assert.notEqual((await content.getSiteContent("en")).heroTitle, enSite.heroTitle);
}

async function checkEventDatabaseBoundary() {
  const record = eventData.demoEventRecords[0];
  for (const locale of ["tr", "en"]) {
    const { translations, ...shared } = record;
    const events = await content.getPublicEvents(locale);
    assert.deepEqual(events.find((event) => event.id === record.id), {
      ...shared, ...translations[locale],
    }, "Database columns must map to the complete card/detail model");
    assert.deepEqual(ids(events), ["demo-open-source", "demo-web", "demo-hardware"],
      "Dated events must precede undated events in the database response");
    assert.deepEqual(await content.getPublicEventBySlug(record.slug, locale), {
      ...shared, ...translations[locale],
    });
  }

  await withField(record.translations, "en", undefined, async () => {
    assert.ok((await content.getPublicEvents("tr")).some((event) => event.id === record.id));
    assert.ok(!(await content.getPublicEvents("en")).some((event) => event.id === record.id));
    assert.equal(await content.getPublicEventBySlug(record.slug, "en"), undefined,
      "Missing English translation must not fall back to Turkish");
  });

  await withField(eventApiState, "overrideRows", [], async () => {
    assert.deepEqual(await content.getPublicEvents("tr"), []);
    assert.equal(await content.getPublicEventBySlug(record.slug, "tr"), undefined);
  });

  const failure = { code: "42P01", message: "Test database failure", details: "", hint: "" };
  await withField(eventApiState, "error", failure, async () => {
    await assert.rejects(content.getPublicEvents("tr"), (error) => error.code === failure.code);
    await assert.rejects(content.getPublicEventBySlug(record.slug, "en"),
      (error) => error.code === failure.code);
  });

  const invalidRow = {
    id: record.id, slug: record.slug, event_date: record.eventDate,
    cover_image: record.coverImage, status: record.status, is_demo: record.isDemo,
    event_translations: [],
  };
  await withField(eventApiState, "overrideRows", [invalidRow], async () => {
    await assert.rejects(content.getPublicEvents("tr"), /Etkinlik çevirisi bulunamadı/);
  });
}

function checkDateGrouping() {
  const now = Date.parse("2026-10-19T12:00:00+03:00");
  const base = eventData.demoEvents[0];
  const make = (id, offset, status = "published") => Object.freeze({
    ...base, id, status,
    eventDate: typeof offset === "number" ? new Date(now + offset).toISOString() : offset,
  });
  const events = Object.freeze([
    make("later", 20), make("invalid", "not-a-date"), make("cancelled", 30, "cancelled"),
    make("at-now", 0), make("oldest", -20), make("draft", 30, "draft"),
    make("completed", 50, "completed"), make("sooner", 10), make("past", -10),
    make("undated", null), make("completed-undated", null, "completed"),
    make("cancelled-invalid", "invalid", "cancelled"),
  ]);
  const snapshot = JSON.stringify(events);
  const groups = groupEventsByDate(events, now);
  assert.deepEqual(ids(groups.upcoming), ["at-now", "sooner", "later"]);
  assert.deepEqual(ids(groups.past), ["completed", "past", "oldest", "completed-undated"]);
  assert.deepEqual(ids(groups.undated), ["invalid", "undated"]);
  assert.deepEqual(ids(groups.cancelled), ["cancelled", "cancelled-invalid"]);
  assert.deepEqual(ids(getUpcomingEvents(events, now)), ["at-now", "sooner", "later"]);
  assert.equal(JSON.stringify(events), snapshot, "Date helpers must not mutate inputs");
  for (const status of ["published", "completed", "cancelled"]) {
    assert.equal(isPublicEvent({ ...base, status }), true);
  }
  assert.equal(isPublicEvent({ ...base, status: "draft" }), false);
  assert.deepEqual(groupEventsByDate([], now), { upcoming: [], past: [], undated: [], cancelled: [] });
}

function checkDateFormatting() {
  assert.equal(formatEventDate(null), null);
  assert.equal(formatEventDate("invalid"), null);
  assert.equal(formatEventDate(""), null);
  const utcDate = "2026-11-05T11:00:00Z";
  const localDate = "2026-11-05T14:00:00+03:00";
  for (const locale of ["tr", "en"]) {
    const expected = new Intl.DateTimeFormat(locale, {
      dateStyle: "long", timeStyle: "short", timeZone: "Europe/Istanbul",
    }).format(new Date(utcDate));
    assert.equal(formatEventDate(utcDate, locale), expected);
    assert.equal(formatEventDate(localDate, locale), expected);
  }
  assert.notEqual(formatEventDate(utcDate, "tr"), formatEventDate(utcDate, "en"));
}

function leafKeys(value, prefix = "") {
  return Object.entries(value).flatMap(([key, child]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof child === "object" && child !== null) return leafKeys(child, fullKey);
    assert.equal(typeof child, "string", `${fullKey} must be a message string`);
    assert.ok(child.trim().length > 0, `${fullKey} must not be blank`);
    return [fullKey];
  }).sort();
}

function checkMessageParity() {
  for (const directory of ["", "pages", "system"]) {
    const base = path.join(root, "src/messages", directory);
    const read = (locale) => JSON.parse(fs.readFileSync(path.join(base, `${locale}.json`), "utf8"));
    assert.deepEqual(leafKeys(read("tr")), leafKeys(read("en")),
      `TR/EN message keys differ in ${directory || "root"}`);
  }
}

async function main() {
  await checkVisibility();
  await checkLocalizationAndOrdering();
  await checkEventDatabaseBoundary();
  checkDateGrouping();
  checkDateFormatting();
  checkMessageParity();
  console.log("Public content checks passed: event query/mapping, missing translations, empty/error responses, visibility, ordering, dates and message parity. Database HTTP is mocked; SQL RLS checks run separately.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
