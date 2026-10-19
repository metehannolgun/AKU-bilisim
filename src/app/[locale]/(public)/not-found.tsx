import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

export default async function PublicNotFound() {
  const t = await getTranslations("system.notFound");

  return (
    <section className="py-20">
      <Container>
        <p className="text-sm font-semibold text-muted">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-accent">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-xl leading-7 text-muted">{t("description")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex min-h-11 items-center rounded-xl bg-accent px-5 py-3 font-semibold text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            {t("home")}
          </Link>
          <Link href="/etkinlikler" className="inline-flex min-h-11 items-center rounded-xl border border-border px-5 py-3 font-semibold text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            {t("events")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
