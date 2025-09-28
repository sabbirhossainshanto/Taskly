"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const generateToken_1 = require("../../utils/generateToken");
const user_model_1 = require("../user/user.model");
const verifyGoogleToken_1 = require("../../utils/verifyGoogleToken");
const resisterMember = async (payload) => {
    const isAlreadyExist = await user_model_1.User.findOne({
        email: payload.email,
    });
    if (isAlreadyExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This member is already exist!");
    }
    const hashedPassword = await bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_round));
    payload.password = hashedPassword;
    const result = await user_model_1.User.create(payload);
    const tokenObj = {
        name: result.name,
        email: result.email,
        _id: result?._id,
        role: result?.role,
    };
    const accessToken = (0, generateToken_1.generateToken)(tokenObj, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, generateToken_1.generateToken)(tokenObj, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return { accessToken, refreshToken };
};
const loginMember = async (payload) => {
    const user = await user_model_1.User.findOne({
        email: payload.email,
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const isPasswordMatched = await bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password not matched");
    }
    const tokenObj = {
        name: user.name,
        email: user.email,
        _id: user?._id,
        role: user?.role,
    };
    const accessToken = (0, generateToken_1.generateToken)(tokenObj, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, generateToken_1.generateToken)(tokenObj, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return { accessToken, refreshToken };
};
const loginWithGoogle = async (payload) => {
    if (!payload.token) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You are not authorized");
    }
    const { email, name, picture } = (await (0, verifyGoogleToken_1.verifyGoogleToken)(payload.token));
    const user = await user_model_1.User.findOne({
        email,
        name,
    });
    if (!user) {
        const newUser = await user_model_1.User.create({
            email,
            name,
            role: "member",
            image: picture,
        });
        const tokenObj = {
            name: newUser.name,
            email: newUser.email,
            _id: newUser?._id,
            role: newUser?.role,
        };
        const accessToken = (0, generateToken_1.generateToken)(tokenObj, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
        const refreshToken = (0, generateToken_1.generateToken)(tokenObj, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
        return { accessToken, refreshToken };
    }
    const tokenObj = {
        name: user.name,
        email: user.email,
        _id: user?._id,
        role: user?.role,
    };
    const accessToken = (0, generateToken_1.generateToken)(tokenObj, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, generateToken_1.generateToken)(tokenObj, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return { accessToken, refreshToken };
};
exports.authService = {
    resisterMember,
    loginMember,
    loginWithGoogle,
};
