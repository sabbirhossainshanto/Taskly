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
router.post("/login-with-google", authController.loginWithGoogle);

export const AuthRoutes = router;
