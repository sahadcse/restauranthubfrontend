"use client";

import DashboardCard from "./components/DashboardCard";
import SystemHealthCard from "./components/SystemHealthCard";
import QuickActions from "./components/QuickActions";
import RecentActivityCard from "./components/RecentActivityCard";
import DashboardHeader from "./components/DashboardHeader";
import DashboardNotifications from "./components/DashboardNotifications";
import { useDashboardData } from "./hooks/useDashboardData";

export default function SuperAdminDashboard() {
  const {
    stats,
    systemHealth,
    recentActivity,
    loading,
    statsLoading,
    healthLoading,
    activityLoading,
    error,
    endpointsAvailable,
  } = useDashboardData();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <DashboardHeader />

      {/* Notifications */}
      <DashboardNotifications
        error={error}
        loading={loading}
        endpointsAvailable={endpointsAvailable}
      />

      {/* Stats Grid - Responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <DashboardCard
          title="Total Users"
          value={stats?.totalUsers.toLocaleString() || "0"}
          icon="👥"
          color="border-blue-500"
          loading={statsLoading}
        />
        <DashboardCard
          title="Restaurants"
          value={stats?.totalRestaurants.toLocaleString() || "0"}
          icon="🏪"
          color="border-green-500"
          loading={statsLoading}
        />
        <DashboardCard
          title="Total Orders"
          value={stats?.totalOrders.toLocaleString() || "0"}
          icon="🛒"
          color="border-purple-500"
          loading={statsLoading}
        />
        <DashboardCard
          title="Revenue"
          value={stats ? `$${stats.totalRevenue.toLocaleString()}` : "$0"}
          icon="💰"
          color="border-yellow-500"
          loading={statsLoading}
        />
        <DashboardCard
          title="Active Drivers"
          value={stats?.activeDrivers || "0"}
          icon="🚗"
          color="border-indigo-500"
          loading={statsLoading}
        />
        <DashboardCard
          title="Pending Approvals"
          value={stats?.pendingApprovals || "0"}
          icon="⏳"
          color="border-red-500"
          loading={statsLoading}
        />
      </div>

      {/* Second Row - System Health and Quick Actions - Stack on mobile */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <SystemHealthCard health={systemHealth} loading={healthLoading} />
        <QuickActions />
      </div>

      {/* Recent Activity */}
      <RecentActivityCard
        activities={recentActivity}
        loading={activityLoading}
      />
    </div>
  );
}
