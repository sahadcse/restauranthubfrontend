// Authentication and user management interfaces

import { UserRole, AccountStatus } from "./enums";
// import {BaseEntity} from "./common";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  accountStatus: AccountStatus;
  privacyConsent: boolean;
  consentGivenAt?: string;
  lastLoginAt?: string;
  language?: string;
  timezone?: string;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  failedLoginAttempts: number;
  isActive: boolean;
  defaultCurrency?: string;
  provider?: string;
  providerId?: string;
  providerAccountId?: string;
  loyaltyPoints: number;
  lastActivityAt?: string;
  attributes?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface UserRegistrationData {
  email: string;
  password: string;
  firstName: string; // Make required
  lastName: string; // Make required
  phoneNumber: string; // Make required for restaurant owners
  role?: UserRole;
  language?: string;
  timezone?: string;
  defaultCurrency?: string;
  privacyConsent: boolean;
  [key: string]: unknown; // Add index signature for compatibility
}

export interface LoginCredentials {
  email: string;
  password: string;
  [key: string]: unknown; // Add index signature for compatibility
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    expiresAt: string;
  };
}

// export interface LoginResponse {
//   success: boolean;
//   message: string;
//   data: {
//     user: User;
//     token: string;
//     refreshToken?: string;
//     expiresAt: string;
//   };
// }

export interface LoginResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
  };
}

export interface AuthContext {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: UserRegistrationData, role?: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

export interface PasswordResetRequest {
  email: string;
  [key: string]: unknown; // Add index signature for compatibility
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  [key: string]: unknown; // Add index signature for compatibility
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  [key: string]: unknown; // Add index signature for compatibility
}

export interface EmailVerification {
  token: string;
  [key: string]: unknown; // Add index signature for compatibility
}

export interface EmailVerificationResponse {
  status: "success" | "error";
  message: string;
  data?: User; // Direct user object, not nested
  token?: string; // Authentication token for auto-login
}

export interface ResendVerificationResponse {
  success: boolean;
  message: string;
}

// export type RegistrationRole =
//   | "customer"
//   | "restaurant-owner"
//   | "restaurant-staff"
//   | "admin";
//   | "restaurant-staff"
//   | "admin";
