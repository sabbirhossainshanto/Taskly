import { Router } from "express";
import auth from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = Router();

router.get("/me", auth, userController.getMe);

export const userRoutes = router;
