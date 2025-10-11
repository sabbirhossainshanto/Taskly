"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const user_constant_1 = require("../user/user.constant");
const inviteMemberSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.email(),
        role: zod_1.default.enum(user_constant_1.USER_ROLE),
    }),
});
const updateWorkspacesMember = zod_1.default.object({
    body: zod_1.default.object({
        role: zod_1.default.enum(user_constant_1.USER_ROLE),
        workspaceId: zod_1.default.string(),
        memberId: zod_1.default.string(),
    }),
});
exports.memberValidation = {
    updateWorkspacesMember,
    inviteMemberSchema,
};
