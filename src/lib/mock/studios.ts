import { unsplash } from "@/lib/images";
import type { Studio } from "@/types/studio";

/**
 * Temporary stand-in for the backend's "highest rated studios" response.
 *
 * This is the only place mock studio data lives — components never hardcode
 * listings. When `NEXT_PUBLIC_API_URL` is configured and the API responds,
 * this file is bypassed entirely (see `src/lib/api/studios.ts`).
 */
export const MOCK_STUDIOS: readonly Studio[] = [
  {
    id: "studio_001",
    slug: "noir-photo-studio",
    title: "Noir Photo Studio",
    category: "photography",
    location: "Brooklyn, New York",
    hourlyRate: 85,
    rating: 4.9,
    reviewCount: 126,
    image: unsplash("photo-1516035069371-29a1b244cc32", 900),
    imageAlt:
      "Camera body and prime lenses arranged on a dark studio surface",
  },
  {
    id: "studio_002",
    slug: "blackbird-sound-stage",
    title: "Blackbird Sound Stage",
    category: "sound-stage",
    location: "Atlanta, Georgia",
    hourlyRate: 140,
    rating: 4.9,
    reviewCount: 84,
    image: unsplash("photo-1514306191717-452ec28c7814", 900),
    imageAlt:
      "Deep red stage curtain drawn across a theatre sound stage",
  },
  {
    id: "studio_003",
    slug: "analog-music-loft",
    title: "Analog Music Loft",
    category: "music",
    location: "Nashville, Tennessee",
    hourlyRate: 65,
    rating: 4.9,
    reviewCount: 203,
    image: unsplash("photo-1598488035139-bdbb2231ce04", 900),
    imageAlt:
      "Warm recording loft with electric guitars mounted above a mixing desk",
  },
  {
    id: "studio_004",
    slug: "the-frequency-room",
    title: "The Frequency Room",
    category: "podcast",
    location: "Austin, Texas",
    hourlyRate: 45,
    rating: 4.8,
    reviewCount: 97,
    image: unsplash("photo-1581368135153-a506cf13b1e1", 900),
    imageAlt:
      "Host in headphones speaking into a boom-arm microphone at a podcast desk",
  },
  {
    id: "studio_005",
    slug: "atelier-nord",
    title: "Atelier Nord",
    category: "art",
    location: "Portland, Oregon",
    hourlyRate: 55,
    rating: 4.8,
    reviewCount: 61,
    image: unsplash("photo-1572947650440-e8a97ef053b2", 900),
    imageAlt:
      "Moody gallery-style art workshop with framed works under track lighting",
  },
  {
    id: "studio_006",
    slug: "ember-vocal-suite",
    title: "Ember Vocal Suite",
    category: "music",
    location: "Denver, Colorado",
    hourlyRate: 70,
    rating: 4.7,
    reviewCount: 148,
    image: unsplash("photo-1478737270239-2f02b77fc618", 900),
    imageAlt:
      "Studio condenser microphone on a shock mount in a darkened vocal booth",
  },
];

/** Highest-rated first, matching what the backend endpoint promises. */
export function mockFeaturedStudios(limit = 6): Studio[] {
  return [...MOCK_STUDIOS]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, limit);
}
