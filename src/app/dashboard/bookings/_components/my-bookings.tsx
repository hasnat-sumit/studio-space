"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { format, parseISO } from "date-fns";
import { CalendarCheckIcon, InboxIcon } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApiData } from "@/hooks/use-api-data";
import { getHostBookings, getMyBookings, updateBookingStatus } from "@/lib/api/account";
import { ApiError } from "@/lib/api/client";
import { formatHours, formatMoney, slotLabel } from "@/lib/booking";
import { cn } from "@/lib/utils";
import type { Booking, BookingAction } from "@/types/booking";
import { BookingStatusBadge } from "../../_components/booking-status-badge";
import {
  ACCENT_BUTTON_CLASS,
  DashboardError,
  DashboardHeading,
  DashboardListSkeleton,
  DashboardMessage,
} from "../../_components/dashboard-states";

const PAGE_SIZE = 10;
/** The API's maximum `limit`. */
const MAX_BOOKINGS = 1000;

/** Actions that can't be undone get a confirmation step. */
const CONFIRM_COPY: Partial<
  Record<BookingAction, { title: string; description: string; label: string }>
> = {
  cancelled: {
    title: "Cancel this booking?",
    description: "The time slot is released straight away. This can't be undone.",
    label: "Cancel booking",
  },
  declined: {
    title: "Decline this request?",
    description: "The guest will see it as declined and the time slot is released.",
    label: "Decline request",
  },
};

const DONE_MESSAGE: Record<BookingAction, string> = {
  confirmed: "Booking confirmed",
  declined: "Request declined",
  cancelled: "Booking cancelled",
  completed: "Marked as completed",
};

function todayString(): string {
  return format(new Date(), "yyyy-MM-dd");
}

interface BookingCardProps {
  booking: Booking;
  busy: boolean;
  onAction: (booking: Booking, action: BookingAction) => void;
}

function BookingCard({ booking, busy, onAction }: BookingCardProps) {
  const isHost = booking.role === "host";
  const canCancel = booking.status === "pending" || booking.status === "confirmed";
  const canComplete =
    isHost && booking.status === "confirmed" && booking.date <= todayString();

  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:aspect-[4/3] sm:w-32">
        {booking.studioImage ? (
          <Image
            src={booking.studioImage}
            alt=""
            fill
            sizes="(min-width: 640px) 128px, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="min-w-0 font-heading text-lg font-medium">
            <Link
              href={`/studios/${booking.studioSlug}`}
              className="rounded outline-none hover:underline focus-visible:ring-3 focus-visible:ring-brand-accent/40"
            >
              {booking.studioTitle}
            </Link>
          </h3>
          <BookingStatusBadge status={booking.status} role={booking.role} />
        </div>

        <p className="mt-1 text-sm">
          {format(parseISO(booking.date), "EEEE, MMM d, yyyy")} · {slotLabel(booking.start)}–
          {slotLabel(booking.end)}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatHours(booking.hours)} · {formatMoney(booking.subtotal)} +{" "}
          {formatMoney(booking.deposit)} refundable deposit
        </p>
        <p className="mt-1 text-sm break-words text-muted-foreground">
          {isHost
            ? `Guest: ${booking.guestName} (${booking.guestEmail})`
            : `Host: ${booking.hostName} · ${booking.studioLocation}`}
        </p>
        {booking.notes ? (
          <p className="mt-2 rounded-lg bg-muted/50 px-3 py-2 text-sm break-words">
            {booking.notes}
          </p>
        ) : null}

        <div className="mt-3 flex flex-wrap gap-2">
          {isHost && booking.status === "pending" ? (
            <>
              <Button
                type="button"
                size="sm"
                disabled={busy}
                onClick={() => onAction(booking, "confirmed")}
                className={ACCENT_BUTTON_CLASS}
              >
                Confirm
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={busy}
                onClick={() => onAction(booking, "declined")}
              >
                Decline
              </Button>
            </>
          ) : null}
          {canComplete ? (
            <Button
              type="button"
              size="sm"
              disabled={busy}
              onClick={() => onAction(booking, "completed")}
              className={ACCENT_BUTTON_CLASS}
            >
              Mark completed
            </Button>
          ) : null}
          {canCancel && !(isHost && booking.status === "pending") ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={busy}
              onClick={() => onAction(booking, "cancelled")}
            >
              Cancel booking
            </Button>
          ) : null}
          {!isHost && booking.status === "completed" ? (
            <Link
              href={`/studios/${booking.studioSlug}#reviews`}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Leave a review
            </Link>
          ) : null}
        </div>
      </div>
    </li>
  );
}

