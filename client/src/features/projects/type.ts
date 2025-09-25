import { IWorkspace } from "../workspaces/type";

export interface IProject {
  _id: string;
  name: string;
  image: string;
  workspaceId: IWorkspace;
}
export interface IProjectAnalytics {
  taskCount: number;
  taskDifference: number;
  projectCount?: number;
  projectDifference?: number;
  assignedTaskCount: number;
  assignedTaskDifference: number;
  completedTaskCount: number;
  completedTaskDifference: number;
  incompleteTaskCount?: number;
  incompleteTaskDifference?: number;
  overdueTaskCount: number;
  overdueTaskDifference: number;
}
