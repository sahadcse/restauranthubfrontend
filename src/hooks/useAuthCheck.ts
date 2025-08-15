"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || isLoading || !autoRedirect) return;

    // If no token, redirect to login (logout scenario)
    if (!token) {
      console.log("useAuthCheck: No token found, redirecting to login");
      router.push(redirectManager.getRedirectPath("unauthenticated"));
      return;
    }

    // If token exists but no user, there might be a token parsing issue
    if (token && !user) {
      console.log(
        "useAuthCheck: Token exists but no user, redirecting to login"
      );
      router.push(redirectManager.getRedirectPath("unauthenticated"));
      return;
    }

    // Check role-based permissions only if user exists
    if (allowRoles && user) {
      const permissionCheck = authService.checkPermissions(
        user.role,
        allowRoles
      );
      if (permissionCheck.shouldRedirect && permissionCheck.redirectPath) {
        console.log(
          "useAuthCheck: Permission check failed, redirecting to:",
          permissionCheck.redirectPath
        );
        router.push(permissionCheck.redirectPath);
      }
    }
  }, [
    token,
    user,
    user?.role,
    allowRoles,
    router,
    isMounted,
    isLoading,
    autoRedirect,
  ]);

  const permissionCheck = authService.checkPermissions(user?.role, allowRoles);

  return {
    isAuthenticated: !!token,
    user,
    hasPermission: permissionCheck.hasPermission,
    shouldRedirect: permissionCheck.shouldRedirect,
    isLoading,
  };
};

export default useAuthCheck;
