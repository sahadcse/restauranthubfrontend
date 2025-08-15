import { User } from "../interfaces";
import { UserRole } from "../interfaces/enums";
import { redirectManager } from "./redirectManager";

export interface AuthValidationResult {
  isValid: boolean;
  user: User | null;
  error?: string;
}

export interface PermissionCheckResult {
  hasPermission: boolean;
  userRole: UserRole | undefined;
  shouldRedirect: boolean;
  redirectPath: string | null;
}

class AuthService {
  // Cache for decoded tokens to prevent repeated parsing
  private tokenCache = new Map<string, User | null>();

  private validateTokenStructure(token: string): boolean {
    if (typeof token !== "string" || !token.trim()) {
      return false;
    }

    try {
      const parts = token.split(".");
      if (parts.length !== 3) return false;

      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Date.now() / 1000;

      return payload.exp && payload.exp >= currentTime;
    } catch {
      return false;
    }
  }

  async validateToken(token: string): Promise<AuthValidationResult> {
    if (!this.validateTokenStructure(token)) {
      return { isValid: false, user: null, error: "Invalid token structure" };
    }

    try {
      const user = this.decodeTokenToUser(token);
      return { isValid: !!user, user };
    } catch (error) {
      return {
        isValid: false,
        user: null,
        error:
          error instanceof Error ? error.message : "Token validation error",
      };
    }
  }

  decodeTokenToUser(token: string): User | null {
    if (!token || typeof token !== "string") {
      return null;
    }

    // Check cache first
    if (this.tokenCache.has(token)) {
      return this.tokenCache.get(token) || null;
    }

    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        return null;
      }

      const payload = JSON.parse(atob(parts[1]));
      const user: User = {
        id: payload.userId || payload.id,
        email: payload.email,
        role: payload.role as UserRole,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
        avatarUrl: payload.avatarUrl,
        accountStatus: payload.accountStatus,
        privacyConsent: payload.privacyConsent || true,
        consentGivenAt: payload.consentGivenAt,
        lastLoginAt: payload.lastLoginAt,
        language: payload.language,
        timezone: payload.timezone,
        twoFactorEnabled: payload.twoFactorEnabled || false,
        twoFactorSecret: payload.twoFactorSecret,
        failedLoginAttempts: payload.failedLoginAttempts || 0,
        isActive: payload.isActive !== undefined ? payload.isActive : true,
        defaultCurrency: payload.defaultCurrency,
        provider: payload.provider,
        providerId: payload.providerId,
        providerAccountId: payload.providerAccountId,
        loyaltyPoints: payload.loyaltyPoints || 0,
        lastActivityAt: payload.lastActivityAt,
        attributes: payload.attributes,
        createdAt: payload.createdAt || new Date().toISOString(),
        updatedAt: payload.updatedAt || new Date().toISOString(),
      };

      // Cache the result
      this.tokenCache.set(token, user);
      return user;
    } catch (error) {
      console.error("Error decoding token:", error);
      this.tokenCache.set(token, null);
      return null;
    }
  }

  checkPermissions(
    userRole: UserRole | undefined,
    requiredRoles?: string[]
  ): PermissionCheckResult {
    // Early return for no role requirements
    if (!requiredRoles || requiredRoles.length === 0) {
      return {
        hasPermission: true,
        userRole,
        shouldRedirect: false,
        redirectPath: null,
      };
    }

    // User not authenticated
    if (!userRole) {
      return {
        hasPermission: false,
        userRole: undefined,
        shouldRedirect: true,
        redirectPath: redirectManager.getRedirectPath("unauthenticated"),
      };
    }

    const hasPermission = requiredRoles.includes(userRole);

    return {
      hasPermission,
      userRole,
      shouldRedirect: !hasPermission,
      redirectPath: !hasPermission
        ? redirectManager.getRoleDefaultPath(userRole)
        : null,
    };
  }

  // Clear token cache (useful for logout)
  clearCache(): void {
    this.tokenCache.clear();
  }
}

export const authService = new AuthService();
