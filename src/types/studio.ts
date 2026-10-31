/** Studio categories supported by the platform (matches the Explore filters). */
export type StudioCategory =
  | "photography"
  | "sound-stage"
  | "podcast"
  | "music"
  | "art";

export interface Studio {
  id: string;
  /** URL-safe identifier, e.g. `/studios/noir-photo-studio`. */
  slug: string;
  title: string;
  category: StudioCategory;
  /** Human-readable location, e.g. "Brooklyn, New York". */
  location: string;
  /** Price per hour in USD. */
  hourlyRate: number;
  /** Average rating, 0–5. */
  rating: number;
  reviewCount: number;
  image: string;
  imageAlt: string;
}
