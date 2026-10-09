type EventCardProps = {
  title: string;
  description: string;
};

export function EventCard({ title, description }: EventCardProps) {
  return (
    <article className="flex min-h-72 flex-col rounded-xl border border-border bg-surface p-5">
      {/*Üst içerik grubu*/}
      <div>
        <span className="inline-block rounded-md bg-highlight px-2 py-1 text-xs text-highlight-foreground">
          Örnek Etkinlik
        </span>

        <h3 className="mt-4 text-lg font-semibold text-accent">{title}</h3>

        <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
      </div>
      {/*Alt bilgi grubu*/}
      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <p className="text-xs text-muted">Tarih henüz eklenmedi</p>

        <span className="text-xs font-medium text-accent">Örnek</span>
      </div>
    </article>
  );
}
