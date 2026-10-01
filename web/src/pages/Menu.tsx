import { useState } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Section } from "../components/layout/Section";
import { CategoryTabs } from "../components/menu/CategoryTabs";
import { MenuCard } from "../components/menu/MenuCard";
import { Button } from "../components/ui/Button";
import { categories, menuFor } from "../lib/data";
import { useBranch } from "../lib/branch";
import { NotFound } from "./NotFound";
import type { MenuCategory } from "../lib/types";

export function MenuPage() {
  const { slug } = useParams();
  const { branch, grabfood, to } = useBranch();
  const menu = menuFor(branch?.id);
  const [category, setCategory] = useState<MenuCategory | "semua">("semua");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = menu.filter((m) => (category === "semua" || m.category === category) && m.name.toLowerCase().includes(q));
  if (slug && !branch) return <NotFound />;

  const groups = categories
    .map((c) => ({ ...c, items: filtered.filter((m) => m.category === c.id) }))
    .filter((g) => g.items.length > 0);

  return (
    <Section>
      <p className="eyebrow mb-3">Menu lengkap{branch ? ` · ${branch.area}` : ""}</p>
      <h1 className="font-display text-display-xl-sm uppercase sm:text-[64px] sm:leading-[0.98]">Pilih yang kamu suka</h1>
      <p className="mt-4 max-w-xl text-[15px] text-ink-soft sm:text-lg">
        Harga sudah termasuk pajak. Mau dianterin? Pesan lewat GrabFood.
      </p>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <CategoryTabs value={category} onChange={setCategory} withAll />
        <label className="relative block lg:w-72">
          <span className="sr-only">Cari menu</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari menu…"
            className="min-h-[44px] w-full rounded-full border border-line-input bg-bg pl-11 pr-4 text-[15px] placeholder:text-ink-muted/70 focus:border-accent focus:outline-none"
          />
        </label>
      </div>

      {groups.length === 0 ? (
        <p className="mt-12 text-ink-muted">Menu “{query}” belum ada. Coba kata lain, ya.</p>
      ) : (
        groups.map((g) => (
          <div key={g.id} className="mt-12">
            <h2 className="mb-5 border-b border-line pb-3 font-display text-[28px] uppercase sm:text-[36px]">{g.label}</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {g.items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))
      )}

      <div className="mt-14 flex flex-wrap gap-3">
        <Button href={to("#reservasi")} size="lg">
          Reservasi Meja
        </Button>
        {grabfood && (
          <Button href={grabfood} variant="outline" size="lg">
            Pesan di GrabFood
          </Button>
        )}
      </div>
    </Section>
  );
}
