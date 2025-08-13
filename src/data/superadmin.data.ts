import {
    SuperAdminStats,
    SystemHealth,
    RecentActivity,
} from "@/src/lib/interfaces";

// Mock data for fallback when endpoints are not available
export const mockStats: SuperAdminStats = {
  totalUsers: 1247,
  totalRestaurants: 89,
  totalOrders: 3456,
  totalRevenue: 125890.5,
  activeDrivers: 23,
  pendingApprovals: 8,
};

export const mockSystemHealth: SystemHealth = {
  status: "ok",
  timestamp: new Date().toISOString(),
  database: "connected",
  uptime: 86400, // 24 hours in seconds
  memoryUsage: 68,
};

export const mockRecentActivity: RecentActivity[] = [
  {
    id: "1",
    type: "registration",
    message: 'New restaurant "Tasty Bites" registered',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    severity: "success",
  },
  {
    id: "2",
    type: "system",
    message: "System backup completed successfully",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    severity: "success",
  },
  {
    id: "3",
    type: "warning",
    message: "High memory usage detected",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    severity: "warning",
  },
  {
    id: "4",
    type: "order",
    message: "Large order received from Downtown Deli",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    severity: "info",
  },
  {
    id: "5",
    type: "approval",
    message: 'Restaurant "Pizza Corner" approved',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    severity: "success",
  },
];

