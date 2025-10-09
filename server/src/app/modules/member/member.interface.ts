import { Types } from "mongoose";
import { IUserRole } from "../user/user.interface";

export interface IMember {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  workspace: Types.ObjectId;
  role: IUserRole;
  status: "pending" | "accepted" | "rejected";
}
