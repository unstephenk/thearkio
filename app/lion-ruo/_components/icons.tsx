import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const shared = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...shared} {...props}>
      <path d="M12 3 4.5 6v5.8c0 4.4 2.9 7.8 7.5 9.2 4.6-1.4 7.5-4.8 7.5-9.2V6L12 3Z" />
      <path d="m8.7 12 2.1 2.1 4.6-4.7" />
    </svg>
  );
}

export function CertificateIcon(props: IconProps) {
  return (
    <svg {...shared} {...props}>
      <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
      <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
      <path d="m15.2 16.5 1.1 1.1 2-2.2" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...shared} {...props}>
      <path d="M12 2.8c.7 4.6 2.7 6.6 7.2 7.2-4.5.7-6.5 2.7-7.2 7.2-.7-4.5-2.7-6.5-7.2-7.2 4.5-.6 6.5-2.6 7.2-7.2Z" />
      <path d="M19 16.5c.2 1.6.9 2.3 2.5 2.5-1.6.3-2.3 1-2.5 2.6-.3-1.6-1-2.3-2.6-2.6 1.6-.2 2.3-.9 2.6-2.5Z" />
    </svg>
  );
}

export function FlaskIcon(props: IconProps) {
  return (
    <svg {...shared} {...props}>
      <path d="M9 3h6M10 3v5.2L5.8 17a2.7 2.7 0 0 0 2.4 4h7.6a2.7 2.7 0 0 0 2.4-4L14 8.2V3" />
      <path d="M8.4 15h7.2" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg {...shared} {...props}>
      <path d="M4 5h2l1.5 9h9.8l1.7-6.2H7" />
      <circle cx="9" cy="18" r="1" />
      <circle cx="17" cy="18" r="1" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...shared} {...props}>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...shared} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...shared} {...props}>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" />
    </svg>
  );
}
