import Link from "next/link";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "lg";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants = {
  primary: "bg-cta text-white hover:bg-cta-hover",
  secondary: "bg-surface-card text-text-primary hover:bg-surface-light",
  outline: "border border-text-muted text-text-primary hover:border-brand",
} as const;

const sizes = {
  default: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
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
  const classes = `inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

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
