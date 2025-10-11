"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd() + "/.env") });
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS,
    client_base_url: process.env.CLIENT_BASE_URL,
};
