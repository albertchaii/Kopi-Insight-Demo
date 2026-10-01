import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";

export function Careers() {
  return (
    <Section>
      <div className="flex flex-col gap-6 rounded-xl border border-line-strong bg-surface p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="eyebrow mb-3">Karier</p>
          <h2 className="font-display text-[30px] uppercase leading-[1.02] sm:text-[40px]">Mau gabung jadi tim kami?</h2>
          <p className="mt-3 text-[15px] text-ink-soft sm:text-base">
            Kami lagi cari barista, kitchen crew, dan waiter yang suka suasana rame dan musik.
          </p>
        </div>
        <Button href="/karier" variant="light" size="lg" className="self-start lg:self-auto">
          Lihat lowongan
        </Button>
      </div>
    </Section>
  );
}
