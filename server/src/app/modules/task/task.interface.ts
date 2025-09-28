import { Types } from "mongoose";

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export interface ITask {
  _id: Types.ObjectId;
  workspace: Types.ObjectId;
  name: string;
  project: Types.ObjectId;
  assignee: Types.ObjectId;
  description: string;
  dueDate: Date;
  position: number;
  status: TaskStatus;
}
