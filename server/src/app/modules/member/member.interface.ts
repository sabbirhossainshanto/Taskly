import { Types } from "mongoose";
import { IUserRole } from "../user/user.interface";

export interface IMember {
  userId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  role: IUserRole;
}
