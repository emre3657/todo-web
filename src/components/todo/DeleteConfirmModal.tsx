import { useEffect } from 'react';
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FocusTrap } from '@/components/ui/FocusTrap';

interface DeleteConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export function DeleteConfirmModal({
  open,
  title,
  message,
  onCancel,
  onConfirm,
  isDeleting,
}: DeleteConfirmModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-confirm-modal-title"
      onClick={onCancel}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          onCancel();
        }
      }}
    >
      <FocusTrap>
        <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-slate-200" onClick={(event) => event.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between">
          <h2 id="delete-confirm-modal-title" className="text-2xl font-semibold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close delete dialog"
            className="cursor-pointer px-2 py-2 rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="mb-4">
          <p className="text-sm text-slate-600">{message}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-3xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="cursor-pointer rounded-3xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
      </FocusTrap>
    </div>
  );
}
