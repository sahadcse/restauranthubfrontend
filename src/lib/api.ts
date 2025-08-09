// Legacy API file - maintained for backward compatibility
// New code should import from ./interfaces

import axios from "axios";

// Import interfaces from the new centralized location
export * from "./interfaces";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Import types for internal use
import {
  Restaurant,
  MenuItem,
  Order,
  UserRegistrationData,
  RegisterResponse,
  HeroSlider,
  Category,
  ApiErrorResponse,
} from "./interfaces";

// Import demo data
import { demoCategories } from "../data";

// API Functions
export const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await api.get<Restaurant[]>("/restaurants");
  return response.data;
};

export const getMenuItems = async (
  restaurantId: number
): Promise<MenuItem[]> => {
  const response = await api.get<MenuItem[]>(`/menu/${restaurantId}`);
  return response.data;
};

export const registerUser = async (
  userData: UserRegistrationData,
  role: "customer" | "restaurant-owner"
): Promise<RegisterResponse> => {
  const endpoint =
    role === "customer"
      ? "/users/register/customer"
      : "/users/register/restaurant-owner";

  const response = await api.post<RegisterResponse>(endpoint, userData);
  return response.data;
};

export const createOrder = async (
  restaurantId: number,
  items: { menu_item_id: number; quantity: number }[],
  total: number,
  token: string
): Promise<Order> => {
  const response = await api.post<Order>(
    "/orders",
    { restaurant_id: restaurantId, items, total },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log("Order response:", response);
  return response.data;
};

export const createMenuItem = async (
  restaurantId: number,
  item: Omit<MenuItem, "id" | "restaurant_id">,
  token: string
): Promise<MenuItem> => {
  const response = await api.post<MenuItem>(
    "/menu",
    { restaurant_id: restaurantId, ...item },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const updateMenuItem = async (
  id: number,
  item: Omit<MenuItem, "id" | "restaurant_id">,
  token: string
): Promise<MenuItem> => {
  const response = await api.put<MenuItem>(`/menu/${id}`, item, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteMenuItem = async (
  id: number,
  token: string
): Promise<void> => {
  await api.delete(`/menu/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getRestaurantOrders = async (
  restaurantId: number,
  token: string
): Promise<Order[]> => {
  const response = await api.get<Order[]>(
    `/orders/restaurant/${restaurantId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateOrderStatus = async (
  orderId: number,
  status: "pending" | "preparing" | "shipped" | "delivered",
  token: string
): Promise<Order> => {
  const response = await api.put<Order>(
    `/orders/${orderId}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getRestaurantByOwner = async (
  token: string
): Promise<Restaurant> => {
  const response = await api.get<Restaurant>("/restaurants/my-restaurant", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllRestaurantsForAdmin = async (
  token: string
): Promise<Restaurant[]> => {
  const response = await api.get<Restaurant[]>(
    "/restaurants/restaurantsAdmin",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateRestaurant = async (
  id: number,
  data: Partial<Restaurant>,
  token: string
): Promise<Restaurant> => {
  const response = await api.put<Restaurant>(`/restaurants/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateStatusRestaurant = async (
  id: number,
  data: { approved: boolean },
  token: string
): Promise<Restaurant> => {
  const response = await api.put<Restaurant>(
    `/restaurants/${id}/approve`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteRestaurant = async (
  id: number,
  token: string
): Promise<void> => {
  await api.delete(`/restaurants/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getCustomerOrders = async (token: string): Promise<Order[]> => {
  const response = await api.get<Order[]>("/orders/my-orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getHeroSliders = async (): Promise<HeroSlider[]> => {
  try {
    const response = await api.get("/content/hero-sliders");

    // Handle different response formats (array or paginated response)
    if (Array.isArray(response.data)) {
      return response.data as HeroSlider[];
    } else if (
      response.data &&
      typeof response.data === "object" &&
      "data" in response.data &&
      Array.isArray(response.data.data)
    ) {
      return response.data.data as HeroSlider[];
    } else {
      console.warn("Unexpected hero sliders data format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching hero sliders:", error);
    throw error;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/restaurants/categories");

    // Handle different response formats (array or paginated response)
    if (Array.isArray(response.data)) {
      return response.data as Category[];
    } else if (
      response.data &&
      typeof response.data === "object" &&
      "data" in response.data &&
      Array.isArray(response.data.data)
    ) {
      return response.data.data as Category[];
    } else {
      console.warn("Unexpected categories data format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching categories:", error);

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
};

// Utility functions
export const formatRestaurantLocation = (restaurant: Restaurant): string => {
  if (typeof restaurant.location === "string") {
    return restaurant.location;
  }

  if (restaurant.address) {
    return restaurant.address;
  }

  if (restaurant.location && typeof restaurant.location === "object") {
    const { latitude, longitude } = restaurant.location;
    if (latitude && longitude) {
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }
  }

  return "Location not available";
};

export default api;
