import { apiClient } from "./client";
import {
  SuperAdminStats,
  AdminUser,
  SystemHealth,
  EmailTestResult,
  RecentActivity,
  SystemNotification,
  BackupStatus,
  DatabaseStats,
} from "../interfaces/";
import {
  HeroSlider,
  Banner,
  HeroSliderCreateRequest,
  ContentCreateRequest,
} from "../interfaces/content";

// Error interface for API errors
interface ApiError {
  status?: number;
  message?: string;
}

// Super Admin API Service
export class SuperAdminApi {
  // Dashboard & Analytics
  async getDashboardStats(): Promise<SuperAdminStats> {
    try {
      return await apiClient.get<SuperAdminStats>("/admin/dashboard/stats");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      // Re-throw with additional context
      if (apiError.status === 404) {
        throw new Error("Dashboard stats endpoint not implemented");
      }
      throw error;
    }
  }

  async getRecentActivity(params?: {
    page?: number;
    limit?: number;
    type?: string;
  }): Promise<RecentActivity[]> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.type) queryParams.append("type", params.type);

    try {
      return await apiClient.get<RecentActivity[]>(
        `/admin/activity?${queryParams.toString()}`
      );
    } catch (error: unknown) {
      const apiError = error as ApiError;
      // Re-throw with additional context
      if (apiError.status === 404) {
        throw new Error("Recent activity endpoint not implemented");
      }
      throw error;
    }
  }

  async getSystemNotifications(): Promise<SystemNotification[]> {
    try {
      return await apiClient.get<SystemNotification[]>(
        "/admin/notifications/system"
      );
    } catch (error: unknown) {
      const apiError = error as ApiError;
      if (apiError.status === 404) {
        throw new Error("System notifications endpoint not implemented");
      }
      throw error;
    }
  }

  async getBackupStatus(): Promise<BackupStatus> {
    try {
      return await apiClient.get<BackupStatus>("/admin/system/backup/status");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      if (apiError.status === 404) {
        throw new Error("Backup status endpoint not implemented");
      }
      throw error;
    }
  }

  async triggerBackup(): Promise<{ message: string; backupId: string }> {
    try {
      return await apiClient.post("/admin/system/backup/trigger");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      if (apiError.status === 404) {
        throw new Error("Backup trigger endpoint not implemented");
      }
      throw error;
    }
  }

  async getDatabaseStats(): Promise<DatabaseStats> {
    try {
      return await apiClient.get<DatabaseStats>("/admin/system/database/stats");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      if (apiError.status === 404) {
        throw new Error("Database stats endpoint not implemented");
      }
      throw error;
    }
  }

  // User Management
  async getAllUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    isActive?: boolean;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.role) queryParams.append("role", params.role);
    if (params?.isActive !== undefined)
      queryParams.append("isActive", params.isActive.toString());

    return apiClient.getPaginated(`/users?${queryParams.toString()}`);
  }

  async createAdmin(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    privacyConsent: boolean;
  }): Promise<AdminUser> {
    return apiClient.post<AdminUser>("/users/register/admin", userData);
  }

  async updateUserStatus(userId: string, isActive: boolean): Promise<void> {
    return apiClient.patch(`/users/${userId}/status`, { isActive });
  }

  async deleteUser(userId: string): Promise<void> {
    return apiClient.delete(`/users/${userId}`);
  }

  // Restaurant Management
  async getAllRestaurants(params?: {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.isActive !== undefined)
      queryParams.append("isActive", params.isActive.toString());

    return apiClient.getPaginated(`/restaurants?${queryParams.toString()}`);
  }

  async approveRestaurant(restaurantId: string): Promise<void> {
    return apiClient.patch(`/restaurants/${restaurantId}/approve`);
  }

  async suspendRestaurant(
    restaurantId: string,
    reason?: string
  ): Promise<void> {
    return apiClient.patch(`/restaurants/${restaurantId}/suspend`, { reason });
  }

  // Order Management
  async getAllOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
    restaurantId?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);
    if (params?.restaurantId)
      queryParams.append("restaurantId", params.restaurantId);

    return apiClient.getPaginated(`/orders?${queryParams.toString()}`);
  }

  // Driver Management
  async getAllDrivers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);

    return apiClient.get(`/orders/drivers?${queryParams.toString()}`);
  }

  async createDriver(driverData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    licenseNumber?: string;
    vehicleInfo?: string;
  }) {
    return apiClient.post("/orders/drivers", driverData);
  }

  async updateDriver(
    driverId: string,
    driverData: Partial<{
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      licenseNumber?: string;
      vehicleInfo?: string;
      isActive: boolean;
    }>
  ) {
    return apiClient.put(`/orders/drivers/${driverId}`, driverData);
  }

  // Content Management
  async getHeroSliders() {
    return apiClient.get("/content/hero-sliders");
  }

  async createHeroSlider(sliderData: HeroSliderCreateRequest) {
    return apiClient.post("/content/hero-sliders", sliderData);
  }

  async updateHeroSlider(sliderId: string, sliderData: Partial<HeroSlider>) {
    return apiClient.put(`/content/hero-sliders/${sliderId}`, sliderData);
  }

  async deleteHeroSlider(sliderId: string): Promise<void> {
    return apiClient.delete(`/content/hero-sliders/${sliderId}`);
  }

  async getBanners() {
    return apiClient.get("/content/banners");
  }

  async createBanner(
    bannerData: ContentCreateRequest & {
      link?: string;
    }
  ) {
    return apiClient.post("/content/banners", bannerData);
  }

  async updateBanner(bannerId: string, bannerData: Partial<Banner>) {
    return apiClient.put(`/content/banners/${bannerId}`, bannerData);
  }

  async deleteBanner(bannerId: string): Promise<void> {
    return apiClient.delete(`/content/banners/${bannerId}`);
  }

  // System Management
  async getSystemHealth(): Promise<SystemHealth> {
    try {
      return await apiClient.get<SystemHealth>("/admin/system/health");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      if (apiError.status === 404) {
        throw new Error("System health endpoint not implemented");
      }
      throw error;
    }
  }

  async testEmailConfiguration(): Promise<EmailTestResult> {
    try {
      return await apiClient.get<EmailTestResult>("/admin/system/test-email");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      if (apiError.status === 404) {
        throw new Error("Email test endpoint not implemented");
      }
      throw error;
    }
  }

  // Notifications
  async getAllNotifications(params?: {
    page?: number;
    limit?: number;
    type?: string;
    userId?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.type) queryParams.append("type", params.type);
    if (params?.userId) queryParams.append("userId", params.userId);

    return apiClient.get(
      `/notifications/notifications?${queryParams.toString()}`
    );
  }

  async createNotification(notificationData: {
    userId?: string;
    title: string;
    message: string;
    type: "SYSTEM" | "ORDER" | "PROMOTION" | "WARNING";
  }) {
    return apiClient.post("/notifications/notifications", notificationData);
  }

  async createBulkNotification(notificationData: {
    userIds: string[];
    title: string;
    message: string;
    type: "SYSTEM" | "ORDER" | "PROMOTION" | "WARNING";
  }) {
    return apiClient.post(
      "/notifications/notifications/bulk",
      notificationData
    );
  }

  // Feedback Management
  async getAllFeedback(params?: {
    page?: number;
    limit?: number;
    rating?: number;
    restaurantId?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.rating) queryParams.append("rating", params.rating.toString());
    if (params?.restaurantId)
      queryParams.append("restaurantId", params.restaurantId);

    return apiClient.get(`/notifications/feedback?${queryParams.toString()}`);
  }

  async getFeedbackStats() {
    return apiClient.get("/notifications/feedback/stats");
  }

  async deleteFeedback(feedbackId: string): Promise<void> {
    return apiClient.delete(`/notifications/feedback/${feedbackId}`);
  }

  // Reports & Analytics
  async getAnalyticsReport(params: {
    startDate: string;
    endDate: string;
    reportType: "revenue" | "orders" | "users" | "restaurants";
    granularity?: "daily" | "weekly" | "monthly";
  }) {
    const queryParams = new URLSearchParams({
      startDate: params.startDate,
      endDate: params.endDate,
      reportType: params.reportType,
      ...(params.granularity && { granularity: params.granularity }),
    });

    return apiClient.get(`/admin/analytics/reports?${queryParams.toString()}`);
  }

  // Categories Management (Global)
  async getAllCategories() {
    return apiClient.get("/restaurants/categories");
  }

  async createCategory(categoryData: {
    name: string;
    description?: string;
    imageUrl?: string;
  }) {
    return apiClient.post("/restaurants/categories", categoryData);
  }

  async updateCategory(
    categoryId: string,
    categoryData: Partial<{
      name: string;
      description?: string;
      imageUrl?: string;
    }>
  ) {
    return apiClient.put(`/restaurants/categories/${categoryId}`, categoryData);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    return apiClient.delete(`/restaurants/categories/${categoryId}`);
  }
}

// Export singleton instance
export const superAdminApi = new SuperAdminApi();
