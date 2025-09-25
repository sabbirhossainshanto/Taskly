import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import AppError from "../../errors/AppError";
import { fileUploader } from "../../utils/fileUploader";
import { generateInviteCode } from "../../utils/generateInviteCode";
import { Member } from "../member/member.model";
import { USER_ROLE } from "../user/user.constant";
import { IUser } from "../user/user.interface";
import { IWorkspace } from "./workspace.interface";
import { Workspace } from "./workspace.model";
import httpStatus from "http-status";
import { TaskStatus } from "../taks/task.interface";
import { Task } from "../taks/task.model";

const createWorkspace = async (
  payload: IWorkspace,
  file: Express.Multer.File,
  user: IUser
) => {
  if (file) {
    const { secure_url } = await fileUploader.uploadToCloudinary(file);
    payload.image = secure_url;
  }
  const inviteCode = generateInviteCode(10);
  payload.inviteCode = inviteCode;
  payload.userId = user._id;

  const workspace = await Workspace.create(payload);
  await Member.create({
    userId: user._id,
    workspaceId: workspace._id,
    role: USER_ROLE.admin,
  });
  return workspace;
};

export const getUserWorkspaces = async (user: IUser) => {
  const workspaces = await Workspace.find({
    userId: user._id,
  });

  return workspaces;
};

export const getSingleWorkspace = async (workspaceId: string) => {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new AppError(httpStatus.NOT_FOUND, "Workspace not found");
  }
  return workspace;
};

const getWorkspaceAnalytics = async (workspaceId: string, user: IUser) => {
  const member = await Member.findOne({
    workspaceId,
    userId: user?._id,
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
    userId: user._id,
  });

  if (isUserAdmin?.role !== USER_ROLE.admin) {
    throw new AppError(httpStatus.NOT_FOUND, "You are not authorized");
  }

  const isWorkspaceExist = await Workspace.findOne({
    _id: workspaceId,
    userId: user._id,
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
    userId: user._id,
  });

  if (isUserAdmin?.role !== USER_ROLE.admin) {
    throw new AppError(httpStatus.NOT_FOUND, "You are not authorized");
  }

  const isWorkspaceExist = await Workspace.findOne({
    _id: workspaceId,
    userId: user._id,
  });

  if (!isWorkspaceExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This workspace is not exist");
  }

  const deletedWorkspace = await Workspace.deleteOne({
    _id: workspaceId,
    userId: user._id,
  });
  return deletedWorkspace;
};

export const resetInviteCode = async (workspaceId: string, user: IUser) => {
  const isUserAdmin = await Member.findOne({
    userId: user._id,
  });

  if (isUserAdmin?.role !== USER_ROLE.admin) {
    throw new AppError(httpStatus.NOT_FOUND, "You are not authorized");
  }

  const isWorkspaceExist = await Workspace.findOne({
    _id: workspaceId,
    userId: user._id,
  });

  if (!isWorkspaceExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This workspace is not exist");
  }
  const inviteCode = generateInviteCode(10);
  const updatedWorkspace = await Workspace.findByIdAndUpdate(workspaceId, {
    inviteCode,
  });
  return updatedWorkspace;
};

export const joinWorkspace = async (
  workspaceId: string,
  payload: { inviteCode: string },
  user: IUser
) => {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new AppError(httpStatus.NOT_FOUND, "This workspace is not exist");
  }

  const member = await Member.findOne({
    userId: user._id,
    workspaceId: workspaceId,
  });

  if (member) {
    throw new AppError(httpStatus.NOT_FOUND, "You are not authorized");
  }

  if (workspace.inviteCode !== payload.inviteCode) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid invite code");
  }

  const result = await Member.create({
    role: USER_ROLE.member,
    userId: user._id,
    workspaceId,
  });
  return result;
};

export const workspaceService = {
  createWorkspace,
  getUserWorkspaces,
  updateWorkspace,
  deleteWorkspace,
  resetInviteCode,
  joinWorkspace,
  getSingleWorkspace,
  getWorkspaceAnalytics,
};
