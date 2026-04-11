import Link from "next/link";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "lg";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-brand text-white hover:bg-brand-dark hover:shadow-[0_0_24px_rgba(57,143,255,0.25)]",
  secondary: "bg-surface-card text-white hover:bg-surface-card-hover",
  outline:
    "border border-border text-white hover:border-border-hover hover:bg-surface-card",
  ghost: "text-text-muted hover:text-white",
} as const;

const sizes = {
  default: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
} as const;

export function Button({
  href,
  variant = "primary",
  size = "default",
  children,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
