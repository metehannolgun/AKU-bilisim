type PhotoPlaceholderProps = {
  label: string;
  className?: string;
};

export function PhotoPlaceholder({ label, className = "" }: PhotoPlaceholderProps) {
  return (
    <div className={`flex h-full min-h-48 flex-col items-center justify-center gap-4 bg-surface-elevated px-6 py-10 text-center text-muted ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 80 64" fill="none" className="h-16 w-20 text-accent/40">
        <rect x="2" y="2" width="76" height="60" rx="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="25" cy="22" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="m4 49 20-15 14 11 17-22 23 27" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <p className="max-w-60 text-sm leading-6">{label}</p>
    </div>
  );
}

