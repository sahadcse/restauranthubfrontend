import { ApiError as ApiErrorType, ErrorDetails } from "../types/api";

export class ApiError extends Error {
  public status?: number;
  public code?: string;
  public details?: ErrorDetails;

  constructor(error: ApiErrorType | string, status?: number) {
    if (typeof error === "string") {
      super(error);
      this.status = status;
    } else {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      super(message);
      this.status = error.response?.status;
      this.code = error.code;
      this.details = error.response?.data?.details;
    }

    this.name = "ApiError";
  }

  public static fromAxiosError(error: unknown): ApiError {
    return new ApiError(error as ApiErrorType);
  }

  public getUserFriendlyMessage(): string {
    if (this.status === 404) {
      return "The requested resource was not found.";
    }

    if (this.status === 500) {
      return "We're experiencing technical difficulties. Please try again in a moment.";
    }

    if (this.code === "NETWORK_ERROR" || !navigator.onLine) {
      return "Please check your internet connection and try again.";
    }

    return this.message || "An unexpected error occurred. Please try again.";
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 400);
    this.name = "ValidationError";
    this.details = details;
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string = "Authentication failed") {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends ApiError {
  constructor(message: string = "Access denied") {
    super(message, 403);
    this.name = "AuthorizationError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}
