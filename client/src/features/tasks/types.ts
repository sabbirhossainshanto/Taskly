import { IMember } from "../members/types";
import { IProject } from "../projects/type";
import { IWorkspace } from "../workspaces/type";

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export interface ITask {
  _id: string;
  workspace: IWorkspace;
  name: string;
  project: IProject;
  assignee: IMember;
  description: string;
  dueDate: Date;
  position: number;
  status: TaskStatus;
}
export interface ICreateTask {
  workspace: string;
  name: string;
  project: string;
  assignee: string;
  description?: string;
  dueDate: Date;
  status: TaskStatus;
}
