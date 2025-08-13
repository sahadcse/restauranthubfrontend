import { MenuItem, MenuItemVariant } from "./restaurant";

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
  // Related data (populated when needed)
  menuItem?: MenuItem; // Will be populated from MenuItem relation
  variant?: MenuItemVariant; // Will be populated from MenuItemVariant relation
}

export interface AddToCartRequest {
  menuItemId: string;
  variantId?: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// Extended CartItem for UI display (includes complete MenuItem data)
export interface CartItemWithDetails extends Omit<CartItem, "menuItem"> {
  menuItem: MenuItem; // Complete MenuItem object with all required fields
}
