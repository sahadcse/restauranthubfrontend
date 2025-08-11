"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/authContext";
import { authService } from "../../lib/services/authService";
import { redirectManager } from "../../lib/services/redirectManager";
import LoadingSpinner from "../ui/LoadingSpinner";

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  redirectOnFail?: string;
  fallbackComponent?: React.ReactNode;
  showCountdown?: boolean;
}

export default function ProtectedRoute({
  children,
  requiredRoles,
  redirectOnFail,
  fallbackComponent,
  showCountdown = true,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(
    null
  );
  const [shouldRedirect, setShouldRedirect] = useState<string | null>(null);

  useEffect(() => {
    if (shouldRedirect) {
      router.push(shouldRedirect);
      setShouldRedirect(null);
    }
  }, [shouldRedirect, router]);

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      if (showCountdown) {
        setRedirectCountdown(5);
        const countdownInterval = setInterval(() => {
          setRedirectCountdown((prev) => {
            if (prev === null) return null;
            const newCount = prev - 1;
            if (newCount <= 0) {
              clearInterval(countdownInterval);
              setShouldRedirect(
                redirectManager.getRedirectPath("unauthenticated")
              );
              return null;
            }
            return newCount;
          });
        }, 1000);
        return () => clearInterval(countdownInterval);
      } else {
        setShouldRedirect(redirectManager.getRedirectPath("unauthenticated"));
      }
      return;
    }

    if (requiredRoles && requiredRoles.length > 0) {
      const permissionCheck = authService.checkPermissions(
        user?.role,
        requiredRoles
      );
      if (permissionCheck.shouldRedirect) {
        const redirectPath =
          redirectOnFail ||
          permissionCheck.redirectPath ||
          redirectManager.getRedirectPath("unauthorized");
        setShouldRedirect(redirectPath);
        return;
      }
    }

    setRedirectCountdown(null);
  }, [
    isAuthenticated,
    user,
    loading,
    requiredRoles,
    redirectOnFail,
    showCountdown,
  ]);

  if (loading) {
    return <LoadingSpinner fullScreen text="Authenticating..." size="large" />;
  }

  if (redirectCountdown !== null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-4">
              You need to be logged in to access this page.
            </p>
            <div className="bg-teal-50 border border-teal-200 rounded-md p-4 mb-4">
              <p className="text-teal-800 font-medium">
                Redirecting to login in {redirectCountdown} seconds...
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() =>
                setShouldRedirect(
                  redirectManager.getRedirectPath("unauthenticated")
                )
              }
              className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors"
            >
              Login Now
            </button>
            <button
              onClick={() => setShouldRedirect("/")}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (requiredRoles && requiredRoles.length > 0) {
    const permissionCheck = authService.checkPermissions(
      user?.role,
      requiredRoles
    );
    if (!permissionCheck.hasPermission) {
      if (fallbackComponent) {
        return <>{fallbackComponent}</>;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-4">
              You don&apos;t have permission to access this page.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-sm text-red-800">
                <strong>Required roles:</strong> {requiredRoles.join(", ")}
                <br />
                <strong>Your role:</strong> {user?.role || "None"}
              </p>
            </div>
            <button
              onClick={() => setShouldRedirect("/")}
              className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}

// Simplified HOC
export function withProtection<P extends object>(
  Component: React.ComponentType<P>,
  requiredRoles?: string[],
  redirectOnFail?: string
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute
        requiredRoles={requiredRoles}
        redirectOnFail={redirectOnFail}
      >
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

// Simplified permissions hook
export function usePermissions(requiredRoles?: string[]) {
  const { isAuthenticated, user, loading } = useAuth();

  const permissionCheck = React.useMemo(() => {
    if (loading || !isAuthenticated) {
      return { hasPermission: false, userRole: undefined };
    }
    return authService.checkPermissions(user?.role, requiredRoles);
  }, [isAuthenticated, user, loading, requiredRoles]);

  return {
    hasPermission: permissionCheck.hasPermission,
    isAuthenticated,
    userRole: permissionCheck.userRole,
    loading,
  };
}
