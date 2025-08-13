import { useState, useEffect } from "react";
import { superAdminApi } from "@/src/lib/api/superAdmin";
import {
  mockStats,
  mockSystemHealth,
  mockRecentActivity,
} from "@/src/data/superadmin.data";
import { DashboardState } from "../types/dashboard.types";

interface ApiError {
  status?: number;
  message?: string;
}

const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === "object" &&
    error !== null &&
    ("status" in error || "message" in error)
  );
};

export function useDashboardData() {
  const [state, setState] = useState<DashboardState>({
    stats: null,
    systemHealth: null,
    recentActivity: [],
    loading: true,
    statsLoading: true,
    healthLoading: true,
    activityLoading: true,
    error: null,
    endpointsAvailable: {
      stats: false,
      health: false,
      activity: false,
    },
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        // Fetch dashboard stats
        setState((prev) => ({ ...prev, statsLoading: true }));
        try {
          const statsData = await superAdminApi.getDashboardStats();
          setState((prev) => ({
            ...prev,
            stats: statsData,
            endpointsAvailable: { ...prev.endpointsAvailable, stats: true },
          }));
        } catch (err: unknown) {
          console.warn("Stats endpoint not available, using mock data:", err);
          setState((prev) => ({
            ...prev,
            stats: mockStats,
            endpointsAvailable: { ...prev.endpointsAvailable, stats: false },
          }));
        } finally {
          setState((prev) => ({ ...prev, statsLoading: false }));
        }

        // Fetch system health
        setState((prev) => ({ ...prev, healthLoading: true }));
        try {
          const healthData = await superAdminApi.getSystemHealth();
          setState((prev) => ({
            ...prev,
            systemHealth: healthData,
            endpointsAvailable: { ...prev.endpointsAvailable, health: true },
          }));
        } catch (err: unknown) {
          console.warn("Health endpoint not available, using mock data:", err);
          setState((prev) => ({
            ...prev,
            systemHealth: mockSystemHealth,
            endpointsAvailable: { ...prev.endpointsAvailable, health: false },
          }));
        } finally {
          setState((prev) => ({ ...prev, healthLoading: false }));
        }

        // Fetch recent activity
        setState((prev) => ({ ...prev, activityLoading: true }));
        try {
          const activityData = await superAdminApi.getRecentActivity({
            limit: 10,
          });
          setState((prev) => ({
            ...prev,
            recentActivity: activityData,
            endpointsAvailable: { ...prev.endpointsAvailable, activity: true },
          }));
        } catch (err: unknown) {
          console.warn(
            "Activity endpoint not available, using mock data:",
            err
          );
          setState((prev) => ({
            ...prev,
            recentActivity: mockRecentActivity,
            endpointsAvailable: { ...prev.endpointsAvailable, activity: false },
          }));
        } finally {
          setState((prev) => ({ ...prev, activityLoading: false }));
        }
      } catch (err: unknown) {
        console.error("Dashboard error:", err);
        const errorMessage = isApiError(err)
          ? err.message
          : "Failed to load dashboard data";
        setState((prev) => ({
          ...prev,
          error: errorMessage || "Failed to load dashboard data",
        }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchDashboardData();
  }, []);

  return state;
}
