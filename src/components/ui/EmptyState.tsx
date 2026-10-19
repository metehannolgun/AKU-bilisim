type EmptyStateProps = { title: string; description?: string };

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface p-6 sm:p-8">
      <p className="font-semibold text-accent">{title}</p>
      {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{description}</p>}
    </div>
  );
}
