import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getSiteOrigin } from "@/lib/site-url";
import { getPublicAnnouncements, getPublicEvents } from "@/services/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteOrigin();
  if (!origin) return [];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const [events, announcements] = await Promise.all([
      getPublicEvents(locale),
      getPublicAnnouncements(locale),
    ]);
    const paths = [
      "/", "/etkinlikler", "/duyurular", "/hakkimizda", "/ekibimiz", "/iletisim",
      ...events.filter((event) => !event.isDemo).map((event) => `/etkinlikler/${event.slug}`),
      ...announcements.filter((announcement) => !announcement.isDemo).map((announcement) => `/duyurular/${announcement.slug}`),
    ];

    for (const href of paths) {
      entries.push({
        url: `${origin}${getPathname({ locale, href })}`,
        alternates: {
          languages: Object.fromEntries(routing.locales.map((language) => [
            language,
            `${origin}${getPathname({ locale: language, href })}`,
          ])),
        },
      });
    }
  }

  return entries;
}
