"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useApiData } from "@/hooks/use-api-data";
import { useAuth } from "@/hooks/use-auth";
import { getProfile, updateProfile } from "@/lib/api/account";
import { ApiError } from "@/lib/api/client";
import { authClient } from "@/lib/auth-client";
import type { UserProfile } from "@/types/auth";
import {
  ACCENT_BUTTON_CLASS,
  DashboardError,
  DashboardHeading,
  DashboardListSkeleton,
} from "../../_components/dashboard-states";

const SECTION_CLASS = "flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 sm:p-6";

function ProfileForm({ profile }: { profile: UserProfile }) {
  const { refresh } = useAuth();
  const [name, setName] = useState(profile.name);
  const [tagline, setTagline] = useState(profile.tagline);
  const [responseNote, setResponseNote] = useState(profile.responseNote);
  const [location, setLocation] = useState(profile.location);
  const [phone, setPhone] = useState(profile.phone);
  const [bio, setBio] = useState(profile.bio);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name.trim().length < 2) {
      setErrors({ name: "Name must be at least 2 characters." });
      return;
    }

    setErrors({});
    setSaving(true);
    try {
      await updateProfile({ name: name.trim(), tagline, responseNote, location, phone, bio });
      void refresh();
      toast.success("Profile saved");
    } catch (cause) {
      if (cause instanceof ApiError) {
        const fromApi: Record<string, string | undefined> = {};
        for (const [field, messages] of Object.entries(cause.fieldErrors)) {
          fromApi[field] = messages?.[0];
        }
        setErrors(fromApi);
        toast.error("Couldn't save your profile", { description: cause.message });
      } else {
        toast.error("Couldn't save your profile", { description: "Please try again." });
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={(event) => void handleSubmit(event)} noValidate className={SECTION_CLASS}>
      <h2 className="font-heading text-lg font-medium">Your details</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="name" label="Full name" error={errors.name}>
          <Input
            id="name"
            autoComplete="name"
            value={name}
            maxLength={80}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="h-10"
          />
        </FormField>
        <FormField
          id="email"
          label="Email"
          hint={`Member since ${format(parseISO(profile.joinedAt), "MMMM yyyy")}. Email can't be changed yet.`}
        >
          <Input id="email" type="email" value={profile.email} disabled className="h-10" />
        </FormField>
        <FormField id="location" label="Location" error={errors.location}>
          <Input
            id="location"
            value={location}
            maxLength={120}
            onChange={(e) => setLocation(e.target.value)}
            className="h-10"
          />
        </FormField>
        <FormField
          id="phone"
          label="Phone"
          error={errors.phone}
          hint="Private. Never shown on your public listings."
        >
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            maxLength={30}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="h-10"
          />
        </FormField>
        <FormField
          id="tagline"
          label="Host tagline"
          error={errors.tagline}
          hint="Public. Shown on your listings."
        >
          <Input
            id="tagline"
            value={tagline}
            maxLength={100}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Portrait photographer & studio operator"
            className="h-10"
          />
        </FormField>
        <FormField
          id="responseNote"
          label="Response time note"
          error={errors.responseNote}
          hint="Public. Shown on your listings."
        >
          <Input
            id="responseNote"
            value={responseNote}
            maxLength={100}
            onChange={(e) => setResponseNote(e.target.value)}
            placeholder="Usually responds within an hour"
            className="h-10"
          />
        </FormField>
      </div>

      <FormField id="bio" label="About you" error={errors.bio}>
        <Textarea
          id="bio"
          rows={4}
          value={bio}
          maxLength={1000}
          onChange={(e) => setBio(e.target.value)}
        />
      </FormField>

      <Button type="submit" disabled={saving} className={`${ACCENT_BUTTON_CLASS} h-10 w-fit gap-2 px-5`}>
        {saving ? <Loader2Icon className="animate-spin" aria-hidden="true" /> : null}
        Save profile
      </Button>
    </form>
  );
}

function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};
    if (!currentPassword) nextErrors.currentPassword = "Enter your current password.";
    if (newPassword.length < 8)
      nextErrors.newPassword = "Password must be at least 8 characters.";
    if (confirmPassword !== newPassword)
      nextErrors.confirmPassword = "Passwords don't match.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    });
    setSaving(false);

    if (error) {
      toast.error("Couldn't change your password", {
        description:
          error.code === "CREDENTIAL_ACCOUNT_NOT_FOUND"
            ? "You sign in with Google, so this account has no password to change."
            : (error.message ?? "Please try again."),
      });
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Password changed", {
      description: "Your other devices have been signed out.",
    });
  }

  return (
    <form onSubmit={(event) => void handleSubmit(event)} noValidate className={SECTION_CLASS}>
      <h2 className="font-heading text-lg font-medium">Change password</h2>

      <div className="grid gap-5 sm:grid-cols-3">
        <FormField id="currentPassword" label="Current password" error={errors.currentPassword}>
          <Input
            id="currentPassword"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            aria-invalid={errors.currentPassword ? true : undefined}
            aria-describedby={errors.currentPassword ? "currentPassword-error" : undefined}
            className="h-10"
          />
        </FormField>
        <FormField id="newPassword" label="New password" error={errors.newPassword}>
          <Input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            aria-invalid={errors.newPassword ? true : undefined}
            aria-describedby={errors.newPassword ? "newPassword-error" : undefined}
            className="h-10"
          />
        </FormField>
        <FormField id="confirmPassword" label="Confirm new password" error={errors.confirmPassword}>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-invalid={errors.confirmPassword ? true : undefined}
            aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
            className="h-10"
          />
        </FormField>
      </div>

      <Button type="submit" variant="outline" disabled={saving} className="h-10 w-fit gap-2 px-5">
        {saving ? <Loader2Icon className="animate-spin" aria-hidden="true" /> : null}
        Update password
      </Button>
    </form>
  );
}

export function MyProfile() {
  const { data: profile, error, isLoading, reload } = useApiData(getProfile);

  return (
    <>
      <DashboardHeading
        title="My Profile"
        description="Keep your details current. Your tagline and response note appear on your listings."
      />
      <div className="mt-8 flex flex-col gap-6">
        {error && !profile ? (
          <DashboardError error={error} onRetry={reload} />
        ) : isLoading || !profile ? (
          <DashboardListSkeleton rows={2} />
        ) : (
          <>
            <ProfileForm profile={profile} />
            <PasswordForm />
          </>
        )}
      </div>
    </>
  );
}
