import clsx from "clsx";

export function SectionLabel({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2.5 font-oswald text-xs font-semibold uppercase tracking-[0.22em]",
        light ? "text-teal" : "text-teal-800",
        className,
      )}
    >
      <span className={clsx("h-px w-7", light ? "bg-teal" : "bg-teal-600")} />
      {children}
    </span>
  );
}
