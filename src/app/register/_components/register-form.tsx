"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2Icon, UserPlusIcon } from "lucide-react";
import { toast } from "sonner";
import { GoogleButton } from "@/components/auth/google-button";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { passwordProblem } from "@/lib/password";
import { cn } from "@/lib/utils";

function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Registration form. Creates the account through Better Auth, then sends the
 * user to log in, keeping `?next=` so they still end up where they were heading.
 */
export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    photoUrl?: string;
    password?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = "Name is required.";
    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      nextErrors.email = "Enter a valid email address.";
    if (photoUrl.trim() && !isHttpUrl(photoUrl.trim()))
      nextErrors.photoUrl = "Enter a full link, starting with https://.";
    const problem = passwordProblem(password);
    if (problem) nextErrors.password = problem;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
      ...(photoUrl.trim() ? { image: photoUrl.trim() } : {}),
    });

    if (error) {
      setSubmitting(false);
      toast.error("Couldn't create your account", {
        description: error.message ?? "Please try again in a moment.",
      });
      return;
    }

    toast.success("Account created", { description: "Log in to get started." });
    router.replace(`/login${window.location.search}`);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
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
        <Label htmlFor="photo-url">Photo URL (optional)</Label>
        <Input
          id="photo-url"
          type="url"
          autoComplete="photo"
          placeholder="https://example.com/you.jpg"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          aria-invalid={errors.photoUrl ? true : undefined}
          aria-describedby={errors.photoUrl ? "photo-url-error" : undefined}
          className="h-10"
        />
        {errors.photoUrl ? (
          <p id="photo-url-error" className="text-sm text-destructive">
            {errors.photoUrl}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? "password-error" : "password-hint"}
          className="h-10"
        />
        {errors.password ? (
          <p id="password-error" className="text-sm text-destructive">
            {errors.password}
          </p>
        ) : (
          <p id="password-hint" className="text-sm text-muted-foreground">
            Use at least 6 characters, with an uppercase and a lowercase letter.
          </p>
        )}
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
        {submitting ? "Registering…" : "Register"}
      </Button>

      <GoogleButton label="Continue with Google" />

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
        Login
      </Link>
    </form>
  );
}
