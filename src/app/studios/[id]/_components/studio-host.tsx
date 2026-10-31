import { ClockIcon, ShieldCheckIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import type { Studio } from "@/types/studio";

interface StudioHostProps {
  host: Studio["host"];
}

/**
 * Public host card.
 *
 * Shows only what a stranger may see — the contact affordance is an explicit
 * placeholder until bookings connect private messaging.
 */
export function StudioHost({ host }: StudioHostProps) {
  return (
    <section aria-labelledby="host-heading" className="mt-14 border-t border-border pt-10">
      <h2
        id="host-heading"
        className="font-heading text-2xl font-semibold tracking-tight"
      >
        Meet your host
      </h2>

      <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:p-6">
        <Avatar className="size-14">
          {host.avatar ? <AvatarImage src={host.avatar} alt="" /> : null}
          <AvatarFallback className="bg-brand-accent/15 font-heading text-base text-brand-accent">
            {getInitials(host.name)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="font-heading text-lg font-medium">{host.name}</p>
          <p className="text-sm text-muted-foreground">{host.tagline}</p>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="size-3.5 shrink-0" aria-hidden="true" />
              {host.responseNote}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheckIcon className="size-3.5 shrink-0" aria-hidden="true" />
              Hosting since {host.joinedYear}
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled
          aria-disabled="true"
          className="shrink-0 border-brand-border bg-transparent text-brand-fg hover:bg-brand-fg/10 hover:text-brand-fg dark:border-brand-border dark:bg-transparent dark:hover:bg-brand-fg/10"
        >
          Message host
        </Button>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Host contact details stay private — messaging opens once bookings are
        connected.
      </p>
    </section>
  );
}
