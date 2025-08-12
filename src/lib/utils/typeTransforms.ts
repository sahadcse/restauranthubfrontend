import { MenuItem } from "../interfaces/restaurant";
import { WishlistItem } from "../../contexts/wishlistContext";
import { InventoryStatus, WeightUnit } from "../interfaces/enums";

export interface LegacyCartItem {
  id: number;
  restaurant_id: number;
  name: string;
  price: number;
  image_url?: string;
  description?: string;
  quantity: number;
}

export function transformLegacyToMenuItem(item: LegacyCartItem): MenuItem {
  return {
    id: item.id.toString(),
    title: item.name,
    description: item.description || "",
    sku: `item-${item.id}`,
    finalPrice: item.price,
    mrp: item.price,
    discountPercentage: 0,
    stockStatus: "IN_STOCK" as InventoryStatus,
    rating: 0,
    ratingCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    restaurantId: item.restaurant_id.toString(),
    categoryId: "",
    currency: "USD",
    lastUpdatedBy: "",
    prepTime: 0,
    isFeatured: false,
    maxOrderQuantity: 100,
    minOrderQuantity: 1,
    tenantId: "",
    weightUnit: "OUNCE" as WeightUnit,
    isVisible: true,
    taxRateId: "",
    isActive: true,
    flags: [],
    images: item.image_url
      ? [
          {
            id: "1",
            url: item.image_url,
            isPrimary: true,
            sortOrder: 0,
          },
        ]
      : [],
    // Legacy support
    restaurant_id: item.restaurant_id,
    price: item.price,
    image_url: item.image_url,
  };
}

export function transformWishlistToMenuItem(item: WishlistItem): MenuItem {
  return {
    id: item.id.toString(),
    title: item.name,
    description: item.description || "",
    sku: `item-${item.id}`,
    finalPrice: item.price,
    mrp: item.price,
    discountPercentage: 0,
    stockStatus: "IN_STOCK" as InventoryStatus,
    rating: 0,
    ratingCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    restaurantId: item.restaurant_id.toString(),
    categoryId: "",
    currency: "USD",
    lastUpdatedBy: "",
    prepTime: 0,
    isFeatured: false,
    maxOrderQuantity: 100,
    minOrderQuantity: 1,
    tenantId: "",
    weightUnit: "OUNCE" as WeightUnit,
    isVisible: true,
    taxRateId: "",
    isActive: true,
    flags: [],
    images: item.image_url
      ? [
          {
            id: "1",
            url: item.image_url,
            isPrimary: true,
            sortOrder: 0,
          },
        ]
      : [],
    // Legacy support
    restaurant_id: item.restaurant_id,
    price: item.price,
    image_url: item.image_url,
  };
}
