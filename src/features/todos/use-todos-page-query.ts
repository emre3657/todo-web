import { useMemo, useState } from 'react';
import { useAuth } from '@/features/auth/auth-context';
import { getFriendlyErrorMessage } from '@/utils/error';
import { useTodos } from './hooks';
import { getTodosQuerySchema } from './schemas';
import type { TodoPriorityInput } from './types';

export type TodoStatusFilter =
  | 'ALL'
  | 'true'
  | 'false'
  | 'completed_on_time'
  | 'completed_late'
  | 'overdue';

export function useTodosPageQuery() {
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState<TodoPriorityInput | 'ALL'>('ALL');
  const [status, setStatus] = useState<TodoStatusFilter>('ALL');
  const [sorts, setSorts] = useState<string[]>([]);
  const [dueAfter, setDueAfter] = useState('');
  const [dueBefore, setDueBefore] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const normalizedQueryInput = useMemo(
    () => ({
      search: search || undefined,
      priority: priority === 'ALL' ? undefined : priority,
      completed: status === 'true' ? true : status === 'false' ? false : undefined,
      status:
        status === 'completed_on_time' ||
        status === 'completed_late' ||
        status === 'overdue'
          ? status
          : undefined,
      sort: sorts.length > 0 ? sorts.join(',') : undefined,
      dueAfter: dueAfter ? new Date(dueAfter) : undefined,
      dueBefore: dueBefore ? new Date(dueBefore) : undefined,
      page,
      limit,
    }),
    [dueAfter, dueBefore, limit, page, priority, search, sorts, status],
  );

  const queryValidation = getTodosQuerySchema.safeParse(normalizedQueryInput);
  const queryParams = queryValidation.success ? queryValidation.data : normalizedQueryInput;

  const dateError = queryValidation.success
    ? undefined
    : queryValidation.error.issues.find(
        (issue) => issue.path.includes('dueAfter') || issue.path.includes('dueBefore'),
      )?.message;

  const { isAuthInitialized, isAuthenticated } = useAuth();
  const shouldFetch = isAuthInitialized && isAuthenticated && !dateError;

  const { data, isLoading, isError, error, isFetching, refetch } = useTodos(
    queryParams,
    shouldFetch,
  );

  const todos = data?.todos ?? [];
  const total = data?.total ?? 0;
  const currentPage = data?.page ?? page;
  const pageLimit = data?.limit ?? limit;
  const totalPages = Math.max(1, Math.ceil(total / pageLimit));

  const queryErrorMessage =
    isError && todos.length === 0
      ? getFriendlyErrorMessage(
          error,
          'Unable to load todos right now. Please try again later.',
        )
      : undefined;

  const syncWarningMessage =
    isError && todos.length > 0
      ? 'Could not sync the latest todos. Showing the most recently loaded list.'
      : undefined;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePriorityChange = (value: TodoPriorityInput | 'ALL') => {
    setPriority(value);
    setPage(1);
  };

  const handleStatusChange = (value: TodoStatusFilter) => {
    setStatus(value);
    setPage(1);
  };

  const handleDueAfterChange = (value: string) => {
    setDueAfter(value);
    setPage(1);
  };

  const handleDueBeforeChange = (value: string) => {
    setDueBefore(value);
    setPage(1);
  };

  const handleAddSort = (value: string) => {
    setSorts((current) => [...current, value]);
    setPage(1);
  };

  const handleRemoveSort = (value: string) => {
    setSorts((current) => current.filter((item) => item !== value));
    setPage(1);
  };

  const handleUpdateSort = (field: string, direction: 'asc' | 'desc') => {
    setSorts((current) =>
      current.map((item) => {
        const [itemField] = item.split('_');
        return itemField === field ? `${field}_${direction}` : item;
      }),
    );
    setPage(1);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
    setPage(1);
  };

  const goToPreviousPage = () => {
    setPage((value) => Math.max(1, value - 1));
  };

  const goToNextPage = () => {
    setPage((value) => Math.min(totalPages, value + 1));
  };

  return {
    search,
    priority,
    status,
    sorts,
    dueAfter,
    dueBefore,
    page,
    limit,
    dateError,

    todos,
    total,
    currentPage,
    pageLimit,
    totalPages,

    isLoading,
    isError,
    isFetching,
    refetch,

    queryErrorMessage,
    syncWarningMessage,

    handleSearchChange,
    handlePriorityChange,
    handleStatusChange,
    handleDueAfterChange,
    handleDueBeforeChange,
    handleAddSort,
    handleRemoveSort,
    handleUpdateSort,
    handleLimitChange,
    goToPreviousPage,
    goToNextPage,
  };
}