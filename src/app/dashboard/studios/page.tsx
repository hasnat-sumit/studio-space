import type { Metadata } from "next";
import { MyListings } from "./_components/my-listings";

export const metadata: Metadata = { title: "My Studio Listings - StudioSpace" };

export default function MyListingsPage() {
  return <MyListings />;
}
