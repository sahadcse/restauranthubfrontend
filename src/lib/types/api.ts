// API Types and Interfaces

export interface ApiError {
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

// Location Types
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type LocationData = string | Coordinates;

// Restaurant Interfaces
export interface Restaurant {
  id: number;
  name: string;
  location: LocationData;
  logo_url?: string;
  owner_id: number;
  approved: boolean;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  imageUrl?: string;
}

export interface MenuItem {
  id: number;
  restaurant_id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

// Order Interfaces
export interface Order {
  id: number;
  user_id: number;
  restaurant_id: number;
  status: "pending" | "preparing" | "shipped" | "delivered";
  total: number;
  created_at: string;
}

export interface OrderCreateRequest {
  restaurant_id: number;
  items: Array<{
    menu_item_id: number;
    quantity: number;
  }>;
  total: number;
}

// User Interfaces
export interface UserRegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  privacyConsent: boolean;
}

export interface RegisterResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: "CUSTOMER" | "RESTAURANT_OWNER" | "ADMIN";
  };
}

export type UserRole = "customer" | "restaurant-owner";

// Content Interfaces
export interface HeroSlider {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  price?: number;
  buttonText?: string;
  linkUrl?: string;
  linkType: "NONE" | "RESTAURANT" | "CAMPAIGN" | "MENU_ITEM" | "EXTERNAL";
  linkTargetId?: string;
  displayOrder: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  tenantId?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  order: number;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  restaurantId?: string;
  discountPercentage?: number;
  createdAt: string;
  updatedAt: string;
  itemCount?: number;
}

// API Configuration
export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// Request Options
export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
}

export interface AuthenticatedRequestOptions extends RequestOptions {
  token: string;
}

// Additional error types for better type safety
export interface ValidationErrorDetails {
  errors?: Array<{
    path: string;
    message: string;
  }>;
}

export type ErrorDetails = ValidationErrorDetails | Record<string, unknown>;
