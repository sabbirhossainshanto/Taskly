import AppError from "../../errors/AppError";
import { Member } from "../member/member.model";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status";
import { ITask } from "./task.interface";
import { Task } from "./task.model";
import { taskSearchableField } from "./task.constant";

const createTask = async (payload: ITask, user: IUser) => {
  const member = await Member.findOne({
    workspaceId: payload.workspace,
    userId: user._id,
  });

  if (!member) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You are not a member of this workspace"
    );
  }

  const highestPositionTask = await Task.findOne({
    status: payload.status,
    workspace: payload.workspace,
  }).sort({ position: -1 });

  const newPosition = highestPositionTask
    ? highestPositionTask.position + 1000
    : 1000;
  payload.position = newPosition;
  const task = await Task.create(payload);

  return task;
};

const getAllTasks = async (query: Record<string, unknown>, user: IUser) => {
  const member = await Member.findOne({
    workspaceId: query.workspaceId,
    userId: user._id,
  });

  if (!member) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You are not a member of this workspace"
    );
  }

  const queryObj = { ...query };
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }
  // {
  //     $or: taskSearchableField.map((filed) => ({
  //       [filed]: { $regex: searchTerm, $options: "i" },
  //     })),
  //   }
  /* search query */
  const tasks = await Task.find()
    .populate("workspace")
    .populate("project")
    .populate("assignee");

  return tasks;
};

export const taskService = {
  createTask,
  getAllTasks,
};
