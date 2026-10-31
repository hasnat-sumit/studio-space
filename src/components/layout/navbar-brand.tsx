import Link from "next/link";
import { ApertureIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarBrandProps {
  href?: string;
  className?: string;
}

export function NavbarBrand({ href = "/", className }: NavbarBrandProps) {
  return (
    <Link
      href={href}
      aria-label="StudioSpace — home"
      className={cn(
        "group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-brand-accent/40",
        className
      )}
    >
      <span className="grid size-8 place-items-center rounded-[10px] bg-brand-accent/15 text-brand-accent ring-1 ring-brand-accent/25 transition-transform duration-200 group-hover:scale-105">
        <ApertureIcon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="font-heading text-[17px] leading-none tracking-tight">
        <span className="font-semibold text-brand-fg">Studio</span>
        <span className="font-medium text-brand-accent">Space</span>
      </span>
    </Link>
  );
}
