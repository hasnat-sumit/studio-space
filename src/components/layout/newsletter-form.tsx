"use client";

import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/lib/api/account";
import { ApiError } from "@/lib/api/client";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error("Enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      await subscribeToNewsletter(email.trim());
      toast.success("You're on the list");
      setEmail("");
    } catch (cause) {
      toast.error("Couldn't sign you up", {
        description: cause instanceof ApiError ? cause.message : "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      noValidate
      className="mt-4 flex gap-2"
    >
      <Input
        type="email"
        autoComplete="email"
        aria-label="Email address"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="h-10 min-w-0 flex-1 border-cream/20 bg-cream/5 text-cream placeholder:text-cream/40 dark:bg-cream/5"
      />
      <Button
        type="submit"
        disabled={submitting}
        className="h-10 shrink-0 bg-brand-accent px-4 text-brand-on-accent hover:bg-brand-accent/90 hover:text-brand-on-accent"
      >
        {submitting ? (
          <Loader2Icon className="animate-spin" aria-hidden="true" />
        ) : null}
        Subscribe
      </Button>
    </form>
  );
}
