// Types
export interface SuperAdminStats {
  totalUsers: number;
  totalRestaurants: number;
  totalOrders: number;
  totalRevenue: number;
  activeDrivers: number;
  pendingApprovals: number;
}

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface SystemHealth {
  status: "ok" | "warning" | "error";
  timestamp: string;
  database: "connected" | "disconnected";
  uptime: number;
  memoryUsage: number;
}

export interface EmailTestResult {
  status: "success" | "error";
  message: string;
}

export interface RecentActivity {
  id: string;
  type: "registration" | "system" | "warning" | "order" | "approval";
  message: string;
  timestamp: string;
  severity: "info" | "success" | "warning" | "error";
  userId?: string;
  restaurantId?: string;
  orderId?: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: "SYSTEM" | "ORDER" | "PROMOTION" | "WARNING";
  isRead: boolean;
  createdAt: string;
}

export interface BackupStatus {
  lastBackup: string;
  status: "success" | "failed" | "in_progress";
  size?: string;
  location?: string;
}

export interface DatabaseStats {
  totalTables: number;
  totalRecords: number;
  databaseSize: string;
  lastOptimized: string;
}
