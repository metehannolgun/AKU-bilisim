import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { Container } from "@/components/ui/Container";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <>
      <Hero />

      <section
        id="community"
        aria-labelledby="community-title"
        className="scroll-mt-28 bg-surface-elevated py-14 sm:py-20"
      >
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-code uppercase">
              {t("aboutEyebrow")}
            </p>
            <h2
              id="community-title"
              className="mt-3 text-3xl font-bold tracking-tight text-accent"
            >
              {t("aboutTitle")}
            </h2>
            <p className="mt-4 leading-7 text-muted">
              {t("aboutDescription")}
            </p>
          </div>
        </Container>
      </section>

      <section
        id="events"
        aria-labelledby="events-title"
        className="scroll-mt-28 py-14 sm:py-20"
      >
        <Container>
          <p className="text-xs font-semibold tracking-wider text-code uppercase">
            {t("eventsEyebrow")}
          </p>
          <h2
            id="events-title"
            className="mt-3 text-3xl font-bold tracking-tight text-accent"
          >
            {t("eventsTitle")}
          </h2>
          <div className="mt-6 rounded-2xl border border-dashed border-border bg-surface p-6 sm:p-8">
            <p className="font-semibold">{t("eventsEmpty")}</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {t("eventsEmptyDescription")}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
