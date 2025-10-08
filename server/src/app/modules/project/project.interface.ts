import { Types } from "mongoose";

export interface IProject {
  name: string;
  image: string;
  workspace: Types.ObjectId;
}
