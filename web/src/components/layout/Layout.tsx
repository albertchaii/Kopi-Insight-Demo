import { useEffect, useMemo } from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBottomBar } from "./MobileBottomBar";
import { BranchContext } from "../../lib/branch";
import { brand, getBranch } from "../../lib/data";

function useScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Tunggu render halaman sebelum scroll ke section.
    const id = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);
}

export function Layout() {
  useScrollToHash();
  const match = useMatch("/:slug/*");
  const branch = getBranch(match?.params.slug);
  const ctx = useMemo(() => ({ branch, base: branch ? `/${branch.id}` : "" }), [branch]);

  useEffect(() => {
    document.title = branch ? `${branch.name} · by ${brand.by}` : `${brand.name} · by ${brand.by}`;
  }, [branch]);

  return (
    <BranchContext.Provider value={ctx}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-on">
        Langsung ke konten
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomBar />
    </BranchContext.Provider>
  );
}
