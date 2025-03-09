import { Button } from "~/components/ui/button";

export function SubmitButton({
  isSubmitting,
  label,
  disabled = false,
}: {
  disabled?: boolean;
  isSubmitting: boolean;
  label: string;
}) {
  return (
    <Button
      type="submit"
      className="bg-green-600 hover:bg-green-700"
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          {label}
        </div>
      ) : (
        label
      )}
    </Button>
  );
}
