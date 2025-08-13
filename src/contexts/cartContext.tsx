// frontend/lib/cartContext.tsx
// This file provides a context for managing the shopping cart in the application.
// It includes functionality to add, remove, and clear items in the cart,
// as well as a custom hook for accessing the cart context.

"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { MenuItem } from "../lib/interfaces";
import { CartItemWithDetails } from "../lib/interfaces/cart";
import {
  transformLegacyToMenuItem,
  LegacyCartItem,
} from "../lib/utils/typeTransforms";

// Interfaces
// interface CartItem extends MenuItem {
//   quantity: number;
// }

interface CartContextType {
  cart: CartItemWithDetails[];
  addToCart: (
    item: MenuItem & { quantity?: number; variantId?: string }
  ) => void;
  addLegacyToCart: (item: LegacyCartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Context creation
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItemWithDetails[]>([]);

  // Add item to cart
  const addToCart = (
    item: MenuItem & { quantity?: number; variantId?: string }
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.menuItemId === item.id && i.variantId === item.variantId
      );

      if (existingIndex >= 0) {
        // Update existing item quantity
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (item.quantity ?? 1),
        };
        return updated;
      }

      // Create new cart item with complete MenuItem data
      const newCartItem: CartItemWithDetails = {
        id: `temp-${Date.now()}-${Math.random()}`, // Temporary ID for local state
        cartId: "temp-cart", // Will be replaced when synced with backend
        menuItemId: item.id,
        variantId: item.variantId,
        quantity: item.quantity ?? 1,
        addedAt: new Date(),
        menuItem: item, // Store the complete MenuItem object
      };

      return [...prev, newCartItem];
    });
  };

  // Add legacy item to cart (for backward compatibility)
  const addLegacyToCart = (item: LegacyCartItem) => {
    const menuItem = transformLegacyToMenuItem(item);
    addToCart({ ...menuItem, quantity: item.quantity });
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Get total items count
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.menuItem.finalPrice * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addLegacyToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook for consuming the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};