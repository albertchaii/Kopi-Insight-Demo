import { createContext, useContext } from "react";
import type { Branch } from "./types";
import { brand } from "./data";

type BranchCtx = {
  /** Cabang aktif, atau null di halaman brand (semua cabang). */
  branch: Branch | null;
  /** Prefix URL: "/soreang" atau "" di halaman brand. */
  base: string;
};

export const BranchContext = createContext<BranchCtx>({ branch: null, base: "" });

export function useBranch() {
  const ctx = useContext(BranchContext);
  const { branch } = ctx;
  return {
    ...ctx,
    /** Nama yang dipakai di copy, mis. "Soreang" atau "Bandung Raya". */
    place: branch?.area ?? brand.region,
    whatsapp: branch?.whatsapp ?? brand.whatsapp,
    grabfood: branch ? branch.grabfood : brand.grabfood,
    displayName: branch?.name ?? brand.name,
    /** Link ke section di halaman aktif, mis. to("#menu") → "/soreang#menu". */
    to: (hash: string) => `${ctx.base || "/"}${hash}`,
  };
}
