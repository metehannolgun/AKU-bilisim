import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function JoinSection() {
  return (
    <section id="join" className="scroll-mt-28 py-12">
      <Container>
        {/* Renkli kutu */}
        <div className="rounded-2xl bg-accent p-6 text-accent-foreground sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-wider">
            Aramıza katıl
          </p>

          <h2 className="mt-3 max-w-2xl text-2xl font-bold leading-tight sm:text-3xl">
            Senin de masada bir yerin var.
            Birlikte öğrenelim, birlikte üretelim.
          </h2>

          <p className="mt-4 max-w-xl leading-7">
            Merak ettiğin konuları keşfetmek ve birlikte
            projeler geliştirmek için topluluğumuza katıl.
          </p>

          {/* Buton grubu */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-highlight px-5 py-3 text-sm font-semibold text-highlight-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
            >
              Instagram’da bize ulaş
              <span className="sr-only"> — yeni sekmede açılır</span>
            </a>

            <a
              href="#events"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-accent-foreground/30 px-5 py-3 text-sm font-semibold hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
            >
              Etkinlikleri keşfet
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}