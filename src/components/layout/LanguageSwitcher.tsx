"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("common");

  return (
    <nav aria-label={t("languageNavigation")} className="flex items-center gap-1">
      {routing.locales.map((language) => (
        <Link
          key={language}
          href={pathname}
          locale={language}
          hrefLang={language}
          aria-current={locale === language ? "page" : undefined}
          aria-label={language === "tr" ? t("turkish") : t("english")}
          className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-2 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
            locale === language
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border text-foreground hover:bg-surface"
          }`}
        >
          {language.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}

