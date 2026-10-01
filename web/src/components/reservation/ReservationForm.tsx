import { useId, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { buildReservationMessage, waLink } from "../../lib/whatsapp";
import type { Reservation } from "../../lib/whatsapp";
import { branches, getBranch } from "../../lib/data";
import { formatTime, isWithinHours } from "../../lib/openingHours";
import { useBranch } from "../../lib/branch";

type Errors = Partial<Record<keyof Reservation, string>>;

const todayIso = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const initial: Omit<Reservation, "cabang"> = {
  nama: "",
  whatsapp: "",
  tanggal: "",
  jam: "19:00",
  jumlah: "2",
  area: "Indoor",
  catatan: "",
};

function validate(v: Reservation): Errors {
  const e: Errors = {};
  const branch = getBranch(v.cabang);
  if (!branch) e.cabang = "Pilih cabang tujuan.";
  if (v.nama.trim().length < 2) e.nama = "Isi nama kamu dulu, ya.";

  const phone = v.whatsapp.replace(/[\s-]/g, "");
  if (!/^(\+62|62|0)8\d{7,12}$/.test(phone)) e.whatsapp = "Nomor WhatsApp belum valid. Contoh: 0812 3456 7890.";

  if (!v.tanggal) e.tanggal = "Pilih tanggal kedatangan.";
  else if (v.tanggal < todayIso()) e.tanggal = "Tanggalnya sudah lewat.";

  if (!v.jam) e.jam = "Pilih jam kedatangan.";
  else if (v.tanggal && branch) {
    const { ok, hours } = isWithinHours(branch.hours, v.tanggal, v.jam);
    if (!ok) e.jam = `Hari itu ${branch.area} buka ${formatTime(hours.open)}–${formatTime(hours.close)}.`;
  }

  const n = Number(v.jumlah);
  if (!Number.isInteger(n) || n < 1) e.jumlah = "Minimal 1 orang.";
  else if (n > 60) e.jumlah = "Untuk lebih dari 60 orang, chat admin langsung, ya.";

  return e;
}

export function ReservationForm() {
  const { branch } = useBranch();
  const [values, setValues] = useState<Reservation>({ ...initial, cabang: branch?.id ?? "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof Reservation>(key: K, value: Reservation[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    setSubmitted(true);
    const e = validate(values);
    setErrors(e);
    const firstError = Object.keys(e)[0];
    if (firstError) {
      document.getElementById(`res-${firstError}`)?.focus();
      return;
    }
    const target = getBranch(values.cabang)!;
    window.open(waLink(target.whatsapp, buildReservationMessage(values, target.name)), "_blank", "noopener,noreferrer");
  };

  const input =
    "w-full min-h-[48px] rounded-md border bg-bg px-4 text-[15px] text-ink placeholder:text-ink-muted/70 transition-colors focus:border-accent focus:outline-none";
  const border = (k: keyof Reservation) => (errors[k] ? "border-accent" : "border-line-input");

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xl bg-surface p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cabang" label="Cabang" error={errors.cabang} className="sm:col-span-2">
          <select
            id="res-cabang"
            className={`${input} ${border("cabang")} appearance-none bg-[length:16px] bg-[right_16px_center] bg-no-repeat pr-10`}
            style={{ backgroundImage: chevron }}
            value={values.cabang}
            onChange={(e) => set("cabang", e.target.value)}
            aria-invalid={!!errors.cabang}
            aria-describedby={errors.cabang ? "err-cabang" : undefined}
          >
            <option value="" disabled>
              Pilih cabang
            </option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} · {b.city}
              </option>
            ))}
          </select>
        </Field>
        <Field id="nama" label="Nama" error={errors.nama}>
          <input
            id="res-nama"
            className={`${input} ${border("nama")}`}
            value={values.nama}
            onChange={(e) => set("nama", e.target.value)}
            autoComplete="name"
            placeholder="Nama kamu"
            aria-invalid={!!errors.nama}
            aria-describedby={errors.nama ? "err-nama" : undefined}
          />
        </Field>
        <Field id="whatsapp" label="No. WhatsApp" error={errors.whatsapp}>
          <input
            id="res-whatsapp"
            type="tel"
            inputMode="tel"
            className={`${input} ${border("whatsapp")}`}
            value={values.whatsapp}
            onChange={(e) => set("whatsapp", e.target.value)}
            autoComplete="tel"
            placeholder="0812 3456 7890"
            aria-invalid={!!errors.whatsapp}
            aria-describedby={errors.whatsapp ? "err-whatsapp" : undefined}
          />
        </Field>
        <Field id="tanggal" label="Tanggal" error={errors.tanggal}>
          <input
            id="res-tanggal"
            type="date"
            min={todayIso()}
            className={`${input} ${border("tanggal")}`}
            value={values.tanggal}
            onChange={(e) => set("tanggal", e.target.value)}
            aria-invalid={!!errors.tanggal}
            aria-describedby={errors.tanggal ? "err-tanggal" : undefined}
          />
        </Field>
        <Field id="jam" label="Jam" error={errors.jam}>
          <input
            id="res-jam"
            type="time"
            step={900}
            className={`${input} ${border("jam")}`}
            value={values.jam}
            onChange={(e) => set("jam", e.target.value)}
            aria-invalid={!!errors.jam}
            aria-describedby={errors.jam ? "err-jam" : undefined}
          />
        </Field>
        <Field id="jumlah" label="Jumlah orang" error={errors.jumlah}>
          <input
            id="res-jumlah"
            type="number"
            inputMode="numeric"
            min={1}
            max={60}
            className={`${input} ${border("jumlah")}`}
            value={values.jumlah}
            onChange={(e) => set("jumlah", e.target.value)}
            aria-invalid={!!errors.jumlah}
            aria-describedby={errors.jumlah ? "err-jumlah" : undefined}
          />
        </Field>
        <AreaPicker value={values.area} onChange={(a) => set("area", a)} />
        <Field id="catatan" label="Catatan (opsional)" className="sm:col-span-2">
          <textarea
            id="res-catatan"
            rows={3}
            className={`${input} border-line-input py-3`}
            value={values.catatan}
            onChange={(e) => set("catatan", e.target.value)}
            placeholder="Mis. ulang tahun, dekat panggung DJ, butuh kursi bayi"
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-accent px-7 text-[15px] font-bold text-accent-on transition-colors hover:bg-accent-hover"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Kirim via WhatsApp
      </button>
      <p className="mt-3 text-center text-[13px] text-ink-muted">
        Admin akan konfirmasi ketersediaan meja lewat WhatsApp.
      </p>
    </form>
  );
}

const chevron = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#C9C1B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
)}")`;

function Field({
  id,
  label,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={`res-${id}`} className="mb-2 block text-sm font-medium text-ink-soft">
        {label}
      </label>
      {children}
      {error && (
        <p id={`err-${id}`} className="mt-2 flex items-start gap-1.5 text-[13px] text-accent">
          <AlertCircle className="mt-px h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

function AreaPicker({ value, onChange }: { value: Reservation["area"]; onChange: (v: Reservation["area"]) => void }) {
  const name = useId();
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-medium text-ink-soft">Area</legend>
      <div className="grid grid-cols-2 gap-2">
        {(["Indoor", "Outdoor"] as const).map((a) => (
          <label
            key={a}
            className={`flex min-h-[48px] cursor-pointer items-center justify-center rounded-md border text-[15px] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
              value === a ? "border-ink bg-ink text-bg" : "border-line-input text-ink-soft hover:border-ink"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={a}
              checked={value === a}
              onChange={() => onChange(a)}
              className="sr-only"
            />
            {a}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
