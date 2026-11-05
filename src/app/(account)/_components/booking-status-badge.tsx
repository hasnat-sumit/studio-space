import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/types/booking";

const STATUS: Record<BookingStatus, { label: string; className: string }> = {
  pending: { label: "Awaiting host", className: "bg-brand-accent/10 text-brand-accent" },
  confirmed: { label: "Confirmed", className: "bg-primary/10 text-foreground" },
  completed: { label: "Completed", className: "bg-muted text-foreground" },
  declined: { label: "Declined", className: "bg-destructive/10 text-destructive" },
  cancelled: { label: "Cancelled", className: "bg-muted text-muted-foreground" },
};

interface BookingStatusBadgeProps {
  status: BookingStatus;
  role: "host" | "guest";
}

export function BookingStatusBadge({ status, role }: BookingStatusBadgeProps) {
  const { label, className } = STATUS[status];
  return (
    <Badge variant="secondary" className={cn("shrink-0", className)}>
      {status === "pending" && role === "host" ? "Needs your response" : label}
    </Badge>
  );
}
