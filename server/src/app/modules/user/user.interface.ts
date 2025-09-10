import { Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: keyof typeof USER_ROLE;
  _id: Types.ObjectId;
}

export type IUserRole = keyof typeof USER_ROLE;
