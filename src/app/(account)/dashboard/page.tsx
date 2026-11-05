import type { Metadata } from "next";
import { DashboardOverview } from "@/app/(account)/_components/dashboard-overview";

export const metadata: Metadata = { title: "Dashboard - StudioSpace" };

export default function DashboardPage() {
  return <DashboardOverview />;
}
