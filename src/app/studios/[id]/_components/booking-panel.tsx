"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon, InfoIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BOOKING_SLOTS,
  DEFAULT_END_SLOT,
  DEFAULT_START_SLOT,
  bookingHours,
  estimateBookingTotal,
  formatHours,
  formatMoney,
} from "@/lib/booking";
import { cn } from "@/lib/utils";
import type { Studio } from "@/types/studio";

const SLOT_ITEMS = BOOKING_SLOTS.map((slot) => ({
  value: slot.value,
  label: slot.label,
}));

const FIELD_CLASS = "h-11 w-full border-brand-border bg-transparent";

interface BookingPanelProps {
  studio: Studio;
}

/**
 * Sticky booking card (desktop) that flows inline on mobile.
 *
 * The "Book This Workspace" CTA opens a *preview* dialog: date and time
 * inputs are fully controlled and the estimated total is computed live, but
 * nothing is submitted — real bookings connect in a later task.
 */
export function BookingPanel({ studio }: BookingPanelProps) {
  const [open, setOpen] = React.useState(false);
  const [dateOpen, setDateOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [start, setStart] = React.useState(DEFAULT_START_SLOT);
  const [end, setEnd] = React.useState(DEFAULT_END_SLOT);

  const today = React.useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const hours = bookingHours(start, end);
  const total = estimateBookingTotal(studio.hourlyRate, start, end);
  const invalidRange = hours === null;
  const canConfirm = Boolean(date) && !invalidRange;

  function handleConfirm() {
    toast.info(
      `Bookings open soon — ${studio.title} isn't reservable yet. Nothing was submitted.`
    );
    setOpen(false);
  }

  return (
    <>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-xs font-medium tracking-[0.2em] text-brand-accent uppercase">
          Book this space
        </p>

        <p className="mt-3">
          <span className="font-heading text-3xl font-semibold">
            {formatMoney(studio.hourlyRate)}
          </span>
          <span className="text-sm text-muted-foreground"> / hour</span>
        </p>

        <dl className="mt-5 space-y-2.5 border-t border-border pt-5 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground">Refundable deposit</dt>
            <dd className="font-medium">{formatMoney(studio.deposit)}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground">Maximum capacity</dt>
            <dd className="font-medium">Up to {studio.capacity} guests</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground">Minimum booking</dt>
            <dd className="font-medium">1 hour</dd>
          </div>
        </dl>

        <Button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-6 h-11 w-full bg-brand-accent px-6 text-[15px] text-brand-on-accent shadow-sm hover:bg-brand-accent/90 hover:text-brand-on-accent focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/30"
        >
          Book This Workspace
        </Button>

        <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
          <InfoIcon className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          You won&apos;t be charged yet — payment and confirmation arrive with
          the booking release.
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Request {studio.title}</DialogTitle>
            <DialogDescription>
              A preview of the booking form — nothing entered here creates a
              reservation.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="booking-date">Date</Label>
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger
                  render={
                    <Button
                      id="booking-date"
                      type="button"
                      variant="outline"
                      className={cn(
                        "h-11 w-full justify-start gap-2 border-brand-border bg-transparent font-normal text-brand-fg hover:bg-brand-fg/10 hover:text-brand-fg dark:border-brand-border dark:bg-transparent dark:hover:bg-brand-fg/10",
                        !date && "text-muted-foreground"
                      )}
                    />
                  }
                >
                  <CalendarIcon className="size-4 shrink-0" aria-hidden="true" />
                  {date ? format(date, "EEEE, MMM d, yyyy") : "Pick a date"}
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(value) => {
                      setDate(value);
                      setDateOpen(false);
                    }}
                    disabled={(day) => day < today}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="booking-start">Start time</Label>
              <Select
                value={start}
                items={SLOT_ITEMS}
                onValueChange={(value) => setStart(value ?? DEFAULT_START_SLOT)}
              >
                <SelectTrigger
                  id="booking-start"
                  aria-label="Start time"
                  className={FIELD_CLASS}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SLOT_ITEMS.map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="booking-end">End time</Label>
              <Select
                value={end}
                items={SLOT_ITEMS}
                onValueChange={(value) => setEnd(value ?? DEFAULT_END_SLOT)}
              >
                <SelectTrigger
                  id="booking-end"
                  aria-label="End time"
                  className={FIELD_CLASS}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SLOT_ITEMS.map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-xl border border-border bg-muted/40 p-4 sm:col-span-2">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <ClockIcon className="size-3.5 shrink-0" aria-hidden="true" />
                  Duration
                </span>
                <span className="font-medium">
                  {hours === null ? "—" : formatHours(hours)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">
                  {formatMoney(studio.hourlyRate)} ×{" "}
                  {hours === null ? "—" : formatHours(hours)}
                </span>
                <span className="font-medium">
                  {total === null ? "—" : formatMoney(total)}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 border-t border-border pt-3">
                <span className="text-sm font-medium">Estimated total</span>
                <span className="font-heading text-xl font-semibold text-brand-accent">
                  {total === null ? "—" : formatMoney(total)}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Plus a {formatMoney(studio.deposit)} refundable deposit, due
                when bookings open.
              </p>
            </div>

            {invalidRange ? (
              <p role="alert" className="text-xs text-destructive sm:col-span-2">
                The end time must be after the start time.
              </p>
            ) : null}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-brand-border bg-transparent text-brand-fg hover:bg-brand-fg/10 hover:text-brand-fg dark:border-brand-border dark:bg-transparent dark:hover:bg-brand-fg/10"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!canConfirm}
              onClick={handleConfirm}
              className="bg-brand-accent text-brand-on-accent shadow-sm hover:bg-brand-accent/90 hover:text-brand-on-accent focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/30"
            >
              Confirm request
            </Button>
          </DialogFooter>

          <p className="text-center text-xs text-muted-foreground sm:-mt-1">
            Booking goes live soon — this preview won&apos;t create a
            reservation.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
