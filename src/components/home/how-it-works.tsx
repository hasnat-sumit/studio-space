import {
  CalendarDaysIcon,
  SearchIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const STEPS: readonly Step[] = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Browse studios by category, city, and the gear that comes with them.",
    icon: SearchIcon,
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Pick a date and time, see what's already booked, and check the total up front.",
    icon: CalendarDaysIcon,
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Send your request in one click, then track the host's answer in My Bookings.",
    icon: ShieldCheckIcon,
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Show up, plug in, and make the work you've been waiting to make.",
    icon: SparklesIcon,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How booking works"
          title="How Booking Works"
          description="Four simple steps between you and the room where it happens."
          align="center"
        />

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step, index) => (
            <li
              key={step.number}
              className="relative animate-in fade-in-50 fill-mode-both duration-500 lg:pl-6"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              {/* Hairline connector between steps on desktop */}
              <span
                aria-hidden="true"
                className="absolute top-6 left-0 hidden h-px w-4 bg-border lg:block"
              />
              <div className="flex items-center gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-accent/10 text-brand-accent ring-1 ring-brand-accent/20">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-heading text-sm font-semibold tracking-[0.2em] text-brand-accent">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-5 font-heading text-lg font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
