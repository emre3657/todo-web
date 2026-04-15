import type {
  CreateTodoInput as CreateTodoSchemaInput,
  UpdateTodoInput as UpdateTodoSchemaInput,
  GetTodosQuery as GetTodosQuerySchemaInput, 
  TodoPriorityInput as TodoPrioritySchemaInput
} from './schemas';

export interface Todo {
  id: string;
  title: string;
  description?: string | null;
  priority: TodoPrioritySchemaInput;
  completed: boolean;
  dueDate?: string | null;
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export type GetTodosQuery = GetTodosQuerySchemaInput;
export type CreateTodoInput = CreateTodoSchemaInput;
export type UpdateTodoInput = UpdateTodoSchemaInput;
export type TodoPriorityInput = TodoPrioritySchemaInput;