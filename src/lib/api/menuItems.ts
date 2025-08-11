import { apiClient } from "./client";
import type {
  MenuItem,
  MenuItemFilters,
  MenuItemCreateRequest,
  MenuItemUpdateRequest,
  ApiErrorResponse,
} from "../interfaces";
import { demoMenuItems } from "../../data";

export const menuItemsApi = {
  // Get all menu items with filters
  getAll: async (filters?: MenuItemFilters): Promise<MenuItem[]> => {
    try {
      const params = new URLSearchParams();

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach((v) => params.append(key, v.toString()));
            } else if (typeof value === "object") {
              params.append(key, JSON.stringify(value));
            } else {
              params.append(key, value.toString());
            }
          }
        });
      }

      const queryString = params.toString();
      const url = `/restaurants/menu-items${
        queryString ? `?${queryString}` : ""
      }`;

      return await apiClient.getPaginated<MenuItem>(url);
    } catch (error) {
      const apiError = error as ApiErrorResponse;

      if (
        process.env.NODE_ENV === "development" &&
        apiError?.response?.status === 404
      ) {
        console.info(
          "Menu items endpoint not found, using demo data for development"
        );
        return applyFiltersToDemo(demoMenuItems, filters);
      }
      throw error;
    }
  },

  // Get menu items by restaurant
  getByRestaurant: async (
    restaurantId: string,
    filters?: MenuItemFilters
  ): Promise<MenuItem[]> => {
    try {
      const params = new URLSearchParams();

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach((v) => params.append(key, v.toString()));
            } else if (typeof value === "object") {
              params.append(key, JSON.stringify(value));
            } else {
              params.append(key, value.toString());
            }
          }
        });
      }

      const queryString = params.toString();
      const url = `/restaurants/${restaurantId}/menu-items${
        queryString ? `?${queryString}` : ""
      }`;

      return await apiClient.getPaginated<MenuItem>(url);
    } catch (error) {
      const apiError = error as ApiErrorResponse;

      if (
        process.env.NODE_ENV === "development" &&
        apiError?.response?.status === 404
      ) {
        console.info(
          "Menu items endpoint not found, using demo data for development"
        );
        const restaurantItems = demoMenuItems.filter(
          (item) => item.restaurantId === restaurantId
        );
        return applyFiltersToDemo(restaurantItems, filters);
      }
      throw error;
    }
  },

  // Get menu items by category
  getByCategory: async (
    categoryId: string,
    filters?: MenuItemFilters
  ): Promise<MenuItem[]> => {
    try {
      const filtersWithCategory = { ...filters, categoryId };
      return await menuItemsApi.getAll(filtersWithCategory);
    } catch (error) {
      const apiError = error as ApiErrorResponse;

      if (
        process.env.NODE_ENV === "development" &&
        apiError?.response?.status === 404
      ) {
        console.info(
          "Menu items endpoint not found, using demo data for development"
        );
        const categoryItems = demoMenuItems.filter(
          (item) => item.categoryId === categoryId
        );
        return applyFiltersToDemo(categoryItems, filters);
      }
      throw error;
    }
  },

  // Get featured menu items
  getFeatured: async (limit?: number): Promise<MenuItem[]> => {
    try {
      const params = new URLSearchParams();
      params.append("isFeatured", "true");
      if (limit) params.append("limit", limit.toString());

      const url = `/restaurants/menu-items?${params.toString()}`;
      const result = await apiClient.getPaginated<MenuItem>(url);

      // If we get an empty result in development, use demo data
      if (
        process.env.NODE_ENV === "development" &&
        (!result || result.length === 0)
      ) {
        console.info(
          "API returned empty results, using demo data for development"
        );
        const featuredItems = demoMenuItems.filter(
          (item) => item.isFeatured && item.isActive && item.isVisible
        );
        return limit ? featuredItems.slice(0, limit) : featuredItems;
      }

      return result;
    } catch (error) {
    //   const apiError = error as ApiErrorResponse;

      if (process.env.NODE_ENV === "development") {
        console.info(
          "Menu items endpoint failed, using demo data for development"
        );
        const featuredItems = demoMenuItems.filter(
          (item) => item.isFeatured && item.isActive && item.isVisible
        );
        return limit ? featuredItems.slice(0, limit) : featuredItems;
      }
      throw error;
    }
  },

  // Get menu item by ID
  getById: async (id: string): Promise<MenuItem> => {
    try {
      return await apiClient.get<MenuItem>(`/restaurants/menu-items/${id}`);
    } catch (error) {
      const apiError = error as ApiErrorResponse;

      if (
        process.env.NODE_ENV === "development" &&
        apiError?.response?.status === 404
      ) {
        console.info(
          "Menu item endpoint not found, using demo data for development"
        );
        const item = demoMenuItems.find((item) => item.id === id);
        if (!item) {
          throw new Error(`Menu item with id ${id} not found`);
        }
        return item;
      }
      throw error;
    }
  },

  // Create menu item
  create: async (
    restaurantId: string,
    data: MenuItemCreateRequest,
    token: string
  ): Promise<MenuItem> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.post<MenuItem>(
      `/restaurants/${restaurantId}/menu-items`,
      data,
      config
    );
  },

  // Update menu item
  update: async (
    id: string,
    data: MenuItemUpdateRequest,
    token: string
  ): Promise<MenuItem> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.put<MenuItem>(
      `/restaurants/menu-items/${id}`,
      data,
      config
    );
  },

  // Delete menu item
  delete: async (id: string, token: string): Promise<void> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.delete(`/restaurants/menu-items/${id}`, config);
  },

  // Search menu items
  search: async (
    query: string,
    filters?: MenuItemFilters
  ): Promise<MenuItem[]> => {
    const searchFilters = { ...filters, search: query };
    return menuItemsApi.getAll(searchFilters);
  },
};

