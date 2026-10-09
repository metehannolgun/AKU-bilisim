import { Container } from "@/components/ui/Container";
import { EventCard } from "@/components/home/EventCard";

export function EventsSection() {
  return (
    <section
      id="events"
      className="scroll-mt-28 bg-surface-elevated py-12"
    >
     <Container>
          {/* Başlık grubu */}
          <div>
            <h2 className="text-2xl font-bold text-accent">
              Takvimdeki buluşmalar
            </h2>

            <p className="mt-3 text-muted">
              Etkinlikler henüz eklenmedi. Aşağıdaki kartlar yerleşim
              örnekleridir.
            </p>
          </div>

          {/* Kart grubu */}
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <EventCard
              title="Web geliştirme atölyesi"
              description="Birlikte küçük bir web arayüzü geliştireceğimiz örnek bir atölye."
            />

            <EventCard
              title="Açık kaynak buluşması"
              description="Açık kaynak projelere katkı vermeyi konuşacağımız örnek bir buluşma."
            />

            <EventCard
              title="Donanım çalışması"
              description="Sensörlerle ve küçük devrelerle çalışacağımız örnek bir etkinlik."
            />
          </div>
        </Container>
    </section>
  );
}