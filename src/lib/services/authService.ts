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
  private validateTokenStructure(token: string): boolean {
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
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;

      if (payload.exp && payload.exp < currentTime) {
        return { isValid: false, user: null, error: "Token expired" };
      }

      // Optional: Validate with backend
      try {
        const response = await fetch("/api/auth/validate", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          return {
            isValid: false,
            user: null,
            error: "Token validation failed",
          };
        }
      } catch {
        // If backend validation fails, continue with client-side validation
      }

      const user = this.decodeTokenToUser(token);
      return { isValid: true, user };
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
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
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
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  checkPermissions(
    userRole: UserRole | undefined,
    requiredRoles?: string[]
  ): PermissionCheckResult {
    if (!requiredRoles || requiredRoles.length === 0) {
      return {
        hasPermission: true,
        userRole,
        shouldRedirect: false,
        redirectPath: null,
      };
    }

    const hasPermission = userRole && requiredRoles.includes(userRole);
    const shouldRedirect = !hasPermission;
    const redirectPath =
      shouldRedirect && userRole
        ? redirectManager.getRoleDefaultPath(userRole)
        : null;

    return {
      hasPermission: !!hasPermission,
      userRole,
      shouldRedirect,
      redirectPath,
    };
  }
}

export const authService = new AuthService();
