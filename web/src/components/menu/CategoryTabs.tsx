import type { MenuCategory } from "../../lib/types";
import { categories } from "../../lib/data";
import { Pill } from "../ui/Pill";

type Props = { value: MenuCategory | "semua"; onChange: (v: MenuCategory | "semua") => void; withAll?: boolean };

export function CategoryTabs({ value, onChange, withAll }: Props) {
  const items = withAll ? [{ id: "semua" as const, label: "Semua" }, ...categories] : categories;
  return (
    <div role="group" aria-label="Kategori menu" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      {items.map((c) => (
        <Pill key={c.id} active={value === c.id} onClick={() => onChange(c.id)}>
          {c.label}
        </Pill>
      ))}
    </div>
  );
}
