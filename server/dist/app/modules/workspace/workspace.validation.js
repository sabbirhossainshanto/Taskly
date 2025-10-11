"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspaceValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createWorkspacesSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().trim().min(1, "Required"),
        image: zod_1.default
            .union([
            zod_1.default.instanceof(File),
            zod_1.default.string().transform((value) => (value === "" ? undefined : value)),
        ])
            .optional(),
    }),
});
const updateWorkspacesSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().trim().min(1, "Must be 1 or more characters").optional(),
        image: zod_1.default
            .union([
            zod_1.default.instanceof(File),
            zod_1.default.string().transform((value) => (value === "" ? undefined : value)),
        ])
            .optional(),
    }),
});
const joinWorkspaceSchema = zod_1.default.object({
    body: zod_1.default.object({
        token: zod_1.default.string(),
    }),
});
exports.workspaceValidation = {
    createWorkspacesSchema,
    updateWorkspacesSchema,
    joinWorkspaceSchema,
};
