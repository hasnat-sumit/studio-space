import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "./_components/register-form";

export const metadata: Metadata = {
  title: "Create Account - StudioSpace",
  description:
    "Create a StudioSpace account to book creative workspaces by the hour or list your own studio.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      description="One account to book studios by the hour and list your own space."
    >
      <RegisterForm />
    </AuthShell>
  );
}
