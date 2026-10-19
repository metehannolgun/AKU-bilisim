import type { Locale as AppLocale } from "@/i18n/routing";

declare module "next-intl" {
  interface AppConfig {
    Locale: AppLocale;
  }
}
