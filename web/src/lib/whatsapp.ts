export type Reservation = {
  cabang: string;
  nama: string;
  whatsapp: string;
  tanggal: string;
  jam: string;
  jumlah: string;
  area: "Indoor" | "Outdoor";
  catatan: string;
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export function buildReservationMessage(r: Reservation, branchName: string) {
  return [
    `Halo ${branchName}, saya mau reservasi:`,
    `Nama: ${r.nama}`,
    `No. WhatsApp: ${r.whatsapp}`,
    `Tanggal: ${formatDate(r.tanggal)}, jam ${r.jam.replace(":", ".")}`,
    `Jumlah: ${r.jumlah} orang (${r.area})`,
    `Catatan: ${r.catatan.trim() || "-"}`,
  ].join("\n");
}

export const waLink = (number: string, text?: string) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
