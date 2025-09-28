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
router.post(
  "/login-with-google",
  // validateRequest(authValidation.loginValidation),
  authController.loginWithGoogle
);
router.post("/logout", authController.logOut);

export const AuthRoutes = router;
