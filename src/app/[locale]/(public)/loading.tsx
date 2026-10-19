import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

export default async function PublicLoading() {
  const t = await getTranslations("system");

  return (
    <Container className="py-16">
      <p role="status" className="text-sm text-muted">{t("loading")}</p>
      <div aria-hidden="true" className="mt-6 grid gap-4 md:grid-cols-3 motion-safe:animate-pulse">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-48 rounded-2xl bg-surface-elevated" />
        ))}
      </div>
    </Container>
  );
}
