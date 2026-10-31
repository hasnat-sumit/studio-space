import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

export interface Step {
  /** Two-digit display number, e.g. "01". */
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface StepFlowProps {
  /** Optional in-page anchor id. */
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  steps: readonly Step[];
  /** "muted" renders the section as a bordered tinted band. */
  variant?: "default" | "muted";
  className?: string;
}

/**
 * Numbered four-step flow used by the "How It Works" page (booking process
 * and listing process). Renders its own `<section>` with the standard
 * marketing container and cadence.
 */
export function StepFlow({
  id,
  eyebrow,
  title,
  description,
  steps,
  variant = "default",
  className,
}: StepFlowProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-24",
        variant === "muted" && "border-y border-border bg-muted/40",
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.number}
              className="rounded-2xl border border-border bg-card p-6 animate-in fade-in-50 fill-mode-both duration-500"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-accent/10 text-brand-accent ring-1 ring-brand-accent/20">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-heading text-sm font-semibold tracking-[0.2em] text-brand-accent/70">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-5 font-heading text-lg font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
