import type { DayHours } from "./types";

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const formatTime = (hhmm: string) => hhmm.replace(":", ".");

export type OpenStatus = { open: boolean; label: string };

export function getOpenStatus(hours: DayHours[], now = new Date()): OpenStatus {
  const today = hours[now.getDay()];
  const minutes = now.getHours() * 60 + now.getMinutes();
  const open = toMinutes(today.open);
  const close = toMinutes(today.close);

  if (minutes >= open && minutes < close) {
    return { open: true, label: `Buka hari ini · sampai ${formatTime(today.close)}` };
  }
  if (minutes < open) {
    return { open: false, label: `Tutup · buka ${formatTime(today.open)}` };
  }
  const tomorrow = hours[(now.getDay() + 1) % 7];
  return { open: false, label: `Tutup · buka besok ${formatTime(tomorrow.open)}` };
}

/** Ringkasan jam, mis. "Sen–Kam 10.00–23.00 · Jum–Min 10.00–24.00". */
export function hoursSummary(hours: DayHours[]) {
  const order = [1, 2, 3, 4, 5, 6, 0].map((i) => hours[i]);
  const groups: { from: string; to: string; range: string }[] = [];
  for (const h of order) {
    const range = `${formatTime(h.open)}–${formatTime(h.close)}`;
    const last = groups[groups.length - 1];
    if (last && last.range === range) last.to = h.day;
    else groups.push({ from: h.day, to: h.day, range });
  }
  const short = (d: string) => d.slice(0, 3);
  return groups.map((g) => ({
    days: g.from === g.to ? g.from : `${short(g.from)}–${short(g.to)}`,
    range: g.range,
  }));
}

export const isWithinHours = (hours: DayHours[], isoDate: string, hhmm: string) => {
  const h = hours[new Date(`${isoDate}T00:00:00`).getDay()];
  return { ok: hhmm >= h.open && hhmm < h.close, hours: h };
};
