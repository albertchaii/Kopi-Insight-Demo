type Props = {
  label: string;
  src?: string;
  alt?: string;
  className?: string;
  eager?: boolean;
  dim?: boolean;
  width?: number;
  height?: number;
};

/** Menampilkan foto bila `src` ada; jika belum, kotak placeholder bergaris diagonal. */
export function ImagePlaceholder({ label, src, alt, className = "", eager, dim, width = 600, height = 600 }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? label}
        width={width}
        height={height}
        decoding="async"
        loading={eager ? "eager" : "lazy"}
        className={`h-full w-full bg-placeholder object-cover ${dim ? "opacity-50" : ""} ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt ?? label}
      className={`flex h-full w-full items-center justify-center border border-dashed border-line-input bg-placeholder p-4 text-center ${
        dim ? "opacity-50" : ""
      } ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, transparent 0 14px, rgba(245,241,235,0.035) 14px 15px)",
      }}
    >
      <span className="text-[13px] font-medium text-[#9C948A]">{label}</span>
    </div>
  );
}
