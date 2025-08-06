"use client";

import React, { useState } from "react";
import Header from "../../components/layout/public/Header";
import Footer from "../../components/layout/public/Footer";
import Breadcrumb, { BreadcrumbItem } from "../../components/ui/Breadcrumb";
import Input from "../../components/ui/Input";
// import Image from "next/image";
import Link from "next/link";
import {
  FiCreditCard,
  FiShield,
  FiLock,
  FiDollarSign,
  FiCheck,
//   FiX,
  FiEdit3,
  FiTrash2,
  FiPlus,
  FiUser,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcStripe,
  FaCcAmex,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("methods");
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false,
  });

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Payments", href: "/payments" },
  ];

  const paymentMethods = [
    {
      icon: <FaCcVisa className="text-blue-600 text-3xl" />,
      name: "Visa",
      description: "Widely accepted worldwide with secure transactions",
      fees: "No additional fees",
      processingTime: "Instant",
    },
    {
      icon: <FaCcMastercard className="text-red-500 text-3xl" />,
      name: "Mastercard",
      description: "Global payment network with enhanced security",
      fees: "No additional fees",
      processingTime: "Instant",
    },
    {
      icon: <FaCcPaypal className="text-blue-500 text-3xl" />,
      name: "PayPal",
      description: "Secure online payments with buyer protection",
      fees: "No additional fees",
      processingTime: "Instant",
    },
    {
      icon: <FaApplePay className="text-gray-800 text-3xl" />,
      name: "Apple Pay",
      description: "Fast, secure payments using Touch ID or Face ID",
      fees: "No additional fees",
      processingTime: "Instant",
    },
    {
      icon: <FaGooglePay className="text-green-500 text-3xl" />,
      name: "Google Pay",
      description: "Quick checkout with your Google account",
      fees: "No additional fees",
      processingTime: "Instant",
    },
    {
      icon: <FaCcStripe className="text-purple-500 text-3xl" />,
      name: "Stripe",
      description: "Advanced payment processing with top-tier security",
      fees: "No additional fees",
      processingTime: "Instant",
    },
  ];

  const savedCards = [
    {
      id: 1,
      type: "visa",
      lastFour: "4242",
      expiryDate: "12/25",
      cardholderName: "John Doe",
      isDefault: true,
      billingAddress: "123 Main St, New York, NY 10001",
    },
    {
      id: 2,
      type: "mastercard",
      lastFour: "8888",
      expiryDate: "08/26",
      cardholderName: "John Doe",
      isDefault: false,
      billingAddress: "456 Oak Ave, Los Angeles, CA 90210",
    },
  ];

  const securityFeatures = [
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "SSL Encryption",
      description: "All transactions are protected with 256-bit SSL encryption",
    },
    {
      icon: <FiLock className="w-8 h-8" />,
      title: "PCI Compliance",
      description: "We follow strict PCI DSS standards for card data security",
    },
    {
      icon: <FiCheck className="w-8 h-8" />,
      title: "Fraud Detection",
      description: "Advanced AI-powered fraud detection and prevention",
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Secure Storage",
      description: "Card details are tokenized and never stored in plain text",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewCard((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle add card logic here
    console.log("Adding new card:", newCard);
    setShowAddCard(false);
    setNewCard({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      billingAddress: "",
      city: "",
      state: "",
      zipCode: "",
      isDefault: false,
    });
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return <FaCcVisa className="text-blue-600 text-2xl" />;
      case "mastercard":
        return <FaCcMastercard className="text-red-500 text-2xl" />;
      case "amex":
        return <FaCcAmex className="text-blue-500 text-2xl" />;
      default:
        return <FiCreditCard className="text-gray-500 text-2xl" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb
        items={breadcrumbItems}
        className="container mx-auto max-w-7xl"
      />

      <div className="py-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-6">
              Secure Payment Solutions
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Multiple payment options with bank-level security. Pay your way
              with confidence and convenience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <span className="text-2xl font-bold">256-bit</span>
                <p className="text-sm">SSL Encryption</p>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <span className="text-2xl font-bold">PCI</span>
                <p className="text-sm">Compliant</p>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <span className="text-2xl font-bold">24/7</span>
                <p className="text-sm">Fraud Monitor</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: "methods", label: "Payment Methods" },
                  { id: "cards", label: "Saved Cards" },
                  { id: "security", label: "Security" },
                  { id: "billing", label: "Billing History" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Payment Methods Tab */}
              {activeTab === "methods" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Accepted Payment Methods
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paymentMethods.map((method, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center mb-4">
                          {method.icon}
                          <h3 className="text-lg font-semibold text-gray-900 ml-3">
                            {method.name}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                          {method.description}
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Fees:</span>
                            <span className="text-green-600 font-medium">
                              {method.fees}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Processing:</span>
                            <span className="text-blue-600 font-medium">
                              {method.processingTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Cards Tab */}
              {activeTab === "cards" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Saved Payment Methods
                    </h2>
                    <button
                      onClick={() => setShowAddCard(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <FiPlus className="w-4 h-4 mr-2" />
                      Add New Card
                    </button>
                  </div>

                  {/* Add New Card Form */}
                  {showAddCard && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Add New Card
                      </h3>
                      <form onSubmit={handleAddCard} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            value={newCard.cardNumber}
                            onChange={handleInputChange}
                            leftIcon={<FiCreditCard className="h-4 w-4" />}
                            required
                            variant="outline"
                          />
                          <Input
                            type="text"
                            name="cardholderName"
                            placeholder="Cardholder Name"
                            value={newCard.cardholderName}
                            onChange={handleInputChange}
                            leftIcon={<FiUser className="h-4 w-4" />}
                            required
                            variant="outline"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={newCard.expiryDate}
                            onChange={handleInputChange}
                            leftIcon={<FiCalendar className="h-4 w-4" />}
                            required
                            variant="outline"
                          />
                          <Input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            value={newCard.cvv}
                            onChange={handleInputChange}
                            leftIcon={<FiLock className="h-4 w-4" />}
                            required
                            variant="outline"
                          />
                        </div>
                        <Input
                          type="text"
                          name="billingAddress"
                          placeholder="Billing Address"
                          value={newCard.billingAddress}
                          onChange={handleInputChange}
                          leftIcon={<FiMapPin className="h-4 w-4" />}
                          required
                          variant="outline"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={newCard.city}
                            onChange={handleInputChange}
                            required
                            variant="outline"
                          />
                          <Input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={newCard.state}
                            onChange={handleInputChange}
                            required
                            variant="outline"
                          />
                          <Input
                            type="text"
                            name="zipCode"
                            placeholder="ZIP Code"
                            value={newCard.zipCode}
                            onChange={handleInputChange}
                            required
                            variant="outline"
                          />
                        </div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="isDefault"
                            checked={newCard.isDefault}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            Set as default payment method
                          </span>
                        </label>
                        <div className="flex space-x-4">
                          <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Add Card
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAddCard(false)}
                            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Saved Cards List */}
                  <div className="space-y-4">
                    {savedCards.map((card) => (
                      <div
                        key={card.id}
                        className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          {getCardIcon(card.type)}
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">
                                **** **** **** {card.lastFour}
                              </span>
                              {card.isDefault && (
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {card.cardholderName} • Expires {card.expiryDate}
                            </p>
                            <p className="text-xs text-gray-400">
                              {card.billingAddress}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 p-2">
                            <FiEdit3 className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800 p-2">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Payment Security
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {securityFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="text-blue-600 flex-shrink-0">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4">
                      Your Data is Safe With Us
                    </h3>
                    <div className="space-y-2 text-blue-700">
                      <p className="flex items-center">
                        <FiCheck className="w-4 h-4 mr-2" />
                        We never store your complete card number
                      </p>
                      <p className="flex items-center">
                        <FiCheck className="w-4 h-4 mr-2" />
                        All sensitive data is encrypted and tokenized
                      </p>
                      <p className="flex items-center">
                        <FiCheck className="w-4 h-4 mr-2" />
                        Regular security audits and penetration testing
                      </p>
                      <p className="flex items-center">
                        <FiCheck className="w-4 h-4 mr-2" />
                        SOC 2 Type II compliance certified
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing History Tab */}
              {activeTab === "billing" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Billing History
                  </h2>

                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <FiCreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Billing History
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Your payment history will appear here once you make your
                      first order.
                    </p>
                    <Link
                      href="/"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start Ordering
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Payment FAQs
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Is it safe to save my payment information?
                </h3>
                <p className="text-gray-600">
                  Yes, we use industry-standard encryption and tokenization to
                  protect your payment information. Your card details are never
                  stored in plain text and are protected by multiple layers of
                  security.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept all major credit and debit cards, PayPal, Apple Pay,
                  Google Pay, and other digital wallets. Cash on delivery is
                  also available in select areas.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  When will I be charged for my order?
                </h3>
                <p className="text-gray-600">
                  Payment is processed immediately when you place your order.
                  For cash on delivery orders, payment is collected when your
                  order is delivered.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I get a refund if I&apos;m not satisfied?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer refunds for qualifying orders according to our
                  return policy. Refunds are typically processed within 3-5
                  business days to your original payment method.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
