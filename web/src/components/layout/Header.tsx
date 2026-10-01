import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X } from "lucide-react";
import { Logo } from "./Logo";
import { BranchSwitcher, useBranchHref } from "./BranchSwitcher";
import { Button, IconButton } from "../ui/Button";
import { useBranch } from "../../lib/branch";
import { branches } from "../../lib/data";

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { branch, to } = useBranch();
  const branchHref = useBranchHref();

  const nav = [
    { label: "Menu", to: to("#menu") },
    { label: "Promo", to: to("#promo") },
    { label: "Event", to: to("#event") },
    branch ? { label: "Lokasi", to: to("#lokasi") } : null,
    { label: "Cabang", to: to("#cabang") },
  ].filter((n) => n !== null);

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-container items-center justify-between gap-3 px-5 sm:px-8">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <Logo />
          <BranchSwitcher />
        </div>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((n) => (
              <li key={n.label}>
                <Link to={n.to} className="text-[15px] font-medium text-ink-soft transition-colors hover:text-ink">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href={to("#reservasi")}>Reservasi Meja</Button>
        </div>

        <IconButton
          label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden"
        >
          {open ? <X className="h-5 w-5" strokeWidth={2} /> : <MenuIcon className="h-5 w-5" strokeWidth={2} />}
        </IconButton>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Navigasi utama"
          className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-bg pb-28 lg:hidden"
        >
          <div className="px-5 pt-5">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[1.5px] text-ink-muted">Cabang</p>
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
              {[{ id: null, label: "Semua" }, ...branches.map((b) => ({ id: b.id, label: b.area }))].map((b) => {
                const active = (branch?.id ?? null) === b.id;
                return (
                  <Link
                    key={b.label}
                    to={branchHref(b.id)}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-[44px] shrink-0 items-center rounded-full px-5 text-sm font-semibold ${
                      active ? "bg-ink text-bg" : "border border-line-input text-ink-soft"
                    }`}
                  >
                    {b.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <ul className="flex flex-col px-5 py-4">
            {nav.map((n) => (
              <li key={n.label}>
                <Link to={n.to} className="block border-b border-line py-4 font-display text-[30px] uppercase">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/karier" className="block py-4 font-display text-[30px] uppercase">
                Karier
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
