"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcwIcon, TriangleAlertIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Error boundary for the `/studios` segment. Next 16 hands the boundary a
 * `retry()` prop that re-renders the segment (formerly `reset()`).
 */
export default function StudiosError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <span className="mx-auto grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlertIcon className="size-5" aria-hidden="true" />
      </span>
      <h1 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-balance">
        We couldn&apos;t load the studios
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
        Something went wrong while fetching the catalogue. Retrying usually
        fixes it — if it doesn&apos;t, the backend may be taking a break.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          onClick={retry}
          className="h-11 gap-2 bg-brand-accent px-6 text-[15px] text-brand-on-accent shadow-sm hover:bg-brand-accent/90 hover:text-brand-on-accent focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/30"
        >
          <RotateCcwIcon aria-hidden="true" />
          Try again
        </Button>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-11 border-brand-border bg-transparent px-6 text-[15px] text-brand-fg hover:bg-brand-fg/10 hover:text-brand-fg dark:border-brand-border dark:bg-transparent dark:hover:bg-brand-fg/10"
          )}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
