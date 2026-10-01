export function Badge({ children, muted }: { children: string; muted?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-accent-badge px-2.5 py-1 text-[12px] font-bold uppercase tracking-wide ${
        muted ? "text-ink-muted" : "text-accent"
      }`}
    >
      {children}
    </span>
  );
}
