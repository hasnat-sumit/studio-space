import Link from "next/link";
import { ArrowRightIcon, InboxIcon, TriangleAlertIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeaturedStudiosEmptyProps {
  source: "api" | "mock";
}

/** Shown when the backend responds with zero studios. */
export function FeaturedStudiosEmpty({ source }: FeaturedStudiosEmptyProps) {
  return (
    <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-14 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-muted text-muted-foreground">
        <InboxIcon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-heading text-lg font-medium">
        No featured studios yet
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {source === "mock"
          ? "The mock catalogue is empty. Restore the sample listings in src/lib/mock/studios.ts."
          : "New spaces are added every day — browse the full marketplace or list your own."}
      </p>
      <Link
        href="/studios"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "mt-6 gap-1.5 border-brand-border bg-transparent text-brand-fg hover:bg-brand-fg/10 hover:text-brand-fg dark:border-brand-border dark:bg-transparent dark:hover:bg-brand-fg/10"
        )}
      >
        Browse all studios
        <ArrowRightIcon aria-hidden="true" />
      </Link>
    </div>
  );
}

/** Defensive fallback if the featured request fails in an unexpected way. */
export function FeaturedStudiosError() {
  return (
    <div className="mt-10 flex flex-col items-center rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-14 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlertIcon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-heading text-lg font-medium">
        We couldn&apos;t load featured studios
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        Something went wrong while fetching the latest listings. Please try
        again in a moment.
      </p>
      <Link
        href="/studios"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "mt-6 gap-1.5 border-brand-border bg-transparent text-brand-fg hover:bg-brand-fg/10 hover:text-brand-fg dark:border-brand-border dark:bg-transparent dark:hover:bg-brand-fg/10"
        )}
      >
        Browse all studios
        <ArrowRightIcon aria-hidden="true" />
      </Link>
    </div>
  );
}
