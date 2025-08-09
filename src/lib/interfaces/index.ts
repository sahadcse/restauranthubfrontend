// Global Interface Exports - Main entry point for all interfaces

// Core interfaces (excluding conflicting ones)
export * from "./auth";
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
} from "./api";

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
} from "./api";
