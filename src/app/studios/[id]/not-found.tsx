import Link from "next/link";
import { SearchXIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Shown when `getStudio()` can't resolve the requested id or slug — the page
 * calls `notFound()`, and Next renders this route-level boundary.
 */
export default function StudioNotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <span className="mx-auto grid size-12 place-items-center rounded-full bg-brand-accent/10 text-brand-accent">
        <SearchXIcon className="size-5" aria-hidden="true" />
      </span>
      <p className="mt-5 text-xs font-medium tracking-[0.25em] text-brand-accent uppercase">
        404
      </p>
      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance">
        We couldn&apos;t find that studio
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
        The listing may have been removed, or the link may be out of date.
        Plenty of creative spaces are still waiting on the Explore page.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/studios"
          className={cn(
            buttonVariants({ variant: "default" }),
            "h-11 bg-brand-accent px-6 text-[15px] text-brand-on-accent shadow-sm hover:bg-brand-accent/90 hover:text-brand-on-accent focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/30"
          )}
        >
          Explore all studios
        </Link>
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
    </div>
  );
}
