import { Label } from "@/components/ui/label";

interface FormFieldProps {
  /** Must match the `id` of the control passed as `children`. */
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

/** Label + control + hint/error, with ids ready for `aria-describedby={`${id}-error`}`. */
export function FormField({ id, label, error, hint, className, children }: FormFieldProps) {
  return (
    <div className={className ?? "flex flex-col gap-2"}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
