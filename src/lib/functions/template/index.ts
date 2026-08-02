export * from "../TemplateDialog";

export type ConfirmationType = "delete" | "allow" | "warning" | "default";

export type ConfirmationCopy = {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
};

export function getConfirmationCopy(
  type: ConfirmationType,
  copy: Partial<ConfirmationCopy> = {},
): ConfirmationCopy {
  const defaults: Record<ConfirmationType, ConfirmationCopy> = {
    delete: {
      title: "Delete item?",
      description: "This action cannot be undone.",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
    },
    allow: {
      title: "Allow this action?",
      description: "Confirm before continuing.",
      confirmLabel: "Allow",
      cancelLabel: "Cancel",
    },
    warning: {
      title: "Continue?",
      description: "Review this action before continuing.",
      confirmLabel: "Continue",
      cancelLabel: "Cancel",
    },
    default: {
      title: "Confirm action",
      description: "Are you sure you want to continue?",
      confirmLabel: "Confirm",
      cancelLabel: "Cancel",
    },
  };

  return { ...defaults[type], ...copy };
}
