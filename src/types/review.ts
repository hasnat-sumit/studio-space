/** A written review left on a studio. */
export interface StudioReview {
  id: string;
  /** Slug of the studio this review belongs to. */
  studioSlug: string;
  /** Absent on mock data. Lets authors find their own review to delete it. */
  authorId?: string;
  authorName: string;
  /** Optional avatar URL; the UI falls back to an initials avatar. */
  authorAvatar?: string;
  /** Rating given by the reviewer, 1–5. */
  rating: number;
  comment: string;
  /** What they worked on, e.g. "Editorial portrait shoot". */
  projectType: string;
  /** ISO date of the booking. */
  createdAt: string;
}
