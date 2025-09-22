import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { taskValidation } from "./task.validation";
import { taskController } from "./task.controller";

const router = Router();

router.post(
  "/create-task",
  auth,
  validateRequest(taskValidation.createTaskSchema),
  taskController.createTask
);

router.get("/", auth, taskController.getAllTasks);

export const taskRoutes = router;
