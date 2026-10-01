import type { Promo } from "../../lib/types";
import { Button } from "../ui/Button";
import { useBranch } from "../../lib/branch";
import { branchNames } from "../../lib/data";

export function PromoCard({ promo }: { promo: Promo }) {
  const { branch, to } = useBranch();
  // Di halaman brand, promo khusus cabang diberi keterangan cabangnya.
  const only = !branch && branchNames(promo.branches);

  if (promo.featured) {
    return (
      <article className="flex min-h-[220px] flex-col justify-between rounded-xl bg-accent p-6 text-accent-on sm:p-8 lg:min-h-[260px]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[1.5px] sm:text-[13px]">{promo.label ?? "Promo"}</p>
          <p className="mt-4 font-display text-display-promo-sm sm:text-display-promo">{promo.title}</p>
          <p className="mt-2 text-lg font-semibold sm:text-xl">{promo.subtitle}</p>
        </div>
        <p className="mt-6 text-sm opacity-80">
          {only ? `Khusus cabang ${only}. ` : !branch ? "Berlaku di semua cabang. " : ""}
          {promo.terms}
        </p>
      </article>
    );
  }
  return (
    <article className="flex min-h-[220px] flex-col justify-between rounded-xl border border-line-strong bg-surface p-6 sm:p-8 lg:min-h-[260px]">
      <div>
        <p className="eyebrow">{promo.label ?? "Promo"}</p>
        <h3 className="mt-4 font-display text-[30px] uppercase leading-[1.05] sm:text-[40px]">{promo.title}</h3>
        <p className="mt-2 text-base text-ink-soft sm:text-lg">{promo.subtitle}</p>
        {only && <p className="mt-2 text-[13px] text-ink-muted">Khusus cabang {only}</p>}
      </div>
      <Button href={to("#reservasi")} variant="link" className="mt-6 self-start">
        Tanya paket
      </Button>
    </article>
  );
}
