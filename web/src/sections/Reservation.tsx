import { Section } from "../components/layout/Section";
import { StepList } from "../components/reservation/StepList";
import { ReservationForm } from "../components/reservation/ReservationForm";

export function Reservation() {
  return (
    <Section id="reservasi">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
        <div>
          <p className="eyebrow mb-3">Reservasi</p>
          <h2 className="h2">Amankan mejamu sebelum penuh</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
            Isi form singkat ini, pesannya langsung kebuka di WhatsApp admin cabang yang kamu pilih. Gampang,
            teu ribet.
          </p>
          <div className="mt-8">
            <StepList
              steps={[
                "Pilih cabang, tanggal, jam, dan jumlah orang",
                "Kirim pesan otomatis via WhatsApp",
                "Admin cabang konfirmasi meja kamu",
              ]}
            />
          </div>
        </div>
        <ReservationForm />
      </div>
    </Section>
  );
}
