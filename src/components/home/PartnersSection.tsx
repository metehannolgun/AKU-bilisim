import { Container } from "@/components/ui/Container";

const demoPartners = [
  "Örnek kurum 1",
  "Örnek kurum 2",
  "Örnek kurum 3",
  "Örnek kurum 4",
];

export function PartnersSection() {
  return (
    <section className="bg-surface-elevated py-8">
      <Container>
        <h2 className="text-center text-xs font-semibold uppercase tracking-wider text-muted">
          Topluluk iş birlikleri
        </h2>

        <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {demoPartners.map((partner) => (
            <li
              key={partner}
              className="rounded-xl bg-surface p-4 text-center text-sm text-muted"
            >
              {partner}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}