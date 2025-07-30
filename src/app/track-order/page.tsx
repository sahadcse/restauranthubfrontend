"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/public/Header";
import Footer from "../../components/layout/public/Footer";
import Breadcrumb, { BreadcrumbItem } from "../../components/ui/Breadcrumb";
import ProtectedRoute from "../../components/auth/ProtectedRoute";
import Input from "../../components/ui/Input";
import {
  LoadingOverlay,
  InlineSpinner,
} from "../../components/ui/LoadingSpinner";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status:
    | "preparing"
    | "cooking"
    | "ready"
    | "out-for-delivery"
    | "delivered"
    | "cancelled";
  createdAt: string;
  estimatedDelivery: string;
  totalAmount: number;
  items: OrderItem[];
  deliveryAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  paymentMethod: string;
  customerNotes?: string;
}

const orderStatuses = [
  { key: "preparing", label: "Order Confirmed", icon: "✓" },
  { key: "cooking", label: "Preparing Food", icon: "👨‍🍳" },
  { key: "ready", label: "Order Ready", icon: "📦" },
  { key: "out-for-delivery", label: "Out for Delivery", icon: "🚚" },
  { key: "delivered", label: "Delivered", icon: "✅" },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const orderIdFromUrl = searchParams.get("orderId");

  const [orderNumber, setOrderNumber] = useState(orderIdFromUrl || "");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock order data - memoized to prevent re-creation on every render
  const mockOrder: Order = useMemo(
    () => ({
      id: "1",
      orderNumber: "ORD-2024-001",
      status: "cooking",
      createdAt: "2024-01-15T10:30:00Z",
      estimatedDelivery: "2024-01-15T11:30:00Z",
      totalAmount: 34.99,
      items: [
        {
          id: "1",
          name: "Classic Burger",
          quantity: 2,
          price: 12.5,
          image: "/placeholder-food.jpg",
        },
        {
          id: "2",
          name: "Chicken Wings",
          quantity: 1,
          price: 8.99,
          image: "/placeholder-food.jpg",
        },
      ],
      deliveryAddress: {
        street: "123 Main Street",
        city: "New York",
        postCode: "10001",
        country: "United States",
      },
      paymentMethod: "Cash on Delivery",
      customerNotes: "Please ring the bell twice",
    }),
    []
  );

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Track Order" },
  ];

  const handleTrackOrder = useCallback(async () => {
    if (!orderNumber.trim()) {
      setError("Please enter an order number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock: Check if order exists
      if (orderNumber === "ORD-2024-001") {
        setOrder(mockOrder);
      } else {
        setError(
          "Order not found. Please check your order number and try again."
        );
        setOrder(null);
      }
    } catch (err) {
      setError("Failed to track order. Please try again.");
      console.error("Track order error:", err);
    } finally {
      setLoading(false);
    }
  }, [orderNumber, mockOrder]);

  useEffect(() => {
    if (orderIdFromUrl) {
      handleTrackOrder();
    }
  }, [orderIdFromUrl, handleTrackOrder]);

  const getStatusIndex = (status: string) => {
    return orderStatuses.findIndex((s) => s.key === status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Breadcrumb
        items={breadcrumbItems}
        className="container mx-auto max-w-7xl"
      />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Track Your Order
          </h1>

          {/* Order Number Input */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Enter Order Details</h2>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter your order number (e.g., ORD-2024-001)"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  variant="outline"
                />
              </div>
              <button
                onClick={handleTrackOrder}
                disabled={loading}
                className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {loading && <InlineSpinner size="small" variant="white" />}
                {loading ? "Tracking..." : "Track Order"}
              </button>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Order Details */}
          <LoadingOverlay isLoading={loading} text="Fetching order details...">
            {order && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Order Status */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-6">Order Status</h2>

                    <div className="relative">
                      {orderStatuses.map((status, index) => {
                        const currentStatusIndex = getStatusIndex(order.status);
                        const isCompleted = index <= currentStatusIndex;
                        const isCurrent = index === currentStatusIndex;

                        return (
                          <div
                            key={status.key}
                            className="flex items-center mb-6 last:mb-0"
                          >
                            <div
                              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                                isCompleted
                                  ? "bg-teal-500 border-teal-500 text-white"
                                  : "bg-gray-100 border-gray-300 text-gray-400"
                              }`}
                            >
                              <span className="text-sm font-medium">
                                {isCompleted ? "✓" : index + 1}
                              </span>
                            </div>

                            <div className="ml-4 flex-1">
                              <div
                                className={`font-medium ${
                                  isCurrent ? "text-teal-600" : ""
                                }`}
                              >
                                {status.label}
                              </div>
                              {isCurrent && (
                                <div className="text-sm text-gray-500 mt-1">
                                  Current status
                                </div>
                              )}
                            </div>

                            <div className="text-2xl">{status.icon}</div>

                            {index < orderStatuses.length - 1 && (
                              <div
                                className={`absolute left-5 w-0.5 h-6 mt-10 ${
                                  index < currentStatusIndex
                                    ? "bg-teal-500"
                                    : "bg-gray-300"
                                }`}
                                style={{ top: `${index * 96 + 40}px` }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                        >
                          <div className="relative w-16 h-16">
                            <Image
                              src={item.image || "/placeholder-food.jpg"}
                              alt={item.name}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <div className="text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">
                              ${item.price.toFixed(2)} each
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Order Summary
                    </h2>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Number:</span>
                        <span className="font-medium">{order.orderNumber}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date:</span>
                        <span className="font-medium">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Estimated Delivery:
                        </span>
                        <span className="font-medium">
                          {formatDate(order.estimatedDelivery)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-medium">
                          {order.paymentMethod}
                        </span>
                      </div>

                      <div className="flex justify-between border-t pt-3">
                        <span className="font-semibold">Total Amount:</span>
                        <span className="font-semibold text-teal-600">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Delivery Address
                    </h2>
                    <div className="text-sm text-gray-600">
                      <div>{order.deliveryAddress.street}</div>
                      <div>
                        {order.deliveryAddress.city},{" "}
                        {order.deliveryAddress.postCode}
                      </div>
                      <div>{order.deliveryAddress.country}</div>
                    </div>
                  </div>

                  {/* Customer Notes */}
                  {order.customerNotes && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Special Instructions
                      </h2>
                      <div className="text-sm text-gray-600">
                        {order.customerNotes}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 space-y-3">
                    <Link
                      href="/contact"
                      className="block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Contact Support
                    </Link>
                    <Link
                      href="/"
                      className="block w-full text-center bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors"
                    >
                      Order Again
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </LoadingOverlay>

          {/* Help Section */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Call Us</h3>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Email Us</h3>
                <p className="text-sm text-gray-600">support@restaurant.com</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function TrackOrder() {
  return (
    <ProtectedRoute>
      <TrackOrderContent />
    </ProtectedRoute>
  );
}
