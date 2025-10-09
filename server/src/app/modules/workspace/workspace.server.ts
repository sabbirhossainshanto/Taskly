import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import AppError from "../../errors/AppError";
import { fileUploader } from "../../utils/fileUploader";
import { Member } from "../member/member.model";
import { USER_ROLE } from "../user/user.constant";
import { IUser } from "../user/user.interface";
import { IWorkspace } from "./workspace.interface";
import { Workspace } from "./workspace.model";
import httpStatus from "http-status";
import { TaskStatus } from "../task/task.interface";
import { Task } from "../task/task.model";
import { verifyToken } from "../../utils/verifyToken";

const createWorkspace = async (
  payload: IWorkspace,
  file: Express.Multer.File,
  user: IUser
) => {
  if (file) {
    const { secure_url } = await fileUploader.uploadToCloudinary(file);
    payload.image = secure_url;
  }
  payload.user = user._id;

  const workspace = await Workspace.create(payload);
  await Member.create({
    user: user._id,
    workspace: workspace._id,
    role: USER_ROLE.admin,
  });
  return workspace;
};

export const getUserWorkspaces = async (user: IUser) => {
  const workspaces = await Workspace.find({
    user: user._id,
  }).populate("user");

  return workspaces;
};

export const getSingleWorkspace = async (workspaceId: string) => {
  const workspace = await Workspace.findById(workspaceId).populate("user");

  if (!workspace) {
    throw new AppError(httpStatus.NOT_FOUND, "Workspace not found");
  }
  return workspace;
};

const getWorkspaceAnalytics = async (workspaceId: string, user: IUser) => {
  const member = await Member.findOne({
    workspace: workspaceId,
    user: user?._id,
  });

  if (!member) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You are not a member of this project"
    );
  }

  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));

  const thisMonthTask = await Task.find({
    workspace: workspaceId,
    createdAt: {
      $gte: thisMonthStart.toISOString(),
      $lte: thisMonthEnd.toISOString(),
    },
  });
  const lastMonthTask = await Task.find({
    workspace: workspaceId,
    createdAt: {
      $gte: lastMonthStart.toISOString(),
      $lte: lastMonthEnd.toISOString(),
    },
  });

  const taskCount = thisMonthTask.length;
  const taskDifference = taskCount - lastMonthTask.length;

  const thisMonthAssignedTasks = await Task.find({
    workspace: workspaceId,
    assignee: member._id,
    createdAt: {
      $gte: thisMonthStart.toISOString(),
      $lte: thisMonthEnd.toISOString(),
    },
  });
  const lastMonthAssignedTasks = await Task.find({
    workspace: workspaceId,
    assignee: member._id,
    createdAt: {
      $gte: lastMonthStart.toISOString(),
      $lte: lastMonthEnd.toISOString(),
    },
  });

  const assignedTaskCount = thisMonthAssignedTasks.length;
  const assignedTaskDifference =
    assignedTaskCount + lastMonthAssignedTasks.length;

  const thisMonthIncompleteTasks = await Task.find({
    workspace: workspaceId,
    status: {
      $ne: TaskStatus.DONE,
    },
    createdAt: {
      $gte: thisMonthStart.toISOString(),
      $lte: thisMonthEnd.toISOString(),
    },
  });
  const lastMonthIncompleteTasks = await Task.find({
    workspace: workspaceId,
    status: {
      $ne: TaskStatus.DONE,
    },
    createdAt: {
      $gte: lastMonthStart.toISOString(),
      $lte: lastMonthEnd.toISOString(),
    },
  });

  const incompleteTaskCount = thisMonthIncompleteTasks.length;
  const incompleteTaskDifference =
    incompleteTaskCount - lastMonthIncompleteTasks.length;

  const thisMonthCompletedTasks = await Task.find({
    workspace: workspaceId,
    status: {
      $eq: TaskStatus.DONE,
    },
    createdAt: {
      $gte: thisMonthStart.toISOString(),
      $lte: thisMonthEnd.toISOString(),
    },
  });
  const lastMonthCompletedTasks = await Task.find({
    workspace: workspaceId,
    status: {
      $eq: TaskStatus.DONE,
    },
    createdAt: {
      $gte: lastMonthStart.toISOString(),
      $lte: lastMonthEnd.toISOString(),
    },
  });

  const completedTaskCount = thisMonthCompletedTasks.length;
  const completedTaskDifference =
    completedTaskCount - lastMonthCompletedTasks.length;

  const thisMonthOverdueTasks = await Task.find({
    workspace: workspaceId,
    status: {
      $ne: TaskStatus.DONE,
    },
    dueDate: {
      $lt: now.toISOString(),
    },
    createdAt: {
      $gte: thisMonthStart.toISOString(),
      $lte: thisMonthEnd.toISOString(),
    },
  });
  const lastMonthOverdueTasks = await Task.find({
    workspace: workspaceId,
    status: {
      $ne: TaskStatus.DONE,
    },
    dueDate: {
      $lt: now.toISOString(),
    },
    createdAt: {
      $gte: lastMonthStart.toISOString(),
      $lte: lastMonthEnd.toISOString(),
    },
  });

  const overdueTaskCount = thisMonthOverdueTasks.length;
  const overdueTaskDifference = overdueTaskCount - lastMonthOverdueTasks.length;

  return {
    taskCount,
    taskDifference,
    assignedTaskCount,
    assignedTaskDifference,
    completedTaskCount,
    completedTaskDifference,
    incompleteTaskCount,
    incompleteTaskDifference,
    overdueTaskCount,
    overdueTaskDifference,
  };
};

