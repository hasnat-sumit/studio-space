import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Sign In - StudioSpace",
  description:
    "Sign in to StudioSpace to book creative workspaces and manage your studio listings.",
};

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to StudioSpace"
      description="Pick up where you left off — your bookings and listings are waiting."
    >
      <LoginForm />
    </AuthShell>
  );
}
