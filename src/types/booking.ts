export type BookingStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "cancelled"
  | "completed";

/** The statuses a user can move a booking to (the API enforces who and when). */
export type BookingAction = Exclude<BookingStatus, "pending">;

export interface Booking {
  id: string;
  studioId: string;
  /** Snapshot of the listing when it was booked; survives later edits. */
  studioTitle: string;
  studioSlug: string;
  studioImage: string;
  studioLocation: string;
  hostId: string;
  hostName: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  /** Calendar date as `YYYY-MM-DD`. */
  date: string;
  /** 24-hour `HH:mm`. */
  start: string;
  end: string;
  hours: number;
  hourlyRate: number;
  subtotal: number;
  deposit: number;
  notes: string;
  status: BookingStatus;
  /** The signed-in viewer's relationship to this booking. */
  role: "host" | "guest";
  createdAt: string;
  updatedAt: string;
}

export interface DashboardSummary {
  hosting: {
    listings: number;
    pendingRequests: number;
    upcomingBookings: number;
    earnings: number;
  };
  renting: {
    upcomingBookings: number;
    totalBookings: number;
    totalSpent: number;
  };
  upcoming: Booking[];
}
