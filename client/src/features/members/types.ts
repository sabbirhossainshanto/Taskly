import { IUser, IUserRole } from "../auth/type";
import { IWorkspace } from "../workspaces/type";

export interface IMember {
  _id: string;
  user: IUser;
  workspace: IWorkspace;
  role: IUserRole;
}
