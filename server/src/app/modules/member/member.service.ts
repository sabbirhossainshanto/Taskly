import AppError from "../../errors/AppError";
import { Workspace } from "../workspace/workspace.model";
import httpStatus from "http-status";
import { Member } from "./member.model";
import { IUser, IUserRole } from "../user/user.interface";
import { USER_ROLE } from "../user/user.constant";

const getWorkspaceMember = async (workspaceId: string) => {
  const isWorkspaceExist = await Workspace.findById(workspaceId);
  if (!isWorkspaceExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This workspace is not exist");
  }

  const members = await Member.find({
    workspaceId,
  })
    .populate("workspaceId")
    .populate("userId");

  return members;
};
const deleteWorkspaceMember = async (
  workspaceId: string,
  memberId: string,
  user: IUser
) => {
  const isAdmin = await Member.findOne({
    userId: user._id,
    workspaceId,
  });

  if (isAdmin?.role !== USER_ROLE.admin) {
    throw new AppError(httpStatus.BAD_REQUEST, "You are unauthorized");
  }

  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new AppError(httpStatus.NOT_FOUND, "Workspace not exist");
  }

  const deletedMember = await Member.findOne({
    workspaceId,
    userId: memberId,
  });

  if (!deletedMember) {
    throw new AppError(httpStatus.NOT_FOUND, "This member is not exist");
  }

  const allMemberInWorkspace = await Member.find({
    workspaceId,
  });

  if (allMemberInWorkspace.length === 1) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Can not delete the only member"
    );
  }

  const result = await Member.deleteOne({
    workspaceId,
    userId: memberId,
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
    userId: user._id,
    workspaceId,
  });

  if (isAdmin?.role !== USER_ROLE.admin) {
    throw new AppError(httpStatus.BAD_REQUEST, "You are unauthorized");
  }

  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new AppError(httpStatus.NOT_FOUND, "Workspace not exist");
  }

  const updatingMember = await Member.findOne({
    workspaceId,
    userId: memberId,
  });

  if (!updatingMember) {
    throw new AppError(httpStatus.NOT_FOUND, "This member is not exist");
  }

  const allMemberInWorkspace = await Member.find({
    workspaceId,
  });

  if (allMemberInWorkspace.length === 1) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Can not update the only member"
    );
  }

  const result = await Member.updateOne(
    {
      workspaceId,
      userId: memberId,
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
};
