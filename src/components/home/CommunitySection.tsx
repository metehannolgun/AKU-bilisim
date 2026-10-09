import { Container } from "@/components/ui/Container";

export function CommunitySection() {
  return (
    <section id="community" className="scroll-mt-28 py-12">
      <Container className="grid items-center gap-8 lg:grid-cols-2">
        {/* Sol: görsel alanı */}
        <div className="flex h-64 items-center justify-center rounded-2xl bg-highlight">
          <p className="text-highlight-foreground">
            Topluluk görseli burada olacak
          </p>
        </div>
        {/* Sağ: metin alanı */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Biz Kimiz ?
          </p>
          <h2 className="mt-3 text-2xl font-bold text-accent">
            Birlikte öğrenmek ve üretmek için bir aradayız.
          </h2>
          <p className="mt-4 leading-7 text-muted">
            AKÜ Bilişim Topluluğu olarak teknolojiye ilgi duyan öğrencileri bir
            araya getiriyoruz. Bilgimizi paylaşmak, yeni şeyler denemek ve
            birlikte projeler geliştirmek istiyoruz.
          </p>
          {/* Sağ metin grubunun içindeki bilgi kutuları */}
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            <li className="rounded-xl bg-surface p-4">
              <h3 className="text-sm font-semibold text-accent">
                Açık paylaşım
              </h3>

              <p className="mt-2 text-xs leading-5 text-muted">
                Bildiklerimizi birbirimizle paylaşırız.
              </p>
            </li>

            <li className="rounded-xl bg-surface p-4">
              <h3 className="text-sm font-semibold text-accent">
                Birlikte öğrenme
              </h3>

              <p className="mt-2 text-xs leading-5 text-muted">
                Sorular sorarak ve deneyerek öğreniriz.
              </p>
            </li>

            <li className="rounded-xl bg-surface p-4">
              <h3 className="text-sm font-semibold text-accent">
                Birlikte üretme
              </h3>

              <p className="mt-2 text-xs leading-5 text-muted">
                Fikirlerimizi küçük projelere dönüştürürüz.
              </p>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
