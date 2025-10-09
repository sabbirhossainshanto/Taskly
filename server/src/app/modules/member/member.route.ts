import { Router } from "express";
import auth from "../../middlewares/auth";
import { memberController } from "./member.controller";
import validateRequest from "../../middlewares/validateRequest";
import { memberValidation } from "./member.validation";

const router = Router();
router.post(
  "/invite-member",
  auth,
  validateRequest(memberValidation.inviteMemberSchema),
  memberController.inviteMember
);
router.get("/:workspaceId", auth, memberController.getWorkspaceMember);
router.delete(
  "/:workspaceId/:memberId",
  auth,
  memberController.deleteWorkspaceMember
);
router.patch(
  "/",
  auth,
  validateRequest(memberValidation.updateWorkspacesMember),
  memberController.updateWorkspaceMember
);

export const memberRoutes = router;
