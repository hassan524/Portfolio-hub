import React from "react";
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
import { Loader2 } from "lucide-react";

export type ConfirmationDialogProps = Partial<ConfirmationCopy> & {
  open: boolean;
  type?: ConfirmationType;
  showCancel?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function ConfirmationDialog({
  open,
  type = "default",
  title,
  description,
  confirmLabel,
  cancelLabel,
  showCancel = true,
  isLoading = false,
  children,
  onOpenChange,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  const copy = getConfirmationCopy(type, { title, description, confirmLabel, cancelLabel });
  const destructive = type === "delete";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm rounded-2xl border-border p-5 shadow-lift duration-300 data-[state=open]:slide-in-from-bottom-2 data-[state=closed]:slide-out-to-bottom-2">
        <AlertDialogHeader className="space-y-1.5">
          <AlertDialogTitle className="text-base font-bold">{copy.title}</AlertDialogTitle>
          {copy.description && (
            <AlertDialogDescription className="text-xs leading-5 text-ink-soft">
              {copy.description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {children && <div className="py-2 text-xs">{children}</div>}

        <AlertDialogFooter className="mt-5 gap-2 sm:space-x-0">
          {showCancel && (
            <AlertDialogCancel
              onClick={onCancel}
              disabled={isLoading}
              className="mt-0 h-8 rounded-md px-3 text-xs border-border hover:bg-secondary cursor-pointer"
            >
              {copy.cancelLabel}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={(e) => {
              if (isLoading) {
                e.preventDefault();
                return;
              }
              onConfirm();
            }}
            disabled={isLoading}
            className={cn(
              "h-8 rounded-md px-3 text-xs flex items-center justify-center gap-1.5 cursor-pointer font-medium",
              destructive && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            )}
          >
            {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {copy.confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
