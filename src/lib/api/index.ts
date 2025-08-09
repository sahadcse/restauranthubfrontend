// Main API exports and functions
export * from "./client";
export * from "./restaurants";
// export * from "./auth";
// export * from "./orders";
// export * from "./content";
// export * from "./categories";

// Re-export types (excluding ApiError to avoid conflict)
export * from "../types/api";

// Explicitly re-export ApiError from errors to resolve ambiguity
export {
  ApiError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from "../errors/ApiError";

// Utility functions
export { formatRestaurantLocation } from "./utils";
