import { ArrowPathIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

interface TodosHeaderProps {
  visibleCount: number;
  isRefreshing: boolean;
  onRefresh: () => void;
  onCreateTodo: () => void;
}

export function TodosHeader({
  visibleCount,
  isRefreshing,
  onRefresh,
  onCreateTodo,
}: TodosHeaderProps) {
  return (
    <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Task Management
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Todo List</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Filter, sort, and update your tasks quickly. Click the button to add a new todo.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
          {visibleCount} todos
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="cursor-pointer inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Refresh todos"
        >
          <ArrowPathIcon className="mr-2 h-4 w-4" />
          Refresh
        </button>

        <button
          type="button"
          onClick={onCreateTodo}
          className="cursor-pointer inline-flex items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Todo
        </button>
      </div>
    </div>
  );
}