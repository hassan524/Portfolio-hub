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


const PREVIEW_EFFECTS_STYLE_ID = "preview-effects-styles";

export function ensurePreviewEffectsStylesheet(doc: Document | null | undefined): void {
  if (!doc) return;
  if (doc.getElementById(PREVIEW_EFFECTS_STYLE_ID)) return;

  const styleEl = doc.createElement("style");
  styleEl.id = PREVIEW_EFFECTS_STYLE_ID;
  styleEl.textContent = `
    [data-hover-fx="grow"] { transition: transform 0.2s ease; }
    [data-hover-fx="grow"]:hover { transform: scale(1.04); }

    [data-hover-fx="lift"] { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    [data-hover-fx="lift"]:hover { transform: translateY(-6px); box-shadow: 0 14px 28px -8px rgba(0,0,0,0.28); }

    [data-hover-fx="glow"] { transition: box-shadow 0.2s ease; }
    [data-hover-fx="glow"]:hover { box-shadow: 0 0 26px rgba(99,102,241,0.55); }

    [data-hover-fx="darken"] { transition: filter 0.2s ease; }
    [data-hover-fx="darken"]:hover { filter: brightness(0.85); }

    @keyframes pe-fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pe-slide-up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pe-zoom-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }

    [data-entrance-fx="fade"] { animation: pe-fade-in 0.5s ease both; }
    [data-entrance-fx="slideUp"] { animation: pe-slide-up 0.5s ease both; }
    [data-entrance-fx="zoom"] { animation: pe-zoom-in 0.4s ease both; }
  `;
  doc.head.appendChild(styleEl);
}