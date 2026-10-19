import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.contact");
  return createPageMetadata(locale, t("title"), t("description"), "/iletisim");
}

export default async function ContactPage() {
  const t = await getTranslations("pages.contact");

  return (
    <div className="py-12 sm:py-16">
      <Container>
        <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl bg-accent p-6 text-accent-foreground sm:p-8" aria-labelledby="contact-instagram">
            <h2 id="contact-instagram" className="text-xl font-bold">{t("instagramTitle")}</h2>
            <p className="mt-4 text-sm leading-7">{t("instagramDescription")}</p>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-highlight px-5 py-3 text-sm font-semibold text-highlight-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight">
              @akubilisimtoplulugu<span className="sr-only"> — {t("newTab")}</span>
            </a>
          </section>
          <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8" aria-labelledby="contact-community">
            <h2 id="contact-community" className="text-xl font-bold text-accent">{t("communityTitle")}</h2>
            <p className="mt-4 font-semibold text-accent">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-muted">{t("university")}</p>
            <p className="mt-4 text-sm leading-7 text-muted">{t("communityDescription")}</p>
            <Link href="/hakkimizda" className="mt-4 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{t("aboutLink")} <span aria-hidden="true" className="ml-2">→</span></Link>
          </section>
        </div>
      </Container>
    </div>
  );
}
