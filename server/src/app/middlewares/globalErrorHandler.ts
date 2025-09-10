/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import config from "../config";
import { TErrorSources } from "../interface/errors";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong";

  let errorSources: TErrorSources = [
    {
      message: "Something went wrong",
      path: "",
    },
  ];

  if (error instanceof ZodError) {
    const zodError = handleZodError(error);
    statusCode = zodError.statusCode;
    message = zodError.message;
    errorSources = zodError.errorSources;
  } else if (error?.name === "ValidationError") {
    const validationErr = handleValidationError(error);
    statusCode = validationErr.statusCode;
    message = validationErr.message;
    errorSources = validationErr.errorSources;
  } else if (error?.name === "CastError") {
    const validationErr = handleCastError(error);
    statusCode = validationErr.statusCode;
    message = validationErr.message;
    errorSources = validationErr.errorSources;
  } else if (error?.code === 11000) {
    const validationErr = handleDuplicateError(error);
    statusCode = validationErr.statusCode;
    message = validationErr.message;
    errorSources = validationErr.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
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
    stack: config.NODE_ENV === "development" ? error?.stack : null,
  });
};

export default globalErrorHandler;
