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
  /** Maximum people the space comfortably seats (drives the capacity filter). */
  capacity: number;
  /** One-line editorial summary shown on listing cards. */
  description: string;
  /** Long-form overview paragraphs for the details page. */
  overview: string[];
  /** Refundable security deposit in USD. */
  deposit: number;
  /** Amenity identifiers; labels/icons resolved via `src/lib/amenities.ts`. */
  amenities: StudioAmenityId[];
  /** Public host profile shown on the details page. */
  host: StudioHost;
  /** Gallery photos; the first entry doubles as the featured image. */
  gallery: StudioImage[];
  /** ISO date the listing went live — powers the "Newest" sort. */
  createdAt: string;
  image: string;
  imageAlt: string;
}

/** Sort orders offered on the Explore Studios page. */
export type StudioSort = "rating" | "price-asc" | "price-desc" | "newest";

/** One photo in a studio's gallery. */
export interface StudioImage {
  src: string;
  alt: string;
}

/**
 * Public host profile shown on studio pages.
 *
 * Deliberately limited to what a stranger may see — no email, phone, or
 * address is ever exposed here.
 */
export interface StudioHost {
  id: string;
  name: string;
  /** Optional photo URL; the UI falls back to an initials avatar. */
  avatar?: string;
  /** Short editorial line, e.g. "Producer & studio operator". */
  tagline: string;
  /** Service note, e.g. "Usually responds within an hour". */
  responseNote: string;
  /** Year the host joined StudioSpace. */
  joinedYear: number;
}

/**
 * Amenity identifiers stored on each studio (API-friendly strings).
 * Labels and icons are resolved in `src/lib/amenities.ts`.
 */
export type StudioAmenityId =
  | "gigabit-wifi"
  | "natural-light"
  | "cyclorama"
  | "blackout"
  | "makeup-stations"
  | "kitchenette"
  | "espresso-bar"
  | "parking"
  | "loading-dock"
  | "green-room"
  | "drum-kit"
  | "grand-piano"
  | "mixing-desk"
  | "mic-array"
  | "vocal-booth"
  | "acoustic-treatment"
  | "easels"
  | "kilns"
  | "clay-sink"
  | "step-free-access"
  | "climate-control"
  | "lockable-storage"
  | "garment-racks"
  | "prop-library"
  | "lounge-seating";

/** Hourly price bands offered by the Explore filters ("any" = no restriction). */
export type StudioPriceBand = "any" | "under-50" | "50-74" | "75-99" | "100-plus";

/** Minimum seating offered by the Explore filters ("any" = no restriction). */
export type StudioCapacityFilter = "any" | "6" | "8" | "12" | "20";

/**
 * A normalized Explore Studios query.
 *
 * Mirrors the `/studios` URL params (`q`, `category`, `price`, `capacity`,
 * `sort`). Every field is optional: an absent field means "no restriction",
 * and `sort` falls back to Highest Rated. The same shape can be sent to the
 * future Express API as-is.
 */
export interface StudioQuery {
  /** Free-text search across studio title and location. */
  q?: string;
  category?: StudioCategory;
  price?: StudioPriceBand;
  capacity?: StudioCapacityFilter;
  sort?: StudioSort;
}
