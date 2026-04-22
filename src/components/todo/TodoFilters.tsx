import { useEffect, useMemo, useRef, useState } from 'react';
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import type { TodoPriorityInput } from '@/features/todos/types';
import { FocusTrap } from '@/components/ui/FocusTrap';

interface TodoFiltersProps {
  search: string;
  priority: TodoPriorityInput | 'ALL';
  status: 'ALL' | 'true' | 'false' | 'completed_on_time' | 'completed_late' | 'overdue';
  dueAfter: string;
  dueBefore: string;
  sorts: string[];
  dateError?: string;
  onSearchChange: (value: string) => void;
  onPriorityChange: (value: TodoPriorityInput | 'ALL') => void;
  onStatusChange: (value: 'ALL' | 'true' | 'false' | 'completed_on_time' | 'completed_late' | 'overdue') => void;
  onDueAfterChange: (value: string) => void;
  onDueBeforeChange: (value: string) => void;
  onAddSort: (value: string) => void;
  onRemoveSort: (value: string) => void;
  onUpdateSort: (field: string, direction: 'asc' | 'desc') => void;
}

const priorityOptions: Array<{ value: TodoPriorityInput | 'ALL'; label: string }> = [
  { value: 'ALL', label: 'All' },
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
];

const statusOptions = [
  { value: 'ALL', label: 'All' },
  { value: 'false', label: 'Open' },
  { value: 'true', label: 'Completed' },
  { value: 'completed_on_time', label: 'Completed on time' },
  { value: 'completed_late', label: 'Completed late' },
  { value: 'overdue', label: 'Overdue' },
];

const sortFields = [
  { field: 'createdAt', label: 'Created' },
  { field: 'dueDate', label: 'Due Date' },
  { field: 'priority', label: 'Priority' },
  { field: 'title', label: 'Title' },
  { field: 'updatedAt', label: 'Updated' },
];

