import { apiRequest } from "@/lib/api/client";
import type { UserProfile } from "@/types/auth";
import type { Booking, BookingAction, DashboardSummary } from "@/types/booking";
import type { StudioReview } from "@/types/review";
import type { Studio, StudioAmenityId, StudioCategory, StudioImage } from "@/types/studio";

/**
 * Browser-side calls for signed-in users. Each one sends the session cookie and
 * throws an `ApiError` carrying the API's message (and field errors, if any).
 * There is deliberately no mock fallback: these act on real data only.
 */

export interface StudioInput {
  title: string;
  category: StudioCategory;
  location: string;
  hourlyRate: number;
  deposit: number;
  capacity: number;
  description: string;
  overview: string[];
  amenities: StudioAmenityId[];
  gallery: StudioImage[];
}

export function getMyStudios(): Promise<Studio[]> {
  return apiRequest<Studio[]>("/studios/mine");
}

export function getStudioById(id: string): Promise<Studio> {
  return apiRequest<Studio>(`/studios/${encodeURIComponent(id)}`);
}

export function createStudio(input: StudioInput): Promise<Studio> {
  return apiRequest<Studio>("/studios", { method: "POST", body: input });
}

export function updateStudio(id: string, input: Partial<StudioInput>): Promise<Studio> {
  return apiRequest<Studio>(`/studios/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: input,
  });
}

export function deleteStudio(id: string): Promise<void> {
  return apiRequest<void>(`/studios/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export function getStudioBookedSlots(
  studioId: string,
  date: string
): Promise<{ date: string; bookedSlots: string[] }> {
  return apiRequest(
    `/studios/${encodeURIComponent(studioId)}/availability?date=${encodeURIComponent(date)}`
  );
}

export function createBooking(input: {
  studioId: string;
  date: string;
  start: string;
  end: string;
  notes?: string;
}): Promise<Booking> {
  return apiRequest<Booking>("/bookings", { method: "POST", body: input });
}

export function getMyBookings(limit: number): Promise<Booking[]> {
  return apiRequest<Booking[]>(`/bookings/mine?limit=${limit}`);
}

export function getHostBookings(limit: number): Promise<Booking[]> {
  return apiRequest<Booking[]>(`/bookings/host?limit=${limit}`);
}

export function updateBookingStatus(id: string, status: BookingAction): Promise<Booking> {
  return apiRequest<Booking>(`/bookings/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    body: { status },
  });
}

export function getDashboardSummary(): Promise<DashboardSummary> {
  return apiRequest<DashboardSummary>("/dashboard/summary");
}

export function getProfile(): Promise<UserProfile> {
  return apiRequest<UserProfile>("/users/me");
}

export function updateProfile(
  input: Partial<Omit<UserProfile, "id" | "email" | "joinedAt">>
): Promise<UserProfile> {
  return apiRequest<UserProfile>("/users/me", { method: "PATCH", body: input });
}

export function deleteReview(id: string): Promise<void> {
  return apiRequest<void>(`/reviews/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export function createReview(
  studioSlug: string,
  input: { rating: number; comment: string; projectType: string }
): Promise<StudioReview> {
  return apiRequest<StudioReview>(`/studios/${encodeURIComponent(studioSlug)}/reviews`, {
    method: "POST",
    body: input,
  });
}
