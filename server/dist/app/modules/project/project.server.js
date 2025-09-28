"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const fileUploader_1 = require("../../utils/fileUploader");
const member_model_1 = require("../member/member.model");
const http_status_1 = __importDefault(require("http-status"));
const project_model_1 = require("./project.model");
const date_fns_1 = require("date-fns");
const task_model_1 = require("../task/task.model");
const task_interface_1 = require("../task/task.interface");
const createProject = async (payload, file, user) => {
    const member = await member_model_1.Member.findOne({
        workspaceId: payload.workspaceId,
        userId: user._id,
    });
    if (!member) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not a member of this workspace");
    }
    if (file) {
        const { secure_url } = await fileUploader_1.fileUploader.uploadToCloudinary(file);
        payload.image = secure_url;
    }
    const project = await project_model_1.Project.create(payload);
    return project;
};
const getWorkspaceProjects = async (workspaceId, user) => {
    const member = await member_model_1.Member.findOne({
        workspaceId,
        userId: user._id,
    });
    if (!member) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not a member of this workspace");
    }
    const workspaces = await project_model_1.Project.find({
        workspaceId,
    });
    return workspaces;
};
const getSingleProject = async (projectId, user) => {
    const project = await project_model_1.Project.findById(projectId);
    const member = await member_model_1.Member.findOne({
        workspaceId: project?.workspaceId,
        userId: user?._id,
    });
    if (!member) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not a member of this project");
    }
    return await project_model_1.Project.findById(projectId).populate("workspaceId");
};
const getProjectAnalytics = async (projectId, user) => {
    const project = await project_model_1.Project.findById(projectId);
    const member = await member_model_1.Member.findOne({
        workspaceId: project?.workspaceId,
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
        project: projectId,
        createdAt: {
            $gte: thisMonthStart.toISOString(),
            $lte: thisMonthEnd.toISOString(),
        },
    });
    const lastMonthTask = await task_model_1.Task.find({
        project: projectId,
        createdAt: {
            $gte: lastMonthStart.toISOString(),
            $lte: lastMonthEnd.toISOString(),
        },
    });
    const taskCount = thisMonthTask.length;
    const taskDifference = taskCount - lastMonthTask.length;
    const thisMonthAssignedTasks = await task_model_1.Task.find({
        project: projectId,
        assignee: member._id,
        createdAt: {
            $gte: thisMonthStart.toISOString(),
            $lte: thisMonthEnd.toISOString(),
        },
    });
    const lastMonthAssignedTasks = await task_model_1.Task.find({
        project: projectId,
        assignee: member._id,
        createdAt: {
            $gte: lastMonthStart.toISOString(),
            $lte: lastMonthEnd.toISOString(),
        },
    });
    const assignedTaskCount = thisMonthAssignedTasks.length;
    const assignedTaskDifference = assignedTaskCount + lastMonthAssignedTasks.length;
    const thisMonthIncompleteTasks = await task_model_1.Task.find({
        project: projectId,
        status: {
            $ne: task_interface_1.TaskStatus.DONE,
        },
        createdAt: {
            $gte: thisMonthStart.toISOString(),
            $lte: thisMonthEnd.toISOString(),
        },
    });
    const lastMonthIncompleteTasks = await task_model_1.Task.find({
        project: projectId,
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
        project: projectId,
        status: {
            $eq: task_interface_1.TaskStatus.DONE,
        },
        createdAt: {
            $gte: thisMonthStart.toISOString(),
            $lte: thisMonthEnd.toISOString(),
        },
    });
    const lastMonthCompletedTasks = await task_model_1.Task.find({
        project: projectId,
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
        project: projectId,
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
        project: projectId,
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
const updateProject = async (projectId, payload, file, user) => {
    const existingProject = await project_model_1.Project.findById(projectId);
    if (!existingProject) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This project is not exist");
    }
    const member = await member_model_1.Member.findOne({
        userId: user._id,
        workspaceId: existingProject?.workspaceId,
    });
    if (!member) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not a member of this project");
    }
    if (file) {
        const { secure_url } = await fileUploader_1.fileUploader.uploadToCloudinary(file);
        payload.image = secure_url;
    }
    const project = await project_model_1.Project.findByIdAndUpdate(projectId, payload, {
        new: true,
    });
    return project;
};
const deleteProject = async (projectId, user) => {
    const existingProject = await project_model_1.Project.findById(projectId);
    if (!existingProject) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This project is not exist");
    }
    const member = await member_model_1.Member.findOne({
        userId: user._id,
        workspaceId: existingProject?.workspaceId,
    });
    if (!member) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not a member of this project");
    }
    const deletedProject = await project_model_1.Project.deleteOne({
        _id: projectId,
    });
    return {
        ...deletedProject,
        project: existingProject?._id,
        workspace: existingProject?.workspaceId,
    };
};
exports.projectService = {
    createProject,
    getWorkspaceProjects,
    updateProject,
    deleteProject,
    getSingleProject,
    getProjectAnalytics,
};
