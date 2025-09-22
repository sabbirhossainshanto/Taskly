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

export const taskController = {
  createTask,
  getAllTasks,
};
