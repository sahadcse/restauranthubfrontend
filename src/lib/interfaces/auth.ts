// Authentication and user management interfaces

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  isEmailVerified?: boolean;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole =
  | "CUSTOMER"
  | "RESTAURANT_OWNER"
  | "ADMIN"
  | "SUPER_ADMIN"
  | "RESTAURANT_STAFF"
  | "DRIVER";

export interface UserRegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  privacyConsent: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  user: User;
}

export interface LoginResponse {
  token: string;
  user: User;
  refreshToken?: string;
}

export interface AuthContext {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: UserRegistrationData, role?: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
}

export interface EmailVerification {
  token: string;
}

export type RegistrationRole =
  | "customer"
  | "restaurant-owner"
  | "restaurant-staff"
  | "admin";
