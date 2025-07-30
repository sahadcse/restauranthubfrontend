"use client";

import { useState } from "react";
import Header from "../../components/layout/public/Header";
import Footer from "../../components/layout/public/Footer";
import Breadcrumb, { BreadcrumbItem } from "../../components/ui/Breadcrumb";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const faqCategories: FAQCategory[] = [
  {
    id: "ordering",
    name: "Ordering",
    icon: "🛒",
    description: "Questions about placing orders and menu items",
  },
  {
    id: "delivery",
    name: "Delivery",
    icon: "🚚",
    description: "Delivery times, areas, and policies",
  },
  {
    id: "payment",
    name: "Payment",
    icon: "💳",
    description: "Payment methods, billing, and refunds",
  },
  {
    id: "account",
    name: "Account",
    icon: "👤",
    description: "Managing your account and profile",
  },
  {
    id: "food",
    name: "Food & Menu",
    icon: "🍕",
    description: "Ingredients, allergens, and customization",
  },
  {
    id: "general",
    name: "General",
    icon: "❓",
    description: "Other questions and policies",
  },
];

const faqData: FAQItem[] = [
  // Ordering
  {
    id: "1",
    category: "ordering",
    question: "How do I place an order?",
    answer:
      "You can place an order by browsing our menu, adding items to your cart, and proceeding to checkout. You can order as a guest or create an account for faster future orders.",
  },
  {
    id: "2",
    category: "ordering",
    question: "What is the minimum order amount?",
    answer:
      "The minimum order amount is $15 for delivery orders. There is no minimum for pickup orders.",
  },
  {
    id: "3",
    category: "ordering",
    question: "Can I modify my order after placing it?",
    answer:
      "You can modify your order within 5 minutes of placing it by calling our restaurant directly. After that, changes may not be possible as preparation may have already begun.",
  },
  {
    id: "4",
    category: "ordering",
    question: "How far in advance can I place an order?",
    answer:
      "You can place orders up to 7 days in advance. Simply select your preferred date and time during checkout.",
  },

  // Delivery
  {
    id: "5",
    category: "delivery",
    question: "What are your delivery hours?",
    answer:
      "We deliver Monday through Sunday from 11:00 AM to 11:00 PM. Some locations may have extended hours on weekends.",
  },
  {
    id: "6",
    category: "delivery",
    question: "How long does delivery take?",
    answer:
      "Standard delivery typically takes 30-45 minutes. During peak hours (6-8 PM), it may take up to 60 minutes. You'll receive real-time updates on your order status.",
  },
  {
    id: "7",
    category: "delivery",
    question: "Do you deliver to my area?",
    answer:
      "We deliver within a 5-mile radius of our restaurant locations. Enter your address during checkout to see if delivery is available to your area.",
  },
  {
    id: "8",
    category: "delivery",
    question: "What are the delivery charges?",
    answer:
      "Delivery is free for orders over $25. For orders under $25, there's a $3.99 delivery fee. Express delivery (20-30 minutes) is available for an additional $5.",
  },

  // Payment
  {
    id: "9",
    category: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and cash on delivery.",
  },
  {
    id: "10",
    category: "payment",
    question: "Is it safe to pay online?",
    answer:
      "Yes, all online payments are processed through secure, encrypted payment gateways. We never store your payment information on our servers.",
  },
  {
    id: "11",
    category: "payment",
    question: "Can I get a refund?",
    answer:
      "Refunds are available if you're not satisfied with your order. Contact us within 24 hours of delivery, and we'll investigate and process a refund if appropriate.",
  },
  {
    id: "12",
    category: "payment",
    question: "Do you offer contactless payment?",
    answer:
      "Yes, we support contactless payments including tap-to-pay cards, mobile wallets, and online pre-payment to minimize contact during delivery.",
  },

  // Account
  {
    id: "13",
    category: "account",
    question: "Do I need to create an account to order?",
    answer:
      "No, you can order as a guest. However, creating an account allows you to save addresses, track orders, view order history, and earn loyalty points.",
  },
  {
    id: "14",
    category: "account",
    question: "How do I reset my password?",
    answer:
      "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a reset link. Follow the instructions in the email to create a new password.",
  },
  {
    id: "15",
    category: "account",
    question: "Can I change my delivery address?",
    answer:
      "Yes, you can add, edit, or remove delivery addresses in your account settings. You can also enter a new address during checkout.",
  },
  {
    id: "16",
    category: "account",
    question: "How do I delete my account?",
    answer:
      "To delete your account, contact our customer support team. Please note that this action cannot be undone and you'll lose access to your order history and loyalty points.",
  },

  // Food & Menu
  {
    id: "17",
    category: "food",
    question: "Do you have vegetarian/vegan options?",
    answer:
      "Yes, we have a wide selection of vegetarian and vegan options clearly marked on our menu. Look for the 🌱 symbol for vegan items and 🥬 for vegetarian items.",
  },
  {
    id: "18",
    category: "food",
    question: "Can I customize my order?",
    answer:
      "Absolutely! Most menu items can be customized. You can add or remove ingredients, choose spice levels, and add special instructions during checkout.",
  },
  {
    id: "19",
    category: "food",
    question: "Do you provide allergen information?",
    answer:
      "Yes, detailed allergen information is available for all menu items. Click on any item to view ingredients and allergen warnings. Common allergens are clearly marked.",
  },
  {
    id: "20",
    category: "food",
    question: "Are your portion sizes generous?",
    answer:
      "We pride ourselves on generous portions that offer great value. Each menu item includes portion size information, and many items are shareable.",
  },

  // General
  {
    id: "21",
    category: "general",
    question: "Do you offer catering services?",
    answer:
      "Yes, we offer catering for events of all sizes. Contact us at least 48 hours in advance for catering orders. Special menus and pricing are available for large orders.",
  },
  {
    id: "22",
    category: "general",
    question: "Can I track my order?",
    answer:
      "Yes, you can track your order in real-time through our website or mobile app. You'll receive SMS and email updates at each stage of preparation and delivery.",
  },
  {
    id: "23",
    category: "general",
    question: "What if I'm not satisfied with my order?",
    answer:
      "Customer satisfaction is our priority. If you're not happy with your order, contact us immediately and we'll make it right with a replacement, refund, or credit for future orders.",
  },
  {
    id: "24",
    category: "general",
    question: "Do you have a loyalty program?",
    answer:
      "Yes! Join our loyalty program to earn points on every order. Points can be redeemed for free items, discounts, and exclusive offers. Sign up is free and instant.",
  },
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "FAQ" },
  ];

  const filteredFAQs = faqData.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const expandAll = () => {
    setExpandedItems(new Set(filteredFAQs.map((item) => item.id)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Breadcrumb
        items={breadcrumbItems}
        className="container mx-auto max-w-7xl"
      />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about ordering, delivery, payments,
            and more. Can&apos;t find what youre looking for? Contact our
            support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === "all"
                      ? "bg-teal-100 text-teal-700 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-2">📋</span>
                  All Questions ({faqData.length})
                </button>

                {faqCategories.map((category) => {
                  const count = faqData.filter(
                    (item) => item.category === category.id
                  ).length;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category.id
                          ? "bg-teal-100 text-teal-700 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={expandAll}
                    className="w-full text-left px-3 py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={collapseAll}
                    className="w-full text-left px-3 py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                  >
                    Collapse All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {selectedCategory !== "all" && (
              <div className="mb-6">
                {faqCategories.map((category) => {
                  if (category.id === selectedCategory) {
                    return (
                      <div
                        key={category.id}
                        className="bg-white rounded-lg shadow-sm p-6"
                      >
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">{category.icon}</span>
                          <h2 className="text-2xl font-bold text-gray-900">
                            {category.name}
                          </h2>
                        </div>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}

            {filteredFAQs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0118 12a7.962 7.962 0 01-2.127 5.291A7.962 7.962 0 0112 18a7.962 7.962 0 01-3.873-1.709A7.962 7.962 0 016 12a7.962 7.962 0 012.127-5.291A7.962 7.962 0 0112 6a7.962 7.962 0 013.873 1.709z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No FAQs Found
                </h3>
                <p className="text-gray-600 mb-4">
                  No questions match your search criteria. Try different
                  keywords or browse all categories.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm">
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-medium text-gray-900 pr-4">
                        {item.question}
                      </h3>
                      {expandedItems.has(item.id) ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {expandedItems.has(item.id) && (
                      <div className="px-6 pb-4">
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can&apos;t find the answer you&apos;re looking for? Our customer
              support team is here to help. Reach out to us through any of the
              following channels.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
                <p className="text-sm text-gray-600 mb-2">+1 (555) 123-4567</p>
                <p className="text-xs text-gray-500">Mon-Sun: 11 AM - 11 PM</p>
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
                <p className="text-sm text-gray-600 mb-2">
                  support@restaurant.com
                </p>
                <p className="text-xs text-gray-500">
                  Response within 24 hours
                </p>
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
                <p className="text-sm text-gray-600 mb-2">Chat with our team</p>
                <p className="text-xs text-gray-500">Available 24/7</p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="/contact"
                className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition-colors inline-flex items-center"
              >
                Contact Support
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
