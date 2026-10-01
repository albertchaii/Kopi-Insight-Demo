import type { MenuItem } from "../../lib/types";
import { branchNames, formatPrice } from "../../lib/data";
import { useBranch } from "../../lib/branch";
import { Badge } from "../ui/Badge";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

export function MenuListItem({ item }: { item: MenuItem }) {
  const { branch } = useBranch();
  const only = !branch && branchNames(item.branches);
  const tag = item.soldOut ? "HABIS" : item.tags?.includes("best-seller") ? "BEST SELLER" : item.tags?.includes("baru") ? "BARU" : null;
  return (
    <li className="flex items-center gap-4 py-4">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[12px] sm:h-[72px] sm:w-[72px]">
        <ImagePlaceholder
          label={item.name}
          src={item.image || undefined}
          alt={item.name}
          width={144}
          height={144}
          dim={item.soldOut}
          className="rounded-[12px]"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h4 className={`shrink-0 text-base font-semibold ${item.soldOut ? "text-ink-muted line-through decoration-1" : ""}`}>
            {item.name}
          </h4>
          <span className="mb-1 hidden flex-1 border-b border-dotted border-line-input sm:block" aria-hidden="true" />
          <span className={`ml-auto shrink-0 text-[15px] font-semibold tabular-nums sm:ml-0 ${item.soldOut ? "text-ink-muted" : "text-ink"}`}>
            {formatPrice(item.price)}
          </span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
          {item.desc && <p className="text-[13px] text-ink-muted">{item.desc}</p>}
          {tag && <Badge muted={item.soldOut}>{tag}</Badge>}
          {only && <span className="text-[12px] text-ink-soft">Hanya di {only}</span>}
        </div>
      </div>
    </li>
  );
}
