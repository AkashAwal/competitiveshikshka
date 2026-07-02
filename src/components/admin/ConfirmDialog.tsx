"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
  confirmLabel?: string;
  pending?: boolean;
  /** Error from a previous failed confirm attempt — rendered with the same red-text style used across admin forms. */
  error?: string;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel = "Delete",
  pending = false,
  error,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50" style={{ backgroundColor: "var(--overlay)" }} />
        <Dialog.Popup
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6"
          style={{ backgroundColor: "var(--surface-content)", border: "1px solid rgba(var(--fg-rgb),0.1)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <Dialog.Title className="text-lg font-black" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>
              {title}
            </Dialog.Title>
            <Dialog.Close className="p-1 rounded-lg cursor-pointer" style={{ color: "rgba(var(--fg-rgb),0.5)" }}>
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <p className="text-sm mb-4" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>
            {description}
          </p>

          {error && <p className="text-sm font-semibold text-red-400 mb-4">{error}</p>}

          <div className="flex items-center justify-end gap-2">
            <Dialog.Close
              className="px-4 py-2 rounded-xl text-sm font-bold cursor-pointer"
              style={{ color: "rgba(var(--fg-rgb),0.5)" }}
            >
              Cancel
            </Dialog.Close>
            <button
              onClick={onConfirm}
              disabled={pending}
              className="rounded-xl px-5 py-2.5 text-sm font-bold text-white cursor-pointer disabled:opacity-50"
              style={{ backgroundColor: "#ef4444" }}
            >
              {pending ? "Deleting..." : confirmLabel}
            </button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
