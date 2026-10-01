import { Section } from "../components/layout/Section";
import { EventRow } from "../components/event/EventRow";
import { ImagePlaceholder } from "../components/ui/ImagePlaceholder";
import { brand, upcomingEvents } from "../lib/data";
import { useBranch } from "../lib/branch";

export function Events() {
  const { branch } = useBranch();
  const list = upcomingEvents(branch?.id).slice(0, branch ? 3 : 4);
  return (
    <Section id="event">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="aspect-[16/11] overflow-hidden rounded-[16px] sm:rounded-xl">
          <ImagePlaceholder
            label="Foto event"
            src={brand.eventImage}
            width={1200}
            height={825}
            className="rounded-[16px] sm:rounded-xl"
          />
        </div>
        <div>
          <p className="eyebrow mb-3">Event</p>
          <h2 className="h2">{branch ? `Ada apa di ${branch.area}?` : "Jadwal event semua cabang"}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
            Jadwal musik & acara bulan ini. Meja dekat panggung cepat habis, reservasi dari sekarang.
          </p>
          {list.length > 0 ? (
            <ul className="mt-6 border-b border-line-strong">
              {list.map((e) => (
                <EventRow key={e.id} event={e} />
              ))}
            </ul>
          ) : (
            <p className="mt-6 border-t border-line-strong pt-5 text-ink-muted">
              Jadwal berikutnya segera diumumkan di Instagram.
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
