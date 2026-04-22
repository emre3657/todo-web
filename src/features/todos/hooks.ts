import { useMutation, useQuery, useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import { todosApi } from './api';
import type { GetTodosQuery, Todo, CreateTodoInput, UpdateTodoInput, TodosResponse } from './types';

export const useTodos = (params?: GetTodosQuery, enabled = true): UseQueryResult<TodosResponse, Error> => {
  return useQuery<TodosResponse, Error, TodosResponse>({
    queryKey: ['todos', params ?? {}],
    queryFn: () => todosApi.getTodos(params),
    enabled,
    staleTime: 1000 * 30,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, CreateTodoInput, { affectedQueries: Array<{ queryKey: any; previousTotal: number }> }>({
    mutationFn: (data) => todosApi.createTodo(data),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const affectedQueries: Array<{ queryKey: any; previousTotal: number }> = [];

      const optimisticTodo: Todo = {
        id: `temp-${Date.now()}`,
        title: newTodo.title,
        description: newTodo.description ?? null,
        dueDate: newTodo.dueDate ? new Date(newTodo.dueDate).toISOString() : null,
        priority: newTodo.priority,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: '',
      };

      queryClient.getQueriesData<TodosResponse>({ queryKey: ['todos'] }).forEach(([queryKey, data]) => {
        if (!data) return;
        const queryParams = queryKey[1] as GetTodosQuery | undefined;

        if (queryParams?.page !== undefined && queryParams.page !== 1) {
          return;
        }

        affectedQueries.push({ queryKey, previousTotal: data.total });

        queryClient.setQueryData<TodosResponse>(queryKey, {
          ...data,
          total: data.total + 1,
          todos: [optimisticTodo, ...data.todos].slice(0, data.limit),
        });
      });

      return { affectedQueries };
    },
    onError: (_error, _variables, context) => {
      if (!context?.affectedQueries) return;

      context.affectedQueries.forEach(({ queryKey, previousTotal }) => {
        queryClient.setQueryData<TodosResponse>(queryKey, (cachedData) => {
          if (!cachedData) return cachedData;
          return {
            ...cachedData,
            total: previousTotal,
            todos: cachedData.todos.filter((todo) => !todo.id.startsWith('temp-')),
          };
        });
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, { id: string; data: UpdateTodoInput }, { affectedQueries: Array<{ queryKey: any; previousTodo: Todo }> }>({
    mutationFn: ({ id, data }) => todosApi.updateTodo(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const affectedQueries: Array<{ queryKey: any; previousTodo: Todo }> = [];

      queryClient.getQueriesData<TodosResponse>({ queryKey: ['todos'] }).forEach(([queryKey, cachedData]) => {
        if (!cachedData) return;

        const todoToUpdate = cachedData.todos.find((t) => t.id === id);
        if (!todoToUpdate) return;

        affectedQueries.push({ queryKey, previousTodo: { ...todoToUpdate } });

        queryClient.setQueryData<TodosResponse>(queryKey, {
          ...cachedData,
          todos: cachedData.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  title: data.title ?? todo.title,
                  description: data.description === undefined ? todo.description : data.description,
                  dueDate: data.dueDate === undefined ? todo.dueDate : data.dueDate ? new Date(data.dueDate).toISOString() : null,
                  priority: data.priority ?? todo.priority,
                  completed: data.completed === undefined ? todo.completed : data.completed,
                }
              : todo,
          ),
        });
      });

      return { affectedQueries };
    },
    onError: (_error, { id, data }, context) => {
      if (!context?.affectedQueries) return;

      context.affectedQueries.forEach(({ queryKey, previousTodo }) => {
        queryClient.setQueryData<TodosResponse>(queryKey, (cachedData) => {
          if (!cachedData) return cachedData;

          return {
            ...cachedData,
            todos: cachedData.todos.map((todo) => {
              if (todo.id !== id) return todo;

              const rollback: any = {};
              if (data.title !== undefined) rollback.title = previousTodo.title;
              if (data.description !== undefined) rollback.description = previousTodo.description;
              if (data.dueDate !== undefined) rollback.dueDate = previousTodo.dueDate;
              if (data.priority !== undefined) rollback.priority = previousTodo.priority;
              if (data.completed !== undefined) rollback.completed = previousTodo.completed;

              return { ...todo, ...rollback };
            }),
          };
        });
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, { affectedQueries: Array<{ queryKey: any; previousTodo: Todo | undefined }> }>({
    mutationFn: (id) => todosApi.deleteTodo(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const affectedQueries: Array<{ queryKey: any; previousTodo: Todo | undefined }> = [];

      queryClient.getQueriesData<TodosResponse>({ queryKey: ['todos'] }).forEach(([queryKey, data]) => {
        if (!data) return;

        const todoToDelete = data.todos.find((t) => t.id === id);
        affectedQueries.push({ queryKey, previousTodo: todoToDelete ? { ...todoToDelete } : undefined });

        queryClient.setQueryData<TodosResponse>(queryKey, {
          ...data,
          total: Math.max(data.total - 1, 0),
          todos: data.todos.filter((todo) => todo.id !== id),
        });
      });

      return { affectedQueries };
    },
    onError: (_error, id, context) => {
      if (!context?.affectedQueries) return;

      context.affectedQueries.forEach(({ queryKey, previousTodo }) => {
        if (!previousTodo) return;

        queryClient.setQueryData<TodosResponse>(queryKey, (cachedData) => {
          if (!cachedData) return cachedData;

          const alreadyExists = cachedData.todos.some((t) => t.id === id);
          if (alreadyExists) return cachedData;

          return {
            ...cachedData,
            total: cachedData.total + 1,
            todos: [previousTodo, ...cachedData.todos],
          };
        });
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
