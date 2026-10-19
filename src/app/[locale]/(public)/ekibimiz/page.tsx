import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { TeamCard } from "@/components/home/TeamCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import { getTeamMembers } from "@/services/content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.team");
  return createPageMetadata(locale, t("title"), t("description"), "/ekibimiz");
}

export default async function TeamPage() {
  const locale = (await getLocale()) as Locale;
  const [t, members] = await Promise.all([getTranslations("pages.team"), getTeamMembers(locale)]);

  return (
    <div className="py-12 sm:py-16">
      <Container>
        <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        {members.some((member) => member.isDemo) && <p className="mt-6 rounded-xl bg-highlight p-4 text-sm leading-6 text-highlight-foreground">{t("demoNotice")}</p>}
        <section className="mt-10" aria-labelledby="team-members">
          <h2 id="team-members" className="sr-only">{t("membersTitle")}</h2>
          {members.length === 0 ? <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} /> : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {members.map((member) => <TeamCard key={member.id} member={member} />)}
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
