import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

export async function SiteHeader() {
  const t = await getTranslations("navigation");

  const items = [
    { href: "/#community", label: t("about") },
    { href: "/#events", label: t("events") },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <Container className="flex min-h-20 items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent font-mono text-xs font-bold text-accent-foreground"
          >
            AKÜ
          </span>

          <span className="min-w-0">
            <span className="block text-sm font-bold leading-5">
              {siteConfig.name}
            </span>
            <span className="block text-xs text-muted">
              {t("subtitle")}
            </span>
          </span>
        </Link>

        <nav
          aria-label={t("label")}
          className="hidden rounded-xl bg-surface-elevated p-1 lg:block"
        >
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-medium hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {t("instagram")}
            <span aria-hidden="true">↗</span>
            <span className="sr-only"> {t("newTab")}</span>
          </a>

          <LanguageSwitcher />
        </div>

        <MobileMenu
          items={items}
          openLabel={t("openMenu")}
          closeLabel={t("closeMenu")}
          navigationLabel={t("label")}
        >
          <LanguageSwitcher />
        </MobileMenu>
      </Container>
    </header>
  );
}