"use client";

import React, { useState } from "react";
import { useCart } from "../../contexts/cartContext";
import Header from "../../components/layout/public/Header";
import Footer from "../../components/layout/public/Footer";
import Breadcrumb, { BreadcrumbItem } from "../../components/ui/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import NewArrivals from "../../components/ui/NewArrivals";

function NewArrival() {
    return(
        <div className="bg-amber-50 py-12">

          {/* This would typically use a NewArrivals component or similar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Placeholder for related products */}
            <div className="text-center text-gray-500 col-span-full py-8">
              <NewArrivals />
            </div>
          </div>
        </div>
    )
}

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Cart" },
  ];

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const deliveryCharges = subtotal > 50 ? 0 : 5.0; // Free delivery over $50
  const totalAmount = subtotal + deliveryCharges - couponDiscount;

  const updateQuantity = (id: number, delta: number) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      addToCart({ ...item, quantity: newQuantity });
    }
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "save10") {
      setAppliedCoupon("SAVE10");
      setCouponDiscount(subtotal * 0.1); // 10% discount
      setCouponCode("");
    } else if (couponCode.toLowerCase() === "free5") {
      setAppliedCoupon("FREE5");
      setCouponDiscount(5); // $5 off
      setCouponCode("");
    } else {
      alert("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <Breadcrumb
          items={breadcrumbItems}
          className="container mx-auto max-w-7xl"
        />

        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link
              href="/"
              className="bg-teal-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* New Arrivals Section */}
        <NewArrival />

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Breadcrumb
        items={breadcrumbItems}
        className="container mx-auto max-w-7xl"
      />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Cart Header */}
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Shopping Cart
                  </h1>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="px-6 py-4">
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start space-x-4 border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
                    >
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0">
                        {item.image_url ? (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                            <span className="text-xs text-gray-500">
                              No Image
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {item.description}
                        </p>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-yellow-400">★★★★★</span>
                          <span className="text-sm text-gray-500">(4.5)</span>
                        </div>

                        {/* Price and Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-lg font-bold text-teal-600">
                              ${Number(item.price).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500 line-through">
                              ${(Number(item.price) * 1.2).toFixed(2)}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <FiMinus className="w-4 h-4" />
                              </button>
                              <span className="px-3 py-2 text-center min-w-[3rem] border-x border-gray-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <FiPlus className="w-4 h-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-red-500 hover:text-red-700 transition-colors"
                              aria-label="Remove item"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                href="/"
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Summary
              </h2>

              {/* Estimated Shipping */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Estimated Shipping
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Enter your destination to get a shipping estimate.
                </p>

                {/* Country Dropdown */}
                <div className="space-y-3">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    <option value="">United States</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                  </select>

                  {/* State/Province */}
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    <option value="">
                      Please Select a region, state or province
                    </option>
                    <option value="ca">California</option>
                    <option value="ny">New York</option>
                    <option value="tx">Texas</option>
                  </select>

                  {/* Zip/Postal Code */}
                  <input
                    type="text"
                    placeholder="Zip/Postal Code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Coupon Discount
                </h3>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-50 p-3 rounded-md">
                    <span className="text-green-700 font-medium">
                      {appliedCoupon} Applied
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Apply Coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Try: SAVE10 (10% off) or FREE5 ($5 off)
                </p>
              </div>

              {/* Order Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sub-Total</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className="font-medium">
                    {deliveryCharges === 0
                      ? "FREE"
                      : `$${deliveryCharges.toFixed(2)}`}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Coupon Discount</span>
                    <span>-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount</span>
                    <span className="text-teal-600">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors text-center block"
              >
                Check Out
              </Link>

              {/* Free Delivery Notice */}
              {subtotal < 50 && (
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Add ${(50 - subtotal).toFixed(2)} more for free delivery!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* New Arrivals Section - Always show */}
          <NewArrivals />
        
      </div>

      <Footer />
    </div>
  );
}