import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../../interface/errors";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: any) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    errorSources,
    statusCode,
    message: "Validation error",
  };
};
export default handleZodError;
