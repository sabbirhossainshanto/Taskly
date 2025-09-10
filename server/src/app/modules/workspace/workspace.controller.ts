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

const resetInviteCode = catchAsync(async (req, res) => {
  const result = await workspaceService.resetInviteCode(
    req.params.workspaceId,
    req.user
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Workspace invited code reset successful",
    data: result,
  });
});

const joinWorkspace = catchAsync(async (req, res) => {
  const result = await workspaceService.joinWorkspace(
    req.params.workspaceId,
    req.body,
    req.user
  );
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
  updateWorkspace,
  deleteWorkspace,
  resetInviteCode,
  joinWorkspace,
};
