// Restaurant, menu, and category interfaces

import { LocationData, BaseEntity } from "./common";

export interface Restaurant {
  id: number;
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
}

export interface BusinessHours {
  [key: string]: {
    isOpen: boolean;
    openTime?: string;
    closeTime?: string;
  };
}

export interface MenuItem {
  id: number;
  restaurant_id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  categoryId?: string;
  finalPrice?: number;
  mrp?: number;
  currency?: string;
  isActive?: boolean;
  allergens?: string[];
  nutritionalInfo?: NutritionalInfo;
}

export interface NutritionalInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
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
}

export interface RestaurantUpdateRequest
  extends Partial<RestaurantCreateRequest> {
  approved?: boolean;
  isActive?: boolean;
}

export interface MenuItemCreateRequest {
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  categoryId?: string;
  allergens?: string[];
  nutritionalInfo?: NutritionalInfo;
}

export interface MenuItemUpdateRequest extends Partial<MenuItemCreateRequest> {
  isActive?: boolean;
}
