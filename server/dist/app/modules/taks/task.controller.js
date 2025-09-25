"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const task_service_1 = require("./task.service");
const createTask = (0, catchAsync_1.default)(async (req, res) => {
    const result = await task_service_1.taskService.createTask(req.body, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Task created",
        data: result,
    });
});
const getAllTasks = (0, catchAsync_1.default)(async (req, res) => {
    const result = await task_service_1.taskService.getAllTasks(req.query, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Tasks are retrieved successfully",
        data: result,
    });
});
const getSingleTask = (0, catchAsync_1.default)(async (req, res) => {
    const result = await task_service_1.taskService.getSingleTask(req.params.taskId, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Tasks is retrieved successfully",
        data: result,
    });
});
const deleteTask = (0, catchAsync_1.default)(async (req, res) => {
    const result = await task_service_1.taskService.deleteTask(req.params.taskId, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Tasks deleted successful",
        data: result,
    });
});
const updateTask = (0, catchAsync_1.default)(async (req, res) => {
    const result = await task_service_1.taskService.updateTask(req.body, req.params.taskId, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Task updated",
        data: result,
    });
});
const bulkUpdateTask = (0, catchAsync_1.default)(async (req, res) => {
    const result = await task_service_1.taskService.bulkUpdateTask(req.body, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All task updated",
        data: result,
    });
});
exports.taskController = {
    createTask,
    getAllTasks,
    getSingleTask,
    deleteTask,
    updateTask,
    bulkUpdateTask,
};
