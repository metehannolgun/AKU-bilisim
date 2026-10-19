import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatEventDate } from "@/lib/format-event-date";
import type { CommunityEvent } from "@/types/event";

type EventCardProps = { event: CommunityEvent; headingLevel?: 2 | 3 };

export async function EventCard({ event, headingLevel = 3 }: EventCardProps) {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("pages.events")]);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const formattedDate = formatEventDate(event.eventDate, locale);

  return (
    <article className="flex h-full min-h-72 flex-col rounded-xl border border-border bg-surface p-5">
      <div className="flex flex-wrap gap-2">
        {event.isDemo && <span className="rounded-md bg-highlight px-2 py-1 text-xs font-medium text-highlight-foreground">{t("demo")}</span>}
        {(event.status === "cancelled" || event.status === "completed") && (
          <span className="rounded-md bg-surface-elevated px-2 py-1 text-xs font-medium text-accent">{t(event.status)}</span>
        )}
      </div>
      <Heading className="mt-4 text-lg font-semibold text-accent">
        <Link href={`/etkinlikler/${event.slug}`} className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{event.title}</Link>
      </Heading>
      <p className="mt-3 text-sm leading-6 text-muted">{event.shortDescription}</p>
      <div className="mt-auto space-y-2 pt-6 text-xs leading-5 text-muted">
        <p>{formattedDate ? <time dateTime={event.eventDate!}>{formattedDate}</time> : t("dateUnknown")}</p>
        <p>{event.location || t("locationUnknown")}</p>
      </div>
      <Link href={`/etkinlikler/${event.slug}`} aria-label={t("detailsLabel", { title: event.title })} className="mt-3 inline-flex min-h-11 items-center self-start rounded-sm text-sm font-semibold text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
        {t("details")} <span aria-hidden="true" className="ml-2">→</span>
      </Link>
    </article>
  );
}
