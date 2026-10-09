import { Container } from "@/components/ui/Container";

export function GallerySection() {
  return (
    <section id="gallery" className="scroll-mt-28 py-12">
      <Container>
        <h2 className="text-2xl font-bold text-accent">
          Birlikte ürettiklerimiz ve anlar
        </h2>

        {/* Dış Grid: sol görsel ve sağ grup */}
        <div className="mt-6 grid gap-4 md:grid-cols-12">
          {/* Sol: büyük görsel ve üzerine yerleşen açıklama */}
          <figure className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-2xl bg-highlight md:col-span-7 md:min-h-[420px]">
            <p className="text-highlight-foreground">
              Büyük fotoğraf alanı
            </p>

            <figcaption className="absolute bottom-4 left-4 right-4 rounded-xl bg-surface/90 p-4">
              <h3 className="font-semibold text-accent">
                Topluluk anları
              </h3>

              <p className="mt-1 text-sm text-muted">
                Birlikte öğrenirken ve üretirken.
              </p>
            </figcaption>
          </figure>

          {/* Sağ: fotoğraflı kart ve küçük bilgi kartı */}
          <div className="flex flex-col gap-4 md:col-span-5">
            <figure className="flex-1 overflow-hidden rounded-2xl bg-surface">
              <div className="flex h-56 items-center justify-center bg-accent md:h-64">
                <p className="text-accent-foreground">
                  Detay fotoğrafı
                </p>
              </div>

              <figcaption className="p-4">
                <h3 className="font-semibold text-accent">
                  Birlikte üretirken
                </h3>

                <p className="mt-2 text-sm text-muted">
                  Atölye ve proje çalışmalarımızdan kareler.
                </p>
              </figcaption>
            </figure>

            <div className="rounded-xl bg-surface-elevated p-4">
              <h3 className="text-sm font-semibold text-accent">
                Topluluk notu
              </h3>

              <p className="mt-1 text-xs leading-5 text-muted">
                Kısa bir bilgi burada yer alacak.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}