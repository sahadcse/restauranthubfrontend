import { InventoryStatus } from "./enums";

export interface Inventory {
  id: string;
  menuItemId: string;
  variantId?: string;
  quantity: number;
  reorderThreshold: number;
  status: InventoryStatus;
  lastUpdated: Date;
  supplierId?: string;
  restaurantId: string;
  tenantId: string;
  location?: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Record<string, unknown>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  tenantId: string;
}
