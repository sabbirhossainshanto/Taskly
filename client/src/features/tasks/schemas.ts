import z from "zod";
import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, "Requires"),
  status: z.nativeEnum(TaskStatus, { message: "Required" }),

  project: z.string().trim().min(1, "Required"),
  dueDate: z.date(),
  assignee: z.string().trim().min(1, "Required"),
  description: z.string().optional(),
});
