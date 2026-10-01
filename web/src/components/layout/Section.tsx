import type { ReactNode } from "react";
import { Container } from "./Container";

type Props = { id?: string; alt?: boolean; children: ReactNode; className?: string };

export function Section({ id, alt, children, className = "" }: Props) {
  return (
    <section id={id} className={`py-8 sm:py-14 lg:py-[88px] ${alt ? "bg-bg-alt" : "bg-bg"} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="h2">{title}</h2>
        {lead && <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">{lead}</p>}
      </div>
      {action}
    </div>
  );
}
