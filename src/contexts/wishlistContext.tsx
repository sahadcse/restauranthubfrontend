"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of a wishlist item, aligning more closely with MenuItem
export interface WishlistItem {
  id: number; // Corresponds to menu_item_id
  restaurant_id: number;
  name: string;
  price: number; // Store price as a number
  image_url?: string; // Optional image URL
  description?: string; // Optional description
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isItemInWishlist: (id: number) => boolean;
  isHydrated: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load wishlist from localStorage after component mounts (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
          const parsedWishlist = JSON.parse(savedWishlist);
          setWishlist(Array.isArray(parsedWishlist) ? parsedWishlist : []);
        }
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error);
        setWishlist([]);
      } finally {
        setIsHydrated(true);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      try {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error);
      }
    }
  }, [wishlist, isHydrated]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      // Avoid duplicates
      if (prev.some((w) => w.id === item.id)) {
        return prev;
      }
      // Ensure price is a number before adding
      return [...prev, { ...item, price: Number(item.price) }];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isItemInWishlist = (id: number) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isItemInWishlist,
        isHydrated,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
