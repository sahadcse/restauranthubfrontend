import { UserRole } from "../interfaces/enums";

export interface RedirectConfig {
  unauthorized: string;
  unauthenticated: string;
  roleDefaults: Record<UserRole, string>;
  fallback: string;
}

class RedirectManager {
  private config: RedirectConfig = {
    unauthorized: "/unauthorized",
    unauthenticated: "/auth/login",
    roleDefaults: {
      [UserRole.CUSTOMER]: "/customer-dashboard",
      [UserRole.RESTAURANT_OWNER]: "/restaurant-panel",
      [UserRole.RESTAURANT_STAFF]: "/restaurant-staff",
      [UserRole.ADMIN]: "/admin",
      [UserRole.SUPER_ADMIN]: "/superadmin",
      [UserRole.DRIVER]: "/driver-panel",
    },
    fallback: "/",
  };

  updateConfig(newConfig: Partial<RedirectConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  getRedirectPath(scenario: "unauthorized" | "unauthenticated"): string {
    return this.config[scenario] || this.config.fallback;
  }

  getRoleDefaultPath(role: UserRole | string): string {
    // Handle both enum values and string values from backend
    const roleKey = typeof role === "string" ? (role as UserRole) : role;
    const path = this.config.roleDefaults[roleKey] || this.config.fallback;
    console.log(`Getting default path for role ${role} (normalized: ${roleKey}):`, path);
    return path;
  }

  shouldRedirectUser(
    userRole: UserRole | undefined,
    allowedRoles?: string[]
  ): {
    shouldRedirect: boolean;
    redirectPath: string | null;
  } {
    if (!allowedRoles || allowedRoles.length === 0) {
      return { shouldRedirect: false, redirectPath: null };
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
      return {
        shouldRedirect: true,
        redirectPath: userRole
          ? this.getRoleDefaultPath(userRole)
          : this.config.fallback,
      };
    }

    return { shouldRedirect: false, redirectPath: null };
  }

  // Utility method for registration redirects
  getPostRegistrationPath(role: UserRole | string): string {
    const path = this.getRoleDefaultPath(role);
    console.log(`Post-registration redirect for role ${role}:`, path);
    return path;
  }

  // Utility method for login redirects
  getPostLoginPath(role: UserRole | string): string {
    return this.getRoleDefaultPath(role);
  }

  // Enhanced method for super admin specific redirects
  getSuperAdminPath(subPath?: string): string {
    const basePath = this.config.roleDefaults[UserRole.SUPER_ADMIN];
    return subPath ? `${basePath}${subPath}` : `${basePath}/dashboard`;
  }

  // Method to check if user can access super admin features
  canAccessSuperAdmin(userRole: UserRole | string): boolean {
    return userRole === UserRole.SUPER_ADMIN;
  }
}

export const redirectManager = new RedirectManager();
