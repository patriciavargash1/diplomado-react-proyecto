import { z } from 'zod';

export interface Task {
  id: number;
  name: string;
  done: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTask {
  name: string;
}

export interface UpdateTask {
  name?: string;
  done?: boolean;
}

export const schemaTask = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .trim(),
});

export type TaskFormValues = z.infer<typeof schemaTask>;