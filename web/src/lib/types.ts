export type MenuCategory = "kopi" | "non-kopi" | "makanan" | "snack";

/** `branches` kosong/tidak diisi = berlaku di semua cabang. */
type BranchScoped = { branches?: string[] };

export type MenuItem = BranchScoped & {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  image: string;
  tags?: ("best-seller" | "baru")[];
  soldOut?: boolean;
  desc?: string;
};

export type Promo = BranchScoped & {
  id: string;
  label?: string;
  title: string;
  subtitle: string;
  startsAt: string;
  endsAt: string;
  featured?: boolean;
  terms?: string;
};

export type EventItem = BranchScoped & { id: string; name: string; date: string; time: string; image?: string };

export type DayHours = { day: string; open: string; close: string };

export type Branch = {
  id: string;
  name: string;
  area: string;
  city: string;
  address: string;
  mapsUrl: string;
  mapsEmbed?: string;
  whatsapp: string;
  grabfood?: string;
  instagram?: string;
  parking?: string;
  features?: string[];
  hours: DayHours[];
  heroImage?: string;
  /** [teks, teks berwarna aksen, teks]; "{lokasi}" diganti nama area. */
  heroTitle?: [string, string, string];
  heroLead?: string;
};

export type Career = BranchScoped & { id: string; title: string; type: string; desc: string };
