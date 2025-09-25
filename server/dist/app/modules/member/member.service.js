"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const workspace_model_1 = require("../workspace/workspace.model");
const http_status_1 = __importDefault(require("http-status"));
const member_model_1 = require("./member.model");
const user_constant_1 = require("../user/user.constant");
const getWorkspaceMember = async (workspaceId) => {
    const isWorkspaceExist = await workspace_model_1.Workspace.findById(workspaceId);
    if (!isWorkspaceExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This workspace is not exist");
    }
    const members = await member_model_1.Member.find({
        workspaceId,
    })
        .populate("workspaceId")
        .populate("userId");
    return members;
};
const deleteWorkspaceMember = async (workspaceId, memberId, user) => {
    const isAdmin = await member_model_1.Member.findOne({
        userId: user._id,
        workspaceId,
    });
    if (isAdmin?.role !== user_constant_1.USER_ROLE.admin) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You are unauthorized");
    }
    const workspace = await workspace_model_1.Workspace.findById(workspaceId);
    if (!workspace) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Workspace not exist");
    }
    const deletedMember = await member_model_1.Member.findOne({
        workspaceId,
        userId: memberId,
    });
    if (!deletedMember) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This member is not exist");
    }
    const allMemberInWorkspace = await member_model_1.Member.find({
        workspaceId,
    });
    if (allMemberInWorkspace.length === 1) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Can not delete the only member");
    }
    const result = await member_model_1.Member.deleteOne({
        workspaceId,
        userId: memberId,
    });
    return result;
};
const updateWorkspaceMember = async (payload, user) => {
    const { memberId, role, workspaceId } = payload;
    const isAdmin = await member_model_1.Member.findOne({
        userId: user._id,
        workspaceId,
    });
    console.log(isAdmin);
    if (isAdmin?.role !== user_constant_1.USER_ROLE.admin) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You are unauthorized");
    }
    const workspace = await workspace_model_1.Workspace.findById(workspaceId);
    if (!workspace) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Workspace not exist");
    }
    const updatingMember = await member_model_1.Member.findOne({
        workspaceId,
        userId: memberId,
    });
    if (!updatingMember) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This member is not exist");
    }
    const allMemberInWorkspace = await member_model_1.Member.find({
        workspaceId,
    });
    if (allMemberInWorkspace.length === 1) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Can not update the only member");
    }
    const result = await member_model_1.Member.updateOne({
        workspaceId,
        userId: memberId,
    }, {
        role,
    });
    return result;
};
exports.memberService = {
    getWorkspaceMember,
    deleteWorkspaceMember,
    updateWorkspaceMember,
};
