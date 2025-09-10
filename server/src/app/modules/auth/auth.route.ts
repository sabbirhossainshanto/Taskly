import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router();

router.post(
  "/register",
  validateRequest(authValidation.registerValidation),
  authController.registerMember
);
router.post(
  "/login",
  validateRequest(authValidation.loginValidation),
  authController.loginMember
);

export const AuthRoutes = router;
