import brandJson from "../data/brand.json";
import menuJson from "../data/menu.json";
import promosJson from "../data/promos.json";
import eventsJson from "../data/events.json";
import branchesJson from "../data/branches.json";
import careersJson from "../data/careers.json";
import type { Branch, Career, EventItem, MenuCategory, MenuItem, Promo } from "./types";

export const brand = brandJson;

/** Cabang tanpa `hours` memakai `brand.defaultHours`. */
export const branches: Branch[] = (branchesJson as (Omit<Branch, "hours"> & { hours?: Branch["hours"] })[]).map(
  (b) => ({ ...b, hours: b.hours ?? brand.defaultHours }),
);
export const getBranch = (id?: string) => branches.find((b) => b.id === id) ?? null;

const menuAll = menuJson as MenuItem[];
const promosAll = promosJson as Promo[];
const eventsAll = eventsJson as EventItem[];
export const careers = careersJson as Career[];

/** Item tanpa `branches` berlaku di semua cabang. Tanpa cabang aktif (halaman brand) semua item tampil. */
const availableAt = (branchId?: string) => (x: { branches?: string[] }) =>
  !branchId || !x.branches?.length || x.branches.includes(branchId);

export const branchNames = (ids?: string[]) =>
  ids?.length ? ids.map((id) => getBranch(id)?.area ?? id).join(", ") : null;

export const categories: { id: MenuCategory; label: string }[] = [
  { id: "kopi", label: "Kopi" },
  { id: "non-kopi", label: "Non-kopi" },
  { id: "makanan", label: "Makanan" },
  { id: "snack", label: "Snack" },
];

const today = () => new Date().toISOString().slice(0, 10);

export const menuFor = (branchId?: string) => menuAll.filter(availableAt(branchId));

/** Promo yang sudah lewat tanggal berakhir tidak dirender. */
export const activePromos = (branchId?: string) => {
  const t = today();
  return promosAll.filter((p) => p.startsAt <= t && p.endsAt >= t).filter(availableAt(branchId));
};

export const upcomingEvents = (branchId?: string) => {
  const t = today();
  return eventsAll
    .filter((e) => e.date >= t)
    .filter(availableAt(branchId))
    .sort((a, b) => a.date.localeCompare(b.date));
};

export const formatPrice = (n: number) => `Rp${(n / 1000).toLocaleString("id-ID")}rb`;
