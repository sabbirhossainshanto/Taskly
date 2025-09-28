import AppError from "../../errors/AppError";
import { fileUploader } from "../../utils/fileUploader";
import { Member } from "../member/member.model";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status";
import { IProject } from "./project.interface";
import { Project } from "./project.model";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { Task } from "../task/task.model";
import { TaskStatus } from "../task/task.interface";

const createProject = async (
  payload: IProject,
  file: Express.Multer.File,
  user: IUser
) => {
  const member = await Member.findOne({
    workspaceId: payload.workspaceId,
    userId: user._id,
  });

  if (!member) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You are not a member of this workspace"
    );
  }

  if (file) {
    const { secure_url } = await fileUploader.uploadToCloudinary(file);
    payload.image = secure_url;
  }

  const project = await Project.create(payload);

  return project;
};

const getWorkspaceProjects = async (workspaceId: string, user: IUser) => {
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
  const workspaces = await Project.find({
    workspaceId,
  });

  return workspaces;
};

const getSingleProject = async (projectId: string, user: IUser) => {
  const project = await Project.findById(projectId);

  const member = await Member.findOne({
    workspaceId: project?.workspaceId,
    userId: user?._id,
  });

  if (!member) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You are not a member of this project"
    );
  }

  return await Project.findById(projectId).populate("workspaceId");
};

const getProjectAnalytics = async (projectId: string, user: IUser) => {
  const project = await Project.findById(projectId);

  const member = await Member.findOne({
    workspaceId: project?.workspaceId,
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
    project: projectId,
    createdAt: {
      $gte: thisMonthStart.toISOString(),
      $lte: thisMonthEnd.toISOString(),
    },
  });
  const lastMonthTask = await Task.find({
    project: projectId,
    createdAt: {
      $gte: lastMonthStart.toISOString(),
      $lte: lastMonthEnd.toISOString(),
    },
  });

  const taskCount = thisMonthTask.length;
  const taskDifference = taskCount - lastMonthTask.length;

  const thisMonthAssignedTasks = await Task.find({
    project: projectId,
    assignee: member._id,
    createdAt: {
      $gte: thisMonthStart.toISOString(),
      $lte: thisMonthEnd.toISOString(),
    },
  });
  const lastMonthAssignedTasks = await Task.find({
    project: projectId,
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
    project: projectId,
    status: {
      $ne: TaskStatus.DONE,
    },
    createdAt: {
      $gte: thisMonthStart.toISOString(),
      $lte: thisMonthEnd.toISOString(),
    },
  });
  const lastMonthIncompleteTasks = await Task.find({
    project: projectId,
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
    project: projectId,
    status: {
      $eq: TaskStatus.DONE,
    },
    createdAt: {
      $gte: thisMonthStart.toISOString(),
      $lte: thisMonthEnd.toISOString(),
    },
  });
  const lastMonthCompletedTasks = await Task.find({
    project: projectId,
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
    project: projectId,
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
    project: projectId,
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

const updateProject = async (
  projectId: string,
  payload: Partial<IProject>,
  file: Express.Multer.File,
  user: IUser
) => {
  const existingProject = await Project.findById(projectId);

  if (!existingProject) {
    throw new AppError(httpStatus.NOT_FOUND, "This project is not exist");
  }

  const member = await Member.findOne({
    userId: user._id,
    workspaceId: existingProject?.workspaceId,
  });

  if (!member) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You are not a member of this project"
    );
  }

  if (file) {
    const { secure_url } = await fileUploader.uploadToCloudinary(file);
    payload.image = secure_url;
  }

  const project = await Project.findByIdAndUpdate(projectId, payload, {
    new: true,
  });
  return project;
};

const deleteProject = async (projectId: string, user: IUser) => {
  const existingProject = await Project.findById(projectId);

  if (!existingProject) {
    throw new AppError(httpStatus.NOT_FOUND, "This project is not exist");
  }

  const member = await Member.findOne({
    userId: user._id,
    workspaceId: existingProject?.workspaceId,
  });

  if (!member) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You are not a member of this project"
    );
  }

  const deletedProject = await Project.deleteOne({
    _id: projectId,
  });
  return {
    ...deletedProject,
    project: existingProject?._id,
    workspace: existingProject?.workspaceId,
  };
};

export const projectService = {
  createProject,
  getWorkspaceProjects,
  updateProject,
  deleteProject,
  getSingleProject,
  getProjectAnalytics,
};
