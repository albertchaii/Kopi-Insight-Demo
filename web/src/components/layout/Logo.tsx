import { Link } from "react-router-dom";
import { brand } from "../../lib/data";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="flex flex-col leading-none" aria-label={`${brand.name}, ke beranda`}>
      <span className="font-display text-[24px] uppercase tracking-[0.5px] sm:text-[28px]">{brand.logoText}</span>
      <span className="mt-1 text-[12px] text-ink-muted">by {brand.by}</span>
    </Link>
  );
}
