// Global Interface Exports - Main entry point for all interfaces

// Core interfaces (excluding conflicting ones)
export * from "./auth.interface";
export * from "./restaurant";
export * from "./order";
export * from "./content";

// Handle conflicting exports explicitly
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

// Re-export from api (which already handles conflicts internally)
export type {
  PaginatedResponse,
  ApiResponse,
  Coordinates,
  LocationData,
  RequestOptions,
  AuthenticatedRequestOptions,
  ApiConfig,
  ApiEndpoints,
  ApiMetadata,
  ApiHealthCheck,
  Restaurant,
  MenuItem,
  CartItem,
  Order,
  Category,
  HeroSlider,
  User,
} from "./api.interface";

// Legacy compatibility - re-export commonly used interfaces
export type {
  Restaurant as LegacyRestaurant,
  MenuItem as LegacyMenuItem,
  CartItem as LegacyCartItem,
  Order as LegacyOrder,
  Category as LegacyCategory,
  HeroSlider as LegacyHeroSlider,
  User as LegacyUser,
  ApiResponse as LegacyApiResponse,
  PaginatedResponse as LegacyPaginatedResponse,
} from "./api.interface";

// New schema-based types (only the missing ones)
export * from "./inventory";
export * from "./analytics";
export * from "./security";
export * from "./email";
export * from "./menu";
export * from "./blog-extended";
