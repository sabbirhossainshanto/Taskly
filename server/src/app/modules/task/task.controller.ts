import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { taskService } from "./task.service";

const createTask = catchAsync(async (req, res) => {
  const result = await taskService.createTask(req.body, req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Task created",
    data: result,
  });
});

const getAllTasks = catchAsync(async (req, res) => {
  const result = await taskService.getAllTasks(req.query, req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Tasks are retrieved successfully",
    data: result,
  });
});
const getSingleTask = catchAsync(async (req, res) => {
  const result = await taskService.getSingleTask(req.params.taskId, req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Tasks is retrieved successfully",
    data: result,
  });
});
const deleteTask = catchAsync(async (req, res) => {
  const result = await taskService.deleteTask(req.params.taskId, req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Tasks deleted successful",
    data: result,
  });
});

const updateTask = catchAsync(async (req, res) => {
  const result = await taskService.updateTask(
    req.body,
    req.params.taskId,
    req.user
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Task updated",
    data: result,
  });
});

const bulkUpdateTask = catchAsync(async (req, res) => {
  const result = await taskService.bulkUpdateTask(req.body, req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All task updated",
    data: result,
  });
});

export const taskController = {
  createTask,
  getAllTasks,
  getSingleTask,
  deleteTask,
  updateTask,
  bulkUpdateTask,
};
