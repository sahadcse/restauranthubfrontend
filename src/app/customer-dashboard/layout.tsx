"use client";

import { AuthProvider } from "@/src/contexts/authContext";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";
import Footer from "@/src/components/layout/Protected/Footer";
import { useAuth } from "@/src/contexts/authContext";
import { UserRole } from "@/src/lib/interfaces/enums";
import Breadcrumb, { BreadcrumbItem } from "../../components/ui/Breadcrumb";
import Header from "../../components/layout/public/Header";

function CustomerLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Customer Dashboard", href: "/customer-dashboard" },
  ];

  return (
    <ProtectedRoute requiredRoles={[UserRole.CUSTOMER]}>
      <Header />
      <Breadcrumb
        items={breadcrumbItems}
        className="container mx-auto max-w-7xl px-4 py-2"
      />
      {user && (
        <div className="bg-gray-50">
          <main className="bg-gray-50">
            <div className="py-6">{children}</div>
            <Footer userRole={user.role} />
          </main>
        </div>
      )}
    </ProtectedRoute>
  );
}

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <CustomerLayout>{children}</CustomerLayout>
    </AuthProvider>
  );
}
