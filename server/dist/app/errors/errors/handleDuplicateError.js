"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractValue = match && match[0];
    const errorSources = [
        {
            path: Object.keys(err.keyValue)[0],
            message: `${extractValue} is already exist`,
        },
    ];
    return {
        errorSources,
        message: "Validation error",
        statusCode: 400,
    };
};
exports.default = handleDuplicateError;
