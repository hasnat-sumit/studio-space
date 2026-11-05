import {
  BadgeCheckIcon,
  HeadsetIcon,
  ShieldCheckIcon,
  WrenchIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

interface Assurance {
  title: string;
  description: string;
  icon: LucideIcon;
}

const ASSURANCES: readonly Assurance[] = [
  {
    title: "Liability protection",
    description:
      "Clear responsibilities for hosts and creators, so everyone knows who covers what before a session starts.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Verified profiles",
    description:
      "Every booking is tied to a real account, and reviews come only from creators who completed a session.",
    icon: BadgeCheckIcon,
  },
  {
    title: "Equipment safety",
    description:
      "Listings spell out the gear on site, and a refundable deposit helps keep it in working order.",
    icon: WrenchIcon,
  },
  {
    title: "24/7 host support",
    description:
      "Help for hosts and creators at any hour, from the first request to the last wrap.",
    icon: HeadsetIcon,
  },
];

/** "Host Guarantee & Creator Support": the assurances behind every booking. */
export function HostGuarantee() {
  return (
    <section
      id="host-guarantee"
      className="border-t border-border/60 bg-muted/30 py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Peace of mind"
          title="Host Guarantee & Creator Support"
          description="What hosts and creators can count on, on every booking."
          align="center"
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ASSURANCES.map((assurance) => (
            <li
              key={assurance.title}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-brand-accent/10 text-brand-accent ring-1 ring-brand-accent/20">
                <assurance.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-heading text-lg font-medium tracking-tight">
                {assurance.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {assurance.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
