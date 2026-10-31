import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface FeatureGridProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  features: readonly Feature[];
  align?: "left" | "center";
  /** "muted" renders the section as a bordered tinted band for rhythm. */
  variant?: "default" | "muted";
  className?: string;
}

/**
 * Icon + heading + copy grid used for value propositions ("Why StudioSpace?")
 * and brand values ("Our Values"). Borderless cards on the page surface, with
 * the same staggered fade-in used across the marketing pages.
 */
export function FeatureGrid({
  id,
  eyebrow,
  title,
  description,
  features,
  align = "center",
  variant = "default",
  className,
}: FeatureGridProps) {
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
          align={align}
        />

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <li
              key={feature.title}
              className={cn(
                "animate-in fade-in-50 fill-mode-both duration-500",
                align === "center" && "text-center"
              )}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <span
                className={cn(
                  "grid size-12 shrink-0 place-items-center rounded-xl bg-brand-accent/10 text-brand-accent ring-1 ring-brand-accent/20",
                  align === "center" && "mx-auto"
                )}
              >
                <feature.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-medium tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
