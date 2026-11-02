"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { FormField } from "@/components/shared/form-field";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createStudio, updateStudio, type StudioInput } from "@/lib/api/account";
import { ApiError } from "@/lib/api/client";
import { AMENITIES, AMENITY_IDS } from "@/lib/amenities";
import { STUDIO_CATEGORIES } from "@/lib/categories";
import { cn } from "@/lib/utils";
import type { Studio, StudioAmenityId, StudioCategory } from "@/types/studio";
import { ACCENT_BUTTON_CLASS } from "../../_components/dashboard-states";

const CATEGORY_ITEMS = STUDIO_CATEGORIES.map((category) => ({
  value: category.slug,
  label: category.name,
}));

const MAX_PHOTOS = 8;
const PHOTO_HOST = "images.unsplash.com";

type Errors = Record<string, string | undefined>;

interface PhotoRow {
  /** Stable list key; photo rows have no natural id while being edited. */
  key: number;
  src: string;
  alt: string;
}

interface StudioFormProps {
  /** The listing being edited; omit to create a new one. */
  studio?: Studio;
}

function isAllowedPhotoUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === PHOTO_HOST;
  } catch {
    return false;
  }
}

/** The form is long, so bring the first problem into view once errors have rendered. */
function focusFirstError() {
  requestAnimationFrame(() => {
    const first = document.querySelector<HTMLElement>(
      'form [aria-invalid="true"], form [role="alert"]'
    );
    first?.focus();
    first?.scrollIntoView({ block: "center" });
  });
}

