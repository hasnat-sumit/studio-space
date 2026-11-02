"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2Icon, StarIcon } from "lucide-react";
import { toast } from "sonner";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { createReview } from "@/lib/api/account";
import { ApiError } from "@/lib/api/client";
import { cn } from "@/lib/utils";

const RATINGS = [1, 2, 3, 4, 5];

interface ReviewFormProps {
  studioSlug: string;
  hostId: string;
  /** Authors who have already reviewed this studio. */
  reviewerIds: string[];
}

/** Eligibility lives on the API: reviews require a completed booking at this studio. */
export function ReviewForm({ studioSlug, hostId, reviewerIds }: ReviewFormProps) {
  const router = useRouter();
  const { user, isPending } = useAuth();
  const [rating, setRating] = useState(0);
  const [projectType, setProjectType] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);

  if (isPending || user?.id === hostId) return null;
  // One review per studio: the author deletes theirs to write a new one.
  if (user && reviewerIds.includes(user.id)) return null;

  if (!user) {
    return (
      <p className="mt-8 text-sm text-muted-foreground">
        <Link
          href={`/login?next=${encodeURIComponent(`/studios/${studioSlug}#reviews`)}`}
          className="font-medium text-brand-accent hover:underline"
        >
          Sign in
        </Link>{" "}
        to review this studio after your booking.
      </p>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};
    if (rating === 0) nextErrors.rating = "Choose a star rating.";
    if (projectType.trim().length < 2) nextErrors.projectType = "Tell us what you worked on.";
    if (comment.trim().length < 10) nextErrors.comment = "Reviews must be at least 10 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await createReview(studioSlug, {
        rating,
        projectType: projectType.trim(),
        comment: comment.trim(),
      });
      toast.success("Thanks for your review");
      setRating(0);
      setProjectType("");
      setComment("");
      router.refresh();
    } catch (cause) {
      toast.error("Couldn't post your review", {
        description: cause instanceof ApiError ? cause.message : "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      noValidate
      className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6"
    >
      <h3 className="font-heading text-lg font-medium">Leave a review</h3>

      <div>
        <div role="group" aria-label="Star rating" className="flex gap-1">
          {RATINGS.map((value) => (
            <button
              key={value}
              type="button"
              aria-label={`${value} star${value === 1 ? "" : "s"}`}
              aria-pressed={rating === value}
              onClick={() => setRating(value)}
              className="rounded p-0.5 outline-none focus-visible:ring-3 focus-visible:ring-brand-accent/40"
            >
              <StarIcon
                aria-hidden="true"
                className={cn(
                  "size-6",
                  value <= rating
                    ? "fill-brand-accent text-brand-accent"
                    : "text-muted-foreground"
                )}
              />
            </button>
          ))}
        </div>
        {errors.rating ? (
          <p className="mt-2 text-sm text-destructive">{errors.rating}</p>
        ) : null}
      </div>

      <FormField id="review-project" label="What did you work on?" error={errors.projectType}>
        <Input
          id="review-project"
          value={projectType}
          maxLength={80}
          onChange={(e) => setProjectType(e.target.value)}
          aria-invalid={errors.projectType ? true : undefined}
          aria-describedby={errors.projectType ? "review-project-error" : undefined}
          placeholder="Editorial portrait shoot"
          className="h-10"
        />
      </FormField>

      <FormField id="review-comment" label="Your review" error={errors.comment}>
        <Textarea
          id="review-comment"
          rows={3}
          maxLength={1000}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          aria-invalid={errors.comment ? true : undefined}
          aria-describedby={errors.comment ? "review-comment-error" : undefined}
        />
      </FormField>

      <Button
        type="submit"
        disabled={submitting}
        className="h-10 w-fit gap-2 bg-brand-accent px-5 text-brand-on-accent shadow-sm hover:bg-brand-accent/90 hover:text-brand-on-accent"
      >
        {submitting ? <Loader2Icon className="animate-spin" aria-hidden="true" /> : null}
        Post review
      </Button>
    </form>
  );
}
