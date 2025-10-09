import AppError from "../../errors/AppError";
import { Workspace } from "../workspace/workspace.model";
import httpStatus from "http-status";
import { Member } from "./member.model";
import { IUser, IUserRole } from "../user/user.interface";
import { USER_ROLE } from "../user/user.constant";
import { sendEmail } from "../../utils/sendEmail";
import jwt from "jsonwebtoken";
import config from "../../config";
import { User } from "../user/user.model";

const inviteMember = async (payload: {
  role: IUserRole;
  email: string;
  workspaceId: string;
}) => {
  const user = await User.findOne({
    email: payload.email,
  });
  const authRoute = user ? "sign-in" : "sign-up";
  const token = jwt.sign(payload, config.jwt_access_secret as string, {
    expiresIn: "1d",
  });

  const generatedLink = `${config.client_base_url}/workspaces/${payload.workspaceId}/join?email=${payload.email}&token=${token}&authRoute=${authRoute}`;
  await sendEmail(payload.email, generatedLink);
};

const getWorkspaceMember = async (workspaceId: string) => {
  const isWorkspaceExist = await Workspace.findById(workspaceId);
  if (!isWorkspaceExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This workspace is not exist");
  }

  const members = await Member.find({
    workspace: workspaceId,
  })
    .populate("workspace")
    .populate("user");

  return members;
};
const deleteWorkspaceMember = async (
  workspaceId: string,
  memberId: string,
  user: IUser
) => {
  const isAdmin = await Member.findOne({
    user: user._id,
    workspace: workspaceId,
  });

  if (isAdmin?.role !== USER_ROLE.admin) {
    throw new AppError(httpStatus.BAD_REQUEST, "You are unauthorized");
  }

  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new AppError(httpStatus.NOT_FOUND, "Workspace not exist");
  }

  const deletedMember = await Member.findOne({
    workspace: workspaceId,
    user: memberId,
  });

  if (!deletedMember) {
    throw new AppError(httpStatus.NOT_FOUND, "This member is not exist");
  }

  const allMemberInWorkspace = await Member.find({
    workspace: workspaceId,
  });

  if (allMemberInWorkspace.length === 1) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Can not delete the only member"
    );
  }

  const result = await Member.deleteOne({
    workspace: workspaceId,
    user: memberId,
  });

  return result;
};
const updateWorkspaceMember = async (
  payload: {
    workspaceId: string;
    memberId: string;
    role: IUserRole;
  },
  user: IUser
) => {
  const { memberId, role, workspaceId } = payload;
  const isAdmin = await Member.findOne({
    user: user._id,
    workspace: workspaceId,
  });

  if (isAdmin?.role !== USER_ROLE.admin) {
    throw new AppError(httpStatus.BAD_REQUEST, "You are unauthorized");
  }

  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new AppError(httpStatus.NOT_FOUND, "Workspace not exist");
  }

  const updatingMember = await Member.findOne({
    workspace: workspaceId,
    user: memberId,
  });

  if (!updatingMember) {
    throw new AppError(httpStatus.NOT_FOUND, "This member is not exist");
  }

  const allMemberInWorkspace = await Member.find({
    workspace: workspaceId,
  });

  if (allMemberInWorkspace.length === 1) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Can not update the only member"
    );
  }

  const result = await Member.updateOne(
    {
      workspace: workspaceId,
      user: memberId,
    },
    {
      role,
    }
  );

  return result;
};

export const memberService = {
  getWorkspaceMember,
  deleteWorkspaceMember,
  updateWorkspaceMember,
  inviteMember,
};
