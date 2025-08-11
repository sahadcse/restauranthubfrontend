// Order management interfaces

import { BaseEntity } from "./common";
import {
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
  DeliveryStatus,
  OrderType,
  PriorityLevel,
  ReturnStatus,
} from "./enums";

export interface Order extends BaseEntity {
  user_id: number;
  restaurant_id: number;
  status: OrderStatus;
  total: number;
  created_at: string;
  items?: OrderItem[];
  deliveryAddress?: DeliveryAddress;
  notes?: string;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  payment?: Payment;
  delivery?: Delivery;
  userId: string;
  restaurantId: string;
  paymentStatus: PaymentStatus;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  orderType: OrderType;
  deliveryInstructions?: string;
  source?: string;
  priority?: PriorityLevel;
  correlationId: string;
  tenantId: string;
  cancelReason?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  notes?: string;
  menuItem?: {
    name: string;
    description?: string;
    image_url?: string;
  };
}

export interface DeliveryAddress {
  street: string;
  city: string;
  state?: string;
  zipCode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  instructions?: string;
}

export interface OrderCreateRequest {
  restaurantId: string;
  items: Array<{
    menuItemId: string;
    quantity: number;
    unitPrice: number;
    notes?: string;
  }>;
  deliveryAddress: DeliveryAddress;
  notes?: string;
  paymentMethod?: PaymentMethod;
  [key: string]: unknown; // Add index signature for compatibility
}

export interface OrderUpdateRequest {
  status?: OrderStatus;
  notes?: string;
  estimatedDeliveryTime?: string;
  [key: string]: unknown; // Add index signature for compatibility
}

export interface Payment extends BaseEntity {
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  refundAmount?: number;
  refundReason?: string;
  currency: string;
  gatewayResponse?: Record<string, unknown>;
  refundStatus?: ReturnStatus;
}

export interface Delivery extends BaseEntity {
  orderId: string;
  driverId?: string;
  status: DeliveryStatus;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  deliveryNotes?: string;
  driver?: Driver;
  trackingUrl?: string;
  assignedAt?: Date;
  pickedUpAt?: Date;
  completedAt?: Date;
  tenantId: string;
}

export interface Driver extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber?: string;
  vehicleInfo?: VehicleInfo;
  isActive: boolean;
  currentLocation?: {
    latitude: number;
    longitude: number;
    lastUpdated: string;
  };
  userId: string;
  tenantId: string;
}

export interface VehicleInfo {
  type: "CAR" | "MOTORCYCLE" | "BICYCLE" | "SCOOTER";
  make?: string;
  model?: string;
  plateNumber?: string;
  color?: string;
}

export interface OrderCancellation extends BaseEntity {
  orderId: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestedBy: string;
  approvedBy?: string;
  refundAmount?: number;
}

export interface OrderFilters {
  status?: OrderStatus[];
  restaurantId?: string;
  dateFrom?: string;
  dateTo?: string;
  customerId?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<OrderStatus, number>;
  recentOrders: Order[];
}

export interface CreateOrderRequest {
  restaurantId: string;
  items: {
    menuItemId: string;
    variantId?: string;
    quantity: number;
    notes?: string;
  }[];
  orderType: OrderType;
  deliveryAddress?: Record<string, unknown>;
  deliveryInstructions?: string;
  notes?: string;
}

export interface UpdateOrderRequest {
  status?: OrderStatus;
  notes?: string;
  estimatedDeliveryTime?: Date;
}
