import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { AnnouncementCard } from "@/components/announcements/AnnouncementCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import { getPublicAnnouncements } from "@/services/content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.announcements");
  return createPageMetadata(locale, t("title"), t("description"), "/duyurular");
}

export default async function AnnouncementsPage() {
  const locale = (await getLocale()) as Locale;
  const [t, announcements] = await Promise.all([getTranslations("pages.announcements"), getPublicAnnouncements(locale)]);

  return (
    <div className="py-12 sm:py-16">
      <Container>
        <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <div className="mt-10">
          {announcements.length === 0 ? <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} /> : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {announcements.map((announcement) => <AnnouncementCard key={announcement.id} announcement={announcement} />)}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
