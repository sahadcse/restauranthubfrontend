import { apiClient } from "./client";
import { Category, ApiErrorResponse } from "../interfaces";
import { demoCategories } from "../../data";

export const categoriesApi = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    try {
      return await apiClient.getPaginated<Category>("/restaurants/categories");
    } catch (error) {
      const apiError = error as ApiErrorResponse;

      // Only return demo data if explicitly needed for development
      if (
        process.env.NODE_ENV === "development" &&
        apiError?.response?.status === 404
      ) {
        console.info(
          "Categories endpoint not found, using demo data for development"
        );
        return demoCategories;
      }
      throw error;
    }
  },

  // Get category by ID
  getById: async (id: string): Promise<Category> => {
    return apiClient.get<Category>(`/restaurants/categories/${id}`);
  },

  // Get category by slug
  getBySlug: async (slug: string): Promise<Category> => {
    return apiClient.get<Category>(`/restaurants/categories/slug/${slug}`);
  },

  // Create category
  create: async (
    data: Omit<Category, "id" | "createdAt" | "updatedAt">,
    token: string
  ): Promise<Category> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.post<Category>("/restaurants/categories", data, config);
  },

  // Update category
  update: async (
    id: string,
    data: Partial<Category>,
    token: string
  ): Promise<Category> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.put<Category>(
      `/restaurants/categories/${id}`,
      data,
      config
    );
  },

  // Delete category
  delete: async (id: string, token: string): Promise<void> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.delete(`/restaurants/categories/${id}`, config);
  },
};

// Legacy exports for backward compatibility
export const getCategories = categoriesApi.getAll;
