"use client";

import { AuthProvider } from "@/src/contexts/authContext";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";
import Sidebar from "@/src/components/layout/Protected/Sidebar";
import Header from "@/src/components/layout/Protected/Header";
import Footer from "@/src/components/layout/Protected/Footer";
import { useAuth } from "@/src/contexts/authContext";
import { UserRole } from "@/src/lib/interfaces/enums";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

// Route-to-role mapping for different sections
const getRequiredRoles = (pathname: string): string[] => {
  if (pathname.includes("super-admin")) {
    return [UserRole.SUPER_ADMIN];
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

  // Default: allow all authenticated users
  return [];
};

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const requiredRoles = useMemo(() => getRequiredRoles(pathname), [pathname]);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <ProtectedRoute requiredRoles={requiredRoles}>
      {user && (
        <div className="flex h-screen bg-gray-50">
          <Sidebar
            userRole={user.role}
            isMobileOpen={isMobileSidebarOpen}
            onMobileToggle={toggleMobileSidebar}
          />
          <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
            <Header
              user={user}
              onLogout={logout}
              onMobileMenuToggle={toggleMobileSidebar}
            />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
              <div className="min-h-full flex flex-col">
                <div className="flex-1 p-3 sm:p-6">{children}</div>
                <Footer userRole={user.role} />
              </div>
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
