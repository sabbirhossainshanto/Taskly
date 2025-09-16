import { IWorkspace } from "../workspaces/type";

export interface IProject {
  _id: string;
  name: string;
  image: string;
  workspaceId: IWorkspace;
}
