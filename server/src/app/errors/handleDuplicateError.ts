/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/errors';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractValue = match && match[0];
  const errorSources: TErrorSources = [
    {
      path: Object.keys(err.keyValue)[0],
      message: `${extractValue} is already exist`,
    },
  ];
  return {
    errorSources,
    message: 'Validation error',
    statusCode: 400,
  };
};

export default handleDuplicateError;
