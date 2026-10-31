"use client";

import type { ReactNode } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STUDIO_CATEGORIES } from "@/lib/categories";
import {
  CAPACITY_OPTIONS,
  DEFAULT_STUDIO_SORT,
  PRICE_BAND_OPTIONS,
  STUDIO_SORT_OPTIONS,
  UNFILTERED,
  countActiveFilters,
} from "@/lib/studio-query";
import { cn } from "@/lib/utils";
import type {
  StudioCapacityFilter,
  StudioCategory,
  StudioPriceBand,
  StudioQuery,
  StudioSort,
} from "@/types/studio";

/**
 * Search + filter controls for the Explore Studios page.
 *
 * Presentational: every change is reported through `onChange` as a patch so
 * the parent explorer owns the state (and can reset paging on each change).
 */

const CATEGORY_ITEMS = [
  { value: UNFILTERED, label: "All categories" },
  ...STUDIO_CATEGORIES.map((category) => ({
    value: category.slug as string,
    label: category.name,
  })),
];

const PRICE_ITEMS = PRICE_BAND_OPTIONS.map((option) => ({
  value: option.value as string,
  label: option.label,
}));

const CAPACITY_ITEMS = CAPACITY_OPTIONS.map((option) => ({
  value: option.value as string,
  label: option.label,
}));

const SORT_ITEMS = STUDIO_SORT_OPTIONS.map((option) => ({
  value: option.value as string,
  label: option.label,
}));

interface FilterFieldProps {
  label: string;
  className?: string;
  children: ReactNode;
}

/** Visible micro-label above a filter control. */
function FilterField({ label, className, children }: FilterFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}

const TRIGGER_CLASS = "h-11 w-full border-brand-border bg-transparent";

export interface StudioSortSelectProps {
  value: StudioSort;
  onChange: (sort: StudioSort) => void;
}

/** Sort order control, shown beside the result count. */
export function StudioSortSelect({ value, onChange }: StudioSortSelectProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase"
      >
        Sort by
      </span>
      <Select
        value={value}
        items={SORT_ITEMS}
        onValueChange={(next) =>
          onChange((next ?? DEFAULT_STUDIO_SORT) as StudioSort)
        }
      >
        <SelectTrigger
          size="sm"
          aria-label="Sort studios by"
          className={cn(TRIGGER_CLASS, "w-44 sm:w-48")}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STUDIO_SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export interface StudioFiltersProps {
  query: StudioQuery;
  onChange: (patch: Partial<StudioQuery>) => void;
  onClearAll: () => void;
}

export function StudioFilters({
  query,
  onChange,
  onClearAll,
}: StudioFiltersProps) {
  const activeFilters = countActiveFilters(query);

  return (
    <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end">
      <FilterField label="Search" className="w-full lg:max-w-xs lg:shrink-0">
        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query.q ?? ""}
            onChange={(event) =>
              onChange({ q: event.target.value || undefined })
            }
            placeholder="Studio name or city"
            aria-label="Search studios by name or location"
            className="h-11 border-brand-border pr-3 pl-9"
          />
        </div>
      </FilterField>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:items-end">
        <FilterField label="Category" className="w-full lg:w-48">
          <Select
            value={query.category ?? UNFILTERED}
            items={CATEGORY_ITEMS}
            onValueChange={(next) => {
              const value = next ?? UNFILTERED;
              onChange({
                category:
                  value === UNFILTERED ? undefined : (value as StudioCategory),
              });
            }}
          >
            <SelectTrigger aria-label="Filter by category" className={TRIGGER_CLASS}>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterField>

        <FilterField label="Hourly price" className="w-full lg:w-44">
          <Select
            value={query.price ?? UNFILTERED}
            items={PRICE_ITEMS}
            onValueChange={(next) => {
              const value = next ?? UNFILTERED;
              onChange({
                price:
                  value === UNFILTERED ? undefined : (value as StudioPriceBand),
              });
            }}
          >
            <SelectTrigger aria-label="Filter by hourly price" className={TRIGGER_CLASS}>
              <SelectValue placeholder="Any price" />
            </SelectTrigger>
            <SelectContent>
              {PRICE_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterField>

        <FilterField label="Capacity" className="w-full lg:w-40">
          <Select
            value={query.capacity ?? UNFILTERED}
            items={CAPACITY_ITEMS}
            onValueChange={(next) => {
              const value = next ?? UNFILTERED;
              onChange({
                capacity:
                  value === UNFILTERED
                    ? undefined
                    : (value as StudioCapacityFilter),
              });
            }}
          >
            <SelectTrigger aria-label="Filter by capacity" className={TRIGGER_CLASS}>
              <SelectValue placeholder="Any capacity" />
            </SelectTrigger>
            <SelectContent>
              {CAPACITY_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterField>
      </div>

      {activeFilters > 0 ? (
        <Button
          type="button"
          variant="ghost"
          onClick={onClearAll}
          className="h-11 gap-1.5 px-3 text-muted-foreground hover:text-foreground lg:ml-auto"
        >
          <XIcon aria-hidden="true" />
          Clear all
        </Button>
      ) : null}
    </div>
  );
}
