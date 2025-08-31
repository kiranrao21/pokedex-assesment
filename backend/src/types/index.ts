export enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export interface APIResponse<T> {
  status: HttpStatus;
  data?: T;
  error?: string;
}

export interface Pokemon {
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
}
