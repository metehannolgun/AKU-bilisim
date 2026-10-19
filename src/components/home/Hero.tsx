import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/home/PhotoPlaceholder";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getSiteContent } from "@/services/content";

export async function Hero() {
  const locale = (await getLocale()) as Locale;
  const [t, content] = await Promise.all([
    getTranslations("hero"), getSiteContent(locale),
  ]);

  return (
    <section aria-labelledby="hero-title">
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full bg-highlight px-3 py-2 text-[10px] font-semibold text-highlight-foreground sm:text-xs">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
            {siteConfig.university}
          </p>
          <h1 id="hero-title" className="mt-5 max-w-xl text-4xl leading-[1.12] font-bold tracking-tight text-accent sm:text-5xl lg:text-[3.4rem]">
            {content.heroTitle}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted">{content.heroDescription}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/etkinlikler" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-sm hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              {t("eventsLabel")}<span aria-hidden="true">↗</span>
            </Link>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-highlight px-5 py-3 text-sm font-semibold text-highlight-foreground hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              {t("instagramLabel")}<span className="sr-only"> — {t("newTab")}</span>
            </a>
          </div>
          <p className="mt-5 text-xs leading-5 text-muted">{t("hint")}</p>
        </div>
        <figure className="relative min-h-80 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm lg:col-span-5 lg:min-h-[390px]">
          <PhotoPlaceholder label={t("imagePlaceholder")} className="min-h-80 pb-32 lg:min-h-[390px]" />
          <figcaption className="absolute right-4 bottom-4 left-4 flex items-center gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm">
            <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent font-mono font-bold text-accent-foreground">&lt;/&gt;</span>
            <p className="text-sm font-semibold text-accent">{t("imageCaption")}</p>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}

