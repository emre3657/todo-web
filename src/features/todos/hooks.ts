import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { todosApi } from './api';
import type { GetTodosQuery, Todo, CreateTodoInput, UpdateTodoInput } from './types';

export const useTodos = (params?: GetTodosQuery) => {
  return useQuery<Todo[]>({
    queryKey: ['todos', params ?? {}],
    queryFn: () => todosApi.getTodos(params),
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, CreateTodoInput>({
    mutationFn: (data) => todosApi.createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, { id: string; data: UpdateTodoInput }>({
    mutationFn: ({ id, data }) => todosApi.updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => todosApi.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
