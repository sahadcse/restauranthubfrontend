"use client";

import { AuthProvider, useAuth } from "@/src/contexts/authContext";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import Sidebar from "@/src/components/layout/Protected/Sidebar";
import Header from "@/src/components/layout/Protected/Header";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type UserRole = "admin" | "customer" | "restaurant" | "superAdmin";

// Role-based route protection mapping
const PROTECTED_ROUTES: Record<string, UserRole[]> = {
  "/admin": ["admin", "superAdmin"],
  "/customer": ["customer"],
  "/restaurant": ["restaurant"],
  "/superadmin": ["superAdmin"],
};

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    if (loading) return;

    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      router.push("/auth/login");
      return;
    }

    // Check role-based authorization
    const currentRoute = `/${pathname.split("/")[1]}`;
    const allowedRoles = PROTECTED_ROUTES[currentRoute];

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on user role
      const redirectMap: Record<UserRole, string> = {
        admin: "/admin",
        customer: "/customer",
        restaurant: "/restaurant",
        superAdmin: "/superadmin",
      };

      router.push(redirectMap[user.role] || "/unauthorized");
      return;
    }

    setIsAuthorized(true);
  }, [user, loading, pathname, router, isAuthenticated]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user || !isAuthorized) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={user.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={logout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedLayout>{children}</ProtectedLayout>
    </AuthProvider>
  );
}
