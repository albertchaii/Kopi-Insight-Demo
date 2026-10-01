import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { brand, branchNames, careers } from "../lib/data";
import { waLink } from "../lib/whatsapp";

export function CareersPage() {
  return (
    <Section>
      <p className="eyebrow mb-3">Karier</p>
      <h1 className="font-display text-display-xl-sm uppercase sm:text-[64px] sm:leading-[0.98]">Kerja bareng kami</h1>
      <p className="mt-4 max-w-xl text-[15px] text-ink-soft sm:text-lg">
        Tim kecil, suasana rame, musik tiap minggu. Kirim CV dan portofolio singkat lewat WhatsApp.
      </p>
      <ul className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-6">
        {careers.map((c) => (
          <li key={c.id} className="flex flex-col rounded-lg border border-line-strong bg-surface p-6">
            <span className="self-start rounded-full bg-accent-badge px-2.5 py-1 text-[12px] font-bold uppercase text-accent">
              {c.type}
            </span>
            <h2 className="mt-4 font-display text-[28px] uppercase">{c.title}</h2>
            <p className="mt-1 text-[13px] text-ink-muted">Penempatan: {branchNames(c.branches) ?? "semua cabang"}</p>
            <p className="mt-3 flex-1 text-[15px] text-ink-soft">{c.desc}</p>
            <Button
              href={waLink(brand.careersWhatsapp, `Halo ${brand.name}, saya tertarik melamar posisi ${c.title}.`)}
              variant="link"
              className="mt-6 self-start"
            >
              Lamar via WhatsApp
            </Button>
          </li>
        ))}
      </ul>
    </Section>
  );
}
