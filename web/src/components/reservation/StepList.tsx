export function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-5">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent font-bold text-accent">
            {i + 1}
          </span>
          <span className="text-[15px] text-ink-soft sm:text-base">{s}</span>
        </li>
      ))}
    </ol>
  );
}
