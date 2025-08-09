// Consolidated API interfaces - main export for backward compatibility

// Re-export all interfaces from domain-specific files (excluding conflicts)
export * from "./auth";
export * from "./restaurant";
export * from "./order";
export * from "./content";

// Re-export from common and error with explicit handling of conflicts
export * from "./common";
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
