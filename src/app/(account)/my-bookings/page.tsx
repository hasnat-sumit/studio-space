import type { Metadata } from "next";
import { MyBookings } from "./_components/my-bookings";

export const metadata: Metadata = { title: "My Bookings - StudioSpace" };

export default function MyBookingsPage() {
  return <MyBookings />;
}
