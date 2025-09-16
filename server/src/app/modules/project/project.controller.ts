import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { projectService } from "./project.server";

const createProject = catchAsync(async (req, res) => {
  const result = await projectService.createProject(
    req.body,
    req.file as Express.Multer.File,
    req.user
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project created",
    data: result,
  });
});

const getWorkspaceProjects = catchAsync(async (req, res) => {
  const result = await projectService.getWorkspaceProjects(
    req.params.workspaceId,
    req.user
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Projects are retrieved successfully",
    data: result,
  });
});
const getSingleProject = catchAsync(async (req, res) => {
  const result = await projectService.getSingleProject(
    req.params.projectId,
    req.user
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project is retrieved successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const result = await projectService.updateProject(
    req.params.projectId,
    req.body,
    req.file as Express.Multer.File,
    req.user
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project updated successfully",
    data: result,
  });
});
const deleteProject = catchAsync(async (req, res) => {
  const result = await projectService.deleteProject(
    req.params.projectId,
    req.user
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project deleted successfully",
    data: result,
  });
});

export const projectController = {
  createProject,
  deleteProject,
  updateProject,
  getWorkspaceProjects,
  getSingleProject,
};
