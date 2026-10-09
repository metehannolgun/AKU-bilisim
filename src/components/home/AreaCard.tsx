type AreaCardProps = {
    title: string;
    description: string;
};

export function AreaCard({
    title,
    description,
}: AreaCardProps) {
    return (
        <article className="rounded-xl border border-border bg-surface p-5">
            <h3 className="font-semibold text-accent">
                {title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
                {description}
            </p>
        </article>
    )
}