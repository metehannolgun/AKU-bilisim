import { getTranslations } from "next-intl/server";
import { connection } from "next/server";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

async function getCurrentYear() {
  await connection();
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const [t, navigation, year] = await Promise.all([
    getTranslations("footer"), getTranslations("navigation"), getCurrentYear(),
  ]);
  const links = [
    { href: "/hakkimizda", label: navigation("about") },
    { href: "/etkinlikler", label: navigation("events") },
    { href: "/duyurular", label: navigation("announcements") },
    { href: "/ekibimiz", label: navigation("team") },
    { href: "/iletisim", label: navigation("contact") },
  ];

  return (
    <footer className="border-t border-border bg-surface-elevated py-10">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-lg bg-accent font-mono text-[10px] font-bold text-accent-foreground">AKÜ</span>
              <span className="text-sm font-bold text-accent">{navigation("siteName")}</span>
            </Link>
            <p className="mt-3 text-xs text-muted">{siteConfig.university}</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{t("description")}</p>
          </div>
          <nav aria-label={t("navigationLabel")} className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-accent">{t("linksTitle")}</h2>
            <ul className="mt-2">
              {links.map((link) => (
                <li key={link.href}><Link href={link.href} className="inline-flex min-h-11 items-center text-sm text-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">{link.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-accent">{t("contactTitle")}</h2>
            <p className="mt-4 text-sm leading-6 text-muted">{t("contactDescription")}</p>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent focus-visible:outline-2 focus-visible:outline-accent">Instagram <span aria-hidden="true">↗</span><span className="sr-only"> — {navigation("newTab")}</span></a>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {navigation("siteName")}</p>
          <p>{t("bottomNote")}</p>
        </div>
      </Container>
    </footer>
  );
}

