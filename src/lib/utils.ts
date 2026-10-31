export { cn } from "cn";

/** Up to two uppercase initials for avatar fallbacks ("Aria Vale" → "AV"). */
export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
