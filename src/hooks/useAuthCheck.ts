"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/authContext";
import { authService } from "../lib/services/authService";
import { redirectManager } from "../lib/services/redirectManager";

interface UseAuthCheckProps {
  allowRoles?: string[];
  autoRedirect?: boolean;
}

const useAuthCheck = ({
  allowRoles,
  autoRedirect = true,
}: UseAuthCheckProps = {}) => {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Memoize permission check to prevent recalculation
  const permissionCheck = useMemo(() => {
    return authService.checkPermissions(user?.role, allowRoles);
  }, [user?.role, allowRoles]);

  // Single mount effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Optimized redirect logic - only runs when necessary
  useEffect(() => {
    if (!isMounted || isLoading || !autoRedirect) return;

    // No token means user logged out - redirect to login
    if (!token) {
      router.push(redirectManager.getRedirectPath("unauthenticated"));
      return;
    }

    // Token exists but no user data - possible token parsing issue
    if (token && !user) {
      router.push(redirectManager.getRedirectPath("unauthenticated"));
      return;
    }

    // Check role-based permissions only if needed
    if (
      allowRoles &&
      user &&
      permissionCheck.shouldRedirect &&
      permissionCheck.redirectPath
    ) {
      router.push(permissionCheck.redirectPath);
    }
  }, [
    token,
    user?.id, // Use user.id instead of entire user object to reduce re-renders
    permissionCheck.shouldRedirect,
    permissionCheck.redirectPath,
    router,
    isMounted,
    isLoading,
    autoRedirect,
    allowRoles,
  ]);

  return {
    isAuthenticated: !!token && !!user,
    user,
    hasPermission: permissionCheck.hasPermission,
    shouldRedirect: permissionCheck.shouldRedirect,
    isLoading,
  };
};

export default useAuthCheck;
