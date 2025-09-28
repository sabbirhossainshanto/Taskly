"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspaceService = exports.joinWorkspace = exports.resetInviteCode = exports.deleteWorkspace = exports.updateWorkspace = exports.getSingleWorkspace = exports.getUserWorkspaces = void 0;
const date_fns_1 = require("date-fns");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const fileUploader_1 = require("../../utils/fileUploader");
const generateInviteCode_1 = require("../../utils/generateInviteCode");
const member_model_1 = require("../member/member.model");
const user_constant_1 = require("../user/user.constant");
const workspace_model_1 = require("./workspace.model");
const http_status_1 = __importDefault(require("http-status"));
const task_interface_1 = require("../task/task.interface");
const task_model_1 = require("../task/task.model");
const createWorkspace = async (payload, file, user) => {
    if (file) {
        const { secure_url } = await fileUploader_1.fileUploader.uploadToCloudinary(file);
        payload.image = secure_url;
    }
    const inviteCode = (0, generateInviteCode_1.generateInviteCode)(10);
    payload.inviteCode = inviteCode;
    payload.userId = user._id;
    const workspace = await workspace_model_1.Workspace.create(payload);
    await member_model_1.Member.create({
        userId: user._id,
        workspaceId: workspace._id,
        role: user_constant_1.USER_ROLE.admin,
    });
    return workspace;
};
const getUserWorkspaces = async (user) => {
    const workspaces = await workspace_model_1.Workspace.find({
        userId: user._id,
    });
    return workspaces;
};
exports.getUserWorkspaces = getUserWorkspaces;
const getSingleWorkspace = async (workspaceId) => {
    const workspace = await workspace_model_1.Workspace.findById(workspaceId);
    if (!workspace) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Workspace not found");
    }
    return workspace;
};
exports.getSingleWorkspace = getSingleWorkspace;
const getWorkspaceAnalytics = async (workspaceId, user) => {
    const member = await member_model_1.Member.findOne({
        workspaceId,
        userId: user?._id,
    });
    if (!member) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not a member of this project");
    }
    const now = new Date();
    const thisMonthStart = (0, date_fns_1.startOfMonth)(now);
    const thisMonthEnd = (0, date_fns_1.endOfMonth)(now);
    const lastMonthStart = (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(now, 1));
    const lastMonthEnd = (0, date_fns_1.endOfMonth)((0, date_fns_1.subMonths)(now, 1));
    const thisMonthTask = await task_model_1.Task.find({
        workspace: workspaceId,
        createdAt: {
            $gte: thisMonthStart.toISOString(),
            $lte: thisMonthEnd.toISOString(),
        },
    });
    const lastMonthTask = await task_model_1.Task.find({
        workspace: workspaceId,
        createdAt: {
            $gte: lastMonthStart.toISOString(),
            $lte: lastMonthEnd.toISOString(),
        },
    });
    const taskCount = thisMonthTask.length;
    const taskDifference = taskCount - lastMonthTask.length;
    const thisMonthAssignedTasks = await task_model_1.Task.find({
        workspace: workspaceId,
        assignee: member._id,
        createdAt: {
            $gte: thisMonthStart.toISOString(),
            $lte: thisMonthEnd.toISOString(),
        },
    });
    const lastMonthAssignedTasks = await task_model_1.Task.find({
        workspace: workspaceId,
        assignee: member._id,
        createdAt: {
            $gte: lastMonthStart.toISOString(),
            $lte: lastMonthEnd.toISOString(),
        },
    });
    const assignedTaskCount = thisMonthAssignedTasks.length;
    const assignedTaskDifference = assignedTaskCount + lastMonthAssignedTasks.length;
    const thisMonthIncompleteTasks = await task_model_1.Task.find({
        workspace: workspaceId,
        status: {
            $ne: task_interface_1.TaskStatus.DONE,
        },
        createdAt: {
            $gte: thisMonthStart.toISOString(),
            $lte: thisMonthEnd.toISOString(),
        },
    });
    const lastMonthIncompleteTasks = await task_model_1.Task.find({
        workspace: workspaceId,
        status: {
            $ne: task_interface_1.TaskStatus.DONE,
        },
        createdAt: {
            $gte: lastMonthStart.toISOString(),
            $lte: lastMonthEnd.toISOString(),
        },
    });
    const incompleteTaskCount = thisMonthIncompleteTasks.length;
    const incompleteTaskDifference = incompleteTaskCount - lastMonthIncompleteTasks.length;
    const thisMonthCompletedTasks = await task_model_1.Task.find({
        workspace: workspaceId,
        status: {
            $eq: task_interface_1.TaskStatus.DONE,
        },
        createdAt: {
            $gte: thisMonthStart.toISOString(),
            $lte: thisMonthEnd.toISOString(),
        },
    });
    const lastMonthCompletedTasks = await task_model_1.Task.find({
        workspace: workspaceId,
        status: {
            $eq: task_interface_1.TaskStatus.DONE,
        },
        createdAt: {
            $gte: lastMonthStart.toISOString(),
            $lte: lastMonthEnd.toISOString(),
        },
    });
    const completedTaskCount = thisMonthCompletedTasks.length;
    const completedTaskDifference = completedTaskCount - lastMonthCompletedTasks.length;
    const thisMonthOverdueTasks = await task_model_1.Task.find({
        workspace: workspaceId,
        status: {
            $ne: task_interface_1.TaskStatus.DONE,
        },
        dueDate: {
            $lt: now.toISOString(),
        },
        createdAt: {
            $gte: thisMonthStart.toISOString(),
            $lte: thisMonthEnd.toISOString(),
        },
    });
    const lastMonthOverdueTasks = await task_model_1.Task.find({
        workspace: workspaceId,
        status: {
            $ne: task_interface_1.TaskStatus.DONE,
        },
        dueDate: {
            $lt: now.toISOString(),
        },
        createdAt: {
            $gte: lastMonthStart.toISOString(),
            $lte: lastMonthEnd.toISOString(),
        },
    });
    const overdueTaskCount = thisMonthOverdueTasks.length;
    const overdueTaskDifference = overdueTaskCount - lastMonthOverdueTasks.length;
    return {
        taskCount,
        taskDifference,
        assignedTaskCount,
        assignedTaskDifference,
        completedTaskCount,
        completedTaskDifference,
        incompleteTaskCount,
        incompleteTaskDifference,
        overdueTaskCount,
        overdueTaskDifference,
    };
};
const updateWorkspace = async (workspaceId, payload, file, user) => {
    const isUserAdmin = await member_model_1.Member.findOne({
        userId: user._id,
    });
    if (isUserAdmin?.role !== user_constant_1.USER_ROLE.admin) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not authorized");
    }
    const isWorkspaceExist = await workspace_model_1.Workspace.findOne({
        _id: workspaceId,
        userId: user._id,
    });
    if (!isWorkspaceExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This workspace is not exist");
    }
    if (file) {
        const { secure_url } = await fileUploader_1.fileUploader.uploadToCloudinary(file);
        payload.image = secure_url;
    }
    const workspace = await workspace_model_1.Workspace.findByIdAndUpdate(workspaceId, payload);
    return workspace;
};
exports.updateWorkspace = updateWorkspace;
const deleteWorkspace = async (workspaceId, user) => {
    const isUserAdmin = await member_model_1.Member.findOne({
        userId: user._id,
    });
    if (isUserAdmin?.role !== user_constant_1.USER_ROLE.admin) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not authorized");
    }
    const isWorkspaceExist = await workspace_model_1.Workspace.findOne({
        _id: workspaceId,
        userId: user._id,
    });
    if (!isWorkspaceExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This workspace is not exist");
    }
    const deletedWorkspace = await workspace_model_1.Workspace.deleteOne({
        _id: workspaceId,
        userId: user._id,
    });
    return deletedWorkspace;
};
exports.deleteWorkspace = deleteWorkspace;
const resetInviteCode = async (workspaceId, user) => {
    const isUserAdmin = await member_model_1.Member.findOne({
        userId: user._id,
    });
    if (isUserAdmin?.role !== user_constant_1.USER_ROLE.admin) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not authorized");
    }
    const isWorkspaceExist = await workspace_model_1.Workspace.findOne({
        _id: workspaceId,
        userId: user._id,
    });
    if (!isWorkspaceExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This workspace is not exist");
    }
    const inviteCode = (0, generateInviteCode_1.generateInviteCode)(10);
    const updatedWorkspace = await workspace_model_1.Workspace.findByIdAndUpdate(workspaceId, {
        inviteCode,
    });
    return updatedWorkspace;
};
exports.resetInviteCode = resetInviteCode;
const joinWorkspace = async (workspaceId, payload, user) => {
    const workspace = await workspace_model_1.Workspace.findById(workspaceId);
    if (!workspace) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This workspace is not exist");
    }
    const member = await member_model_1.Member.findOne({
        userId: user._id,
        workspaceId: workspaceId,
    });
    if (member) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not authorized");
    }
    if (workspace.inviteCode !== payload.inviteCode) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid invite code");
    }
    const result = await member_model_1.Member.create({
        role: user_constant_1.USER_ROLE.member,
        userId: user._id,
        workspaceId,
    });
    return result;
};
exports.joinWorkspace = joinWorkspace;
exports.workspaceService = {
    createWorkspace,
    getUserWorkspaces: exports.getUserWorkspaces,
    updateWorkspace: exports.updateWorkspace,
    deleteWorkspace: exports.deleteWorkspace,
    resetInviteCode: exports.resetInviteCode,
    joinWorkspace: exports.joinWorkspace,
    getSingleWorkspace: exports.getSingleWorkspace,
    getWorkspaceAnalytics,
};
