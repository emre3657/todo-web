import { apiClient } from '@/lib/api-client';
import type { Todo, GetTodosQuery, CreateTodoInput, UpdateTodoInput } from './types';

function buildQueryParams(params: GetTodosQuery) {
  const searchParams = new URLSearchParams();

  if (params.completed !== undefined) {
    searchParams.set('completed', String(params.completed));
  }

  if (params.priority) {
    searchParams.set('priority', params.priority);
  }

  if (params.search) {
    searchParams.set('search', params.search);
  }

  if (params.sort) {
    searchParams.set('sort', params.sort);
  }

  if (params.dueBefore) {
    searchParams.set('dueBefore', params.dueBefore.toISOString());
  }

  if (params.dueAfter) {
    searchParams.set('dueAfter', params.dueAfter.toISOString());
  }

  if (params.page !== undefined) {
    searchParams.set('page', String(params.page));
  }

  if (params.limit !== undefined) {
    searchParams.set('limit', String(params.limit));
  }

  return searchParams.toString();
}

export const todosApi = {
  getTodos: (params?: GetTodosQuery): Promise<Todo[]> => {
    const query = params ? buildQueryParams(params) : '';
    const path = query ? `/todos?${query}` : '/todos';
    return apiClient.get(path);
  },

  createTodo: (data: CreateTodoInput): Promise<Todo> =>
    apiClient.post('/todos', data),

  updateTodo: (id: string, data: UpdateTodoInput): Promise<Todo> =>
    apiClient.patch(`/todos/${id}`, data),

  deleteTodo: (id: string): Promise<void> =>
    apiClient.delete(`/todos/${id}`),
};
