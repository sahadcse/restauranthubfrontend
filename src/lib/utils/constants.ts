import { UserRole } from "../interfaces/enums";

export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  [UserRole.CUSTOMER]: "Customer",
  [UserRole.RESTAURANT_OWNER]: "Restaurant Owner",
  [UserRole.RESTAURANT_STAFF]: "Restaurant Staff",
  [UserRole.ADMIN]: "Administrator",
  [UserRole.SUPER_ADMIN]: "Super Administrator",
  [UserRole.DRIVER]: "Driver",
};

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
};

export const API_TIMEOUTS = {
  default: 10000,
  upload: 30000,
  download: 60000,
};

export const ORDER_STATUS_COLORS = {
  pending: "text-yellow-600 bg-yellow-100",
  preparing: "text-blue-600 bg-blue-100",
  shipped: "text-purple-600 bg-purple-100",
  delivered: "text-green-600 bg-green-100",
  cancelled: "text-red-600 bg-red-100",
} as const;

export const VALIDATION_RULES = {
  password: {
    minLength: 8,
    maxLength: 128,
  },
  phone: {
    regex: /^[\+]?[1-9][\d]{0,15}$/,
  },
  email: {
    regex: /\S+@\S+\.\S+/,
  },
} as const;
