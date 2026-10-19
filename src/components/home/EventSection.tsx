import { getLocale, getTranslations } from "next-intl/server";
import { connection } from "next/server";
import { Container } from "@/components/ui/Container";
import { EventCard } from "@/components/events/EventCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getUpcomingEvents } from "@/lib/events";
import { getPublicEvents } from "@/services/content";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

async function getUpcomingEventsForRequest(locale: Locale) {
  await connection();
  const events = await getPublicEvents(locale);
  return getUpcomingEvents(events, Date.now()).slice(0, 3);
}

export async function EventsSection() {
  const locale = (await getLocale()) as Locale;
  const [t, common, events] = await Promise.all([
    getTranslations("home"), getTranslations("common"), getUpcomingEventsForRequest(locale),
  ]);

  return (
    <section id="events" aria-labelledby="events-title" className="scroll-mt-28 py-12 sm:py-16">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">{t("eventsEyebrow")}</p>
            <h2 id="events-title" className="mt-2 text-2xl font-bold text-accent sm:text-3xl">{t("eventsTitle")}</h2>
          </div>
          <Link href="/etkinlikler" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{t("eventsLink")}<span aria-hidden="true">→</span></Link>
        </div>
        {events.some((event) => event.isDemo) && <p className="mt-3 text-xs leading-5 text-muted">{common("demoNotice")}</p>}
        <div className="mt-6">
          {events.length === 0 ? (
            <EmptyState title={t("eventsEmpty")} description={t("eventsEmptyDescription")} />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

