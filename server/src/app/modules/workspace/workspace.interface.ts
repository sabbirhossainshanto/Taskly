import { Types } from "mongoose";

export interface IWorkspace {
  name: string;
  image: string;
  inviteCode: string;
  user: Types.ObjectId;
}
