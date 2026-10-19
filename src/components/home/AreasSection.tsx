import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { AreaCard } from "@/components/home/AreaCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getActivityAreas } from "@/services/content";
import type { Locale } from "@/i18n/routing";

export async function AreasSection() {
  const locale = (await getLocale()) as Locale;
  const [t, areas] = await Promise.all([getTranslations("home"), getActivityAreas(locale)]);
  return (
    <section id="areas" aria-labelledby="areas-title" className="scroll-mt-28 bg-surface-elevated/60 py-12 sm:py-16">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">{t("areasEyebrow")}</p>
        <h2 id="areas-title" className="mt-2 text-2xl font-bold text-accent sm:text-3xl">{t("areasTitle")}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{t("areasDescription")}</p>
        <div className="mt-6">
          {areas.length === 0 ? <EmptyState title={t("areasEmpty")} /> : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {areas.map((area) => <AreaCard key={area.id} area={area} />)}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

