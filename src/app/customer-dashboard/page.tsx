"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import ProtectedRoute from "../../components/auth/ProtectedRoute";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import {
  FaUser,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaStar,
  FaHeart,
  FaCog,
  FaEdit,
  FaPlus,
  FaEye,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaGift,
} from "react-icons/fa";

// Mock data - replace with API calls
const mockOrders = [
  {
    id: "1",
    restaurantName: "Pizza Palace",
    items: ["Margherita Pizza", "Garlic Bread"],
    total: 24.99,
    status: "delivered",
    date: "2024-01-15",
    orderNumber: "#ORD-001",
  },
  {
    id: "2",
    restaurantName: "Burger House",
    items: ["Classic Burger", "Fries", "Coke"],
    total: 18.5,
    status: "preparing",
    date: "2024-01-16",
    orderNumber: "#ORD-002",
  },
];

const mockAddresses = [
  {
    id: "1",
    label: "Home",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    isDefault: true,
  },
  {
    id: "2",
    label: "Work",
    street: "456 Business Ave",
    city: "New York",
    state: "NY",
    postalCode: "10002",
    isDefault: false,
  },
];

const mockFavorites = [
  {
    id: "1",
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.5,
    image: "/image/restaurant-placeholder.jpg",
  },
  {
    id: "2",
    name: "Burger House",
    cuisine: "American",
    rating: 4.2,
    image: "/image/restaurant-placeholder.jpg",
  },
];

