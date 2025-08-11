import { UserRole } from "./enums";

export interface Permission {
  id: string;
  name: string;
  description?: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RolePermission {
  role: UserRole;
  permissionId: string;
  grantedAt: Date;
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
