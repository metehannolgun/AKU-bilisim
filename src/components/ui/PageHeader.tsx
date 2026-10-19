type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="max-w-3xl">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-muted">{eyebrow}</p>}
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-accent sm:text-4xl">{title}</h1>
      {description && <p className="mt-4 text-base leading-7 text-muted">{description}</p>}
    </header>
  );
}
