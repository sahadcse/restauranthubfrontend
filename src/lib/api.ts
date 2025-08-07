// frontend/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Restaurant {
  id: number;
  name: string;
  location: string;
  logo_url?: string;
  owner_id: number;
  approved: boolean;
}

export interface MenuItem {
  id: number;
  restaurant_id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

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

export interface Order {
  id: number;
  user_id: number;
  restaurant_id: number;
  status: "pending" | "preparing" | "shipped" | "delivered";
  total: number;
  created_at: string;
}

export interface UserRegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  privacyConsent: boolean;
}

export interface RegisterResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: "CUSTOMER" | "RESTAURANT_OWNER" | "ADMIN";
  };
}

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
  return response.data; // Admin sees all restaurants
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

// Update restaurant details (admin only) "/:id/approve" const { approved } = req.body;
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

export interface HeroSlider {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  price?: number;
  buttonText?: string;
  linkUrl?: string;
  linkType: "NONE" | "RESTAURANT" | "CAMPAIGN" | "MENU_ITEM" | "EXTERNAL";
  linkTargetId?: string;
  displayOrder: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  tenantId?: string;
}

export const getHeroSliders = async (): Promise<HeroSlider[]> => {
  try {
    const response = await fetch(`${api}/content/hero-sliders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch hero sliders: ${response.status}`);
    }

    const data = await response.json();

    // Handle different response formats (array or paginated response)
    if (Array.isArray(data)) {
      return data as HeroSlider[];
    } else if (
      data &&
      typeof data === "object" &&
      "data" in data &&
      Array.isArray(data.data)
    ) {
      return data.data as HeroSlider[];
    } else {
      console.warn("Unexpected hero sliders data format:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching hero sliders:", error);
    throw error;
  }
};

export default api;
