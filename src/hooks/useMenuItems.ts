import { useState, useEffect, useCallback } from "react";
import { menuItemsApi } from "../lib/api/menuItems";
import type {
  MenuItem,
  MenuItemFilters,
  ApiErrorResponse,
} from "../lib/interfaces";

export interface UseMenuItemsOptions {
  restaurantId?: string;
  categoryId?: string;
  featured?: boolean;
  limit?: number;
  initialFilters?: MenuItemFilters;
  autoFetch?: boolean;
}

export function useMenuItems(options: UseMenuItemsOptions = {}) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<MenuItemFilters>(
    options.initialFilters || {}
  );

  const fetchMenuItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let items: MenuItem[];

      if (options.featured) {
        items = await menuItemsApi.getFeatured(options.limit);
      } else if (options.restaurantId) {
        items = await menuItemsApi.getByRestaurant(
          options.restaurantId,
          filters
        );
      } else if (options.categoryId) {
        items = await menuItemsApi.getByCategory(options.categoryId, filters);
      } else {
        items = await menuItemsApi.getAll(filters);
      }

      // Apply limit if specified and not already applied
      if (options.limit && !options.featured) {
        items = items.slice(0, options.limit);
      }

      setMenuItems(items);
    } catch (menuError) {
      console.error("Failed to fetch menu items:", menuError);

      const apiError = menuError as ApiErrorResponse;

      if (apiError?.response?.status === 404) {
        setError(
          "No menu items found at the moment. Check back later for delicious new dishes!"
        );
      } else if (apiError?.response?.status === 500) {
        setError(
          "We're experiencing technical difficulties. Please try again in a moment."
        );
      } else if (apiError?.code === "NETWORK_ERROR" || !navigator.onLine) {
        setError("Please check your internet connection and try again.");
      } else {
        setError(
          "Unable to load menu items right now. Please refresh the page or try again later."
        );
      }

      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  }, [
    options.restaurantId,
    options.categoryId,
    options.featured,
    options.limit,
    filters,
  ]);

  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchMenuItems();
    }
  }, [fetchMenuItems, options.autoFetch]);

  const updateFilters = useCallback((newFilters: Partial<MenuItemFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const refetch = useCallback(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const searchItems = useCallback(
    async (query: string) => {
      try {
        setLoading(true);
        setError(null);

        const items = await menuItemsApi.search(query, filters);
        setMenuItems(items);
      } catch (searchError) {
        console.error("Failed to search menu items:", searchError);
        setError("Search failed. Please try again.");
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  return {
    menuItems,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refetch,
    searchItems,
    fetchMenuItems,
  };
}

export function useMenuItem(id: string) {
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItem = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const item = await menuItemsApi.getById(id);
      setMenuItem(item);
    } catch (itemError) {
      console.error("Failed to fetch menu item:", itemError);

      const apiError = itemError as ApiErrorResponse;

      if (apiError?.response?.status === 404) {
        setError("Menu item not found.");
      } else {
        setError("Failed to load menu item. Please try again.");
      }

      setMenuItem(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMenuItem();
  }, [fetchMenuItem]);

  const refetch = useCallback(() => {
    fetchMenuItem();
  }, [fetchMenuItem]);

  return {
    menuItem,
    loading,
    error,
    refetch,
  };
}
