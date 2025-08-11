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

    if (!token) {
      router.push(redirectManager.getRedirectPath("unauthenticated"));
      return;
    }

    if (allowRoles) {
      const permissionCheck = authService.checkPermissions(
        user?.role,
        allowRoles
      );
      if (permissionCheck.shouldRedirect && permissionCheck.redirectPath) {
        router.push(permissionCheck.redirectPath);
      }
    }
  }, [
    token,
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
