import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { workspaceValidation } from "./workspace.validation";
import { workspaceController } from "./workspace.controller";
import convertToJson from "../../middlewares/convertToJson";
import { fileUploader } from "../../utils/fileUploader";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/create-workspace",
  auth,
  fileUploader.upload.single("file"),
  convertToJson,
  validateRequest(workspaceValidation.createWorkspacesSchema),
  workspaceController.createWorkspace
);

router.get("/", auth, workspaceController.getUserWorkspaces);

router.patch(
  "/:workspaceId",
  auth,
  fileUploader.upload.single("file"),
  convertToJson,
  validateRequest(workspaceValidation.updateWorkspacesSchema),
  workspaceController.updateWorkspace
);

router.delete("/:workspaceId", auth, workspaceController.deleteWorkspace);

router.post("/:workspaceId/join", auth, workspaceController.joinWorkspace);
export const workspaceRoutes = router;
