import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatEventDate } from "@/lib/format-event-date";
import { createPageMetadata } from "@/lib/metadata";
import { getPublicAnnouncementBySlug } from "@/services/content";

type AnnouncementDetailsProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: AnnouncementDetailsProps): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const announcement = await getPublicAnnouncementBySlug(slug, locale as Locale);
  if (!announcement) notFound();
  const metadata = await createPageMetadata(locale as Locale, announcement.title, announcement.summary, `/duyurular/${announcement.slug}`);
  return announcement.isDemo ? { ...metadata, robots: { index: false, follow: true } } : metadata;
}

export default async function AnnouncementDetailsPage({ params }: AnnouncementDetailsProps) {
  const [{ slug }, locale, t] = await Promise.all([params, getLocale(), getTranslations("pages.announcements")]);
  const announcement = await getPublicAnnouncementBySlug(slug, locale as Locale);
  if (!announcement) notFound();
  const formattedDate = formatEventDate(announcement.publishedAt, locale);

  return (
    <article className="py-12 sm:py-16">
      <Container>
        <Link href="/duyurular" className="inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          <span aria-hidden="true" className="mr-2">←</span> {t("back")}
        </Link>
        <header className="mt-6 max-w-3xl">
          {announcement.isDemo && <p className="text-xs font-semibold text-muted">{t("demoNotice")}</p>}
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-accent sm:text-4xl">{announcement.title}</h1>
          {formattedDate && <p className="mt-4 text-sm text-muted"><time dateTime={announcement.publishedAt!}>{formattedDate}</time></p>}
          <p className="mt-4 text-lg leading-8 text-muted">{announcement.summary}</p>
        </header>
        {announcement.coverImage && (
          <div className="relative mt-8 aspect-video max-w-4xl overflow-hidden rounded-2xl bg-surface-elevated">
            <Image src={announcement.coverImage} alt={announcement.title} fill sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" />
          </div>
        )}
        <div className="mt-8 max-w-3xl whitespace-pre-line break-words text-base leading-8 text-foreground">{announcement.content}</div>
      </Container>
    </article>
  );
}
