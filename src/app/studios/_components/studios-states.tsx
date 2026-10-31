import { RotateCcwIcon, SearchXIcon, TriangleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudiosEmptyProps {
  /** True when the visitor applied at least one refinement. */
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

/** Shown when zero studios match the current search + filters. */
export function StudiosEmpty({
  hasActiveFilters,
  onClearFilters,
}: StudiosEmptyProps) {
  return (
    <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-muted text-muted-foreground">
        <SearchXIcon className="size-5" aria-hidden="true" />
      </span>
      <h2 className="mt-4 font-heading text-lg font-medium">
        {hasActiveFilters
          ? "No studios match your filters"
          : "No studios available yet"}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {hasActiveFilters
          ? "Try a wider price range or a smaller capacity — or clear the filters to see every space."
          : "New spaces are added every day. Check back soon, or list your own studio in the meantime."}
      </p>
      {hasActiveFilters ? (
        <Button
          type="button"
          variant="outline"
          onClick={onClearFilters}
          className="mt-6 gap-1.5 border-brand-border bg-transparent text-brand-fg hover:bg-brand-fg/10 hover:text-brand-fg dark:border-brand-border dark:bg-transparent dark:hover:bg-brand-fg/10"
        >
          <RotateCcwIcon aria-hidden="true" />
          Clear all filters
        </Button>
      ) : null}
    </div>
  );
}

interface StudiosLoadErrorProps {
  onRetry: () => void;
}

/** Shown when the catalogue arrives malformed or the request fails client-side. */
export function StudiosLoadError({ onRetry }: StudiosLoadErrorProps) {
  return (
    <div
      role="alert"
      className="mt-10 flex flex-col items-center rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-16 text-center"
    >
      <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlertIcon className="size-5" aria-hidden="true" />
      </span>
      <h2 className="mt-4 font-heading text-lg font-medium">
        We couldn&apos;t load the studios
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        Something went wrong while fetching the catalogue. Please try again in a
        moment.
      </p>
      <Button
        type="button"
        variant="outline"
        onClick={onRetry}
        className="mt-6 gap-1.5 border-brand-border bg-transparent text-brand-fg hover:bg-brand-fg/10 hover:text-brand-fg dark:border-brand-border dark:bg-transparent dark:hover:bg-brand-fg/10"
      >
        <RotateCcwIcon aria-hidden="true" />
        Try again
      </Button>
    </div>
  );
}
