import { Container } from "@/components/ui/Container";
import { AnnouncementItem } from "@/components/home/AnnouncementItem";

export function AnnouncementsSection() {
  return (
    <section
      id="announcements"
      className="scroll-mt-28 bg-surface-elevated py-12"
    >
      <Container>
        <h2 className="text-2xl font-bold text-accent">
          Topluluk duyuruları
        </h2>

        <p className="mt-3 text-sm text-muted">
          Aşağıdaki içerikler yerleşim için hazırlanmış örneklerdir.
        </p>

        <ul className="mt-6 divide-y divide-border">
          <AnnouncementItem
            title="Örnek: çalışma grupları"
            summary="Çalışma gruplarıyla ilgili kısa açıklama bu alanda gösterilecek."
          />

          <AnnouncementItem
            title="Örnek: topluluk buluşması"
            summary="Buluşmayla ilgili bilgiler bu alanda gösterilecek."
          />

          {/* Üçüncü örnek duyuruyu sen ekle */}
        </ul>
      </Container>
    </section>
  );
}