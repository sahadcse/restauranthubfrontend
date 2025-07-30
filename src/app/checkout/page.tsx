"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/layout/public/Header";
import Footer from "../../components/layout/public/Footer";
import Breadcrumb, { BreadcrumbItem } from "../../components/ui/Breadcrumb";
import Input from "../../components/ui/Input";
import NewArrivals from "../../components/ui/NewArrivals";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcStripe,
  FaCcAmex,
} from "react-icons/fa";

// Mock cart data for demonstration since cart context is not available
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function Checkout() {
  const { token } = useAuth();
  const router = useRouter();
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mock cart data - replace with actual cart context when available
  const [cart] = useState<CartItem[]>([
    {
      id: "1",
      name: "Classic Burger",
      price: 12.5,
      quantity: 2,
      image: "/placeholder-food.jpg",
    },
    {
      id: "2",
      name: "Chicken Wings",
      price: 8.99,
      quantity: 1,
      image: "/placeholder-food.jpg",
    },
  ]);

  // Form states
  const [isGuest, setIsGuest] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<"free" | "fast">("free");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
  const [orderComments, setOrderComments] = useState("");
  const [paymentComments, setPaymentComments] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(
    null
  );

  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Cart", href: "/cart" },
    { label: "Checkout" },
  ];

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = deliveryMethod === "fast" ? 5.0 : 0.0;
  const totalAmount = subtotal + deliveryCharge;

  // Redirect to login if not authenticated and not guest with countdown
  useEffect(() => {
    if (!token && !isGuest) {
      setRedirectCountdown(10);

      const countdownInterval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev === null) return null;

          const newCount = prev - 1;

          if (newCount <= 0) {
            clearInterval(countdownInterval);
            // Use setTimeout to avoid setState during render
            redirectTimeoutRef.current = setTimeout(() => {
              router.push("/auth/login");
            }, 0);
            return null;
          }

          return newCount;
        });
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
        if (redirectTimeoutRef.current) {
          clearTimeout(redirectTimeoutRef.current);
        }
      };
    } else {
      // Clear countdown if user becomes authenticated or chooses guest
      setRedirectCountdown(null);
    }
  }, [token, isGuest, router]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const handlePlaceOrder = async () => {
    if (!agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate order placement
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart and redirect to success page
      // clearCart(); // Uncomment when cart context is available
      router.push("/order-success");
    } catch (err) {
      setError("Failed to place order. Please try again.");
      console.error("Order placement error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      // Add login logic here
      console.log("Login attempt:", { email, password });
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  const handleLoginNow = () => {
    // Clear the countdown and redirect immediately
    setRedirectCountdown(null);
    router.push("/auth/login");
  };

  const handleContinueAsGuest = () => {
    // Clear the countdown and set guest mode
    setRedirectCountdown(null);
    setIsGuest(true);
  };

  // Show countdown overlay when redirecting
  if (redirectCountdown !== null) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Authentication Required
              </h2>
              <p className="text-gray-600 mb-4">
                You need to be logged in to access the checkout page.
              </p>
              <p className="text-lg font-semibold text-teal-600">
                Redirecting to login in {redirectCountdown} seconds...
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleLoginNow}
                className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors"
              >
                Login Now
              </button>
              <button
                onClick={handleContinueAsGuest}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb
        items={breadcrumbItems}
        className="container mx-auto max-w-7xl"
      />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.image || "/placeholder-food.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="text-yellow-500">★★★★★</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-green-600 font-medium">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </span>
                        <span className="text-gray-500 line-through">
                          ${(item.price * 1.2).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Summary */}
              <div className="space-y-2 text-sm border-t pt-4">
                <div className="flex justify-between">
                  <span>Sub Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>${deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Coupon Discount</span>
                  <span>
                    <Link href="#" className="text-blue-500 underline">
                      Apply Coupon
                    </Link>
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total Amount</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="mt-6">
                <h3 className="font-medium mb-3">Delivery Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="delivery"
                      value="free"
                      checked={deliveryMethod === "free"}
                      onChange={(e) =>
                        setDeliveryMethod(e.target.value as "free")
                      }
                      className="text-green-500"
                    />
                    <span className="text-sm">
                      <span className="font-medium">Free shipping</span> - Rate
                      - $0.00
                    </span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="delivery"
                      value="fast"
                      checked={deliveryMethod === "fast"}
                      onChange={(e) =>
                        setDeliveryMethod(e.target.value as "fast")
                      }
                      className="text-green-500"
                    />
                    <span className="text-sm">
                      <span className="font-medium">Flat Rate</span> - Rate -
                      $5.00
                    </span>
                  </label>
                </div>
              </div>

              {/* Order Comments */}
              <div className="mt-6">
                <h3 className="font-medium mb-3">
                  Add Comments About Your Order
                </h3>
                <textarea
                  value={orderComments}
                  onChange={(e) => setOrderComments(e.target.value)}
                  placeholder="Comments"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Payment Method */}
              <div className="mt-6">
                <h3 className="font-medium mb-3">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as "cod")
                      }
                      className="text-green-500"
                    />
                    <span className="text-sm font-medium">
                      Cash on Delivery
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <textarea
                  value={paymentComments}
                  onChange={(e) => setPaymentComments(e.target.value)}
                  placeholder="Comments"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="mt-6">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-1 text-green-500"
                  />
                  <span className="text-sm">
                    I have read and agree to the{" "}
                    <Link href="/terms" className="text-blue-500 underline">
                      Terms & Conditions
                    </Link>
                    .
                  </span>
                </label>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Payment Methods</h3>
                <div className="flex space-x-3">
                  <FaCcVisa className="text-2xl text-blue-600" />
                  <FaCcMastercard className="text-2xl text-red-500" />
                  <FaCcPaypal className="text-2xl text-blue-500" />
                  <FaCcStripe className="text-2xl text-purple-500" />
                  <FaCcAmex className="text-2xl text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Customer Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">New Customer</h2>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Checkout Options</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="customerType"
                      value="register"
                      checked={!isGuest}
                      onChange={() => setIsGuest(false)}
                      className="text-green-500"
                    />
                    <span className="text-sm">Register Account</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="customerType"
                      value="guest"
                      checked={isGuest}
                      onChange={() => setIsGuest(true)}
                      className="text-green-500"
                    />
                    <span className="text-sm">Guest Account</span>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  By creating an account you will be able to shop faster, be up
                  to date on an order&apos;s status, and keep track of the
                  orders you have previously made.
                </p>
                <button className="mt-3 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors">
                  CONTINUE
                </button>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">
                  Returning Customer
                </h2>
                <h3 className="font-medium mb-3">Email Address</h3>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outline"
                  className="mb-4"
                />

                <h3 className="font-medium mb-3">Password</h3>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outline"
                  className="mb-4"
                />

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleCustomerLogin}
                    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
                  >
                    LOGIN
                  </button>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Billing Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Billing Details</h2>

              {/* Checkout Options */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Address Options</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="addressType"
                      value="existing"
                      checked={!useNewAddress}
                      onChange={() => setUseNewAddress(false)}
                      className="text-green-500"
                    />
                    <span className="text-sm">
                      I want to use an existing address
                    </span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="addressType"
                      value="new"
                      checked={useNewAddress}
                      onChange={() => setUseNewAddress(true)}
                      className="text-green-500"
                    />
                    <span className="text-sm">I want to use new address</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name*
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    variant="outline"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name*
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    variant="outline"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>
                <Input
                  type="text"
                  placeholder="Address Line 1"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  variant="outline"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">City</option>
                    <option value="new-york">New York</option>
                    <option value="los-angeles">Los Angeles</option>
                    <option value="chicago">Chicago</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Post Code
                  </label>
                  <Input
                    type="text"
                    placeholder="Post Code"
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                    variant="outline"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Country *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Country</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Region State
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Region/State</option>
                    <option value="ca">California</option>
                    <option value="ny">New York</option>
                    <option value="tx">Texas</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={loading || !agreeToTerms}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-md font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <NewArrivals />
        </div>
      </div>

      <Footer />
    </div>
  );
}
