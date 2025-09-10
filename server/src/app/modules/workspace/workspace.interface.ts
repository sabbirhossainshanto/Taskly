import { Types } from "mongoose";

export interface IWorkspace {
  name: string;
  image: string;
  inviteCode: string;
  userId: Types.ObjectId;
}
