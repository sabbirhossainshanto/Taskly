"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const member_controller_1 = require("./member.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const member_validation_1 = require("./member.validation");
const router = (0, express_1.Router)();
router.post("/invite-member", auth_1.default, (0, validateRequest_1.default)(member_validation_1.memberValidation.inviteMemberSchema), member_controller_1.memberController.inviteMember);
router.get("/:workspaceId", auth_1.default, member_controller_1.memberController.getWorkspaceMember);
router.delete("/:workspaceId/:memberId", auth_1.default, member_controller_1.memberController.deleteWorkspaceMember);
router.patch("/", auth_1.default, (0, validateRequest_1.default)(member_validation_1.memberValidation.updateWorkspacesMember), member_controller_1.memberController.updateWorkspaceMember);
exports.memberRoutes = router;
