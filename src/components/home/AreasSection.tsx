import { Container } from "@/components/ui/Container";
import { AreaCard } from "@/components/home/AreaCard";

export function AreasSection() {
  return (
    <section id="areas" className="scroll-mt-28 py-12">
      <Container>
        {/* Başlık grubu */}
        <div>
          <h2 className="text-2xl font-bold text-accent">
            Faaliyet ve çalışma alanları
          </h2>

          <p className="mt-3 text-muted">
            Birlikte öğrenebileceğimiz ve projeler geliştirebileceğimiz alanlar.
          </p>
        </div>
        {/* Kart grubu */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AreaCard
            title="Web ve mobil geliştirme"
            description="Web arayüzleri ve mobil uygulamalar üzerine birlikte çalışmak."
          />

          <AreaCard
            title="Yapay zekâ ve veri"
            description="Verileri incelemek ve yapay zekâ uygulamalarını keşfetmek."
          />

          <AreaCard
            title="Gömülü sistemler"
            description="Sensörler, devreler ve donanımlarla küçük projeler geliştirmek."
          />

          <AreaCard
            title="Oyun geliştirme"
            description="Oyun mekanikleri tasarlamak ve fikirleri oynanabilir hâle getirmek."
          />
        </div>
      </Container>
    </section>
  );
}
