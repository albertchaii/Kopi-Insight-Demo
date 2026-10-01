import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Branch } from "../../lib/types";
import { StatusBadge } from "../ui/StatusBadge";

export function BranchCard({ branch, current }: { branch: Branch; current?: boolean }) {
  return (
    <article
      className={`relative flex flex-col rounded-lg bg-bg p-5 transition-colors ${
        current ? "border-2 border-accent" : "border border-line-strong hover:border-line-input"
      }`}
    >
      <div className="flex min-h-[22px] items-start justify-between gap-2">
        {current ? (
          <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-accent">Kamu di sini</span>
        ) : (
          <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-ink-muted">{branch.city}</span>
        )}
        <ArrowUpRight className="h-4 w-4 text-ink-muted" strokeWidth={1.8} aria-hidden="true" />
      </div>
      <h3 className="mt-6 text-lg font-bold">
        {/* Link menutupi seluruh kartu */}
        <Link to={`/${branch.id}`} aria-current={current ? "page" : undefined} className="after:absolute after:inset-0 after:rounded-lg">
          {branch.name}
        </Link>
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{branch.address}</p>
      <div className="mt-4">
        <StatusBadge hours={branch.hours} compact />
      </div>
      {branch.features?.length ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {branch.features.map((f) => (
            <li key={f} className="rounded-full border border-line-input px-2.5 py-1 text-[12px] text-ink-soft">
              {f}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