// Helper function to apply filters to demo data
function applyFiltersToDemo(
  items: MenuItem[],
  filters?: MenuItemFilters
): MenuItem[] {
  if (!filters) return items.filter((item) => item.isActive && item.isVisible);

  let filteredItems = [...items];

  // Apply search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredItems = filteredItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm) ||
        item.sku.toLowerCase().includes(searchTerm)
    );
  }

  // Apply category filter
  if (filters.categoryId) {
    filteredItems = filteredItems.filter(
      (item) => item.categoryId === filters.categoryId
    );
  }

  // Apply brand filter
  if (filters.brandId) {
    filteredItems = filteredItems.filter(
      (item) => item.brandId === filters.brandId
    );
  }

  // Apply stock status filter
  if (filters.stockStatus && filters.stockStatus.length > 0) {
    filteredItems = filteredItems.filter((item) =>
      filters.stockStatus!.includes(item.stockStatus)
    );
  }

  // Apply price range filter
  if (filters.priceRange) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.finalPrice >= (filters.priceRange!.min || 0) &&
        item.finalPrice <= (filters.priceRange!.max || Infinity)
    );
  }

  // Apply rating filter
  if (filters.rating) {
    filteredItems = filteredItems.filter(
      (item) => item.rating >= filters.rating!
    );
  }

  // Apply active filter
  if (filters.isActive !== undefined) {
    filteredItems = filteredItems.filter(
      (item) => item.isActive === filters.isActive
    );
  }

  // Apply featured filter
  if (filters.isFeatured !== undefined) {
    filteredItems = filteredItems.filter(
      (item) => item.isFeatured === filters.isFeatured
    );
  }

  // Apply visible filter
  if (filters.isVisible !== undefined) {
    filteredItems = filteredItems.filter(
      (item) => item.isVisible === filters.isVisible
    );
  } else {
    // Default to visible items only
    filteredItems = filteredItems.filter((item) => item.isVisible);
  }

  return filteredItems;
}

// Legacy exports for backward compatibility
export const getMenuItems = (restaurantId: number) =>
  menuItemsApi.getByRestaurant(restaurantId.toString());
export const getFeaturedMenuItems = menuItemsApi.getFeatured;
export const searchMenuItems = menuItemsApi.search;
