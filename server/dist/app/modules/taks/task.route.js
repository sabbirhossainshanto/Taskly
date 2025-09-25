"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const task_validation_1 = require("./task.validation");
const task_controller_1 = require("./task.controller");
const router = (0, express_1.Router)();
router.post("/create-task", auth_1.default, (0, validateRequest_1.default)(task_validation_1.taskValidation.createTaskSchema), task_controller_1.taskController.createTask);
router.post("/bulk-update", auth_1.default, (0, validateRequest_1.default)(task_validation_1.taskValidation.bulkUpdateTaskSchema), task_controller_1.taskController.bulkUpdateTask);
router.get("/", auth_1.default, task_controller_1.taskController.getAllTasks);
router.get("/:taskId", auth_1.default, task_controller_1.taskController.getSingleTask);
router.delete("/:taskId", auth_1.default, task_controller_1.taskController.deleteTask);
router.patch("/:taskId", auth_1.default, (0, validateRequest_1.default)(task_validation_1.taskValidation.updateTaskSchema), task_controller_1.taskController.updateTask);
exports.taskRoutes = router;
