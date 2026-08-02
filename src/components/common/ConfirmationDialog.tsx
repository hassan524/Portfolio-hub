import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  getConfirmationCopy,
  type ConfirmationCopy,
  type ConfirmationType,
} from "@/lib/functions/template";
import { cn } from "@/lib/utils";

type Props = Partial<ConfirmationCopy> & {
  open: boolean;
  type?: ConfirmationType;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function ConfirmationDialog({
  open,
  type = "default",
  title,
  description,
  confirmLabel,
  cancelLabel,
  onOpenChange,
  onConfirm,
}: Props) {
  const copy = getConfirmationCopy(type, { title, description, confirmLabel, cancelLabel });
  const destructive = type === "delete";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm rounded-2xl border-border p-5 shadow-lift duration-300 data-[state=open]:slide-in-from-bottom-2 data-[state=closed]:slide-out-to-bottom-2">
        <AlertDialogHeader className="space-y-1.5">
          <AlertDialogTitle className="text-base">{copy.title}</AlertDialogTitle>
          <AlertDialogDescription className="text-xs leading-5">
            {copy.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:space-x-0">
          <AlertDialogCancel className="mt-0 h-8 rounded-md px-3 text-xs">
            {copy.cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={cn(
              "h-8 rounded-md px-3 text-xs",
              destructive && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            )}
          >
            {copy.confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
