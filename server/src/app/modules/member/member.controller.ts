import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { memberService } from "./member.service";
import httpStatus from "http-status";

const inviteMember = catchAsync(async (req, res) => {
  const result = await memberService.inviteMember(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Invited successful",
    data: result,
  });
});

const getWorkspaceMember = catchAsync(async (req, res) => {
  const result = await memberService.getWorkspaceMember(req.params.workspaceId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Workspace member retrieved successfully",
    data: result,
  });
});
const deleteWorkspaceMember = catchAsync(async (req, res) => {
  const { workspaceId, memberId } = req.params;
  const result = await memberService.deleteWorkspaceMember(
    workspaceId,
    memberId,
    req.user
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Workspace member deleted successfully",
    data: result,
  });
});
const updateWorkspaceMember = catchAsync(async (req, res) => {
  const result = await memberService.updateWorkspaceMember(req.body, req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Workspace member updated successfully",
    data: result,
  });
});

export const memberController = {
  getWorkspaceMember,
  deleteWorkspaceMember,
  updateWorkspaceMember,
  inviteMember,
};
