const UNSPLASH_BASE = "https://images.unsplash.com";

/**
 * Builds a CDN URL for an Unsplash photo.
 *
 * `photoId` is the Unsplash photo identifier (the `photo-…` segment of its URL).
 * `width` is the render width in pixels; request ~2× the largest on-screen size
 * so the image stays crisp on retina displays.
 */
export function unsplash(photoId: string, width: number): string {
  return `${UNSPLASH_BASE}/${photoId}?auto=format&fit=crop&q=80&w=${width}`;
}
