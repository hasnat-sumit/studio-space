import type { Metadata } from "next";
import { StudioForm } from "@/app/(account)/my-listings/_components/studio-form";
import { DashboardHeading } from "@/app/(account)/_components/dashboard-states";

export const metadata: Metadata = { title: "Add New Studio - StudioSpace" };

export default function NewStudioPage() {
  return (
    <>
      <DashboardHeading
        title="Add New Studio"
        description="Tell creators about your space. It goes live on StudioSpace as soon as you publish."
      />
      <div className="mt-8">
        <StudioForm />
      </div>
    </>
  );
}
