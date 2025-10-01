import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const registerMember = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.resisterMember(
    req.body
  );

  res.cookie("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });
  res.cookie("refreshToken", refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Registered successful",
    data: { accessToken, refreshToken },
  });
});
const loginMember = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.loginMember(req.body);

  res.cookie("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });
  res.cookie("refreshToken", refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: { accessToken, refreshToken },
  });
});
const loginWithGoogle = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.loginWithGoogle(
    req.body
  );
  res.cookie("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });
  res.cookie("refreshToken", refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: { accessToken, refreshToken },
  });
});

export const authController = {
  registerMember,
  loginMember,
  loginWithGoogle,
};
