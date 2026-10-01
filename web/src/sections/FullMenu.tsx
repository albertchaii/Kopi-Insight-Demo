import { Section, SectionHeading } from "../components/layout/Section";
import { MenuListItem } from "../components/menu/MenuListItem";
import { Button } from "../components/ui/Button";
import { categories, menuFor } from "../lib/data";
import { useBranch } from "../lib/branch";

export function FullMenu() {
  const { branch, grabfood } = useBranch();
  const menu = menuFor(branch?.id);
  return (
    <Section id="daftar-menu" alt>
      <SectionHeading
        eyebrow={branch ? `Daftar menu · ${branch.area}` : "Daftar menu"}
        title="Semua yang bisa kamu pesan"
        lead={
          branch
            ? "Harga sudah termasuk pajak. Menu bisa berubah sesuai stok harian."
            : "Harga sudah termasuk pajak. Beberapa menu hanya ada di cabang tertentu."
        }
        action={
          grabfood && (
            <Button href={grabfood} variant="outline" className="hidden self-start sm:inline-flex sm:self-auto">
              Pesan di GrabFood
            </Button>
          )
        }
      />
      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-2">
        {categories.map((c) => {
          const items = menu.filter((m) => m.category === c.id);
          if (items.length === 0) return null;
          return (
            <div key={c.id}>
              <h3 className="flex items-baseline justify-between border-b border-line-strong pb-3 font-display text-[28px] uppercase sm:text-[32px]">
                {c.label}
                <span className="font-sans text-[13px] font-medium normal-case text-ink-muted">{items.length} menu</span>
              </h3>
              <ul className="divide-y divide-line">
                {items.map((item) => (
                  <MenuListItem key={item.id} item={item} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      {grabfood && (
        <Button href={grabfood} variant="outline" className="mt-8 w-full sm:hidden">
          Pesan di GrabFood
        </Button>
      )}
    </Section>
  );
}
