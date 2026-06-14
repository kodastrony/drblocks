import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "@/components/Icons";

type Variant = "primary" | "accent" | "outline" | "ghost" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-ink shadow-[0_10px_30px_-12px_rgba(15,23,42,0.5)]",
  accent: "bg-teal text-white hover:bg-teal-600 shadow-[0_10px_30px_-12px_rgba(45,189,176,0.7)]",
  outline: "border border-line-strong text-navy hover:border-navy hover:bg-navy hover:text-white",
  ghost: "text-navy hover:text-teal-700",
  light: "bg-white text-navy hover:bg-mist",
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
  arrow = false,
  size = "md",
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  arrow?: boolean;
  size?: "md" | "lg";
}) {
  const cls = clsx(
    "group inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 ease-out active:scale-[0.98]",
    size === "lg" ? "px-7 py-4 text-[15px]" : "px-6 py-3.5 text-sm",
    variants[variant],
    className,
  );
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </>
  );
  const external = /^(tel:|mailto:|http)/.test(href);
  if (external) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
