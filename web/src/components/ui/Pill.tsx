import type { ComponentPropsWithoutRef } from "react";

export function Pill({ active, className = "", ...rest }: { active?: boolean } & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`min-h-[44px] shrink-0 rounded-full px-5 text-sm font-semibold transition-colors sm:text-[15px] ${
        active ? "bg-ink text-bg" : "border border-line-input text-ink-soft hover:border-ink hover:text-ink"
      } ${className}`}
      {...rest}
    />
  );
}
