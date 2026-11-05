"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShieldAlertIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useApiData } from "@/hooks/use-api-data";
import { useAuth } from "@/hooks/use-auth";
import { getStudioById } from "@/lib/api/account";
import { cn } from "@/lib/utils";
import { StudioForm } from "./studio-form";
import {
  DashboardError,
  DashboardHeading,
  DashboardListSkeleton,
  DashboardMessage,
} from "@/app/(account)/_components/dashboard-states";

export function EditStudio() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const load = useCallback(() => getStudioById(id), [id]);
  const { data: studio, error, isLoading, reload } = useApiData(load);

  let body: React.ReactNode;
  if (error && !studio) {
    body = <DashboardError error={error} onRetry={reload} />;
  } else if (isLoading || !studio) {
    body = <DashboardListSkeleton rows={2} />;
  } else if (studio.host.id !== user?.id) {
    // Courtesy only: the API refuses edits from anyone but the owner regardless.
    body = (
      <DashboardMessage
        icon={ShieldAlertIcon}
        title="This isn't your listing"
        description="You can only edit studios you've listed yourself."
        action={
          <Link href="/my-listings" className={cn(buttonVariants({ variant: "outline" }))}>
            Back to my listings
          </Link>
        }
      />
    );
  } else {
    body = <StudioForm studio={studio} />;
  }

  return (
    <>
      <DashboardHeading
        title={studio ? `Edit ${studio.title}` : "Edit studio"}
        description="Changes go live straight away. Existing bookings keep the price they were made at."
      />
      <div className="mt-8">{body}</div>
    </>
  );
}
