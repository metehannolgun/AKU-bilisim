import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export async function LanguageSwitcher() {
  const locale = await getLocale();
  const t = await getTranslations("common");

  return (
    <nav
      aria-label={t("languageNavigation")}
      className="flex items-center gap-2"
    >
      {routing.locales.map((language) => (
        <Link
          key={language}
          href="/"
          locale={language}
          aria-current={locale === language ? "page" : undefined}
          className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
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
