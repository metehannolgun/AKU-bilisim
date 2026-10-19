import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/home/PhotoPlaceholder";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getSiteContent } from "@/services/content";

export async function CommunitySection() {
  const locale = (await getLocale()) as Locale;
  const [t, content] = await Promise.all([getTranslations("home"), getSiteContent(locale)]);
  const values = ["sharing", "learning", "creating"] as const;

  return (
    <section id="community" aria-labelledby="community-title" className="scroll-mt-28 bg-surface-elevated/60 py-12 sm:py-16">
      <Container className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface lg:col-span-5">
          <PhotoPlaceholder label={t("aboutPhotoPlaceholder")} className="min-h-72 bg-highlight/25" />
        </div>
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">{t("aboutEyebrow")}</p>
          <h2 id="community-title" className="mt-3 max-w-xl text-2xl leading-tight font-bold text-accent sm:text-3xl">{content.aboutTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-muted">{content.aboutDescription}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {values.map((value) => (
              <li key={value} className="rounded-xl border border-border/60 bg-background p-4">
                <h3 className="text-sm font-semibold text-accent">{t(`values.${value}.title`)}</h3>
                <p className="mt-2 text-xs leading-5 text-muted">{t(`values.${value}.description`)}</p>
              </li>
            ))}
          </ul>
          <Link href="/hakkimizda" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{t("aboutLink")}<span aria-hidden="true">→</span></Link>
        </div>
      </Container>
    </section>
  );
}

