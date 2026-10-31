/**
 * Pure booking-form logic for the studio details page.
 *
 * The booking panel is a *preview*: these helpers compute the estimated price
 * from the chosen hours, but nothing is submitted anywhere yet.
 */

export interface BookingSlot {
  /** 24-hour value, e.g. "14:30". */
  value: string;
  /** 12-hour label, e.g. "2:30 PM". */
  label: string;
  /** Minutes since midnight — used for the duration math. */
  minutes: number;
}

const SLOT_START_MINUTE = 7 * 60; // 7:00 AM
const SLOT_END_MINUTE = 22 * 60; // 10:00 PM
const SLOT_STEP_MINUTES = 30;

function buildSlots(): BookingSlot[] {
  const slots: BookingSlot[] = [];

  for (let minutes = SLOT_START_MINUTE; minutes <= SLOT_END_MINUTE; minutes += SLOT_STEP_MINUTES) {
    const hour24 = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const period = hour24 >= 12 ? "PM" : "AM";
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    const label = `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;

    slots.push({
      value: `${hour24.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
      label,
      minutes,
    });
  }

  return slots;
}

/** Bookable start/end times, 7:00 AM–10:00 PM in 30-minute steps. */
export const BOOKING_SLOTS: readonly BookingSlot[] = buildSlots();

export const DEFAULT_START_SLOT = "09:00";
export const DEFAULT_END_SLOT = "11:00";

/** Minutes since midnight for a slot value (0 when unknown). */
export function slotMinutes(value: string | undefined): number {
  return BOOKING_SLOTS.find((slot) => slot.value === value)?.minutes ?? 0;
}

/** Booked hours from a start/end pair; `null` when the range is invalid. */
export function bookingHours(
  start: string | undefined,
  end: string | undefined
): number | null {
  if (!start || !end) return null;
  const hours = (slotMinutes(end) - slotMinutes(start)) / 60;
  return hours > 0 ? hours : null;
}

/** Estimated subtotal (hours × hourly rate); `null` when the range is invalid. */
export function estimateBookingTotal(
  hourlyRate: number,
  start: string | undefined,
  end: string | undefined
): number | null {
  const hours = bookingHours(start, end);
  return hours === null ? null : hours * hourlyRate;
}

/** Money display without stray decimals: $170 or $172.50. */
export function formatMoney(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  return rounded % 1 === 0
    ? `$${rounded.toLocaleString("en-US")}`
    : `$${rounded.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

/** Human duration: "1 hour", "2.5 hours". */
export function formatHours(hours: number): string {
  const value = Number.isInteger(hours) ? String(hours) : hours.toFixed(1);
  return `${value} ${hours === 1 ? "hour" : "hours"}`;
}
