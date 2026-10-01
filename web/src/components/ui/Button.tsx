import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "outline" | "light" | "link";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm sm:text-[15px] transition-colors duration-150 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-on font-bold hover:bg-accent-hover",
  outline: "border border-ink text-ink font-semibold hover:bg-ink hover:text-bg",
  light: "bg-ink text-bg font-bold hover:bg-ink-soft",
  link: "text-accent font-semibold hover:text-accent-hover !px-0 !min-h-0",
};

const sizes: Record<Size, string> = {
  md: "min-h-[44px] px-[22px] py-3",
  lg: "min-h-[52px] px-7 py-4",
};

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };
type AsLink = Common & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function buttonClass(variant: Variant = "primary", size: Size = "md", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const cls = buttonClass(variant, size, className);
  const content = (
    <>
      {children}
      {variant === "link" && <span aria-hidden="true">→</span>}
    </>
  );

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    if (href.startsWith("/")) {
      return (
        <Link to={href} className={cls} {...rest}>
          {content}
        </Link>
      );
    }
    const external = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {content}
      </a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  );
}

export function IconButton({
  label,
  className = "",
  children,
  href,
  ...rest
}: { label: string; href?: string; children: ReactNode } & ComponentPropsWithoutRef<"button">) {
  const cls = `inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-line-input text-ink transition-colors hover:border-ink ${className}`;
  if (href) {
    return (
      <a href={href} aria-label={label} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <button type="button" aria-label={label} className={cls} {...rest}>
      {children}
    </button>
  );
}
