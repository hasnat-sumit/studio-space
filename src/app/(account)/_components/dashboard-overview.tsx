"use client";

import Link from "next/link";
import { format, parseISO } from "date-fns";
import { CalendarIcon, CirclePlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiData } from "@/hooks/use-api-data";
import { useAuth } from "@/hooks/use-auth";
import { getDashboardSummary } from "@/lib/api/account";
import { formatMoney, slotLabel } from "@/lib/booking";
import { cn } from "@/lib/utils";
import { BookingStatusBadge } from "./booking-status-badge";
import {
  ACCENT_BUTTON_CLASS,
  DashboardError,
  DashboardHeading,
  DashboardMessage,
} from "./dashboard-states";

function StatTile({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-border bg-card p-5 outline-none transition-colors hover:border-brand-accent/40 focus-visible:ring-3 focus-visible:ring-brand-accent/40"
    >
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">{value}</p>
    </Link>
  );
}

function StatGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xs font-medium tracking-[0.2em] text-brand-accent uppercase">{title}</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">{children}</div>
    </section>
  );
}

export function DashboardOverview() {
  const { user } = useAuth();
  const { data, error, isLoading, reload } = useApiData(getDashboardSummary);
  const firstName = user?.name.split(" ")[0];

  const heading = (
    <DashboardHeading
      title={firstName ? `Welcome back, ${firstName}` : "Dashboard"}
      description="Your bookings and listings at a glance."
      action={
        <Link
          href="/add-studio"
          className={cn(buttonVariants(), ACCENT_BUTTON_CLASS, "gap-1.5")}
        >
          <CirclePlusIcon aria-hidden="true" />
          Add New Studio
        </Link>
      }
    />
  );

  if (error && !data) {
    return (
      <>
        {heading}
        <div className="mt-8">
          <DashboardError error={error} onRetry={reload} />
        </div>
      </>
    );
  }

  if (isLoading || !data) {
    return (
      <>
        {heading}
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-busy="true">
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton key={index} className="h-28 rounded-2xl" />
          ))}
        </div>
      </>
    );
  }

  const { hosting, renting, upcoming } = data;

  return (
    <>
      {heading}

      <StatGroup title="Hosting">
        <StatTile label="Listings" value={String(hosting.listings)} href="/my-listings" />
        <StatTile
          label="Requests to review"
          value={String(hosting.pendingRequests)}
          href="/my-bookings?view=requests"
        />
        <StatTile
          label="Upcoming sessions"
          value={String(hosting.upcomingBookings)}
          href="/my-bookings?view=requests"
        />
        <StatTile
          label="Booked revenue"
          value={formatMoney(hosting.earnings)}
          href="/my-bookings?view=requests"
        />
      </StatGroup>

      <StatGroup title="Booking">
        <StatTile
          label="Upcoming bookings"
          value={String(renting.upcomingBookings)}
          href="/my-bookings"
        />
        <StatTile
          label="All bookings"
          value={String(renting.totalBookings)}
          href="/my-bookings"
        />
        <StatTile
          label="Booked value"
          value={formatMoney(renting.totalSpent)}
          href="/my-bookings"
        />
      </StatGroup>

      <section className="mt-10">
        <h2 className="font-heading text-lg font-medium">Coming up</h2>
        {upcoming.length === 0 ? (
          <div className="mt-3">
            <DashboardMessage
              icon={CalendarIcon}
              title="Nothing scheduled"
              description="Upcoming sessions, as a guest or a host, will show up here."
              action={
                <Link href="/studios" className={cn(buttonVariants({ variant: "outline" }))}>
                  Explore studios
                </Link>
              }
            />
          </div>
        ) : (
          <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-card">
            {upcoming.map((booking) => (
              <li
                key={booking.id}
                className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4"
              >
                <div className="min-w-0">
                  <Link
                    href={
                      booking.role === "host"
                        ? "/my-bookings?view=requests"
                        : "/my-bookings"
                    }
                    className="font-medium outline-none hover:underline focus-visible:ring-3 focus-visible:ring-brand-accent/40"
                  >
                    {booking.studioTitle}
                  </Link>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {format(parseISO(booking.date), "EEE, MMM d")} · {slotLabel(booking.start)}–
                    {slotLabel(booking.end)} ·{" "}
                    {booking.role === "host" ? `Guest: ${booking.guestName}` : "You're the guest"}
                  </p>
                </div>
                <BookingStatusBadge status={booking.status} role={booking.role} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
