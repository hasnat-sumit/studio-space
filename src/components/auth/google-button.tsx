"use client";

import { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient, safeNextPath } from "@/lib/auth-client";

/** Why Better Auth sent the user back from Google, as `?error=` on this page. */
function googleErrorMessage(code: string): string | null {
  switch (code.toLowerCase()) {
    case "access_denied":
      return null;
    case "account_not_linked":
      return "This email already has a StudioSpace password. Sign in with it instead.";
    default:
      return "Please try again in a moment.";
  }
}

/**
 * Starts Google sign-in, which also creates the account on first use. Google
 * returns through the API, so both destinations must be absolute client URLs.
 */
export function GoogleButton({ label }: { label: string }) {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("error");
    if (!code) return;

    const description = googleErrorMessage(code);
    if (description) {
      toast.error("Couldn't continue with Google", {
        id: "google-error",
        description,
      });
    }
    url.searchParams.delete("error");
    url.searchParams.delete("error_description");
    window.history.replaceState(null, "", url);
  }, []);

  async function handleClick() {
    setRedirecting(true);
    const { origin, pathname, search } = window.location;
    const next = new URLSearchParams(search).get("next");

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${origin}${safeNextPath(next)}`,
      errorCallbackURL: `${origin}${pathname}${search}`,
    });

    if (error) {
      setRedirecting(false);
      toast.error("Couldn't continue with Google", {
        description:
          error.code === "PROVIDER_NOT_FOUND"
            ? "Google sign-in isn't set up yet. Use your email and password for now."
            : (error.message ?? "Please try again in a moment."),
      });
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={redirecting}
      onClick={() => void handleClick()}
      className="h-10 gap-2 text-[15px]"
    >
      {redirecting ? (
        <Loader2Icon className="animate-spin" aria-hidden="true" />
      ) : (
        <GoogleIcon />
      )}
      {label}
    </Button>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