export default function CustomerPanel() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  console.log("User data from CustomerPanel:", user);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Helper function to get user display name
  const getUserDisplayName = () => {
    if (!user) return "User";

    const hasFirstName = user.firstName && user.firstName.trim() !== "";
    const hasLastName = user.lastName && user.lastName.trim() !== "";

    if (hasFirstName || hasLastName) {
      return `${user.firstName || ""} ${user.lastName || ""}`.trim();
    }

    return user.email.split("@")[0];
  };

  // Helper function to get user first name
  const getUserFirstName = () => {
    if (!user) return "User";

    if (user.firstName && user.firstName.trim() !== "") {
      return user.firstName;
    }

    return user.email.split("@")[0];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <FaCheckCircle className="text-green-500" />;
      case "preparing":
        return <FaClock className="text-yellow-500" />;
      case "on-the-way":
        return <FaTruck className="text-blue-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "preparing":
        return "Preparing";
      case "on-the-way":
        return "On the way";
      default:
        return "Pending";
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: FaUser },
    { id: "orders", label: "My Orders", icon: FaShoppingBag },
    { id: "addresses", label: "Addresses", icon: FaMapMarkerAlt },
    { id: "favorites", label: "Favorites", icon: FaHeart },
    { id: "loyalty", label: "Loyalty Points", icon: FaGift },
    { id: "settings", label: "Settings", icon: FaCog },
  ];

  if (loading) {
    return (
      <div className="min-h-screen">
        <LoadingSpinner
          fullScreen
          text="Loading your dashboard..."
          size="large"
        />
      </div>
    );
  }

  return (
    <ProtectedRoute requiredRoles={["CUSTOMER"]}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 lg:sticky lg:top-32">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-3xl text-teal-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {getUserDisplayName()}
                </h2>
                <p className="text-gray-600">{user?.email}</p>
                <div className="flex items-center justify-center mt-2">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">
                    {user?.loyaltyPoints || 0} Points
                  </span>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-teal-50 text-teal-700 border-l-4 border-teal-500"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="mr-3 text-lg" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Welcome back, {getUserFirstName()}!
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-teal-50 p-6 rounded-lg">
                      <div className="flex items-center">
                        <FaShoppingBag className="text-2xl text-teal-600 mr-4" />
                        <div>
                          <p className="text-sm text-gray-600">Total Orders</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {mockOrders.length}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <div className="flex items-center">
                        <FaStar className="text-2xl text-yellow-600 mr-4" />
                        <div>
                          <p className="text-sm text-gray-600">
                            Loyalty Points
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {user?.loyaltyPoints || 0}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg">
                      <div className="flex items-center">
                        <FaHeart className="text-2xl text-red-600 mr-4" />
                        <div>
                          <p className="text-sm text-gray-600">Favorites</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {mockFavorites.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Recent Orders
                    </h4>
                    <div className="space-y-4">
                      {mockOrders.slice(0, 3).map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center">
                            {getStatusIcon(order.status)}
                            <div className="ml-4">
                              <p className="font-medium text-gray-900">
                                {order.restaurantName}
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.orderNumber} • {order.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              ${order.total}
                            </p>
                            <p className="text-sm text-gray-600">
                              {getStatusText(order.status)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    My Orders
                  </h3>
                  <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors">
                    <FaPlus className="mr-2" />
                    New Order
                  </button>
                </div>

                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          {getStatusIcon(order.status)}
                          <div className="ml-4">
                            <h4 className="font-semibold text-gray-900">
                              {order.restaurantName}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {order.orderNumber} • {order.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            ${order.total}
                          </p>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "preparing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Items:</p>
                        <ul className="text-sm text-gray-800">
                          {order.items.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex space-x-3">
                        <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                          <FaEye className="mr-2" />
                          View Details
                        </button>
                        <button className="flex items-center px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors">
                          <FaShoppingBag className="mr-2" />
                          Reorder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    My Addresses
                  </h3>
                  <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors">
                    <FaPlus className="mr-2" />
                    Add Address
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockAddresses.map((address) => (
                    <div
                      key={address.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-teal-600 mr-3" />
                          <h4 className="font-semibold text-gray-900">
                            {address.label}
                          </h4>
                        </div>
                        {address.isDefault && (
                          <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>

                      <div className="text-gray-600 mb-4">
                        <p>{address.street}</p>
                        <p>
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                      </div>

                      <div className="flex space-x-3">
                        <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                          <FaEdit className="mr-2" />
                          Edit
                        </button>
                        {!address.isDefault && (
                          <button className="px-3 py-2 text-teal-600 hover:text-teal-800 transition-colors">
                            Set as Default
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Favorite Restaurants
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockFavorites.map((favorite) => (
                    <div
                      key={favorite.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="h-32 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Restaurant Image</span>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {favorite.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {favorite.cuisine}
                        </p>
                        <div className="flex items-center mb-4">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">
                            {favorite.rating}
                          </span>
                        </div>
                        <button className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors">
                          Order Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "loyalty" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Loyalty Program
                </h3>

                <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-6 text-white mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-semibold mb-2">
                        Your Points Balance
                      </h4>
                      <p className="text-3xl font-bold">
                        {user?.loyaltyPoints || 0} Points
                      </p>
                    </div>
                    <FaGift className="text-4xl opacity-80" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-900 mb-4">
                      How to Earn Points
                    </h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• 1 point for every $1 spent</li>
                      <li>• 50 bonus points for first order</li>
                      <li>• 25 points for each review</li>
                      <li>• 100 points for referring friends</li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-900 mb-4">
                      Redeem Rewards
                    </h5>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">$5 Off</span>
                        <span className="text-sm font-medium">500 pts</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">$10 Off</span>
                        <span className="text-sm font-medium">1000 pts</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">Free Delivery</span>
                        <span className="text-sm font-medium">200 pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Account Settings
                </h3>

                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={user?.firstName || ""}
                          placeholder="Not provided"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={user?.lastName || ""}
                          placeholder="Not provided"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={user?.email || ""}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={user?.phoneNumber || ""}
                          placeholder="Not provided"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
                          readOnly
                        />
                      </div>
                    </div>
                    <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors">
                      <FaEdit className="mr-2" />
                      Edit Profile
                    </button>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Preferences
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">
                          Email Notifications
                        </span>
                        <input
                          type="checkbox"
                          className="toggle"
                          defaultChecked
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">SMS Notifications</span>
                        <input type="checkbox" className="toggle" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Order Updates</span>
                        <input
                          type="checkbox"
                          className="toggle"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Security
                    </h4>
                    <div className="space-y-3">
                      <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        Change Password
                      </button>
                      <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        Two-Factor Authentication
                      </button>
                      <button className="w-full text-left px-4 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
