import { ApertureIcon } from "lucide-react";

/** Branded loader shown while moving between routes. */
export default function Loading() {
  return (
    <div
      role="status"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4"
    >
      <span className="grid size-14 place-items-center rounded-2xl bg-brand-accent/15 text-brand-accent ring-1 ring-brand-accent/25">
        <ApertureIcon
          className="size-7 animate-spin motion-reduce:animate-none"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </span>
      <p className="text-sm text-muted-foreground">Loading StudioSpace…</p>
    </div>
  );
}
