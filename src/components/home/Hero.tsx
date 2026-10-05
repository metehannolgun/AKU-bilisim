import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

type HeroProps = {
  imageSrc?: string;
};

export async function Hero({ imageSrc }: HeroProps) {
  const t = await getTranslations("hero");

  return (
    <section aria-labelledby="hero-title">
      <Container className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-highlight/60 px-3 py-2 text-xs font-semibold text-highlight-foreground">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-highlight-foreground"
            />
            {siteConfig.university}
          </p>

          <h1
            id="hero-title"
            className="mt-5 max-w-xl text-4xl leading-[1.15] font-extrabold tracking-tight text-balance text-accent sm:text-5xl"
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <em className="text-code">{chunks}</em>
              ),
            })}
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-muted">
            {t("description")}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/#events"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {t("eventsLabel")}
            </Link>

            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-highlight px-5 py-3 text-sm font-semibold text-highlight-foreground hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {t("instagramLabel")}
              <span aria-hidden="true">↗</span>
              <span className="sr-only"> ({t("newTab")})</span>
            </a>
          </div>

          <p className="mt-4 text-xs leading-5 text-muted">
            {t("hint")}
          </p>
        </div>

        <figure className="relative min-w-0 rounded-2xl border border-border bg-surface p-2 shadow-lg shadow-accent/10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-elevated lg:aspect-[4/5]">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={t("imageAlt")}
                fill
                sizes="(min-width: 1152px) 448px, (min-width: 1024px) 40vw, 100vw"
                loading="eager"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
                <span
                  aria-hidden="true"
                  className="font-mono text-4xl text-accent/40"
                >
                  &lt;/&gt;
                </span>
                <p className="max-w-xs text-sm leading-6 text-muted">
                  {t("imagePlaceholder")}
                </p>
              </div>
            )}
          </div>

          <figcaption className="absolute right-5 bottom-5 left-5 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-accent shadow-sm">
            {t("imageCaption")}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
