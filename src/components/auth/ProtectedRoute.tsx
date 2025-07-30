"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/authContext";
import LoadingSpinner from "../ui/LoadingSpinner";

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  redirectOnFail?: string;
  fallbackComponent?: React.ReactNode;
}

export default function ProtectedRoute({
  children,
  requiredRoles,
  redirectOnFail,
  fallbackComponent,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(
    null
  );
  const [shouldRedirect, setShouldRedirect] = useState<string | null>(null);

  // Handle redirects in a separate useEffect to avoid state updates during render
  useEffect(() => {
    if (shouldRedirect) {
      router.push(shouldRedirect);
      setShouldRedirect(null);
    }
  }, [shouldRedirect, router]);

  useEffect(() => {
    // Don't redirect during initial loading
    if (loading) return;

    // Check authentication
    if (!isAuthenticated) {
      setRedirectCountdown(5);

      const countdownInterval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev === null) return null;

          const newCount = prev - 1;

          if (newCount <= 0) {
            clearInterval(countdownInterval);
            // Schedule redirect instead of calling router.push directly
            setShouldRedirect("/auth/login");
            return null;
          }

          return newCount;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }

    // Check role-based access if requiredRoles is specified
    if (requiredRoles && requiredRoles.length > 0) {
      const userRole = user?.role;
      const hasRequiredRole = userRole && requiredRoles.includes(userRole);

      if (!hasRequiredRole) {
        // Schedule redirect instead of calling router.push directly
        setShouldRedirect(redirectOnFail || "/unauthorized");
        return;
      }
    }

    // Clear any pending redirects if user is now authorized
    setRedirectCountdown(null);
  }, [isAuthenticated, user, loading, requiredRoles, redirectOnFail]);

  // Show loading spinner during initial auth check
  if (loading) {
    return <LoadingSpinner fullScreen text="Authenticating..." size="large" />;
  }

  // Show authentication required message with countdown
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
              onClick={() => setShouldRedirect("/auth/login")}
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

  // Show unauthorized message if user doesn't have required role
  if (requiredRoles && requiredRoles.length > 0) {
    const userRole = user?.role;
    const hasRequiredRole = userRole && requiredRoles.includes(userRole);

    if (!hasRequiredRole) {
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
                <strong>Your role:</strong> {userRole || "None"}
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

  // User is authenticated and authorized
  return <>{children}</>;
}

// Higher-order component version for easier usage
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

// Hook for checking permissions without redirecting
export function usePermissions(requiredRoles?: string[]) {
  const { isAuthenticated, user, loading } = useAuth();

  const hasPermission = React.useMemo(() => {
    if (loading || !isAuthenticated) return false;

    if (!requiredRoles || requiredRoles.length === 0) {
      return isAuthenticated;
    }

    const userRole = user?.role;
    return userRole && requiredRoles.includes(userRole);
  }, [isAuthenticated, user, loading, requiredRoles]);

  return {
    hasPermission,
    isAuthenticated,
    userRole: user?.role,
    loading,
  };
}
