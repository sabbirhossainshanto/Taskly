import { Types } from "mongoose";

export interface IProject {
  name: string;
  image: string;
  workspaceId: Types.ObjectId;
}
