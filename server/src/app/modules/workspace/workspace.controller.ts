import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { workspaceService } from "./workspace.server";
import httpStatus from "http-status";

const createWorkspace = catchAsync(async (req, res) => {
  const result = await workspaceService.createWorkspace(
    req.body,
    req.file as Express.Multer.File,
    req.user
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Workspace created",
    data: result,
  });
});

const getUserWorkspaces = catchAsync(async (req, res) => {
  const result = await workspaceService.getUserWorkspaces(req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Workspaces are retrieve successful",
    data: result,
  });
});

const getSingleWorkspace = catchAsync(async (req, res) => {
  const result = await workspaceService.getSingleWorkspace(
    req.params.workspaceId
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Workspace is retrieve successful",
    data: result,
  });
});
const getWorkspaceAnalytics = catchAsync(async (req, res) => {
  const result = await workspaceService.getWorkspaceAnalytics(
    req.params.workspaceId,
    req.user
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Workspace analytics retrieve successful",
    data: result,
  });
});

const updateWorkspace = catchAsync(async (req, res) => {
  const result = await workspaceService.updateWorkspace(
    req.params.workspaceId,
    req.body,
    req.file as Express.Multer.File,
    req.user
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Workspace updated successfully",
    data: result,
  });
});
const deleteWorkspace = catchAsync(async (req, res) => {
  const result = await workspaceService.deleteWorkspace(
    req.params.workspaceId,
    req.user
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Workspace deleted successfully",
    data: result,
  });
});

const joinWorkspace = catchAsync(async (req, res) => {
  const result = await workspaceService.joinWorkspace(req.body, req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Joined workspace",
    data: result,
  });
});

export const workspaceController = {
  createWorkspace,
  getUserWorkspaces,
  getSingleWorkspace,
  updateWorkspace,
  deleteWorkspace,
  joinWorkspace,
  getWorkspaceAnalytics,
};
