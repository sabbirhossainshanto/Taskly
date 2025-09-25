"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const registerMember = (0, catchAsync_1.default)(async (req, res) => {
    const { accessToken, refreshToken } = await auth_service_1.authService.resisterMember(req.body);
    res.cookie("refreshToken", refreshToken, {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Registered successful",
        data: { accessToken, refreshToken },
    });
});
const loginMember = (0, catchAsync_1.default)(async (req, res) => {
    const { accessToken, refreshToken } = await auth_service_1.authService.loginMember(req.body);
    res.cookie("refreshToken", refreshToken, {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Login successful",
        data: { accessToken, refreshToken },
    });
});
exports.authController = {
    registerMember,
    loginMember,
};
