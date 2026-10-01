import { useState } from "react";
import { Section, SectionHeading } from "../components/layout/Section";
import { CategoryTabs } from "../components/menu/CategoryTabs";
import { MenuCard } from "../components/menu/MenuCard";
import { Button } from "../components/ui/Button";
import { menuFor } from "../lib/data";
import { useBranch } from "../lib/branch";
import type { MenuCategory } from "../lib/types";

export function MenuPreview() {
  const { branch, to } = useBranch();
  const [category, setCategory] = useState<MenuCategory>("kopi");
  const items = menuFor(branch?.id)
    .filter((m) => m.category === category)
    .sort((a, b) => Number(!!b.tags?.includes("best-seller")) - Number(!!a.tags?.includes("best-seller")))
    .slice(0, 4);

  return (
    <Section id="menu">
      <SectionHeading
        eyebrow="Menu favorit"
        title="Yang paling sering dipesan"
        action={
          <Button href={to("#daftar-menu")} variant="outline" className="hidden self-start sm:inline-flex sm:self-auto">
            Lihat menu lengkap
          </Button>
        }
      />
      <CategoryTabs value={category} onChange={(c) => c !== "semua" && setCategory(c)} />
      <div className="no-scrollbar -mx-5 mt-6 flex snap-x scroll-px-5 gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-6">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} className="w-[160px] shrink-0 snap-start sm:w-auto" />
        ))}
      </div>
      <Button href={to("#daftar-menu")} variant="outline" className="mt-6 w-full sm:hidden">
        Lihat menu lengkap
      </Button>
    </Section>
  );
}
