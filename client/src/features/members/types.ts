import { IUser, IUserRole } from "../auth/type";
import { IWorkspace } from "../workspaces/type";

export interface IMember {
  _id: string;
  userId: IUser;
  workspaceId: IWorkspace;
  role: IUserRole;
}
