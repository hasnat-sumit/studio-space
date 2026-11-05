import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use - StudioSpace",
  description: "The terms for booking and hosting creative spaces on StudioSpace.",
};

const SECTIONS = [
  {
    heading: "Using StudioSpace",
    body: "StudioSpace connects people who have creative spaces with people who want to book them by the hour. Keep your account details accurate, and use the site only for genuine listings and bookings.",
  },
  {
    heading: "Hosts",
    body: "Hosts are responsible for describing their spaces accurately, setting their own rates, and responding to booking requests. A booking is confirmed only once the host accepts it.",
  },
  {
    heading: "Creators",
    body: "Creators agree to use each space as described, to stay within its capacity, and to leave it as they found it. Bookings can be cancelled from My Bookings while they are pending or confirmed.",
  },
  {
    heading: "Payments",
    body: "StudioSpace doesn't take payment online. Hourly rates and refundable deposits are shown up front, and hosts and creators arrange payment directly with each other.",
  },
] as const;

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">
        Terms of Use
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        The short version of how booking and hosting work on StudioSpace.
      </p>

      <div className="mt-10 flex flex-col gap-8">
        {SECTIONS.map((section) => (
          <section key={section.heading}>
            <h2 className="font-heading text-xl font-medium tracking-tight">
              {section.heading}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
