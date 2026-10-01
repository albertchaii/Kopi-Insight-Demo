import { Section, SectionHeading } from "../components/layout/Section";
import { PromoCard } from "../components/promo/PromoCard";
import { activePromos } from "../lib/data";
import { useBranch } from "../lib/branch";

export function Promo() {
  const { branch } = useBranch();
  const list = activePromos(branch?.id);
  if (list.length === 0) return null;
  return (
    <Section id="promo">
      <SectionHeading eyebrow="Promo" title="Lagi ada yang hemat" />
      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:gap-6">
        {list.map((p) => (
          <PromoCard key={p.id} promo={p} />
        ))}
      </div>
    </Section>
  );
}
