import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { AreaCard } from "@/components/home/AreaCard";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import { getActivityAreas, getSiteContent } from "@/services/content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.about");
  return createPageMetadata(locale, t("title"), t("description"), "/hakkimizda");
}

export default async function AboutPage() {
  const locale = (await getLocale()) as Locale;
  const [t, content, areas] = await Promise.all([
    getTranslations("pages.about"),
    getSiteContent(locale),
    getActivityAreas(locale),
  ]);
  const values = ["sharing", "learning", "building"] as const;

  return (
    <div className="py-12 sm:py-16">
      <Container>
        <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <section className="mt-10 grid gap-8 rounded-2xl bg-surface-elevated p-6 sm:p-8 lg:grid-cols-2" aria-labelledby="about-community">
          <div>
            <h2 id="about-community" className="text-2xl font-bold text-accent">{content.aboutTitle}</h2>
            <p className="mt-4 whitespace-pre-line leading-8 text-muted">{content.aboutDescription}</p>
          </div>
          <ul className="grid content-start gap-3">
            {values.map((value) => (
              <li key={value} className="rounded-xl bg-surface p-5">
                <h3 className="font-semibold text-accent">{t(`values.${value}.title`)}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{t(`values.${value}.description`)}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-12" aria-labelledby="about-areas">
          <h2 id="about-areas" className="text-2xl font-bold text-accent">{t("areasTitle")}</h2>
          <div className="mt-5">
            {areas.length === 0 ? <EmptyState title={t("areasEmpty")} /> : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {areas.map((area) => <AreaCard key={area.id} area={area} />)}
              </div>
            )}
          </div>
        </section>
        <nav aria-label={t("relatedLabel")} className="mt-10 flex flex-wrap gap-4">
          <Link href="/ekibimiz" className="inline-flex min-h-11 items-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{t("teamLink")}</Link>
          <Link href="/iletisim" className="inline-flex min-h-11 items-center rounded-xl border border-border px-5 py-3 text-sm font-semibold text-accent hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{t("contactLink")}</Link>
        </nav>
      </Container>
    </div>
  );
}
