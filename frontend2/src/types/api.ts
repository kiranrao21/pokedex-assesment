export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export enum ErrorMessage {
  METHOD_NOT_ALLOWED = "Method not allowed",
  FAILED_TO_FETCH = "Failed to fetch data",
  INVALID_PARAMS = "Invalid parameters",
  NOT_FOUND = "Resource not found",
  SERVER_ERROR = "Internal server error",
}

export interface APIResponse<T> {
  status: number;
  data: {
    data: T;
  };
  message?: string;
  error?: string;
}
