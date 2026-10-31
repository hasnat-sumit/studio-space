import { format, parseISO } from "date-fns";
import { StarRating } from "@/components/shared/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import type { Studio } from "@/types/studio";
import type { StudioReview } from "@/types/review";

interface StudioReviewsProps {
  studio: Pick<Studio, "title" | "rating" | "reviewCount">;
  reviews: StudioReview[];
}

/** Rating summary plus the sample review cards. */
export function StudioReviews({ studio, reviews }: StudioReviewsProps) {
  return (
    <section
      aria-labelledby="reviews-heading"
      className="mt-14 border-t border-border pt-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2
            id="reviews-heading"
            className="font-heading text-2xl font-semibold tracking-tight"
          >
            Reviews
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            What creators said after booking {studio.title}.
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-border px-5 py-4">
          <p className="font-heading text-4xl leading-none font-semibold">
            {studio.rating.toFixed(1)}
          </p>
          <div>
            <StarRating rating={studio.rating} />
            <p className="mt-1.5 text-xs text-muted-foreground">
              {studio.reviewCount} reviews
            </p>
          </div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-border px-6 py-12 text-center text-sm text-muted-foreground">
          No written reviews yet — be the first once bookings open.
        </p>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  {review.authorAvatar ? (
                    <AvatarImage src={review.authorAvatar} alt="" />
                  ) : null}
                  <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                    {getInitials(review.authorName)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {review.authorName}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {review.projectType}
                  </p>
                </div>

                <p className="shrink-0 text-xs text-muted-foreground">
                  {format(parseISO(review.createdAt), "MMM yyyy")}
                </p>
              </div>

              <StarRating rating={review.rating} className="mt-4" />

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                {review.comment}
              </p>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 text-xs text-muted-foreground">
        Sample reviews from our mock dataset — live reviews arrive with the
        booking backend.
      </p>
    </section>
  );
}
