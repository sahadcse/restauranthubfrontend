"use client";

import { AuthProvider } from "@/src/contexts/authContext";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";
import Sidebar from "@/src/components/layout/Protected/Sidebar";
import Header from "@/src/components/layout/Protected/Header";
import { useAuth } from "@/src/contexts/authContext";
import { UserRole } from "@/src/lib/interfaces/enums";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

// Route-to-role mapping for different sections
const getRequiredRoles = (pathname: string): string[] => {
  if (pathname.includes("customer-panel")) {
    return [UserRole.CUSTOMER];
  }
  if (pathname.includes("admin")) {
    return [UserRole.ADMIN, UserRole.SUPER_ADMIN];
  }
  if (pathname.includes("restaurant") || pathname.includes("dashboard")) {
    return [UserRole.RESTAURANT_OWNER, UserRole.RESTAURANT_STAFF];
  }
  if (pathname.includes("driver")) {
    return [UserRole.DRIVER];
  }
  if (pathname.includes("superadmin")) {
    return [UserRole.SUPER_ADMIN];
  }

  // Default: allow all authenticated users
  return [];
};

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const requiredRoles = useMemo(() => getRequiredRoles(pathname), [pathname]);

  return (
    <ProtectedRoute requiredRoles={requiredRoles}>
      {user && (
        <div className="flex h-screen bg-gray-50">
          <Sidebar userRole={user.role} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header user={user} onLogout={logout} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
              {children}
            </main>
          </div>
        </div>
      )}
    </ProtectedRoute>
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
