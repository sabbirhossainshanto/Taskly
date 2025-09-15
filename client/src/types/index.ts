export interface IResponse<T> {
  data: T;
  success: boolean;
  message: string;
  error?: unknown;
}