interface BookingListProps {
  load: (limit: number) => Promise<Booking[]>;
  empty: React.ReactNode;
}

function BookingList({ load, empty }: BookingListProps) {
  const [shown, setShown] = useState(PAGE_SIZE);
  // Fetch one extra to learn whether more exist. The limit grows rather than
  // pages by offset, so a reload after an action keeps everything on screen.
  const loadPage = useCallback(
    () => load(Math.min(shown + 1, MAX_BOOKINGS)),
    [load, shown]
  );
  const { data: bookings, error, isLoading, reload } = useApiData(loadPage);
  const [confirming, setConfirming] = useState<{
    booking: Booking;
    action: BookingAction;
  } | null>(null);
  const [busy, setBusy] = useState(false);

  async function apply(booking: Booking, action: BookingAction) {
    setBusy(true);
    try {
      await updateBookingStatus(booking.id, action);
      toast.success(DONE_MESSAGE[action]);
    } catch (cause) {
      toast.error("Couldn't update this booking", {
        description: cause instanceof ApiError ? cause.message : "Please try again.",
      });
    } finally {
      // Reload either way: a conflict usually means this list is out of date.
      setBusy(false);
      setConfirming(null);
      reload();
    }
  }

  function handleAction(booking: Booking, action: BookingAction) {
    if (CONFIRM_COPY[action]) setConfirming({ booking, action });
    else void apply(booking, action);
  }

  if (error && !bookings) return <DashboardError error={error} onRetry={reload} />;
  if (isLoading || !bookings) return <DashboardListSkeleton />;
  if (bookings.length === 0) return <>{empty}</>;

  const copy = confirming ? CONFIRM_COPY[confirming.action] : undefined;

  return (
    <>
      <ul className="flex flex-col gap-4">
        {bookings.slice(0, shown).map((booking) => (
          <BookingCard key={booking.id} booking={booking} busy={busy} onAction={handleAction} />
        ))}
      </ul>
      {bookings.length > shown ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => setShown((current) => current + PAGE_SIZE)}
          className="mx-auto mt-6 flex"
        >
          Show more
        </Button>
      ) : null}
      <ConfirmDialog
        open={confirming !== null}
        title={copy?.title ?? ""}
        description={copy?.description ?? ""}
        confirmLabel={copy?.label ?? "Confirm"}
        pending={busy}
        onConfirm={() => {
          if (confirming) void apply(confirming.booking, confirming.action);
        }}
        onCancel={() => setConfirming(null)}
      />
    </>
  );
}

export function MyBookings() {
  const initialView = useSearchParams().get("view") === "requests" ? "requests" : "trips";

  return (
    <>
      <DashboardHeading
        title="My Bookings"
        description="Sessions you've booked, and requests for the studios you host."
      />

      <Tabs defaultValue={initialView} className="mt-8 gap-6">
        <TabsList>
          <TabsTrigger value="trips">Studios I booked</TabsTrigger>
          <TabsTrigger value="requests">Requests for my studios</TabsTrigger>
        </TabsList>

        <TabsContent value="trips">
          <BookingList
            load={getMyBookings}
            empty={
              <DashboardMessage
                icon={CalendarCheckIcon}
                title="No bookings yet"
                description="Find a space you like and request a time. Your bookings will show up here."
                action={
                  <Link
                    href="/studios"
                    className={cn(buttonVariants(), ACCENT_BUTTON_CLASS)}
                  >
                    Explore studios
                  </Link>
                }
              />
            }
          />
        </TabsContent>

        <TabsContent value="requests">
          <BookingList
            load={getHostBookings}
            empty={
              <DashboardMessage
                icon={InboxIcon}
                title="No requests yet"
                description="When someone asks to book one of your studios, you can confirm or decline it here."
                action={
                  <Link
                    href="/dashboard/studios"
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    View my listings
                  </Link>
                }
              />
            }
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
