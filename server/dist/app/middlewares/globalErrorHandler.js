"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";
    let errorSources = [
        {
            message: "Something went wrong",
            path: "",
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const zodError = (0, handleZodError_1.default)(error);
        statusCode = zodError.statusCode;
        message = zodError.message;
        errorSources = zodError.errorSources;
    }
    else if (error?.name === "ValidationError") {
        const validationErr = (0, handleValidationError_1.default)(error);
        statusCode = validationErr.statusCode;
        message = validationErr.message;
        errorSources = validationErr.errorSources;
    }
    else if (error?.name === "CastError") {
        const validationErr = (0, handleCastError_1.default)(error);
        statusCode = validationErr.statusCode;
        message = validationErr.message;
        errorSources = validationErr.errorSources;
    }
    else if (error?.code === 11000) {
        const validationErr = (0, handleDuplicateError_1.default)(error);
        statusCode = validationErr.statusCode;
        message = validationErr.message;
        errorSources = validationErr.errorSources;
    }
    else if (error instanceof AppError_1.default) {
        statusCode = error.statusCode;
        message = error.message;
        errorSources = [
            {
                path: "",
                message: error.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error.message;
        errorSources = [
            {
                path: "",
                message: error.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        error,
        stack: config_1.default.NODE_ENV === "development" ? error?.stack : null,
    });
};
exports.default = globalErrorHandler;
