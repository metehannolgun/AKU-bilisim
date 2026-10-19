import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { getSiteContent } from "@/services/content";
import { siteConfig } from "@/config/site";

export const alt = "AKÜ Bilişim Topluluğu / AKÜ Computing Community";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const content = await getSiteContent(locale);

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 64, background: "#f9faf1", color: "#093426", border: "16px solid #093426" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", padding: "14px 20px", borderRadius: 12, background: "#093426", color: "#ffffff", fontSize: 24, fontWeight: 700 }}>AKÜ</div>
          <div style={{ display: "flex", fontSize: 28 }}>{locale === "tr" ? siteConfig.name : "AKÜ Computing Community"}</div>
        </div>
        <div style={{ display: "flex", maxWidth: 1000, fontSize: 76, fontWeight: 700, lineHeight: 1.1, letterSpacing: -3 }}>{content.heroTitle}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 22 }}>{siteConfig.university}</div>
          <div style={{ display: "flex", padding: "12px 20px", background: "#fbde7c", borderRadius: 24, fontSize: 22 }}>{locale === "tr" ? "Birlikte öğren. Birlikte üret." : "Learn together. Create together."}</div>
        </div>
      </div>
    ),
    size,
  );
}
