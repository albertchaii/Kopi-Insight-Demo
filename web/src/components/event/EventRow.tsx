import type { EventItem } from "../../lib/types";
import { Button } from "../ui/Button";
import { useBranch } from "../../lib/branch";
import { branchNames } from "../../lib/data";

export function EventRow({ event }: { event: EventItem }) {
  const { branch, to } = useBranch();
  const d = new Date(`${event.date}T00:00:00`);
  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleDateString("id-ID", { month: "short" }).replace(".", "");
  const weekday = d.toLocaleDateString("id-ID", { weekday: "long" });
  const where = !branch ? (branchNames(event.branches) ?? "Semua cabang") : null;
  // Di halaman brand, reservasi diarahkan ke cabang tempat event (kalau hanya satu).
  const target = !branch && event.branches?.length === 1 ? `/${event.branches[0]}#reservasi` : to("#reservasi");

  return (
    <li className="flex items-center gap-4 border-t border-line-strong py-5 sm:gap-6">
      <div className="w-[64px] shrink-0 sm:w-[72px]">
        <p className="font-display text-[28px] leading-none text-accent">{day}</p>
        <p className="mt-1 text-[13px] uppercase text-ink-muted">{month}</p>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold sm:text-lg">{event.name}</h3>
        <p className="mt-1 text-sm text-ink-muted">
          {where && <span className="text-ink-soft">{where} · </span>}
          {weekday} · {event.time}
        </p>
      </div>
      <Button href={target} variant="link" className="shrink-0">
        <span className="hidden sm:inline">Reservasi</span>
        <span className="sm:hidden">Pesan</span>
      </Button>
    </li>
  );
}
