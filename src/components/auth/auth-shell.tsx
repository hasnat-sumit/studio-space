import Image from "next/image";
import { unsplash } from "@/lib/images";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

const AUTH_IMAGE = unsplash("photo-1497366754035-f200968a6e72", 1200);

/**
 * Split layout shared by `/login` and `/register`: brand panel with studio
 * photography on the left (hidden below `lg`), form card on the right.
 * Server component — the forms themselves opt into `"use client"`.
 * Renders inside the root layout, so the navbar supplies the logo and the
 * min-height subtracts its `h-16`.
 */
export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: AuthShellProps) {
  return (
    <div className="grid min-h-[calc(100svh-4rem)] lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-charcoal lg:block">
        <Image
          src={AUTH_IMAGE}
          alt="Sunlit open-plan creative studio with plants and large windows"
          fill
          sizes="50vw"
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

        <div className="relative flex h-full flex-col justify-end p-10 text-cream xl:p-14">
          <div className="max-w-md">
            <p className="text-xs font-medium tracking-[0.2em] text-brand-accent uppercase">
              Create. Collaborate. Book by the hour.
            </p>
            <p className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance">
              Every great work starts with the right room.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream/70 text-pretty">
              Verified photo studios, sound stages, podcast booths, and music
              suites — ready when you are.
            </p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col px-4 py-10 sm:px-10 sm:py-14 lg:px-16">
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          <p className="text-xs font-medium tracking-[0.2em] text-brand-accent uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
