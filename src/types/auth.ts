export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

/** The signed-in user's editable profile (`GET /users/me`). */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  /** Public: shown on the host card of the user's listings. */
  tagline: string;
  /** Public: shown on the host card of the user's listings. */
  responseNote: string;
  bio: string;
  location: string;
  /** Private: never shown on public pages. */
  phone: string;
}
