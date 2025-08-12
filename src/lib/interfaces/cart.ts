export interface Cart {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  tenantId: string;
  items: CartItem[];
}

export interface CartItem {
  id: string;
  cartId: string;
  menuItemId: string;
  variantId?: string;
  quantity: number;
  addedAt: Date;
}

// Add a simplified cart item for local cart operations
export interface SimpleCartItem {
  id: number | string;
  restaurant_id?: number;
  name: string;
  price: number;
  image_url?: string;
  description?: string;
  quantity: number;
}

export interface AddToCartRequest {
  menuItemId: string;
  variantId?: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}