export function TodoFilters({
  search,
  priority,
  status,
  dueAfter,
  dueBefore,
  sorts,
  dateError,
  onSearchChange,
  onPriorityChange,
  onStatusChange,
  onDueAfterChange,
  onDueBeforeChange,
  onAddSort,
  onRemoveSort,
  onUpdateSort,
}: TodoFiltersProps) {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortDirections, setSortDirections] = useState<Record<string, 'asc' | 'desc'>>(() =>
    Object.fromEntries(sortFields.map((field) => [field.field, 'asc'])),
  );
  const sortDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sortDropdownOpen) {
      return;
    }

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (sortDropdownRef.current && target && !sortDropdownRef.current.contains(target)) {
        setSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', onDocumentClick);
    return () => document.removeEventListener('mousedown', onDocumentClick);
  }, [sortDropdownOpen]);

  useEffect(() => {
    if (filtersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [filtersOpen]);

  const selectedSorts = new Map<string, string>();
  sorts.forEach((value) => {
    const [field, direction] = value.split('_');
    selectedSorts.set(field, direction);
  });

  const sortableFields = sortFields.map((option) => ({
    ...option,
    selected: selectedSorts.has(option.field),
  }));

  const currentSortDirections = useMemo(() => {
    const mergedDirections: Record<string, 'asc' | 'desc'> = { ...sortDirections };
    selectedSorts.forEach((direction, field) => {
      mergedDirections[field] = direction as 'asc' | 'desc';
    });

    return mergedDirections;
  }, [sortDirections, sorts]);

  const toggleSortDirection = (field: string) => {
    const currentDirection = selectedSorts.has(field)
      ? (selectedSorts.get(field) as 'asc' | 'desc')
      : sortDirections[field];
    const nextDirection = currentDirection === 'asc' ? 'desc' : 'asc';

    if (selectedSorts.has(field)) {
      onUpdateSort(field, nextDirection);
    }

    setSortDirections((current) => ({
      ...current,
      [field]: nextDirection,
    }));
  };

  const filtersContent = (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
        <p className="mt-1 text-sm text-slate-500">Filter and sort your tasks so you can focus on what matters most.</p>
      </div>

      <div className="mt-6 space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Search</span>
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by title or description"
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Status</span>
            <select
              value={status}
              onChange={(event) => onStatusChange(event.target.value as TodoFiltersProps['status'])}
              className="mt-2 w-full cursor-pointer rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Priority</span>
            <select
              value={priority}
              onChange={(event) => onPriorityChange(event.target.value as TodoPriorityInput | 'ALL')}
              className="mt-2 w-full cursor-pointer rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Due after</span>
            <input
              type="datetime-local"
              value={dueAfter}
              onChange={(event) => onDueAfterChange(event.target.value)}
              className="cursor-pointer mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Due before</span>
            <input
              type="datetime-local"
              value={dueBefore}
              onChange={(event) => onDueBeforeChange(event.target.value)}
              className="cursor-pointer mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </label>
        </div>

        {dateError ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {dateError}
          </div>
        ) : null}

        <div className="space-y-3">
          <div className="relative" ref={sortDropdownRef}>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-700">Sort</span>
                <span
                  title="Selection order affects results."
                  className="inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600"
                >
                  i
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSortDropdownOpen((current) => !current)}
                className="cursor-pointer inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-100"
              >
                {sortDropdownOpen ? 'Close' : 'Add'}
                <span className="text-slate-500">{sortDropdownOpen ? '▴' : '▾'}</span>
              </button>
            </div>

            {sortDropdownOpen ? (
              <div className="absolute left-0 bottom-full z-10 mb-2 w-full rounded-3xl border border-slate-200 bg-slate-50 p-2 shadow-sm">
                <div className="space-y-2">
                  {sortableFields.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
                      No sort fields available.
                    </div>
                  ) : (
                    sortableFields.map((option) => (
                      <div
                        key={option.field}
                        className={`flex items-center justify-between gap-2 rounded-2xl border border-slate-200 px-3 py-2 transition duration-300 ${
                          option.selected ? 'bg-slate-100' : 'bg-white'
                        }`}
                      >
                        <div className="text-sm font-semibold text-slate-800">{option.label}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-500">
                            {currentSortDirections[option.field] === 'asc' ? 'ascending' : 'descending'}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleSortDirection(option.field)}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                              currentSortDirections[option.field] === 'asc' ? 'bg-emerald-500' : 'bg-slate-300'
                            }`}
                          >
                            <span
                              className={`h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                                currentSortDirections[option.field] === 'asc' ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              option.selected
                                ? onRemoveSort(`${option.field}_${selectedSorts.get(option.field)}`)
                                : onAddSort(`${option.field}_${sortDirections[option.field]}`)
                            }
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold transition duration-300 cursor-pointer ${
                              option.selected ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-slate-900 text-white hover:bg-slate-700'
                            }`}
                          >
                            {
                              option.selected 
                                ? <MinusIcon className="h-3 w-3" /> 
                                : <PlusIcon className="h-3 w-3" />
                            }
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-between gap-3 xl:hidden">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
          <p className="text-sm text-slate-500">Tap to update the current filter selection.</p>
        </div>
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="inline-flex items-center gap-2 rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Open filters
        </button>
      </div>

      <div className="hidden xl:block">{filtersContent}</div>

      {filtersOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/60 p-4 xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-modal-title"
          onClick={() => setFiltersOpen(false)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setFiltersOpen(false);
            }
          }}
        >
          <FocusTrap>
            <div
              className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 id="filter-modal-title" className="text-lg font-semibold text-slate-900">
                  Filters
                </h2>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 transition hover:bg-slate-200"
                  aria-label="Close filters"
                >
                  ×
                </button>
              </div>
              {filtersContent}
            </div>
          </FocusTrap>
        </div>
      ) : null}
    </>
  );
}
