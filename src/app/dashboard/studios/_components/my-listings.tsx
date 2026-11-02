"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BuildingIcon,
  CirclePlusIcon,
  ExternalLinkIcon,
  PencilIcon,
  StarIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { useApiData } from "@/hooks/use-api-data";
import { deleteStudio, getMyStudios } from "@/lib/api/account";
import { ApiError } from "@/lib/api/client";
import { formatMoney } from "@/lib/booking";
import { categoryLabel } from "@/lib/categories";
import { cn } from "@/lib/utils";
import type { Studio } from "@/types/studio";
import {
  ACCENT_BUTTON_CLASS,
  DashboardError,
  DashboardHeading,
  DashboardListSkeleton,
  DashboardMessage,
} from "../../_components/dashboard-states";

export function MyListings() {
  const { data: studios, error, isLoading, reload } = useApiData(getMyStudios);
  const [toDelete, setToDelete] = useState<Studio | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteStudio(toDelete.id);
      toast.success(`${toDelete.title} was deleted`);
      setToDelete(null);
      reload();
    } catch (cause) {
      toast.error("Couldn't delete this listing", {
        description: cause instanceof ApiError ? cause.message : "Please try again.",
      });
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  }

  const addStudioLink = (
    <Link
      href="/dashboard/studios/new"
      className={cn(buttonVariants(), ACCENT_BUTTON_CLASS, "gap-1.5")}
    >
      <CirclePlusIcon aria-hidden="true" />
      Add New Studio
    </Link>
  );

  return (
    <>
      <DashboardHeading
        title="My Studio Listings"
        description="Edit your spaces, check how they're rated, and keep them up to date."
        action={studios?.length ? addStudioLink : undefined}
      />

      <div className="mt-8">
        {error && !studios ? (
          <DashboardError error={error} onRetry={reload} />
        ) : isLoading || !studios ? (
          <DashboardListSkeleton />
        ) : studios.length === 0 ? (
          <DashboardMessage
            icon={BuildingIcon}
            title="You haven't listed a studio yet"
            description="Add your space to start receiving booking requests from creators."
            action={addStudioLink}
          />
        ) : (
          <ul className="flex flex-col gap-4">
            {studios.map((studio) => (
              <li
                key={studio.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center"
              >
                <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:aspect-[4/3] sm:w-36">
                  <Image
                    src={studio.image}
                    alt={studio.imageAlt}
                    fill
                    sizes="(min-width: 640px) 144px, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-heading text-lg font-medium">{studio.title}</h2>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">
                    {categoryLabel(studio.category)} · {studio.location}
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <span className="font-medium">{formatMoney(studio.hourlyRate)} / hour</span>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <StarIcon className="size-3.5" aria-hidden="true" />
                      {studio.reviewCount > 0
                        ? `${studio.rating.toFixed(1)} (${studio.reviewCount})`
                        : "No reviews yet"}
                    </span>
                    <span className="text-muted-foreground">Seats {studio.capacity}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 sm:flex-col lg:flex-row">
                  <Link
                    href={`/studios/${studio.slug}`}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
                  >
                    <ExternalLinkIcon aria-hidden="true" />
                    View
                  </Link>
                  <Link
                    href={`/dashboard/studios/${studio.id}/edit`}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
                  >
                    <PencilIcon aria-hidden="true" />
                    Edit
                  </Link>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setToDelete(studio)}
                    className="gap-1.5 text-destructive hover:text-destructive"
                  >
                    <Trash2Icon aria-hidden="true" />
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmDialog
        open={toDelete !== null}
        title={`Delete ${toDelete?.title ?? "this listing"}?`}
        description="This removes the listing and its reviews for good. Past bookings stay in your history. Listings with upcoming bookings can't be deleted."
        confirmLabel="Delete listing"
        pending={deleting}
        onConfirm={() => void handleDelete()}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
