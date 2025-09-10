import AppError from "../../errors/AppError";
import { fileUploader } from "../../utils/fileUploader";
import { generateInviteCode } from "../../utils/generateInviteCode";
import { Member } from "../member/member.model";
import { USER_ROLE } from "../user/user.constant";
import { IUser } from "../user/user.interface";
import { IWorkspace } from "./workspace.interface";
import { Workspace } from "./workspace.model";
import httpStatus from "http-status";

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
};
