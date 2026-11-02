import type { Metadata } from "next";
import {
  HeartHandshakeIcon,
  LightbulbIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";
import { CtaBand } from "@/components/shared/cta-band";
import { FeatureGrid, type Feature } from "@/components/shared/feature-grid";
import { PageHero } from "@/components/shared/page-hero";
import { unsplash } from "@/lib/images";
import { AboutMissionVision } from "./_components/about-mission-vision";

export const metadata: Metadata = {
  title: "About Us - StudioSpace",
  description:
    "StudioSpace connects creators with inspiring, accessible creative spaces and helps owners unlock the potential of their rooms. Meet the mission, vision, and values behind the platform.",
};

const HERO_IMAGE = unsplash("photo-1522202176988-66273c2fd55f", 1200);

/** The four values that shape every product and community decision. */
const VALUES: readonly Feature[] = [
  {
    title: "Creativity",
    description:
      "Every feature exists to protect the spark — less logistics, more time making the work only you can make.",
    icon: LightbulbIcon,
  },
  {
    title: "Community",
    description:
      "Creators and hosts aren't two sides of a marketplace; they're one scene. We build for the connections between them.",
    icon: UsersIcon,
  },
  {
    title: "Accessibility",
    description:
      "A great space shouldn't depend on who you know or what you can afford. Clear pricing keeps studios open to every creator.",
    icon: HeartHandshakeIcon,
  },
  {
    title: "Trust",
    description:
      "Verified listings, protected bookings, and honest reviews — so both sides can show up knowing the room is real.",
    icon: ShieldCheckIcon,
  },
];

/**
 * About Us (`/about`).
 *
 * Static editorial page: hero, alternating mission/vision rows, the brand
 * values grid, and a closing CTA. Like `/how-it-works`, it prerenders fully
 * and links only to live routes.
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="About StudioSpace"
        title={
          <>
            A Space for Every{" "}
            <span className="text-brand-accent">Imagination.</span>
          </>
        }
        description="StudioSpace started with a simple belief: no one should have to abandon a good idea for lack of a room. We're building the place where creators find the space and owners find their purpose — one bookable studio at a time."
        image={{
          src: HERO_IMAGE,
          alt: "Three creative professionals laughing together around a laptop at a wooden studio table",
        }}
      />

      <AboutMissionVision />

      <FeatureGrid
        id="values"
        eyebrow="Our values"
        title="What we hold true"
        description="The principles behind every listing, booking, and decision on StudioSpace."
        features={VALUES}
      />

      <CtaBand
        eyebrow="Join us"
        title="Come Build the Scene With Us"
        description="Whether you shoot, record, paint, or podcast — there's a room here for you. And if you own one, there's a creator looking for it right now."
        primary={{ label: "Discover Spaces", href: "/studios" }}
        secondary={{ label: "List Your Studio", href: "/dashboard/studios/new" }}
      />
    </div>
  );
}
