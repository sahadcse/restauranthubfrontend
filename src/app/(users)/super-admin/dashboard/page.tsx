import { Metadata } from "next";
import SuperAdminDashboard from "@/src/components/layout/Protected/SuperAdmin/Dashboard";

export const metadata: Metadata = {
  title: "Super Admin Dashboard | Restaurant Hub",
  description:
    "Super admin dashboard for managing the restaurant e-commerce platform",
};

export default function SuperAdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-3 sm:py-6">
        <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-8">
          <SuperAdminDashboard />
        </div>
      </div>
    </div>
  );
}
