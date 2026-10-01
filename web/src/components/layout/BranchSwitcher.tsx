import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Check, ChevronDown, MapPin } from "lucide-react";
import { branches } from "../../lib/data";
import { useBranch } from "../../lib/branch";

/** Pindah cabang dengan tetap di halaman yang sama (beranda ↔ beranda, menu ↔ menu). */
export function useBranchHref() {
  const { pathname } = useLocation();
  const { base } = useBranch();
  const rest = base ? pathname.slice(base.length) : pathname === "/" ? "" : pathname;
  const keep = rest === "/menu" ? "/menu" : "";
  return (id: string | null) => (id ? `/${id}${keep}` : keep || "/");
}

export function BranchSwitcher() {
  const { branch } = useBranch();
  const href = useBranchHref();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-line-input px-3 text-sm sm:gap-2 sm:px-4 font-semibold text-ink transition-colors hover:border-ink"
      >
        <MapPin className="h-4 w-4 text-accent" strokeWidth={2} aria-hidden="true" />
        {branch ? (
          branch.area
        ) : (
          <>
            Semua<span className="hidden sm:inline"> cabang</span>
          </>
        )}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={2} aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute -right-14 top-[calc(100%+8px)] z-50 w-72 max-w-[calc(100vw-40px)] sm:left-0 sm:right-auto overflow-hidden rounded-lg border border-line-strong bg-surface shadow-2xl shadow-black/50">
          <p className="px-4 pb-2 pt-4 text-[12px] font-bold uppercase tracking-[1.5px] text-ink-muted">Pilih cabang</p>
          <ul className="pb-2">
            <SwitcherItem to={href(null)} active={!branch} title="Semua cabang" subtitle={`${branches.length} lokasi`} />
            {branches.map((b) => (
              <SwitcherItem key={b.id} to={href(b.id)} active={branch?.id === b.id} title={b.area} subtitle={b.name} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function SwitcherItem({ to, active, title, subtitle }: { to: string; active: boolean; title: string; subtitle: string }) {
  return (
    <li>
      <Link
        to={to}
        aria-current={active ? "page" : undefined}
        className="flex items-center justify-between gap-3 px-4 py-2.5 transition-colors hover:bg-bg"
      >
        <span>
          <span className={`block text-[15px] font-semibold ${active ? "text-accent" : ""}`}>{title}</span>
          <span className="block text-[13px] text-ink-muted">{subtitle}</span>
        </span>
        {active && <Check className="h-4 w-4 text-accent" strokeWidth={2} aria-hidden="true" />}
      </Link>
    </li>
  );
}
