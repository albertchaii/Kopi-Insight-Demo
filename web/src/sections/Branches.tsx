import { Section, SectionHeading } from "../components/layout/Section";
import { BranchCard } from "../components/branch/BranchCard";
import { brand, branches } from "../lib/data";
import { useBranch } from "../lib/branch";

export function Branches() {
  const { branch } = useBranch();
  return (
    <Section id="cabang" alt>
      <SectionHeading
        eyebrow="Cabang"
        title={branch ? `Cabang lain ${brand.by}` : "Pilih cabang terdekat"}
        lead={
          branch
            ? `${branch.name} adalah bagian dari ${brand.by}. Temukan cabang lain di ${brand.region}.`
            : `${branches.length} lokasi di ${brand.region}. Pilih cabang untuk lihat menu, event, dan reservasi di sana.`
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {branches.map((b) => (
          <BranchCard key={b.id} branch={b} current={branch?.id === b.id} />
        ))}
      </div>
    </Section>
  );
}
