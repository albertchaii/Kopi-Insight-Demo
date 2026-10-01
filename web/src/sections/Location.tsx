import type { ReactNode } from "react";
import { Car, Clock, MapPin, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { WhatsAppIcon } from "../components/ui/BrandIcons";
import { hoursSummary } from "../lib/openingHours";
import { waLink } from "../lib/whatsapp";
import type { Branch } from "../lib/types";

export function Location({ branch }: { branch: Branch }) {
  return (
    <Section id="lokasi">
      <SectionHeading eyebrow="Lokasi" title={`Mampir ka ${branch.area}`} />
      <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        <div className="aspect-[4/3] overflow-hidden rounded-[16px] border border-line-strong bg-placeholder sm:rounded-xl lg:col-span-2 lg:aspect-auto lg:min-h-[440px]">
          {branch.mapsEmbed && (
            <iframe
              title={`Peta lokasi ${branch.name}`}
              src={branch.mapsEmbed}
              className="h-full w-full grayscale invert-[0.9] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>
        <div className="flex flex-col rounded-[16px] bg-surface p-6 sm:rounded-xl sm:p-8">
          <dl className="space-y-6">
            <InfoItem icon={<MapPin className="h-5 w-5" strokeWidth={1.8} />} title="Alamat">
              {branch.address}
            </InfoItem>
            <InfoItem icon={<Clock className="h-5 w-5" strokeWidth={1.8} />} title="Jam buka">
              <ul>
                {hoursSummary(branch.hours).map((h) => (
                  <li key={h.days} className="flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span className="tabular-nums">{h.range}</span>
                  </li>
                ))}
              </ul>
            </InfoItem>
            {branch.parking && (
              <InfoItem icon={<Car className="h-5 w-5" strokeWidth={1.8} />} title="Parkir">
                {branch.parking}
              </InfoItem>
            )}
            {branch.features?.length ? (
              <InfoItem icon={<Sparkles className="h-5 w-5" strokeWidth={1.8} />} title="Fasilitas">
                {branch.features.join(" · ")}
              </InfoItem>
            ) : null}
          </dl>
          <div className="mt-8 flex flex-col gap-3 lg:mt-auto lg:pt-8">
            <Button href={branch.mapsUrl} variant="light" className="w-full">
              Petunjuk arah
            </Button>
            <Button href={waLink(branch.whatsapp, `Halo ${branch.name}, saya mau tanya.`)} variant="outline" className="w-full">
              <WhatsAppIcon className="h-5 w-5" />
              Chat WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function InfoItem({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-accent" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <dt className="text-[13px] text-ink-muted">{title}</dt>
        <dd className="mt-1 text-[15px] leading-relaxed text-ink-soft">{children}</dd>
      </div>
    </div>
  );
}
