import z from "zod";
import { TaskStatus } from "./task.interface";

const createTaskSchema = z.object({
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

const updateTaskSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Requires").optional(),
    status: z.nativeEnum(TaskStatus, { message: "Required" }).optional(),
    workspace: z.string().trim().min(1, "Required").optional(),
    project: z.string().trim().min(1, "Required").optional(),
    dueDate: z.coerce.date().optional(),
    assignee: z.string().trim().min(1, "Required").optional(),
    description: z.string().optional(),
  }),
});
const bulkUpdateTaskSchema = z.object({
  body: z.object({
    tasks: z.array(
      z.object({
        _id: z.string(),
        status: z.nativeEnum(TaskStatus),
        position: z.number().int().positive().min(1_000).max(1_000_000),
      })
    ),
  }),
});

export const taskValidation = {
  createTaskSchema,
  updateTaskSchema,
  bulkUpdateTaskSchema,
};
