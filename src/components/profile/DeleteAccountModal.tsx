import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FocusTrap } from '@/components/ui/FocusTrap';

interface DeleteAccountModalProps {
  open: boolean;
  confirmation: string;
  onConfirmationChange: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export function DeleteAccountModal({
  open,
  confirmation,
  onConfirmationChange,
  onCancel,
  onConfirm,
  isDeleting,
}: DeleteAccountModalProps) {
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

  const isConfirmDisabled = isDeleting || confirmation !== 'DELETE';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-account-modal-title"
      onClick={onCancel}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          onCancel();
        }
      }}
    >
      <FocusTrap>
        <div
          className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-slate-200"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2
              id="delete-account-modal-title"
              className="text-2xl font-semibold text-slate-900"
            >
              Delete Account
            </h2>

            <button
              type="button"
              onClick={onCancel}
              aria-label="Close delete account dialog"
              className="cursor-pointer rounded-full bg-slate-100 px-2 py-2 text-slate-700 transition hover:bg-slate-200"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-5 space-y-3">
            <p className="text-sm text-slate-600">
              This action permanently deletes your account and all associated data.
              This cannot be undone.
            </p>

            <p className="text-sm font-medium text-slate-700">
              Type <span className="font-semibold text-rose-700">DELETE</span> to
              confirm.
            </p>

            <input
              type="text"
              value={confirmation}
              onChange={(event) => onConfirmationChange(event.target.value)}
              placeholder="Type DELETE here"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
            />
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
              disabled={isConfirmDisabled}
              className="cursor-pointer rounded-3xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? 'Deleting…' : 'Delete Account'}
            </button>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}