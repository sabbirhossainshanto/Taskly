"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const member_service_1 = require("./member.service");
const http_status_1 = __importDefault(require("http-status"));
const getWorkspaceMember = (0, catchAsync_1.default)(async (req, res) => {
    const result = await member_service_1.memberService.getWorkspaceMember(req.params.workspaceId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Workspace member retrieved successfully",
        data: result,
    });
});
const deleteWorkspaceMember = (0, catchAsync_1.default)(async (req, res) => {
    const { workspaceId, memberId } = req.params;
    const result = await member_service_1.memberService.deleteWorkspaceMember(workspaceId, memberId, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Workspace member deleted successfully",
        data: result,
    });
});
const updateWorkspaceMember = (0, catchAsync_1.default)(async (req, res) => {
    const result = await member_service_1.memberService.updateWorkspaceMember(req.body, req.user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Workspace member updated successfully",
        data: result,
    });
});
exports.memberController = {
    getWorkspaceMember,
    deleteWorkspaceMember,
    updateWorkspaceMember,
};
