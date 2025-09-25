"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const errorSources = Object.values(err.errors).map((val) => {
        return {
            path: val.path,
            message: val.message,
        };
    });
    return {
        errorSources,
        message: 'Validation error',
        statusCode: 400,
    };
};
exports.default = handleValidationError;
