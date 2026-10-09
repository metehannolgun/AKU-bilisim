type AnnouncementItemProps = {
  title: string;
  summary: string;
};

export function AnnouncementItem({
  title,
  summary,
}: AnnouncementItemProps) {
  return (
    <li className="flex items-start gap-4 py-5">
      {/* Sol: sabit boyutlu simge */}
      <span
        aria-hidden="true"
        className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent font-bold text-accent-foreground"
      >
        !
      </span>

      {/* Orta: kalan genişliği kullanan metin */}
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-accent">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-muted">
          {summary}
        </p>
      </div>

      {/* Sağ: kısa bilgi */}
      <span className="shrink-0 pt-1 text-xs text-muted">
        Örnek
      </span>
    </li>
  );
}