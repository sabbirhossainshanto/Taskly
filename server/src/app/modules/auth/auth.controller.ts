import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const registerMember = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.resisterMember(
    req.body
  );
  res.cookie("accessToken", accessToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
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
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: { accessToken, refreshToken },
  });
});
const logOut = catchAsync(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged out successful",
    data: null,
  });
});

export const authController = {
  registerMember,
  loginMember,
  logOut,
};
