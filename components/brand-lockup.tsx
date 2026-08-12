type BrandLockupProps = {
  className?: string;
  markOnly?: boolean;
  tone?: "light" | "dark" | "gold";
};

const marks = {
  light: "/brand/ark-mark-light.svg",
  dark: "/brand/ark-mark-dark.svg",
  gold: "/brand/ark-mark-gold.svg",
} as const;

export function BrandLockup({ className = "", markOnly = false, tone = "light" }: BrandLockupProps) {
  return (
    <span className={`brand-lockup ${className}`.trim()}>
      <img
        className="brand-mark"
        src={marks[tone]}
        width="28"
        height="28"
        alt=""
        aria-hidden="true"
      />
      {!markOnly && <span className="brand-wordmark">The Ark</span>}
    </span>
  );
}
