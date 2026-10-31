import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  /** Average or per-review rating, 0–5. */
  rating: number;
  /** Appended to each star for fine-grained styling. */
  iconClassName?: string;
  /** Renders the numeric value after the stars. */
  showValue?: boolean;
  className?: string;
}

/**
 * Read-only star display used by reviews and listing metadata.
 * Filled stars follow the rounded rating; the group carries the exact
 * value in its accessible label.
 */
export function StarRating({
  rating,
  iconClassName,
  showValue = false,
  className,
}: StarRatingProps) {
  const filled = Math.round(rating);

  return (
    <span
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon
          key={index}
          aria-hidden="true"
          className={cn(
            "size-3.5",
            index < filled
              ? "fill-current text-brand-accent"
              : "text-muted-foreground/40",
            iconClassName
          )}
        />
      ))}
      {showValue ? (
        <span className="ml-1.5 font-medium text-foreground">
          {rating.toFixed(1)}
        </span>
      ) : null}
    </span>
  );
}
