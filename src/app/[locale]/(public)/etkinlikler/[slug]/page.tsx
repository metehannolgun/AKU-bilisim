import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatEventDate } from "@/lib/format-event-date";
import { createPageMetadata } from "@/lib/metadata";
import { getPublicEventBySlug } from "@/services/content";

type EventDetailsPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: EventDetailsPageProps): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const event = await getPublicEventBySlug(slug, locale as Locale);
  if (!event) notFound();
  const metadata = await createPageMetadata(locale as Locale, event.title, event.shortDescription, `/etkinlikler/${event.slug}`);
  return event.isDemo ? { ...metadata, robots: { index: false, follow: true } } : metadata;
}

export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  const [{ slug }, locale, t] = await Promise.all([params, getLocale(), getTranslations("pages.events")]);
  const event = await getPublicEventBySlug(slug, locale as Locale);
  if (!event) notFound();
  const formattedDate = formatEventDate(event.eventDate, locale);

  return (
    <article className="py-12 sm:py-16">
      <Container>
        <Link href="/etkinlikler" className="inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          <span aria-hidden="true" className="mr-2">←</span> {t("back")}
        </Link>
        <header className="mt-6 max-w-3xl">
          {event.isDemo && <p className="text-xs font-semibold text-muted">{t("demoNotice")}</p>}
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-accent sm:text-4xl">{event.title}</h1>
          <p className="mt-4 text-lg leading-8 text-muted">{event.shortDescription}</p>
        </header>
        {event.status === "cancelled" && (
          <p className="mt-6 max-w-3xl rounded-xl border border-border bg-highlight p-4 font-medium text-highlight-foreground">{t("cancelledNotice")}</p>
        )}
        {event.status === "completed" && <p className="mt-6 text-sm font-semibold text-accent">{t("completed")}</p>}
        {event.coverImage && (
          <div className="relative mt-8 aspect-video max-w-4xl overflow-hidden rounded-2xl bg-surface-elevated">
            <Image src={event.coverImage} alt={event.coverImageAlt || event.title} fill sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" />
          </div>
        )}
        <dl className="mt-8 grid max-w-3xl gap-6 rounded-2xl bg-surface-elevated p-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold text-accent">{t("dateLabel")}</dt>
            <dd className="mt-2 text-sm leading-6 text-muted">{formattedDate ? <time dateTime={event.eventDate!}>{formattedDate}</time> : t("dateUnknown")}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-accent">{t("locationLabel")}</dt>
            <dd className="mt-2 text-sm leading-6 text-muted">{event.location || t("locationUnknown")}</dd>
          </div>
        </dl>
        <div className="mt-8 max-w-3xl whitespace-pre-line break-words text-base leading-8 text-foreground">{event.description}</div>
      </Container>
    </article>
  );
}
