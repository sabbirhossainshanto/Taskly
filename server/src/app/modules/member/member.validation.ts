import z from "zod";
import { USER_ROLE } from "../user/user.constant";

const updateWorkspacesMember = z.object({
  body: z.object({
    role: z.enum(USER_ROLE),
  }),
});

export const memberValidation = {
  updateWorkspacesMember,
};
