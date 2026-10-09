type TeamCardProps = {
  name: string;
  role: string;
  initials: string;
};

export function TeamCard({ name, role, initials }: TeamCardProps) {
  return (
    <article className="rounded-xl bg-surface p-5">
      <span
        aria-hidden="true"
        className="flex size-12 items-center justify-center rounded-xl bg-accent font-semibold text-accent-foreground"
      >
        {initials}
      </span>

      <h3 className="mt-4 font-semibold text-accent">{name}</h3>

      <p className="mt-1 text-sm text-muted">{role}</p>
    </article>
  );
}
