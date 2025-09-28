"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const registerMember = (0, catchAsync_1.default)(async (req, res) => {
    const { accessToken, refreshToken } = await auth_service_1.authService.resisterMember(req.body);
    res.cookie("accessToken", accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Registered successful",
        data: null,
    });
});
const loginMember = (0, catchAsync_1.default)(async (req, res) => {
    const { accessToken, refreshToken } = await auth_service_1.authService.loginMember(req.body);
    res.cookie("accessToken", accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Login successful",
        data: null,
    });
});
const loginWithGoogle = (0, catchAsync_1.default)(async (req, res) => {
    const { accessToken, refreshToken } = await auth_service_1.authService.loginWithGoogle(req.body);
    res.cookie("accessToken", accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Login successful",
        data: null,
    });
});
const logOut = (0, catchAsync_1.default)(async (req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Logged out successful",
        data: null,
    });
});
exports.authController = {
    registerMember,
    loginMember,
    logOut,
    loginWithGoogle,
};
