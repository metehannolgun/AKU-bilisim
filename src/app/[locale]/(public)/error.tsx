"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

type PublicErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function PublicError({ retry }: PublicErrorProps) {
  const t = useTranslations("system.error");

  return (
    <Container className="py-16">
      <h1 className="text-3xl font-bold text-accent">{t("title")}</h1>
      <p className="mt-4 max-w-xl leading-7 text-muted">{t("description")}</p>
      <button type="button" onClick={() => retry()} className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-accent px-5 py-3 font-semibold text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
        {t("retry")}
      </button>
    </Container>
  );
}
