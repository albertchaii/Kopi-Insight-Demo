import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { Hero } from "../sections/Hero";
import { InfoStrip } from "../sections/InfoStrip";
import { Promo } from "../sections/Promo";
import { MenuPreview } from "../sections/MenuPreview";
import { FullMenu } from "../sections/FullMenu";
import { Events } from "../sections/Events";
import { Reservation } from "../sections/Reservation";
import { Location } from "../sections/Location";
import { Branches } from "../sections/Branches";
import { Careers } from "../sections/Careers";
import { NotFound } from "./NotFound";
import { useBranch } from "../lib/branch";

/** Dipakai untuk "/" (halaman brand, semua cabang) dan "/:slug" (halaman satu cabang). */
export function Home() {
  const { slug } = useParams();
  const { branch } = useBranch();
  if (slug && !branch) return <NotFound />;

  return (
    // key: reset state (tab menu, form) saat pindah cabang
    <Fragment key={branch?.id ?? "all"}>
      <Hero />
      <InfoStrip />
      {!branch && <Branches />}
      <Promo />
      <MenuPreview />
      <FullMenu />
      <Events />
      <Reservation />
      {branch && <Location branch={branch} />}
      {branch && <Branches />}
      <Careers />
    </Fragment>
  );
}
