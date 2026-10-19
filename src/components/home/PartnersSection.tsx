import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getSponsors } from "@/services/content";
import type { Locale } from "@/i18n/routing";

export async function PartnersSection() {
  const locale = (await getLocale()) as Locale;
  const [t, common, partners] = await Promise.all([getTranslations("home"), getTranslations("common"), getSponsors(locale)]);
  return (
    <section aria-labelledby="partners-title" className="bg-surface-elevated/60 py-8">
      <Container>
        <h2 id="partners-title" className="text-center text-xs font-semibold uppercase tracking-wider text-muted">{t("partnersTitle")}</h2>
        {partners.some((partner) => partner.isDemo) && <p className="mt-2 text-center text-xs leading-5 text-muted">{t("partnersDemoNotice")}</p>}
        <div className="mt-4">
          {partners.length === 0 ? <EmptyState title={t("partnersEmpty")} /> : (
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {partners.map((partner) => (
                <li key={partner.id} className="rounded-xl border border-border/60 bg-background p-4 text-center">
                  {partner.logo && <Image src={partner.logo} alt="" width={80} height={40} unoptimized={partner.logo.startsWith("http")} className="mx-auto mb-3 h-10 w-20 object-contain" />}
                  {partner.url ? (
                    <a href={partner.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center text-sm font-semibold text-accent focus-visible:outline-2 focus-visible:outline-accent">{partner.name}<span className="sr-only"> — {common("newTab")}</span></a>
                  ) : <p className="text-sm font-semibold text-accent">{partner.name}</p>}
                  <p className="mt-1 text-xs leading-5 text-muted">{partner.description}</p>
                  {partner.isDemo && <p className="mt-2 text-[10px] text-muted">{common("demoLabel")}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}

