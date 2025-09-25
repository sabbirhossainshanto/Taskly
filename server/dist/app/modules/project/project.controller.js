"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const project_server_1 = require("./project.server");
const createProject = (0, catchAsync_1.default)(async (req, res) => {
    const result = await project_server_1.projectService.createProject(req.body, req.file, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Project created",
        data: result,
    });
});
const getWorkspaceProjects = (0, catchAsync_1.default)(async (req, res) => {
    const result = await project_server_1.projectService.getWorkspaceProjects(req.params.workspaceId, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Projects are retrieved successfully",
        data: result,
    });
});
const getSingleProject = (0, catchAsync_1.default)(async (req, res) => {
    const result = await project_server_1.projectService.getSingleProject(req.params.projectId, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Project is retrieved successfully",
        data: result,
    });
});
const getProjectAnalytics = (0, catchAsync_1.default)(async (req, res) => {
    const result = await project_server_1.projectService.getProjectAnalytics(req.params.projectId, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Project analytics retrieved successfully",
        data: result,
    });
});
const updateProject = (0, catchAsync_1.default)(async (req, res) => {
    const result = await project_server_1.projectService.updateProject(req.params.projectId, req.body, req.file, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Project updated successfully",
        data: result,
    });
});
const deleteProject = (0, catchAsync_1.default)(async (req, res) => {
    const result = await project_server_1.projectService.deleteProject(req.params.projectId, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Project deleted successfully",
        data: result,
    });
});
exports.projectController = {
    createProject,
    deleteProject,
    updateProject,
    getWorkspaceProjects,
    getSingleProject,
    getProjectAnalytics,
};
