"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const member_model_1 = require("../member/member.model");
const http_status_1 = __importDefault(require("http-status"));
const task_model_1 = require("./task.model");
const createTask = async (payload, user) => {
    const member = await member_model_1.Member.findOne({
        workspaceId: payload.workspace,
        userId: user._id,
    });
    if (!member) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not a member of this workspace");
    }
    const highestPositionTask = await task_model_1.Task.findOne({
        status: payload.status,
        workspace: payload.workspace,
    }).sort({ position: -1 });
    const newPosition = highestPositionTask
        ? highestPositionTask.position + 1000
        : 1000;
    payload.position = newPosition;
    const task = await task_model_1.Task.create(payload);
    return task;
};
const getAllTasks = async (query, user) => {
    const member = await member_model_1.Member.findOne({
        workspaceId: query.workspaceId,
        userId: user._id,
    });
    if (!member) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not a member of this workspace");
    }
    const queryObj = { ...query };
    let searchTerm = "";
    if (query?.searchTerm) {
        searchTerm = query.searchTerm;
    }
    // {
    //     $or: taskSearchableField.map((filed) => ({
    //       [filed]: { $regex: searchTerm, $options: "i" },
    //     })),
    //   }
    /* search query */
    const tasks = await task_model_1.Task.find()
        .populate("workspace")
        .populate("project")
        .populate({
        path: "assignee",
        populate: {
            path: "userId",
        },
    });
    return tasks;
};
const getSingleTask = async (taskId, user) => {
    const task = await task_model_1.Task.findById(taskId);
    if (!task) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Task not found");
    }
    const member = await member_model_1.Member.findOne({
        workspaceId: task.workspace,
        userId: user._id,
    });
    if (!member) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not a member of this workspace");
    }
    const result = await task_model_1.Task.findById(taskId)
        .populate("workspace")
        .populate("project")
        .populate({
        path: "assignee",
        populate: {
            path: "userId",
        },
    });
    return result;
};
const deleteTask = async (taskId, user) => {
    const task = await task_model_1.Task.findById(taskId);
    if (!task) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Task not found");
    }
    const member = await member_model_1.Member.findOne({
        userId: user._id,
        workspaceId: task.workspace,
    });
    if (!member) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not a member of this workspace");
    }
    const result = await task_model_1.Task.deleteOne({ _id: taskId });
    return result;
};
const updateTask = async (payload, taskId, user) => {
    const existingTask = await task_model_1.Task.findById(taskId);
    if (!existingTask) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Task not found");
    }
    const member = await member_model_1.Member.findOne({
        workspaceId: existingTask?.workspace,
        userId: user._id,
    });
    if (!member) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not a member of this workspace");
    }
    const task = await task_model_1.Task.findByIdAndUpdate(taskId, payload, { new: true });
    return task;
};
const bulkUpdateTask = async (payload, user) => {
    const ids = payload.tasks.map((task) => task._id.toString());
    const tasksToUpdate = await task_model_1.Task.find({
        _id: { $in: ids },
    });
    const workspaceIds = new Set(tasksToUpdate.map((task) => task.workspace.toString()));
    if (workspaceIds.size !== 1) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "All task must belong to the same workspace");
    }
    const workspaceId = workspaceIds.values().next().value;
    const member = await member_model_1.Member.findOne({
        workspaceId,
        userId: user._id,
    });
    if (!member) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not a member of this workspace");
    }
    const updatedTasks = await Promise.all(payload.tasks.map((task) => task_model_1.Task.findByIdAndUpdate(task._id, { status: task.status, position: task.position }, { new: true })));
    return updatedTasks;
};
exports.taskService = {
    createTask,
    getAllTasks,
    getSingleTask,
    deleteTask,
    updateTask,
    bulkUpdateTask,
};
