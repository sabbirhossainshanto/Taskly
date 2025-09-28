import AppError from "../../errors/AppError";
import { Member } from "../member/member.model";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status";
import { ITask, TaskStatus } from "./task.interface";
import { Task } from "./task.model";

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

const getAllTasks = async (
  query: {
    workspace?: string;
    assignee?: string;
    dueDate?: string;
    project?: string;
    searchTerm?: string;
    status?: TaskStatus;
  },
  user: IUser
) => {
  const member = await Member.findOne({
    workspaceId: query.workspace,
    userId: user._id,
  });

  if (!member) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You are not a member of this workspace"
    );
  }

  const queryObj: {
    workspace?: string;
    assignee?: string;
    dueDate?: string;
    project?: string;
    searchTerm?: string;
    status?: TaskStatus;
  } = {};

  if (query.workspace) {
    queryObj.workspace = query.workspace;
  }
  if (query.assignee) {
    queryObj.assignee = query.assignee;
  }
  if (query.dueDate) {
    queryObj.dueDate = query.dueDate;
  }
  if (query.project) {
    queryObj.project = query.project;
  }
  if (query.status) {
    queryObj.status = query.status;
  }

  const tasks = await Task.find(queryObj)
    .populate("workspace")
    .populate("project")
    .populate({
      path: "assignee",
      populate: {
        path: "userId",
      },
    });

  return tasks;
};

const getSingleTask = async (taskId: string, user: IUser) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError(httpStatus.NOT_FOUND, "Task not found");
  }

  const member = await Member.findOne({
    workspaceId: task.workspace,
    userId: user._id,
  });

  if (!member) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You are not a member of this workspace"
    );
  }

  const result = await Task.findById(taskId)
    .populate("workspace")
    .populate("project")
    .populate({
      path: "assignee",
      populate: {
        path: "userId",
      },
    });

  return result;
};
const deleteTask = async (taskId: string, user: IUser) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError(httpStatus.NOT_FOUND, "Task not found");
  }

  const member = await Member.findOne({
    userId: user._id,
    workspaceId: task.workspace,
  });

  if (!member) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You are not a member of this workspace"
    );
  }

  const result = await Task.deleteOne({ _id: taskId });
  return {
    ...result,
    project: task?.project,
    assignee: task?.assignee,
    workspace: task?.workspace,
  };
};

const updateTask = async (payload: ITask, taskId: string, user: IUser) => {
  const existingTask = await Task.findById(taskId);

  if (!existingTask) {
    throw new AppError(httpStatus.NOT_FOUND, "Task not found");
  }

  const member = await Member.findOne({
    workspaceId: existingTask?.workspace,
    userId: user._id,
  });

  if (!member) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You are not a member of this workspace"
    );
  }

  const task = await Task.findByIdAndUpdate(taskId, payload, { new: true });

  return task;
};

const bulkUpdateTask = async (
  payload: { tasks: { _id: string; status: TaskStatus; position: number }[] },
  user: IUser
) => {
  const ids = payload.tasks.map((task) => task._id.toString());
  const tasksToUpdate = await Task.find({
    _id: { $in: ids },
  });

  const workspaceIds = new Set(
    tasksToUpdate.map((task) => task.workspace.toString())
  );

  if (workspaceIds.size !== 1) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "All task must belong to the same workspace"
    );
  }

  const workspaceId = workspaceIds.values().next().value;

  const member = await Member.findOne({
    workspaceId,
    userId: user._id,
  });

  if (!member) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You are not a member of this workspace"
    );
  }

  const updatedTasks = await Promise.all(
    payload.tasks.map((task) =>
      Task.findByIdAndUpdate(
        task._id,
        { status: task.status, position: task.position },
        { new: true }
      )
    )
  );

  return updatedTasks;
};

export const taskService = {
  createTask,
  getAllTasks,
  getSingleTask,
  deleteTask,
  updateTask,
  bulkUpdateTask,
};
