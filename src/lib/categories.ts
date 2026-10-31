import {
  CameraIcon,
  ClapperboardIcon,
  HeadphonesIcon,
  MicIcon,
  PaletteIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { unsplash } from "@/lib/images";
import type { StudioCategory } from "@/types/studio";

export interface StudioCategoryConfig {
  slug: StudioCategory;
  name: string;
  description: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
}

/** Categories shown in the "Explore by Category" homepage section. */
export const STUDIO_CATEGORIES: readonly StudioCategoryConfig[] = [
  {
    slug: "photography",
    name: "Photography Studios",
    description: "Daylight cycloramas, seamless backdrops, and pro strobe kits.",
    icon: CameraIcon,
    image: unsplash("photo-1452587925148-ce544e77e70d", 1200),
    imageAlt:
      "Vintage film camera resting on a map beside freshly printed photographs",
  },
  {
    slug: "sound-stage",
    name: "Sound Stages",
    description: "Black-box stages with lighting rigs and room to build sets.",
    icon: ClapperboardIcon,
    image: unsplash("photo-1503095396549-807759245b35", 800),
    imageAlt:
      "Performers silhouetted against a glowing red stage curtain",
  },
  {
    slug: "podcast",
    name: "Podcast Rooms",
    description: "Acoustically treated rooms with broadcast-ready microphones.",
    icon: MicIcon,
    image: unsplash("photo-1589903308904-1010c2294adc", 800),
    imageAlt:
      "Broadcast microphone and headphones beside an editing workstation",
  },
  {
    slug: "music",
    name: "Music Suites",
    description: "Isolated live rooms, backline, and engineered consoles.",
    icon: HeadphonesIcon,
    image: unsplash("photo-1520523839897-bd0b52f945a0", 800),
    imageAlt: "Close-up of warm, softly lit upright piano keys",
  },
  {
    slug: "art",
    name: "Art Workshops",
    description: "Wet studios with easels, sinks, and north-facing light.",
    icon: PaletteIcon,
    image: unsplash("photo-1513364776144-60967b0f800f", 800),
    imageAlt: "Paintbrushes loaded with colour on a canvas",
  },
];

/**
 * Explore Studios URL with this category's filter pre-applied.
 * Consumed by the category cards and available to other routes later.
 */
export function categoryHref(slug: StudioCategory): string {
  return `/studios?category=${slug}`;
}

/** Display label for a category (e.g. card badges on studio listings). */
export function categoryLabel(slug: StudioCategory): string {
  return (
    STUDIO_CATEGORIES.find((category) => category.slug === slug)?.name ?? slug
  );
}
