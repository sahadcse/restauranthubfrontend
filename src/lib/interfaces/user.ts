import { UserRole, AccountStatus } from "./enums";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  lastLoginAt?: Date;
  accountStatus: AccountStatus;
  privacyConsent: boolean;
  consentGivenAt?: Date;
  avatarUrl?: string;
  provider?: string;
  providerId?: string;
  providerAccountId?: string;
  language?: string;
  timezone?: string;
  twoFactorEnabled: boolean;
  failedLoginAttempts: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  attributes?: Record<string, unknown>;
  defaultCurrency?: string;
  lastActivityAt?: Date;
  loyaltyPoints: number;
}

export interface Address {
  id: string;
  userId: string;
  label?: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  tenantId: string;
}

export interface UserAudit {
  id: string;
  userId: string;
  operation: string;
  changedBy?: string;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  refreshToken?: string;
  ipAddress?: string;
  deviceInfo?: Record<string, unknown>;
  userAgent?: string;
  expiresAt: Date;
  revokedAt?: Date;
  createdAt: Date;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role?: UserRole;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  language?: string;
  timezone?: string;
  defaultCurrency?: string;
}

export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  addresses: Address[];
  loyaltyPoints: number;
}
