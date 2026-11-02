"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { deleteReview } from "@/lib/api/account";
import { ApiError } from "@/lib/api/client";

interface ReviewDeleteButtonProps {
  reviewId: string;
  authorId?: string;
}

/** Shown only on the signed-in user's own review. The API enforces this too. */
export function ReviewDeleteButton({ reviewId, authorId }: ReviewDeleteButtonProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!user || user.id !== authorId) return null;

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteReview(reviewId);
      toast.success("Your review was deleted");
      setConfirming(false);
      router.refresh();
    } catch (cause) {
      toast.error("Couldn't delete your review", {
        description: cause instanceof ApiError ? cause.message : "Please try again.",
      });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setConfirming(true)}
        className="mt-3 w-fit gap-1.5 text-destructive hover:text-destructive"
      >
        <Trash2Icon aria-hidden="true" />
        Delete my review
      </Button>
      <ConfirmDialog
        open={confirming}
        title="Delete your review?"
        description="It will be removed from this studio and its rating updated. This can't be undone."
        confirmLabel="Delete review"
        pending={deleting}
        onConfirm={() => void handleDelete()}
        onCancel={() => setConfirming(false)}
      />
    </>
  );
}
