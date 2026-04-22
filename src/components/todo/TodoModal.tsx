import { useEffect } from 'react';
import { type Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { TodoFormInput } from '@/features/todos/types';
import { createTodoSchema, type TodoFormValues } from '@/features/todos/schemas';
import { FocusTrap } from '@/components/ui/FocusTrap';

interface TodoModalProps {
  open: boolean;
  initialValues?: TodoFormInput;
  onClose: () => void;
  onSubmit: (values: TodoFormValues) => void;
  isSaving?: boolean;
}

const defaultValues: TodoFormInput = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'MEDIUM',
};

export function TodoModal({ open, initialValues, onClose, onSubmit, isSaving }: TodoModalProps) {
  const form = useForm<TodoFormValues>({
    defaultValues: initialValues ?? defaultValues,
    mode: 'onTouched',
    resolver: zodResolver(createTodoSchema) as Resolver<TodoFormValues>,
  });

  const { register, handleSubmit, reset, formState } = form;

  useEffect(() => {
    if (open) {
      reset(initialValues ?? defaultValues);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, initialValues, reset]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="todo-modal-title"
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      }}
    >
      <FocusTrap>
        <div className="w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-slate-200" onClick={(event) => event.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900" id="todo-modal-title">
              {initialValues ? 'Edit Todo' : 'Add New Todo'}
            </h2>
            <p className="text-sm text-slate-500">Save your task with a short title and priority.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close todo modal"
            className="cursor-pointer px-2 py-2 rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} aria-labelledby="todo-modal-title">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="title">Title</label>
            <input
              id="title"
              {...register('title')}
              className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
            {formState.errors.title && (
              <p className="text-xs text-red-600">{formState.errors.title.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={4}
              {...register('description')}
              className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
            {formState.errors.description && (
              <p className="text-xs text-red-600">{formState.errors.description.message}</p>
            )}
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="dueDate">Due date</label>
              <input
                id="dueDate"
                type="datetime-local"
                step="1"
                {...register('dueDate')}
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
              {formState.errors.dueDate && (
                <p className="text-xs text-red-600">{formState.errors.dueDate.message}</p>
              )}
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="priority">Priority</label>
              <select
                id="priority"
                {...register('priority')}
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              >
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-3xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="cursor-pointer rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
      </FocusTrap>
    </div>
  );
}
