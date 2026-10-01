import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { brand, branches } from "../../lib/data";
import { useBranch } from "../../lib/branch";
import { InstagramIcon } from "../ui/BrandIcons";

export function Footer() {
  const { branch, grabfood } = useBranch();
  const links = [
    { label: "Instagram", href: branch?.instagram ?? brand.instagram },
    { label: "Threads", href: brand.threads },
    grabfood ? { label: "GrabFood", href: grabfood } : null,
  ].filter((l) => l !== null);

  return (
    <footer className="border-t border-line bg-bg pb-[120px] pt-10 sm:pb-12">
      <div className="mx-auto grid max-w-container gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_auto_auto] lg:gap-16">
        <div>
          <Logo />
          {branch && <p className="mt-4 max-w-sm text-[13px] text-ink-muted">{branch.address}</p>}
        </div>
        <div>
          <p className="mb-3 text-[12px] font-bold uppercase tracking-[1.5px] text-ink-muted">Cabang</p>
          <ul className="grid grid-cols-2 gap-x-8 lg:grid-cols-1">
            {branches.map((b) => (
              <li key={b.id}>
                <Link to={`/${b.id}`} className="inline-flex min-h-[36px] items-center text-[15px] text-ink-soft hover:text-ink">
                  {b.area}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-[12px] font-bold uppercase tracking-[1.5px] text-ink-muted">Ikuti kami</p>
          <ul>
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center gap-2 text-[15px] text-ink-soft hover:text-ink"
                >
                  {l.label === "Instagram" && <InstagramIcon className="h-4 w-4" />}
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/karier" className="inline-flex min-h-[36px] items-center text-[15px] text-ink-soft hover:text-ink">
                Karier
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-container px-5 text-[13px] text-ink-muted sm:px-8">
        © {new Date().getFullYear()} {brand.name} by {brand.by}
      </p>
    </footer>
  );
}
