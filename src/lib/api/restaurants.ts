import { apiClient } from "./client";
import {
  Restaurant,
  MenuItem,
} from "../types/api";

// Restaurant CRUD operations
export const restaurantApi = {
  // Get all restaurants
  getAll: async (): Promise<Restaurant[]> => {
    return apiClient.getPaginated<Restaurant>("/restaurants");
  },

  // Get restaurant by ID
  getById: async (id: number): Promise<Restaurant> => {
    return apiClient.get<Restaurant>(`/restaurants/${id}`);
  },

  // Get restaurant by owner (authenticated)
  getByOwner: async (token: string): Promise<Restaurant> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.get<Restaurant>("/restaurants/my-restaurant", config);
  },

  // Get all restaurants for admin
  getAllForAdmin: async (token: string): Promise<Restaurant[]> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.getPaginated<Restaurant>(
      "/restaurants/restaurantsAdmin",
      config
    );
  },

  // Update restaurant
  update: async (
    id: number,
    data: Partial<Restaurant>,
    token: string
  ): Promise<Restaurant> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.put<Restaurant>(`/restaurants/${id}`, data, config);
  },

  // Update restaurant status (admin only)
  updateStatus: async (
    id: number,
    data: { approved: boolean },
    token: string
  ): Promise<Restaurant> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.put<Restaurant>(
      `/restaurants/${id}/approve`,
      data,
      config
    );
  },

  // Delete restaurant
  delete: async (id: number, token: string): Promise<void> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.delete(`/restaurants/${id}`, config);
  },
};

// Menu item operations
export const menuApi = {
  // Get menu items for restaurant
  getItems: async (restaurantId: number): Promise<MenuItem[]> => {
    return apiClient.getPaginated<MenuItem>(`/menu/${restaurantId}`);
  },

  // Create menu item
  createItem: async (
    restaurantId: number,
    item: Omit<MenuItem, "id" | "restaurant_id">,
    token: string
  ): Promise<MenuItem> => {
    const config = apiClient.createAuthenticatedConfig(token);
    const payload = { restaurant_id: restaurantId, ...item };
    return apiClient.post<MenuItem>("/menu", payload, config);
  },

  // Update menu item
  updateItem: async (
    id: number,
    item: Omit<MenuItem, "id" | "restaurant_id">,
    token: string
  ): Promise<MenuItem> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.put<MenuItem>(`/menu/${id}`, item, config);
  },

  // Delete menu item
  deleteItem: async (id: number, token: string): Promise<void> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.delete(`/menu/${id}`, config);
  },
};

// Legacy exports for backward compatibility
export const getRestaurants = restaurantApi.getAll;
export const getMenuItems = menuApi.getItems;
export const createMenuItem = menuApi.createItem;
export const updateMenuItem = menuApi.updateItem;
export const deleteMenuItem = menuApi.deleteItem;
export const getRestaurantByOwner = restaurantApi.getByOwner;
export const getAllRestaurantsForAdmin = restaurantApi.getAllForAdmin;
export const updateRestaurant = restaurantApi.update;
export const updateStatusRestaurant = restaurantApi.updateStatus;
export const deleteRestaurant = restaurantApi.delete;
