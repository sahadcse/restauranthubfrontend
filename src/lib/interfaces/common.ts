// Common interfaces used across the application

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: "success" | "error";
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type LocationData = string | Coordinates;

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
}

export interface AuthenticatedRequestOptions extends RequestOptions {
  token: string;
}

export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ValidationErrorDetails {
  errors?: Array<{
    path: string;
    message: string;
  }>;
}

export type ErrorDetails = ValidationErrorDetails | Record<string, unknown>;

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimestampedEntity {
  createdAt: string;
  updatedAt: string;
}
