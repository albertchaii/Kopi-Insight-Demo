import { Bike, Clock, MapPin, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "../components/layout/Container";
import { formatTime, hoursSummary } from "../lib/openingHours";
import { brand, branches } from "../lib/data";
import { useBranch } from "../lib/branch";

type Item = { icon: LucideIcon; label: string; value: string; href?: string };

export function InfoStrip() {
  const { branch, grabfood, to } = useBranch();

  const items: Item[] = branch
    ? [
        {
          icon: Clock,
          label: "Jam buka",
          value: hoursSummary(branch.hours)
            .map((h) => `${h.days} ${h.range}`)
            .join(" · "),
        },
        { icon: MapPin, label: "Lokasi", value: `${branch.area}, ${branch.city}`, href: to("#lokasi") },
        grabfood
          ? { icon: Bike, label: "Delivery", value: "Pesan antar lewat GrabFood", href: grabfood }
          : { icon: Bike, label: "Delivery", value: "Belum tersedia di cabang ini" },
      ]
    : [
        {
          icon: Store,
          label: `${branches.length} cabang`,
          value: branches.map((b) => b.area).join(" · "),
          href: to("#cabang"),
        },
        {
          icon: Clock,
          label: "Jam buka",
          value: `Setiap hari, mulai ${formatTime(
            branches.flatMap((b) => b.hours.map((h) => h.open)).sort()[0] ?? brand.defaultHours[0].open,
          )}`,
        },
        { icon: Bike, label: "Delivery", value: "Pesan antar lewat GrabFood", href: brand.grabfood },
      ];

  return (
    <div className="border-y border-line bg-bg">
      <Container>
        <ul className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {items.map(({ icon: Icon, label, value, href }) => {
            const body = (
              <>
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.8} aria-hidden="true" />
                <span>
                  <span className="block text-[13px] text-ink-muted">{label}</span>
                  <span className="mt-0.5 block text-[15px] font-medium">{value}</span>
                </span>
              </>
            );
            const cls = "flex gap-3 py-5 sm:px-6 sm:first:pl-0 sm:last:pr-0";
            return (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    className={`${cls} transition-colors hover:text-accent-hover`}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
