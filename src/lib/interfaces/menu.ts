// import { RecommendationReason, WeightUnit } from "./enums";
import { RecommendationReason } from "./enums";

export interface MenuItemAttribute {
  id: string;
  menuItemId: string;
  key: string;
  value: Record<string, unknown>;
  language?: string;
}

export interface MenuItemAudit {
  id: string;
  menuItemId: string;
}

export interface MenuItemPriceHistory {
  id: string;
  menuItemId: string;
  variantId?: string;
  finalPrice: number;
  mrp: number;
  discountPercentage: number;
  effectiveFrom: Date;
  effectiveUntil?: Date;
  createdAt: Date;
}

export interface MenuItemRecommendation {
  id: string;
  sourceMenuItemId: string;
  targetMenuItemId: string;
  reason: RecommendationReason;
  score?: number;
  createdAt: Date;
}

export interface MenuItemsOnMenus {
  menuItemId: string;
  menuId: string;
  assignedAt: Date;
  order?: number;
}

export interface MenuItemsOnSliders {
  menuItemId: string;
  sliderId: string;
  assignedAt: Date;
  order?: number;
}

export interface Allergen {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  tenantId: string;
}

export interface Tag {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  type?: string;
  color: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MenuItemAllergen {
  menuItemId: string;
  allergenId: string;
  createdAt: Date;
}

export interface TaxRate {
  id: string;
  name: string;
  rate: number;
  region?: string;
  effectiveFrom: Date;
  isActive: boolean;
  restaurantId?: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number | string;
  oldPrice?: string;
  description?: string;
  category?: string;
  badge?: string;
  rating?: number;
  extraInfo?: string;
  inWishlist?: boolean;
  onWishlistToggle?: () => void;
  onAddToCart?: () => void;
}