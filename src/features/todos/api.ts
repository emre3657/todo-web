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

  if (params.status) {
    searchParams.set('status', params.status);
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
  getTodos: async (params?: GetTodosQuery): Promise<{ todos: Todo[]; total: number; page: number; limit: number }> => {
    const query = params ? buildQueryParams(params) : '';
    const path = query ? `/todos?${query}` : '/todos';
    const response = await apiClient.get<{ todos: Todo[]; total: number; page: number; limit: number }>(path);
    return response;
  },

  createTodo: async (data: CreateTodoInput): Promise<Todo> => {
    const response = await apiClient.post<{ todo: Todo }>('/todos', data);
    return response.todo;
  },

  updateTodo: async (id: string, data: UpdateTodoInput): Promise<Todo> => {
    const response = await apiClient.patch<{ todo: Todo }>(`/todos/${id}`, data);
    return response.todo;
  },

  deleteTodo: (id: string): Promise<void> =>
    apiClient.delete(`/todos/${id}`),
};
