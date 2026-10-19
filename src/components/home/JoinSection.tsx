import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { getSiteContent } from "@/services/content";
import type { Locale } from "@/i18n/routing";

export async function JoinSection() {
  const locale = (await getLocale()) as Locale;
  const [t, common, content] = await Promise.all([getTranslations("home"), getTranslations("common"), getSiteContent(locale)]);
  return (
    <section id="join" aria-labelledby="join-title" className="scroll-mt-28 py-12 sm:py-16">
      <Container>
        <div className="rounded-2xl border border-accent bg-accent px-6 py-10 text-accent-foreground shadow-sm sm:p-10 lg:p-12">
          <p className="inline-flex rounded-full bg-highlight px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-highlight-foreground">{t("joinEyebrow")}</p>
          <h2 id="join-title" className="mt-4 max-w-2xl text-2xl leading-tight font-bold tracking-tight sm:text-3xl">{content.joinTitle}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-accent-foreground/85">{content.joinDescription}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={content.membershipUrl ?? siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-highlight px-5 py-3 text-sm font-semibold text-highlight-foreground hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight">
              {content.membershipUrl ? t("joinMembership") : t("joinInstagram")}<span className="sr-only"> — {common("newTab")}</span>
            </a>
            {content.discordUrl ? (
              <a href={content.discordUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-accent-foreground/30 px-5 py-3 text-sm font-semibold hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight">{t("joinDiscord")}<span className="sr-only"> — {common("newTab")}</span></a>
            ) : (
              <Link href="/etkinlikler" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-accent-foreground/30 px-5 py-3 text-sm font-semibold hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight">{t("joinEvents")}</Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

