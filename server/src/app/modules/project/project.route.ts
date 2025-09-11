import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import convertToJson from "../../middlewares/convertToJson";
import { fileUploader } from "../../utils/fileUploader";
import auth from "../../middlewares/auth";
import { projectValidation } from "./project.validation";
import { projectController } from "./project.controller";

const router = Router();

router.post(
  "/create-project",
  auth,
  fileUploader.upload.single("file"),
  convertToJson,
  validateRequest(projectValidation.createProjectSchema),
  projectController.createProject
);

router.get("/:workspaceId", auth, projectController.getProject);

router.patch(
  "/:projectId",
  auth,
  fileUploader.upload.single("file"),
  convertToJson,
  validateRequest(projectValidation.updateProjectSchema),
  projectController.updateProject
);

router.delete("/:projectId", auth, projectController.deleteProject);

export const projectRoutes = router;
