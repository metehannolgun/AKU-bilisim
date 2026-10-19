import { getTranslations } from "next-intl/server";
import type { ActivityArea } from "@/types/content";

export async function AreaCard({ area }: { area: ActivityArea }) {
  const t = await getTranslations("common");
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-5">
      <span aria-hidden="true" className="mb-4 flex size-10 items-center justify-center rounded-xl bg-highlight font-mono text-sm font-bold text-highlight-foreground">&lt;/&gt;</span>
      <h3 className="font-semibold text-accent">{area.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{area.description}</p>
      {area.tools.length > 0 && (
        <ul aria-label={t("tools")} className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {area.tools.map((tool) => <li key={tool} className="rounded-md bg-surface-elevated px-2 py-1 font-mono text-[10px] text-muted">{tool}</li>)}
        </ul>
      )}
      {area.isDemo && <p className="mt-3 text-[10px] font-medium text-muted">{t("demoLabel")}</p>}
    </article>
  );
}

