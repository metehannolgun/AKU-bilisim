import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getSiteOrigin } from "@/lib/site-url";

export async function createPageMetadata(
  locale: Locale,
  title: string,
  description: string,
  pathname: string,
): Promise<Metadata> {
  const origin = getSiteOrigin();
  const localizedPath = getPathname({ locale, href: pathname });
  const url = origin ? `${origin}${localizedPath}` : undefined;
  const languages = origin
    ? Object.fromEntries(
        routing.locales.map((language) => [
          language,
          `${origin}${getPathname({ locale: language, href: pathname })}`,
        ]),
      )
    : undefined;

  return {
    title,
    description,
    ...(url ? { alternates: { canonical: url, languages } } : {}),
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? "en_US" : "tr_TR",
      ...(url ? { url } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
