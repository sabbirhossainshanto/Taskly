"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = exports.loginValidation = exports.registerValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().trim().min(1, "Required"),
        email: zod_1.default.email(),
        password: zod_1.default.string().min(8, "Minimum of 8 characters required"),
    }),
});
exports.loginValidation = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.email(),
        password: zod_1.default.string().min(8, "Minimum of 8 characters required"),
    }),
});
exports.authValidation = {
    registerValidation: exports.registerValidation,
    loginValidation: exports.loginValidation,
};
