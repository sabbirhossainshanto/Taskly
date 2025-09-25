"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const task_interface_1 = require("./task.interface");
const createTaskSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().trim().min(1, "Requires"),
        status: zod_1.default.nativeEnum(task_interface_1.TaskStatus, { message: "Required" }),
        workspace: zod_1.default.string().trim().min(1, "Required"),
        project: zod_1.default.string().trim().min(1, "Required"),
        dueDate: zod_1.default.coerce.date(),
        assignee: zod_1.default.string().trim().min(1, "Required"),
        description: zod_1.default.string().optional(),
    }),
});
const updateTaskSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().trim().min(1, "Requires").optional(),
        status: zod_1.default.nativeEnum(task_interface_1.TaskStatus, { message: "Required" }).optional(),
        workspace: zod_1.default.string().trim().min(1, "Required").optional(),
        project: zod_1.default.string().trim().min(1, "Required").optional(),
        dueDate: zod_1.default.coerce.date().optional(),
        assignee: zod_1.default.string().trim().min(1, "Required").optional(),
        description: zod_1.default.string().optional(),
    }),
});
const bulkUpdateTaskSchema = zod_1.default.object({
    body: zod_1.default.object({
        tasks: zod_1.default.array(zod_1.default.object({
            _id: zod_1.default.string(),
            status: zod_1.default.nativeEnum(task_interface_1.TaskStatus),
            position: zod_1.default.number().int().positive().min(1_000).max(1_000_000),
        })),
    }),
});
exports.taskValidation = {
    createTaskSchema,
    updateTaskSchema,
    bulkUpdateTaskSchema,
};
