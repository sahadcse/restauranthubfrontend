// Error handling interfaces

export interface ApiErrorResponse {
  response?: {
    status?: number;
    data?: {
      message?: string;
      details?: {
        errors?: Array<{
          path: string;
          message: string;
        }>;
      };
    };
  };
  code?: string;
  message?: string;
}

export interface ValidationError {
  path: string;
  message: string;
}

export interface ErrorDetails {
  errors?: ValidationError[];
  field?: string;
  value?: unknown;
  constraint?: string;
  [key: string]: unknown;
}

export interface ErrorState {
  message: string;
  code?: string;
  details?: ErrorDetails;
}

export interface NetworkError {
  code: "NETWORK_ERROR";
  message: string;
}

export interface TimeoutError {
  code: "TIMEOUT_ERROR";
  message: string;
}

export type RequestError = ApiErrorResponse | NetworkError | TimeoutError;
