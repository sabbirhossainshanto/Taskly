export const USER_ROLE = {
  super_admin: "super_admin",
  admin: "admin",
  member: "member",
  user: "user",
} as const;

export type IUserRole = keyof typeof USER_ROLE;

export interface IUser {
  _id: string;
  email: string;
  exp: number;
  iat: number;
  name: string;
  role: IUserRole;
}
