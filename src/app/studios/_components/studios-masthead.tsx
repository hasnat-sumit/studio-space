/**
 * Static page masthead for `/studios`.
 *
 * Shared by `page.tsx` and `loading.tsx` so the header renders identically
 * while the catalogue streams in.
 */
export function StudiosMasthead() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-4 pt-12 pb-10 sm:px-6 sm:pt-16 sm:pb-12 lg:px-8">
        <p className="text-xs font-medium tracking-[0.2em] text-brand-accent uppercase">
          Explore studios
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
          Find Your Creative Space
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          Hourly studios, stages, and suites from trusted hosts — narrow the
          list by category, price, and capacity until it fits your project.
        </p>
      </div>
    </header>
  );
}
