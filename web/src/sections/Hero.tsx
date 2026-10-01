import { Store } from "lucide-react";
import { StatusBadge } from "../components/ui/StatusBadge";
import { Button } from "../components/ui/Button";
import { ImagePlaceholder } from "../components/ui/ImagePlaceholder";
import { Container } from "../components/layout/Container";
import { brand, branches } from "../lib/data";
import { useBranch } from "../lib/branch";

export function Hero() {
  const { branch, place, grabfood, to } = useBranch();
  const [before, highlight, after] = (branch?.heroTitle ?? brand.heroTitle).map((s) => s.replace("{lokasi}", place));

  return (
    <section id="top" className="bg-bg pb-8 pt-6 sm:pb-14 sm:pt-12 lg:pb-[72px] lg:pt-[72px]">
      <Container className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div>
          {branch ? (
            <StatusBadge hours={branch.hours} />
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-line-input px-3.5 py-1.5 text-[13px] text-ink-soft">
              <Store className="h-3.5 w-3.5 text-accent" strokeWidth={2} aria-hidden="true" />
              {branches.length} cabang di {brand.region}
            </span>
          )}
          <h1 className="mt-5 font-display text-display-xl-sm uppercase sm:text-[64px] sm:leading-[0.98] lg:text-display-xl">
            {before}
            <span className="text-accent">{highlight}</span>
            {after}
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.5] text-ink-soft sm:text-lg sm:leading-[1.55]">
            {branch?.heroLead ?? brand.heroLead}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={to("#reservasi")} size="lg">
              Reservasi Meja
            </Button>
            {branch ? (
              <Button href={to("#menu")} variant="outline" size="lg">
                Lihat Menu
              </Button>
            ) : (
              <Button href={to("#cabang")} variant="outline" size="lg">
                Pilih Cabang
              </Button>
            )}
            {grabfood && (
              <Button href={grabfood} variant="link" size="lg" className="sm:ml-2">
                Pesan di GrabFood
              </Button>
            )}
          </div>
        </div>
        <div className="aspect-[4/5] max-h-[640px] w-full overflow-hidden rounded-[16px] sm:rounded-xl lg:justify-self-end">
          <ImagePlaceholder
            label="Foto suasana kafe"
            src={branch?.heroImage ?? brand.heroImage}
            alt={`Suasana ${branch?.name ?? brand.name}`}
            width={960}
            height={1200}
            eager
            className="rounded-[16px] sm:rounded-xl"
          />
        </div>
      </Container>
    </section>
  );
}