/** Create/edit form for a listing. The API re-validates everything it receives. */
export function StudioForm({ studio }: StudioFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(studio?.title ?? "");
  const [category, setCategory] = useState<StudioCategory | "">(studio?.category ?? "");
  const [location, setLocation] = useState(studio?.location ?? "");
  const [hourlyRate, setHourlyRate] = useState(studio ? String(studio.hourlyRate) : "");
  const [deposit, setDeposit] = useState(studio ? String(studio.deposit) : "0");
  const [capacity, setCapacity] = useState(studio ? String(studio.capacity) : "");
  const [description, setDescription] = useState(studio?.description ?? "");
  const [overview, setOverview] = useState(studio?.overview.join("\n\n") ?? "");
  const [amenities, setAmenities] = useState<StudioAmenityId[]>(studio?.amenities ?? []);
  const [photos, setPhotos] = useState<PhotoRow[]>(
    studio?.gallery.length
      ? studio.gallery.map((photo, index) => ({ key: index, ...photo }))
      : [{ key: 0, src: "", alt: "" }]
  );
  const [nextKey, setNextKey] = useState(photos.length);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  function updatePhoto(key: number, field: "src" | "alt", value: string) {
    setPhotos((rows) => rows.map((row) => (row.key === key ? { ...row, [field]: value } : row)));
  }

  function addPhoto() {
    setPhotos((rows) => [...rows, { key: nextKey, src: "", alt: "" }]);
    setNextKey((key) => key + 1);
  }

  function toggleAmenity(id: StudioAmenityId, checked: boolean) {
    setAmenities((current) =>
      checked ? [...current, id] : current.filter((amenity) => amenity !== id)
    );
  }

  function validate(): Errors {
    const next: Errors = {};
    if (title.trim().length < 3) next.title = "Title must be at least 3 characters.";
    if (!category) next.category = "Choose a category.";
    if (location.trim().length < 2) next.location = "Location is required.";
    if (!(Number(hourlyRate) >= 1)) next.hourlyRate = "Hourly rate must be at least $1.";
    if (deposit === "" || !(Number(deposit) >= 0)) next.deposit = "Deposit can't be negative.";
    if (!(Number(capacity) >= 1) || !Number.isInteger(Number(capacity)))
      next.capacity = "Capacity must be a whole number of at least 1.";
    if (description.trim().length < 10)
      next.description = "Summary must be at least 10 characters.";
    if (!overview.trim()) next.overview = "Add an overview.";
    if (photos.some((photo) => !isAllowedPhotoUrl(photo.src.trim())))
      next.gallery = `Each photo needs an https://${PHOTO_HOST} link.`;
    else if (photos.some((photo) => !photo.alt.trim()))
      next.gallery = "Describe each photo for people using screen readers.";
    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !category) {
      toast.error("Please check the highlighted fields.");
      focusFirstError();
      return;
    }

    const input: StudioInput = {
      title: title.trim(),
      category,
      location: location.trim(),
      hourlyRate: Number(hourlyRate),
      deposit: Number(deposit),
      capacity: Number(capacity),
      description: description.trim(),
      // A blank line separates paragraphs.
      overview: overview
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
      amenities,
      gallery: photos.map((photo) => ({ src: photo.src.trim(), alt: photo.alt.trim() })),
    };

    setSubmitting(true);
    try {
      if (studio) {
        await updateStudio(studio.id, input);
        toast.success("Listing updated");
      } else {
        await createStudio(input);
        toast.success("Your studio is live");
      }
      router.push("/dashboard/studios");
    } catch (cause) {
      setSubmitting(false);
      if (cause instanceof ApiError) {
        const fromApi: Errors = {};
        for (const [field, messages] of Object.entries(cause.fieldErrors)) {
          fromApi[field] = messages?.[0];
        }
        setErrors(fromApi);
        focusFirstError();
        toast.error("Couldn't save this listing", { description: cause.message });
      } else {
        toast.error("Couldn't save this listing", { description: "Please try again." });
      }
    }
  }

  return (
    <form onSubmit={(event) => void handleSubmit(event)} noValidate className="flex flex-col gap-8">
      <fieldset className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <legend className="px-1 font-heading text-lg font-medium">The basics</legend>

        <FormField id="title" label="Studio name" error={errors.title}>
          <Input
            id="title"
            value={title}
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={errors.title ? true : undefined}
            aria-describedby={errors.title ? "title-error" : undefined}
            placeholder="Noir Photo Studio"
            className="h-10"
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="category" label="Category" error={errors.category}>
            <Select
              value={category}
              items={CATEGORY_ITEMS}
              onValueChange={(value) => setCategory((value as StudioCategory | null) ?? "")}
            >
              <SelectTrigger
                id="category"
                aria-invalid={errors.category ? true : undefined}
                className="h-10 w-full"
              >
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_ITEMS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField id="location" label="Location" error={errors.location}>
            <Input
              id="location"
              value={location}
              maxLength={120}
              onChange={(e) => setLocation(e.target.value)}
              aria-invalid={errors.location ? true : undefined}
              aria-describedby={errors.location ? "location-error" : undefined}
              placeholder="Brooklyn, New York"
              className="h-10"
            />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <FormField id="hourlyRate" label="Hourly rate (USD)" error={errors.hourlyRate}>
            <Input
              id="hourlyRate"
              type="number"
              inputMode="decimal"
              min={1}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              aria-invalid={errors.hourlyRate ? true : undefined}
              aria-describedby={errors.hourlyRate ? "hourlyRate-error" : undefined}
              className="h-10"
            />
          </FormField>
          <FormField id="deposit" label="Refundable deposit (USD)" error={errors.deposit}>
            <Input
              id="deposit"
              type="number"
              inputMode="decimal"
              min={0}
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              aria-invalid={errors.deposit ? true : undefined}
              aria-describedby={errors.deposit ? "deposit-error" : undefined}
              className="h-10"
            />
          </FormField>
          <FormField id="capacity" label="Maximum guests" error={errors.capacity}>
            <Input
              id="capacity"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              aria-invalid={errors.capacity ? true : undefined}
              aria-describedby={errors.capacity ? "capacity-error" : undefined}
              className="h-10"
            />
          </FormField>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <legend className="px-1 font-heading text-lg font-medium">Describe the space</legend>

        <FormField
          id="description"
          label="One-line summary"
          error={errors.description}
          hint="Shown on listing cards. Up to 200 characters."
        >
          <Input
            id="description"
            value={description}
            maxLength={200}
            onChange={(e) => setDescription(e.target.value)}
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={errors.description ? "description-error" : undefined}
            className="h-10"
          />
        </FormField>

        <FormField
          id="overview"
          label="Overview"
          error={errors.overview}
          hint="Leave a blank line between paragraphs. Up to 6 paragraphs."
        >
          <Textarea
            id="overview"
            rows={6}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            aria-invalid={errors.overview ? true : undefined}
            aria-describedby={errors.overview ? "overview-error" : undefined}
          />
        </FormField>
      </fieldset>

      <fieldset className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <legend className="px-1 font-heading text-lg font-medium">Amenities</legend>
        <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITY_IDS.map((id) => (
            <label key={id} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <Checkbox
                checked={amenities.includes(id)}
                onCheckedChange={(checked) => toggleAmenity(id, checked)}
              />
              {AMENITIES[id].label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <legend className="px-1 font-heading text-lg font-medium">Photos</legend>
        <p className="text-sm text-muted-foreground">
          The first photo is your cover image. Paste links from {PHOTO_HOST} for now; direct
          uploads aren&apos;t available yet.
        </p>

        {photos.map((photo, index) => (
          <div
            key={photo.key}
            className="grid gap-3 rounded-xl border border-border p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
          >
            <FormField id={`photo-src-${photo.key}`} label={`Photo ${index + 1} link`}>
              <Input
                id={`photo-src-${photo.key}`}
                type="url"
                value={photo.src}
                onChange={(e) => updatePhoto(photo.key, "src", e.target.value)}
                placeholder={`https://${PHOTO_HOST}/photo-…`}
                className="h-10"
              />
            </FormField>
            <FormField id={`photo-alt-${photo.key}`} label="What does it show?">
              <Input
                id={`photo-alt-${photo.key}`}
                value={photo.alt}
                maxLength={200}
                onChange={(e) => updatePhoto(photo.key, "alt", e.target.value)}
                placeholder="Sunlit loft with a long wooden table"
                className="h-10"
              />
            </FormField>
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={photos.length === 1}
              aria-label={`Remove photo ${index + 1}`}
              onClick={() => setPhotos((rows) => rows.filter((row) => row.key !== photo.key))}
              className="size-10"
            >
              <Trash2Icon aria-hidden="true" />
            </Button>
          </div>
        ))}

        {errors.gallery ? (
          <p role="alert" className="text-sm text-destructive">
            {errors.gallery}
          </p>
        ) : null}

        <Button
          type="button"
          variant="outline"
          disabled={photos.length >= MAX_PHOTOS}
          onClick={addPhoto}
          className="w-fit gap-1.5"
        >
          <PlusIcon aria-hidden="true" />
          Add another photo
        </Button>
      </fieldset>

      <div className="flex flex-wrap justify-end gap-3">
        <Link
          href="/dashboard/studios"
          className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6")}
        >
          Cancel
        </Link>
        <Button
          type="submit"
          disabled={submitting}
          className={cn(ACCENT_BUTTON_CLASS, "h-11 gap-2 px-6 text-[15px]")}
        >
          {submitting ? <Loader2Icon className="animate-spin" aria-hidden="true" /> : null}
          {studio ? "Save changes" : "Publish listing"}
        </Button>
      </div>
    </form>
  );
}
