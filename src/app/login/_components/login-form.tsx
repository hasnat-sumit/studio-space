"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2Icon, LogInIcon } from "lucide-react";
import { toast } from "sonner";
import { GoogleButton } from "@/components/auth/google-button";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { authClient, safeNextPath } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

/**
 * Login form. Signs in through Better Auth, then returns to `?next=` (read at
 * submit time, so the page itself stays static) or the home page.
 */
export function LoginForm() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: typeof errors = {};
    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Password is required.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const { error } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });

    if (error) {
      setSubmitting(false);
      toast.error("Couldn't sign you in", {
        description:
          error.status === 401
            ? "That email and password don't match."
            : (error.message ?? "Please try again in a moment."),
      });
      return;
    }

    await refresh();
    toast.success("Welcome back");
    const next = new URLSearchParams(window.location.search).get("next");
    router.replace(safeNextPath(next));
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="h-10"
        />
        {errors.email ? (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <button
            type="button"
            onClick={() =>
              toast.info("Password reset isn't live yet", {
                description: "Resetting by email needs an email service, which isn't set up.",
              })
            }
            className="rounded text-sm text-brand-accent outline-none transition-colors hover:text-brand-accent/80 focus-visible:ring-3 focus-visible:ring-brand-accent/40"
          >
            Forgot password?
          </button>
        </div>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? "password-error" : undefined}
          className="h-10"
        />
        {errors.password ? (
          <p id="password-error" className="text-sm text-destructive">
            {errors.password}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="mt-1 h-10 gap-2 bg-brand-accent text-[15px] text-brand-on-accent shadow-sm hover:bg-brand-accent/90 hover:text-brand-on-accent focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/30"
      >
        {submitting ? (
          <Loader2Icon className="animate-spin" aria-hidden="true" />
        ) : (
          <LogInIcon aria-hidden="true" />
        )}
        {submitting ? "Logging in…" : "Login"}
      </Button>

      <GoogleButton label="Continue with Google" />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs tracking-wide text-muted-foreground uppercase">
          New to StudioSpace?
        </span>
        <Separator className="flex-1" />
      </div>

      <Link
        href="/register"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-10 text-[15px]"
        )}
      >
        Register
      </Link>
    </form>
  );
}
