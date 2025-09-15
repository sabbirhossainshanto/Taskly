import { Types } from "mongoose";
import { IUserRole } from "../user/user.interface";

export interface IMember {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  role: IUserRole;
}
