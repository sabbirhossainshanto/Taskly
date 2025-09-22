import z from "zod";
import { TaskStatus } from "./task.interface";

export const createTaskSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Requires"),
    status: z.nativeEnum(TaskStatus, { message: "Required" }),
    workspace: z.string().trim().min(1, "Required"),
    project: z.string().trim().min(1, "Required"),
    dueDate: z.coerce.date(),
    assignee: z.string().trim().min(1, "Required"),
    description: z.string().optional(),
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Requires"),
    status: z.nativeEnum(TaskStatus, { message: "Required" }),
    workspace: z.string().trim().min(1, "Required"),
    project: z.string().trim().min(1, "Required"),
    dueDate: z.coerce.date(),
    assignee: z.string().trim().min(1, "Required"),
    description: z.string().optional(),
  }),
});

export const taskValidation = {
  createTaskSchema,
  updateTaskSchema,
};
