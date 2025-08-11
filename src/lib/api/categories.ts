import { apiClient } from "./client";
import type { Category } from "../interfaces";
import { demoCategories } from "../../data";

export const categoriesApi = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    try {
      const result = await apiClient.getPaginated<Category>(
        "/restaurants/categories"
      );

      // If we get an empty result in development, use demo data
      if (
        process.env.NODE_ENV === "development" &&
        (!result || result.length === 0)
      ) {
        console.info(
          "API returned empty results, using demo data for development"
        );
        return demoCategories;
      }

      return result;
    } catch (error) {
    //   const apiError = error as ApiErrorResponse;

      // Always return demo data in development if API fails
      if (process.env.NODE_ENV === "development") {
        console.info(
          "Categories endpoint failed, using demo data for development"
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
