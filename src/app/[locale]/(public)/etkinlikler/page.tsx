import type { Metadata } from "next";
import { connection } from "next/server";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { EventCard } from "@/components/events/EventCard";
import type { Locale } from "@/i18n/routing";
import { groupEventsByDate } from "@/lib/events";
import { createPageMetadata } from "@/lib/metadata";
import { getPublicEvents } from "@/services/content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.events");
  return createPageMetadata(locale, t("title"), t("description"), "/etkinlikler");
}

async function getEventGroups(locale: Locale) {
  await connection();
  return groupEventsByDate(await getPublicEvents(locale), Date.now());
}

export default async function EventsPage() {
  const locale = (await getLocale()) as Locale;
  const [t, groups] = await Promise.all([getTranslations("pages.events"), getEventGroups(locale)]);
  const sections = [
    { key: "upcoming", events: groups.upcoming },
    { key: "undated", events: groups.undated },
    { key: "past", events: groups.past },
    { key: "cancelled", events: groups.cancelled },
  ] as const;
  const hasEvents = sections.some(({ events }) => events.length > 0);

  return (
    <div className="py-12 sm:py-16">
      <Container>
        <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        {!hasEvents ? (
          <div className="mt-10"><EmptyState title={t("emptyTitle")} description={t("emptyDescription")} /></div>
        ) : (
          <div className="mt-10 space-y-12">
            {sections.map(({ key, events }) => (
              <section key={key} aria-labelledby={`events-${key}`}>
                <h2 id={`events-${key}`} className="text-xl font-bold text-accent sm:text-2xl">{t(`groups.${key}`)}</h2>
                <div className="mt-5">
                  {events.length === 0 ? <EmptyState title={t(`groupEmpty.${key}`)} /> : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {events.map((event) => <EventCard key={event.id} event={event} />)}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