export const updateWorkspace = async (
  workspaceId: string,
  payload: Partial<IWorkspace>,
  file: Express.Multer.File,
  user: IUser
) => {
  const isUserAdmin = await Member.findOne({
    user: user._id,
  });

  if (isUserAdmin?.role !== USER_ROLE.admin) {
    throw new AppError(httpStatus.NOT_FOUND, "You are not authorized");
  }

  const isWorkspaceExist = await Workspace.findOne({
    _id: workspaceId,
    user: user._id,
  });

  if (!isWorkspaceExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This workspace is not exist");
  }

  if (file) {
    const { secure_url } = await fileUploader.uploadToCloudinary(file);
    payload.image = secure_url;
  }

  const workspace = await Workspace.findByIdAndUpdate(workspaceId, payload);
  return workspace;
};

export const deleteWorkspace = async (workspaceId: string, user: IUser) => {
  const isUserAdmin = await Member.findOne({
    user: user._id,
  });

  if (isUserAdmin?.role !== USER_ROLE.admin) {
    throw new AppError(httpStatus.NOT_FOUND, "You are not authorized");
  }

  const isWorkspaceExist = await Workspace.findOne({
    _id: workspaceId,
    user: user._id,
  });

  if (!isWorkspaceExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This workspace is not exist");
  }

  const deletedWorkspace = await Workspace.deleteOne({
    _id: workspaceId,
    user: user._id,
  });
  return deletedWorkspace;
};

export const joinWorkspace = async (
  payload: { token: string },
  user: IUser
) => {
  const { email, role, workspaceId } = verifyToken(payload.token) as {
    email: string;
    role: string;
    workspaceId: string;
  };

  if (email !== user?.email) {
    throw new AppError(httpStatus.BAD_REQUEST, "You are not authorized");
  }

  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new AppError(httpStatus.NOT_FOUND, "Workspace not found");
  }

  const member = await Member.findOne({
    user: user._id,
    workspace: workspaceId,
  });

  if (member) {
    throw new AppError(httpStatus.NOT_FOUND, "You are already a member");
  }

  await Member.create({
    role,
    user: user._id,
    workspace: workspaceId,
  });

  const result = await Member.findOne({
    user: user._id,
    workspace: workspaceId,
  }).populate("workspace");
  return result;
};

export const workspaceService = {
  createWorkspace,
  getUserWorkspaces,
  updateWorkspace,
  deleteWorkspace,
  joinWorkspace,
  getSingleWorkspace,
  getWorkspaceAnalytics,
};
