import type { MenuItem } from "../../lib/types";
import { formatPrice } from "../../lib/data";
import { Badge } from "../ui/Badge";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

export function MenuCard({ item, className = "" }: { item: MenuItem; className?: string }) {
  const tag = item.soldOut ? "HABIS" : item.tags?.includes("best-seller") ? "BEST SELLER" : item.tags?.includes("baru") ? "BARU" : null;
  return (
    <article className={`group ${className}`}>
      <div className="aspect-square overflow-hidden rounded-lg">
        <ImagePlaceholder
          label={`Foto ${item.name}`}
          alt={item.name}
          src={item.image || undefined}
          dim={item.soldOut}
          className="rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-3 flex min-h-[26px] items-center">{tag && <Badge muted={item.soldOut}>{tag}</Badge>}</div>
      <h3 className={`mt-2 text-base font-semibold sm:text-lg ${item.soldOut ? "text-ink-muted" : ""}`}>{item.name}</h3>
      <p className="mt-0.5 text-[15px] text-ink-soft">{formatPrice(item.price)}</p>
    </article>
  );
}
