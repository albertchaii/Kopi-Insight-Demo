import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";

export function NotFound() {
  return (
    <Section className="min-h-[60vh]">
      <p className="eyebrow mb-3">404</p>
      <h1 className="font-display text-display-xl-sm uppercase sm:text-[64px]">Halamannya nyasar</h1>
      <p className="mt-4 text-ink-soft">Mungkin linknya salah ketik. Balik ke beranda, yuk.</p>
      <Button href="/" className="mt-8">
        Ke beranda
      </Button>
    </Section>
  );
}
