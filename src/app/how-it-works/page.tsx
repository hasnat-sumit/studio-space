import type { Metadata } from "next";
import {
  BanknoteIcon,
  BuildingIcon,
  CalendarClockIcon,
  CalendarDaysIcon,
  CameraIcon,
  ClipboardCheckIcon,
  CreditCardIcon,
  HeartHandshakeIcon,
  LayersIcon,
  MessageSquareIcon,
  SearchIcon,
  SparklesIcon,
} from "lucide-react";
import { CtaBand } from "@/components/shared/cta-band";
import { FeatureGrid, type Feature } from "@/components/shared/feature-grid";
import { PageHero } from "@/components/shared/page-hero";
import { StepFlow, type Step } from "@/components/shared/step-flow";
import { unsplash } from "@/lib/images";

export const metadata: Metadata = {
  title: "How It Works - StudioSpace",
  description:
    "Learn how to find, book, and create in verified studios — and how to list your own space and earn by the hour on StudioSpace.",
};

const HERO_IMAGE = unsplash("photo-1511379938547-c1f69419868d", 1200);

/** Booking process, told from the creator's side. */
const CREATOR_STEPS: readonly Step[] = [
  {
    number: "01",
    title: "Discover Your Space",
    description:
      "Search verified studios by category, neighborhood, and the gear that comes with them — from daylight cycloramas to podcast booths.",
    icon: SearchIcon,
  },
  {
    number: "02",
    title: "Choose Your Schedule",
    description:
      "Open calendars show real availability by the hour. Pick the exact window your shoot, session, or workshop needs.",
    icon: CalendarDaysIcon,
  },
  {
    number: "03",
    title: "Book Your Workspace",
    description:
      "Confirm with clear pricing — hourly rate and refundable deposit upfront, with straightforward cancellation terms.",
    icon: ClipboardCheckIcon,
  },
  {
    number: "04",
    title: "Bring Your Vision to Life",
    description:
      "Show up to a space that's ready for you: keyed entry, the gear in place, and a host who knows the room.",
    icon: SparklesIcon,
  },
];

/** Listing process, told from the host's side. */
const HOST_STEPS: readonly Step[] = [
  {
    number: "01",
    title: "Create Your Listing",
    description:
      "Describe your space, set your hourly rate, deposit, and house rules. Publishing a listing takes about ten minutes.",
    icon: BuildingIcon,
  },
  {
    number: "02",
    title: "Showcase Your Space",
    description:
      "Upload photos that sell the light and the layout. Honest, verified listings with real imagery get booked faster.",
    icon: CameraIcon,
  },
  {
    number: "03",
    title: "Receive Booking Requests",
    description:
      "Review requests and approve the ones that fit your calendar. You stay in control of every booking.",
    icon: MessageSquareIcon,
  },
  {
    number: "04",
    title: "Earn by Sharing",
    description:
      "Get paid for hours you're not using. Payouts land after each booking — average hosts earn $1,200 a month.",
    icon: BanknoteIcon,
  },
];

/** "Why StudioSpace?" — the platform's four promises. */
const REASONS: readonly Feature[] = [
  {
    title: "Diverse creative spaces",
    description:
      "From daylight photo studios to black-box sound stages — spaces for every discipline, crew size, and budget.",
    icon: LayersIcon,
  },
  {
    title: "Transparent pricing",
    description:
      "Every listing shows the hourly rate and refundable deposit upfront. What you see before you book is what you pay.",
    icon: CreditCardIcon,
  },
  {
    title: "Simple booking experience",
    description:
      "Search, pick your hours, and book in a few clicks. No phone tag, no back-and-forth emails.",
    icon: CalendarClockIcon,
  },
  {
    title: "Community of creators and hosts",
    description:
      "Verified hosts, reviewed spaces, and a creative community that turns empty rooms into working studios.",
    icon: HeartHandshakeIcon,
  },
];

/**
 * How It Works (`/how-it-works`).
 *
 * Fully static marketing page — no data fetching, so it prerenders like the
 * homepage. The two `StepFlow` sections double as the funnel for host
 * sign-ups, so the closing CTA leads straight to listing a studio.
 */
export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="How it works"
        title={
          <>
            Your Space. Your Vision.{" "}
            <span className="text-brand-accent">Your Creation.</span>
          </>
        }
        description="StudioSpace is where creators find the room their idea needs — verified photo studios, sound stages, podcast booths, and music suites, booked by the hour. Here's the whole journey, from first search to finished work."
        image={{
          src: HERO_IMAGE,
          alt: "Sunlit home music studio with guitars, a keyboard, and a microphone by the window",
        }}
      />

      <StepFlow
        id="creators"
        eyebrow="For creators"
        title="Booking a space takes minutes"
        description="Four steps between you and the room where it happens."
        steps={CREATOR_STEPS}
      />

      <StepFlow
        id="hosts"
        eyebrow="For hosts"
        title="Turn idle hours into income"
        description="Four steps between an empty room and a booked studio."
        steps={HOST_STEPS}
        variant="muted"
      />

      <FeatureGrid
        id="why"
        eyebrow="Why StudioSpace"
        title="Built the way creators actually book"
        features={REASONS}
        variant="muted"
      />

      <CtaBand
        eyebrow="Ready when you are"
        title="Ready to Create Something Extraordinary?"
        description="Browse verified studios near you — or open your own doors to creators and start earning by the hour."
        primary={{ label: "Explore Studios", href: "/studios" }}
        secondary={{ label: "Become a Host", href: "/add-studio" }}
      />
    </div>
  );
}
