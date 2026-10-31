import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaBandProps {
  /** Accent label shown above the title. */
  eyebrow: string;
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  className?: string;
}

/**
 * Closing call-to-action rendered as a charcoal band — the same treatment as
 * the homepage `HostCta`, so every page ends on the brand's darkest surface.
 * Both buttons are real links; point them at live routes only.
 */
export function CtaBand({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  className,
}: CtaBandProps) {
  return (
    <section className={cn("pb-20 sm:pb-24", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-charcoal px-6 py-14 text-center ring-1 ring-brand-border sm:px-12 sm:py-16">
          <p className="text-xs font-medium tracking-[0.2em] text-brand-accent uppercase">
            {eyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-cream text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream/70 text-pretty sm:text-lg">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={primary.href}
              className={cn(
                buttonVariants(),
                "h-11 gap-2 bg-brand-accent px-6 text-[15px] text-brand-on-accent shadow-sm hover:bg-brand-accent/90 hover:text-brand-on-accent focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/30"
              )}
            >
              {primary.label}
              <ArrowRightIcon aria-hidden="true" />
            </Link>
            <Link
              href={secondary.href}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 border-cream/25 bg-transparent px-6 text-[15px] text-cream hover:border-cream/40 hover:bg-cream/10 hover:text-cream dark:border-cream/25 dark:bg-transparent dark:hover:bg-cream/10"
              )}
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
