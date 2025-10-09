import z from "zod";
import { USER_ROLE } from "../user/user.constant";

const inviteMemberSchema = z.object({
  body: z.object({
    email: z.email(),
    role: z.enum(USER_ROLE),
  }),
});

const updateWorkspacesMember = z.object({
  body: z.object({
    role: z.enum(USER_ROLE),
    workspaceId: z.string(),
    memberId: z.string(),
  }),
});

export const memberValidation = {
  updateWorkspacesMember,
  inviteMemberSchema,
};
