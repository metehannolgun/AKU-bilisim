import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { TeamCard } from "@/components/home/TeamCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getTeamMembers } from "@/services/content";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function TeamSection() {
  const locale = (await getLocale()) as Locale;
  const [t, common, allMembers] = await Promise.all([getTranslations("home"), getTranslations("common"), getTeamMembers(locale)]);
  const members = allMembers.slice(0, 4);
  return (
    <section id="team" aria-labelledby="team-title" className="scroll-mt-28 py-12 sm:py-16">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">{t("teamEyebrow")}</p>
            <h2 id="team-title" className="mt-2 text-2xl font-bold text-accent sm:text-3xl">{t("teamTitle")}</h2>
          </div>
          <Link href="/ekibimiz" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{t("teamLink")}<span aria-hidden="true">→</span></Link>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted">{members.some((member) => member.isDemo) ? common("demoNotice") : t("teamDescription")}</p>
        <div className="mt-6">
          {members.length === 0 ? <EmptyState title={t("teamEmpty")} /> : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{members.map((member) => <TeamCard key={member.id} member={member} />)}</div>
          )}
        </div>
      </Container>
    </section>
  );
}

