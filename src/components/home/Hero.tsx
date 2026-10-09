import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
export function Hero() {
  return (
    <section>
      <Container className="grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-2">
        {/* Sol içerik grubu */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-highlight px-3 py-2 text-xs text-highlight-foreground">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-accent"
            />

            {siteConfig.university}
          </p>
          <h1 className="text-3xl font-bold mt-5">
            Teknolojiyi sadece takip etme. Üret.
          </h1>

          <p className="mt-4">
            Birlikte öğrenmek, geliştirmek ve üretmek için buluşuyoruz.
          </p>

          {/* Yalnızca butonları düzenleyen grup */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="https://www.instagram.com/akubilisimtoplulugu/"
              className="rounded-lg bg-accent px-5 py-3 text-accent-foreground"
            >
              Bizi Instagram’da takip et
            </a>

            <a
              href="#events"
              className="rounded-lg bg-highlight px-5 py-3 text-highlight-foreground"
            >
              Etkinlikleri keşfet
            </a>
          </div>
        </div>

        {/* Sağ içerik grubu */}
        <figure className="relative h-72 overflow-hidden rounded-2xl bg-blue-200">
          <Image
            loading="eager"
            src="/globe.svg"
            alt="Dünya simgesi"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />

          <figcaption className="absolute bottom-4 left-4 right-4 rounded-lg bg-surface p-4">
            <p className="font-semibold">Birlikte öğren.</p>
            <p className="text-sm text-muted">Birlikte üret.</p>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
