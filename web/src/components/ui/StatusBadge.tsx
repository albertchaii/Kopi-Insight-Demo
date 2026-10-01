import { useEffect, useState } from "react";
import { getOpenStatus } from "../../lib/openingHours";
import type { DayHours } from "../../lib/types";

export function StatusBadge({ hours, compact }: { hours: DayHours[]; compact?: boolean }) {
  const [status, setStatus] = useState(() => getOpenStatus(hours));

  useEffect(() => {
    setStatus(getOpenStatus(hours));
    const id = setInterval(() => setStatus(getOpenStatus(hours)), 60_000);
    return () => clearInterval(id);
  }, [hours]);

  const dot = <span className={`h-2 w-2 shrink-0 rounded-full ${status.open ? "bg-open" : "bg-ink-muted/50"}`} aria-hidden="true" />;

  if (compact) {
    return (
      <span className="inline-flex items-center gap-2 text-[13px] text-ink-soft">
        {dot}
        {status.label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line-input px-3.5 py-1.5 text-[13px] text-ink-soft">
      {dot}
      {status.label}
    </span>
  );
}
