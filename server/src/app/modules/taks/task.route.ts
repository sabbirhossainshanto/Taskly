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
router.post(
  "/bulk-update",
  auth,
  validateRequest(taskValidation.bulkUpdateTaskSchema),
  taskController.bulkUpdateTask
);

router.get("/", auth, taskController.getAllTasks);
router.get("/:taskId", auth, taskController.getSingleTask);
router.delete("/:taskId", auth, taskController.deleteTask);
router.patch(
  "/:taskId",
  auth,
  validateRequest(taskValidation.updateTaskSchema),
  taskController.updateTask
);

export const taskRoutes = router;
