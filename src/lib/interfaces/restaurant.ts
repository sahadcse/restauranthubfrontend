// Restaurant, menu, and category interfaces

import { LocationData, BaseEntity } from "./common";
import { InventoryStatus, WeightUnit } from "./enums";
import { Tag, TaxRate } from "./menu";

export interface Restaurant extends BaseEntity {
  // id: number;
  name: string;
  location: LocationData;
  logo_url?: string;
  owner_id: number;
  approved: boolean;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  imageUrl?: string;
  timezone?: string;
  currency?: string;
  businessHours?: BusinessHours;
  isActive?: boolean;
  rating?: number;
  reviewCount?: number;
  restaurantPageUrl?: string;
  productCount?: number;
  salesCount?: number;
  ownerId?: string;
  brandId?: string;
  theme?: Record<string, unknown>;
  ratingCount?: number;
  deliveryFeeStructure?: Record<string, unknown>;
}

export interface BusinessHours {
  [key: string]: {
    isOpen: boolean;
    openTime?: string;
    closeTime?: string;
  };
}

export interface MenuItem {
  id: string;
  title: string;
  description?: string;
  sku: string;
  finalPrice: number;
  mrp: number;
  discountPercentage: number;
  stockStatus: InventoryStatus;
  rating: number;
  ratingCount: number;
  createdAt: string;
  updatedAt: string;
  restaurantId: string;
  categoryId: string;
  currency: string;
  lastUpdatedBy: string;
  availabilitySchedule?: Record<string, unknown>;
  prepTime?: number;
  isFeatured: boolean;
  maxOrderQuantity?: number;
  minOrderQuantity: number;
  allergens?: Record<string, unknown>;
  nutritionInfo?: Record<string, unknown>; // Changed from NutritionalInfo interface
  tenantId: string;
  deletedAt?: string;
  brandId?: string;
  color?: string;
  weightUnit: WeightUnit;
  isVisible: boolean;
  searchKeywords?: Record<string, unknown>;
  taxRateId?: string;
  isActive: boolean;

  // Deal of the Day related fields
  dietaryLabel?: string;
  quantityLabel?: string;
  flags: string[];
  dealSectionId?: string;

  // New Arrivals related fields
  newArrivalsSectionId?: string;
  tabId?: string;

  // Relations (optional for API responses)
  images?: MenuItemImage[];
  specifications?: MenuItemSpecification[];
  variants?: MenuItemVariant[];
  reviews?: MenuItemReview[];
  restaurant?: Restaurant;
  category?: Category;
  brand?: Brand;
  taxRate?: TaxRate;
  tags?: Tag[];

  // Legacy support
  restaurant_id?: number;
  price?: number;
  image_url?: string;
}

export interface MenuItemImage {
  id: string;
  url: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
  menuItemId?: string;
  imageUrl?: string;
  order?: number;
}

export interface MenuItemSpecification {
  id: string;
  name: string;
  value: string;
  unit?: string;
  menuItemId?: string;
  specKey?: string;
  specValue?: string;
}

export interface MenuItemVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
  attributes: Record<string, unknown>;
  menuItemId?: string;
  weight?: string;
  isActive?: boolean;
}

export interface MenuItemReview {
  id: string;
  rating: number;
  comment?: string;
  userId: string;
  userName?: string;
  createdAt: string;
  menuItemId?: string;
  userImageUrl?: string;
}

export interface Brand {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  isActive: boolean;
  websiteUrl?: string;
  tenantId?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  subtotal?: number;
}

export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  order: number;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  restaurantId?: string;
  discountPercentage?: number;
  itemCount?: number;
}

export interface Menu extends BaseEntity {
  name: string;
  description?: string;
  restaurantId: string;
  isActive: boolean;
  categories?: Category[];
  menuItems?: MenuItem[];
  startTime?: Date;
  endTime?: Date;
  tenantId?: string;
}

export interface RestaurantFilters {
  search?: string;
  location?: string;
  cuisine?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  isActive?: boolean;
  approved?: boolean;
}

export interface RestaurantCreateRequest {
  name: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  imageUrl?: string;
  timezone?: string;
  currency?: string;
  location?: LocationData;
  businessHours?: BusinessHours;
  [key: string]: unknown; // Add index signature for compatibility
}

export interface RestaurantUpdateRequest
  extends Partial<RestaurantCreateRequest> {
  approved?: boolean;
  isActive?: boolean;
  [key: string]: unknown; // Add index signature for compatibility
}

export interface MenuItemFilters {
  search?: string;
  categoryId?: string;
  brandId?: string;
  stockStatus?: InventoryStatus[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  isVisible?: boolean;
  tags?: string[];
  allergens?: string[];
}

export interface MenuItemCreateRequest {
  title: string;
  description?: string;
  sku: string;
  finalPrice: number;
  mrp: number;
  categoryId: string;
  currency: string;
  prepTime?: number;
  isFeatured?: boolean;
  maxOrderQuantity?: number;
  minOrderQuantity?: number;
  allergens?: Record<string, unknown>;
  nutritionInfo?: Record<string, unknown>; // Changed from NutritionalInfo interface
  brandId?: string;
  color?: string;
  weightUnit: WeightUnit;
  searchKeywords?: Record<string, unknown>;
  taxRateId?: string;
  dietaryLabel?: string;
  quantityLabel?: string;
  flags?: string[];
  images?: Omit<MenuItemImage, "id">[];
  specifications?: Omit<MenuItemSpecification, "id">[];
  variants?: Omit<MenuItemVariant, "id">[];
  [key: string]: unknown; // Add index signature for compatibility
}

export interface MenuItemUpdateRequest extends Partial<MenuItemCreateRequest> {
  isActive?: boolean;
  isVisible?: boolean;
  stockStatus?: InventoryStatus;
  [key: string]: unknown; // Add index signature for compatibility
}

export interface Wishlist {
  id: string;
  userId: string;
  menuItemId: string;
  createdAt: Date;
}


export interface Wishlist {
  id: string;
  userId: string;
  menuItemId: string;
  createdAt: Date;
}
