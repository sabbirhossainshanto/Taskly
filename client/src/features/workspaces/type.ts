import { IUser } from "../auth/type";

export interface IWorkspace {
  name: string;
  image: string;
  user: IUser;
  _id: string;
}
