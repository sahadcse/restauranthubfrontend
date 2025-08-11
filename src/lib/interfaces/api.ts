// Consolidated API interfaces - main export for backward compatibility

// Re-export all enums first to avoid conflicts
export * from "./enums";

// Re-export all interfaces from domain-specific files
export * from "./auth";
export * from "./restaurant";
export * from "./order";
export * from "./content";
export * from "./common";

// Re-export from error with explicit naming to avoid conflicts
export type {
  ApiErrorResponse,
  ValidationError,
  ErrorState,
  NetworkError,
  TimeoutError,
  RequestError,
  ErrorDetails as ApiErrorDetails,
} from "./error";

// Additional API-specific interfaces
export interface ApiEndpoints {
  auth: {
    login: string;
    register: string;
    logout: string;
    refresh: string;
    me: string;
  };
  restaurants: {
    list: string;
    create: string;
    detail: (id: string) => string;
    update: (id: string) => string;
    delete: (id: string) => string;
  };
  orders: {
    list: string;
    create: string;
    detail: (id: string) => string;
    update: (id: string) => string;
  };
  content: {
    heroSliders: string;
    banners: string;
    categories: string;
  };
}

export interface ApiMetadata {
  version: string;
  lastUpdated: string;
  environment: "development" | "staging" | "production";
}

export interface ApiHealthCheck {
  status: "ok" | "error";
  timestamp: string;
  database: "connected" | "disconnected";
  services: Record<string, "up" | "down">;
}
