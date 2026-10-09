import { Container } from "@/components/ui/Container";
import { TeamCard } from "@/components/home/TeamCard";

const demoMembers = [
  {
    id: "demo-1",
    name: "Örnek üye 1",
    role: "Görev bilgisi eklenecek",
    initials: "Ö1",
  },
  {
    id: "demo-2",
    name: "Örnek üye 2",
    role: "Görev bilgisi eklenecek",
    initials: "Ö2",
  },
  {
    id: "demo-3",
    name: "Örnek üye 3",
    role: "Görev bilgisi eklenecek",
    initials: "Ö3",
  },
  {
    id: "demo-4",
    name: "Örnek üye 4",
    role: "Görev bilgisi eklenecek",
    initials: "Ö4",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="scroll-mt-28 py-12">
      <Container>
        <h2 className="text-2xl font-bold text-accent">
          Birlikte yürüten ekip
        </h2>

        <p className="mt-3 text-muted">
          Ekip bilgileri henüz eklenmedi.
          Aşağıdaki kartlar yerleşim örnekleridir.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {demoMembers.map((member) => (
            <TeamCard
              key={member.id}
              name={member.name}
              role={member.role}
              initials={member.initials}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}