/** The first rule `password` breaks, or null when it's fine. The API enforces the same rules. */
export function passwordProblem(password: string): string | null {
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must include a lowercase letter.";
  return null;
}
