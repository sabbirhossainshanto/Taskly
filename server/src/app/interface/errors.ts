export type TErrorSources = {
    message: string;
    path: string | number;
  }[];


  export type TGenericErrorResponse = {
    errorSources:TErrorSources,
    message: string,
    statusCode: number,
  }