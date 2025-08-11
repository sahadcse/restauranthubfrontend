import { apiClient } from "./client";
import { Order } from "../interfaces";

export const orderApi = {
  // Create order
  create: async (
    restaurantId: number,
    items: { menu_item_id: number; quantity: number }[],
    total: number,
    token: string
  ): Promise<Order> => {
    const config = apiClient.createAuthenticatedConfig(token);
    const payload = { restaurant_id: restaurantId, items, total };
    const response = await apiClient.post<Order>("/orders", payload, config);
    console.log("Order response:", response);
    return response;
  },

  // Get restaurant orders
  getRestaurantOrders: async (
    restaurantId: number,
    token: string
  ): Promise<Order[]> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.getPaginated<Order>(
      `/orders/restaurant/${restaurantId}`,
      config
    );
  },

  // Get customer orders
  getCustomerOrders: async (token: string): Promise<Order[]> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.getPaginated<Order>("/orders/my-orders", config);
  },

  // Update order status
  updateStatus: async (
    orderId: number,
    status: "pending" | "preparing" | "shipped" | "delivered",
    token: string
  ): Promise<Order> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.put<Order>(
      `/orders/${orderId}/status`,
      { status },
      config
    );
  },

  // Get single order by ID
  getById: async (orderId: number, token: string): Promise<Order> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.get<Order>(`/orders/${orderId}`, config);
  },

  // Cancel order
  cancel: async (
    orderId: number,
    reason: string,
    token: string
  ): Promise<Order> => {
    const config = apiClient.createAuthenticatedConfig(token);
    return apiClient.put<Order>(
      `/orders/${orderId}/cancel`,
      { reason },
      config
    );
  },
};

// Legacy exports for backward compatibility
export const createOrder = orderApi.create;
export const getRestaurantOrders = orderApi.getRestaurantOrders;
export const getCustomerOrders = orderApi.getCustomerOrders;
export const updateOrderStatus = orderApi.updateStatus;
