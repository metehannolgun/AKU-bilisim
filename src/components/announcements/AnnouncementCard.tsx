import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatEventDate } from "@/lib/format-event-date";
import type { Announcement } from "@/types/content";

type AnnouncementCardProps = { announcement: Announcement; headingLevel?: 2 | 3 };

export async function AnnouncementCard({ announcement, headingLevel = 2 }: AnnouncementCardProps) {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("pages.announcements")]);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const formattedDate = formatEventDate(announcement.publishedAt, locale);

  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 sm:p-6">
      {announcement.isDemo && <p className="text-xs font-semibold text-muted">{t("demo")}</p>}
      <Heading className="mt-3 text-lg font-semibold text-accent">
        <Link href={`/duyurular/${announcement.slug}`} className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{announcement.title}</Link>
      </Heading>
      <p className="mt-3 text-sm leading-6 text-muted">{announcement.summary}</p>
      <div className="mt-auto pt-5">
        {formattedDate && <p className="text-xs text-muted"><time dateTime={announcement.publishedAt!}>{formattedDate}</time></p>}
        <Link href={`/duyurular/${announcement.slug}`} aria-label={t("detailsLabel", { title: announcement.title })} className="mt-2 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          {t("details")} <span aria-hidden="true" className="ml-2">→</span>
        </Link>
      </div>
    </article>
  );
}
