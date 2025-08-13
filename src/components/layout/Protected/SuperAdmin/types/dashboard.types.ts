import {
  SuperAdminStats,
  SystemHealth,
  RecentActivity,
} from "@/src/lib/interfaces";

export interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: string;
  loading?: boolean;
}

export interface SystemHealthCardProps {
  health: SystemHealth | null;
  loading: boolean;
}

export interface RecentActivityCardProps {
  activities: RecentActivity[];
  loading: boolean;
}

export interface EndpointsAvailability {
  stats: boolean;
  health: boolean;
  activity: boolean;
}

export interface DashboardState {
  stats: SuperAdminStats | null;
  systemHealth: SystemHealth | null;
  recentActivity: RecentActivity[];
  loading: boolean;
  statsLoading: boolean;
  healthLoading: boolean;
  activityLoading: boolean;
  error: string | null;
  endpointsAvailable: EndpointsAvailability;
}

// Re-export from lib/interfaces for convenience
export type {
  SuperAdminStats,
  SystemHealth,
  RecentActivity,
} from "@/src/lib/interfaces";
