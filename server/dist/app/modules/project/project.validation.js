"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectValidation = exports.updateProjectSchema = exports.createProjectSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createProjectSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().trim().min(1, "Required"),
        image: zod_1.default
            .union([
            zod_1.default.instanceof(File),
            zod_1.default.string().transform((value) => (value === "" ? undefined : value)),
        ])
            .optional(),
        workspace: zod_1.default.string(),
    }),
});
exports.updateProjectSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().trim().min(1, "Minimum 1 character required").optional(),
        image: zod_1.default
            .union([
            zod_1.default.instanceof(File),
            zod_1.default.string().transform((value) => (value === "" ? undefined : value)),
        ])
            .optional(),
    }),
});
exports.projectValidation = {
    createProjectSchema: exports.createProjectSchema,
    updateProjectSchema: exports.updateProjectSchema,
};
