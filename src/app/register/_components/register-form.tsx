"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2Icon, UserPlusIcon } from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/**
 * Registration form — UI only while Better Auth is deferred.
 * Client-side validation runs, then the submit explains that authentication
 * isn't wired yet instead of pretending an account was created. Swap the
 * `onSubmit` body for Better Auth's `authClient.signUp.email()` later.
 */
export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = "Name is required.";
    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Password is required.";
    else if (password.length < 8)
      nextErrors.password = "Password must be at least 8 characters.";
    if (!confirmPassword)
      nextErrors.confirmPassword = "Confirm your password.";
    else if (confirmPassword !== password)
      nextErrors.confirmPassword = "Passwords don't match.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    // Simulate the round-trip so the pending state is visible, then be
    // honest: no account exists until Better Auth ships.
    window.setTimeout(() => {
      setSubmitting(false);
      toast.info("Registration isn't live yet", {
        description:
          "Authentication is coming soon — this preview validates your input only.",
      });
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="h-10"
        />
        {errors.name ? (
          <p id="name-error" className="text-sm text-destructive">
            {errors.name}
          </p>
        ) : null}
      </div>

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
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
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

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirm-password">Confirm password</Label>
        <Input
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          aria-invalid={errors.confirmPassword ? true : undefined}
          aria-describedby={
            errors.confirmPassword ? "confirm-password-error" : undefined
          }
          className="h-10"
        />
        {errors.confirmPassword ? (
          <p id="confirm-password-error" className="text-sm text-destructive">
            {errors.confirmPassword}
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
          <UserPlusIcon aria-hidden="true" />
        )}
        {submitting ? "Creating account…" : "Create account"}
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs tracking-wide text-muted-foreground uppercase">
          Already a member?
        </span>
        <Separator className="flex-1" />
      </div>

      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-10 text-[15px]"
        )}
      >
        Sign in instead
      </Link>
    </form>
  );
}
