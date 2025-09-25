"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
const config_1 = __importDefault(require("../config"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const filename = `${file.originalname.split(".")[0]}-${Date.now()}`;
        const stream = cloudinary_1.v2.uploader.upload_stream({ public_id: filename }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
        const readableStream = new stream_1.Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);
        readableStream.pipe(stream);
    });
};
exports.fileUploader = {
    upload,
    uploadToCloudinary,
};
