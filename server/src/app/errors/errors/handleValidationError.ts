import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../../interface/errors";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      };
    }
  );
  return {
    errorSources,
    message: "Validation error",
    statusCode: 400,
  };
};

export default handleValidationError;
