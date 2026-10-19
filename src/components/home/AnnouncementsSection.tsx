import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { AnnouncementItem } from "@/components/home/AnnouncementItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { getPublicAnnouncements } from "@/services/content";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function AnnouncementsSection() {
  const locale = (await getLocale()) as Locale;
  const [t, allAnnouncements] = await Promise.all([getTranslations("home"), getPublicAnnouncements(locale)]);
  const announcements = allAnnouncements.slice(0, 3);
  return (
    <section id="announcements" aria-labelledby="announcements-title" className="scroll-mt-28 bg-surface-elevated/60 py-12 sm:py-16">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="announcements-title" className="text-2xl font-bold text-accent sm:text-3xl">{t("announcementsTitle")}</h2>
            <p className="mt-3 text-sm text-muted">{t("announcementsDescription")}</p>
          </div>
          <Link href="/duyurular" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{t("announcementsLink")}<span aria-hidden="true">→</span></Link>
        </div>
        {announcements.length === 0 ? (
          <div className="mt-6"><EmptyState title={t("announcementsEmpty")} /></div>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {announcements.map((announcement) => <AnnouncementItem key={announcement.id} announcement={announcement} />)}
          </ul>
        )}
      </Container>
    </section>
  );
}

