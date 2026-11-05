import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Page Not Found - StudioSpace" };

/** A spotlight shining on an empty stool and a camera on a tripod: nobody's on set. */
function EmptyStudioIllustration() {
  return (
    <svg
      viewBox="0 0 320 220"
      className="mx-auto w-full max-w-sm"
      fill="none"
      aria-hidden="true"
    >
      {/* Spotlight and its beam */}
      <path d="M122 34 62 190h116L150 34z" className="fill-brand-accent/15" />
      <rect x="116" y="14" width="40" height="22" rx="5" className="fill-brand-accent" />
      <path d="M136 0v14" className="stroke-foreground/40" strokeWidth="3" />

      {/* Floor */}
      <ellipse cx="120" cy="192" rx="66" ry="10" className="fill-brand-accent/25" />
      <path d="M16 202h288" className="stroke-foreground/30" strokeWidth="3" strokeLinecap="round" />

      {/* Empty stool */}
      <rect x="96" y="134" width="48" height="8" rx="4" className="fill-foreground/70" />
      <path
        d="m106 142-8 50M134 142l8 50M101 170h38"
        className="stroke-foreground/70"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Camera on a tripod */}
      <rect x="226" y="86" width="56" height="36" rx="6" className="fill-foreground/70" />
      <rect x="202" y="94" width="26" height="20" rx="3" className="fill-foreground/50" />
      <circle cx="262" cy="104" r="10" className="fill-background" />
      <circle cx="262" cy="104" r="5" className="fill-brand-accent" />
      <path
        d="M254 122v30m0 0-20 48m20-48 20 48m-20-48v48"
        className="stroke-foreground/70"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
      <EmptyStudioIllustration />
      <p className="mt-8 text-xs font-medium tracking-[0.25em] text-brand-accent uppercase">
        404
      </p>
      <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance">
        This set is empty
      </h1>
      <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">
        The page you&apos;re looking for has moved or never existed.
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants(),
          "mt-8 h-11 bg-brand-accent px-6 text-[15px] text-brand-on-accent shadow-sm hover:bg-brand-accent/90 hover:text-brand-on-accent focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/30"
        )}
      >
        Return to Home
      </Link>
    </div>
  );
}
