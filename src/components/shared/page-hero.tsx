import Image from "next/image";
import type { ReactNode } from "react";
import { SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  /** Accent pill shown above the title. */
  eyebrow: string;
  /** H1 content — may wrap a phrase in a `<span className="text-brand-accent">`. */
  title: ReactNode;
  description: string;
  /** Optional supporting photography for the right column. */
  image?: { src: string; alt: string };
  className?: string;
}

/**
 * Shared editorial hero for the marketing pages (`/how-it-works`,
 * `/about`). Mirrors the homepage hero's two-column composition — copy on
 * the left, rounded photography on the right — so every page opens with the
 * same rhythm.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border bg-background",
        className
      )}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:pt-24 lg:pb-24">
        <div className="animate-in fade-in-50 fill-mode-both duration-700">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-accent/10 px-3 py-1 text-xs font-medium text-brand-accent">
            <SparklesIcon className="size-3.5" aria-hidden="true" />
            {eyebrow}
          </p>

          <h1 className="mt-6 font-heading text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            {description}
          </p>
        </div>

        {image ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-border animate-in fade-in-50 slide-in-from-bottom-4 fill-mode-both delay-200 duration-700">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
