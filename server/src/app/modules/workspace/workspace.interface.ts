import { Types } from "mongoose";

export interface IWorkspace {
  name: string;
  image: string;
  user: Types.ObjectId;
}
