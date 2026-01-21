declare type ErrorResponse = {
  error: string;
};

declare type SuccessResponse<T> = {
  message: string;
} & T;

declare type APIResponse<T> = SuccessResponse<T> | ErrorResponse;
