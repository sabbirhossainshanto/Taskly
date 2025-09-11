import AppError from "../../errors/AppError";
import { fileUploader } from "../../utils/fileUploader";
import { Member } from "../member/member.model";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status";
import { IProject } from "./project.interface";
import { Project } from "./project.model";

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

export const getProjects = async (workspaceId: string, user: IUser) => {
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

export const updateProject = async (
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

export const deleteProject = async (projectId: string, user: IUser) => {
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
  return deletedProject;
};

export const projectService = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};
