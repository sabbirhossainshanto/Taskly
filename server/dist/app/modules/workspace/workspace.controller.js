"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspaceController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const workspace_server_1 = require("./workspace.server");
const http_status_1 = __importDefault(require("http-status"));
const createWorkspace = (0, catchAsync_1.default)(async (req, res) => {
    const result = await workspace_server_1.workspaceService.createWorkspace(req.body, req.file, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Workspace created",
        data: result,
    });
});
const getUserWorkspaces = (0, catchAsync_1.default)(async (req, res) => {
    const result = await workspace_server_1.workspaceService.getUserWorkspaces(req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Workspaces are retrieve successful",
        data: result,
    });
});
const getSingleWorkspace = (0, catchAsync_1.default)(async (req, res) => {
    const result = await workspace_server_1.workspaceService.getSingleWorkspace(req.params.workspaceId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Workspace is retrieve successful",
        data: result,
    });
});
const getWorkspaceAnalytics = (0, catchAsync_1.default)(async (req, res) => {
    const result = await workspace_server_1.workspaceService.getWorkspaceAnalytics(req.params.workspaceId, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Workspace analytics retrieve successful",
        data: result,
    });
});
const updateWorkspace = (0, catchAsync_1.default)(async (req, res) => {
    const result = await workspace_server_1.workspaceService.updateWorkspace(req.params.workspaceId, req.body, req.file, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Workspace updated successfully",
        data: result,
    });
});
const deleteWorkspace = (0, catchAsync_1.default)(async (req, res) => {
    const result = await workspace_server_1.workspaceService.deleteWorkspace(req.params.workspaceId, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Workspace deleted successfully",
        data: result,
    });
});
const resetInviteCode = (0, catchAsync_1.default)(async (req, res) => {
    const result = await workspace_server_1.workspaceService.resetInviteCode(req.params.workspaceId, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Workspace invited code reset successful",
        data: result,
    });
});
const joinWorkspace = (0, catchAsync_1.default)(async (req, res) => {
    const result = await workspace_server_1.workspaceService.joinWorkspace(req.params.workspaceId, req.body, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Joined workspace",
        data: result,
    });
});
exports.workspaceController = {
    createWorkspace,
    getUserWorkspaces,
    getSingleWorkspace,
    updateWorkspace,
    deleteWorkspace,
    resetInviteCode,
    joinWorkspace,
    getWorkspaceAnalytics,
};
