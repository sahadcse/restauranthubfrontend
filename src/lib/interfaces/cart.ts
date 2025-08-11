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

export interface AddToCartRequest {
  menuItemId: string;
  variantId?: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}
