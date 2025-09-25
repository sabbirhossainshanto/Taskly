import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../../interface/errors";

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    statusCode: 400,
    message: "Invalid Id",
    errorSources,
  };
};

export default handleCastError;
