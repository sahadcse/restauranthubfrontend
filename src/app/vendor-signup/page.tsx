"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/layout/public/Header";
import Footer from "../../components/layout/public/Footer";
import Breadcrumb, { BreadcrumbItem } from "../../components/ui/Breadcrumb";
import { VendorSignupForm } from "../../components/features/Vendor/VendorSignupForm";
import { VendorFormData } from "../../lib/interfaces/vendorForm";
import { useAuth } from "../../contexts/authContext";
import { UserRole } from "../../lib/interfaces/enums";
import { restaurantApi } from "../../lib/api/restaurants";
import Image from "next/image";
import {
  FiUsers,
  FiTrendingUp,
  FiClock,
  FiDollarSign,
  FiCheck,
  FiInfo,
} from "react-icons/fi";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Statistic {
  value: string;
  label: string;
}

// Loading component for Suspense fallback
function VendorSignupLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-6 w-3/4"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Main content component that uses useSearchParams
function VendorSignupContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const searchParams = useSearchParams();
  const { user, token, isLoading } = useAuth();
  const isStep2 = searchParams.get("step") === "2";

  // Add debugging logs
  console.log("VendorSignupContent - isStep2:", isStep2);
  console.log("VendorSignupContent - user:", user);
  console.log("VendorSignupContent - isLoading:", isLoading);
  console.log("VendorSignupContent - token exists:", !!token);

  // Force re-check of localStorage if in step 2 and no user data
  useEffect(() => {
    if (isStep2 && !user && !isLoading) {
      console.log("Step 2 detected but no user - checking localStorage");
      const storedUserData = localStorage.getItem("userData");
      const storedToken = localStorage.getItem("token");

      console.log("Stored user data exists:", !!storedUserData);
      console.log("Stored token exists:", !!storedToken);

      if (storedUserData && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUserData);
          console.log("Found stored user data for step 2:", parsedUser);

          // Force a page reload to reinitialize auth context
          if (!user) {
            console.log("Reloading page to reinitialize auth context");
            window.location.reload();
          }
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          localStorage.removeItem("userData");
          localStorage.removeItem("token");
        }
      }
    }
  }, [isStep2, user, isLoading]);

  // Check if user is authenticated restaurant owner for step 2
  // Accept both regular auth tokens and verification tokens for step 2
  const isValidStep2User = isStep2
    ? user?.role === UserRole.RESTAURANT_OWNER &&
      user?.accountStatus === "ACTIVE" &&
      token !== null // Accept any token (including verification tokens)
    : true;

  console.log("VendorSignupContent - isValidStep2User:", isValidStep2User);
  console.log(
    "VendorSignupContent - token type:",
    token?.substring(0, 20) + "..."
  );

  const breadcrumbItems: BreadcrumbItem[] = useMemo(
    () => [
      { label: "Home", href: "/" },
      {
        label: isStep2 ? "Complete Profile" : "Become a Vendor",
        href: "/vendor-signup",
      },
    ],
    [isStep2]
  );

  const benefits: Benefit[] = useMemo(
    () => [
      {
        icon: <FiUsers className="w-8 h-8" />,
        title: "Reach More Customers",
        description: "Access thousands of hungry customers in your area",
      },
      {
        icon: <FiTrendingUp className="w-8 h-8" />,
        title: "Grow Your Business",
        description: "Increase revenue with online orders and delivery",
      },
      {
        icon: <FiClock className="w-8 h-8" />,
        title: "Easy Management",
        description: "Simple dashboard to manage orders and menu",
      },
      {
        icon: <FiDollarSign className="w-8 h-8" />,
        title: "Competitive Commission",
        description: "Low commission rates to maximize your profits",
      },
    ],
    []
  );

  const requirements: string[] = useMemo(
    () => [
      "Valid business license",
      "Food handler's permit",
      "General liability insurance",
      "Established restaurant location",
      "Minimum 1 year in business",
      "Quality food standards compliance",
    ],
    []
  );

  const statistics: Statistic[] = useMemo(
    () => [
      { value: "15K+", label: "Monthly Orders" },
      { value: "850+", label: "Partner Restaurants" },
      { value: "98%", label: "Satisfaction Rate" },
    ],
    []
  );

  const handleFormSubmit = async (formData: VendorFormData): Promise<void> => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      if (isStep2 && token) {
        // Step 2: Complete restaurant profile after email verification
        await restaurantApi.completeProfile(formData, token);
        console.log("Restaurant profile completed:", formData);
      } else {
        // Step 1: Regular vendor application (simulate API call)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Vendor application submitted:", formData);
      }

      setSubmitStatus("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
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
        {/* Step 2 Notice */}
        {isStep2 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <FiInfo className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">
                    Complete Your Restaurant Profile
                  </h3>
                  <p className="mt-1 text-sm text-blue-700">
                    Welcome! Your email has been verified. Please complete your
                    restaurant profile to start accepting orders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section - Hide for step 2 */}
        {!isStep2 && <HeroSection statistics={statistics} />}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Benefits & Requirements - Hide for step 2 */}
            {!isStep2 && (
              <div className="lg:col-span-1 space-y-8">
                <BenefitsSection benefits={benefits} />
                <RequirementsSection requirements={requirements} />
                <CommissionInfoSection />
              </div>
            )}

            {/* Right Column - Application Form */}
            <div className={isStep2 ? "lg:col-span-3" : "lg:col-span-2"}>
              {isStep2 && isLoading ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Please Wait...
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Loading your account information...
                  </p>
                  <div
                    className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-teal-600 rounded-full"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : isStep2 && !user ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Email Verification Required
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Please verify your email first to complete your restaurant
                    registration.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => (window.location.href = "/vendor-signup")}
                      className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                    >
                      Start Restaurant Registration
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = "/auth/verify-email")
                      }
                      className="px-6 py-2 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 transition-colors"
                    >
                      Verify Email
                    </button>
                  </div>
                </div>
              ) : isStep2 && !isValidStep2User ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Access Denied
                  </h2>
                  <p className="text-gray-600 mb-6">
                    You need to be a verified restaurant owner with an active
                    account to complete this step.
                    <br />
                    Current status: {user?.accountStatus || "Unknown"}
                    <br />
                    Role: {user?.role || "Unknown"}
                    <br />
                    Token: {token ? "Present" : "Missing"}
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => (window.location.href = "/vendor-signup")}
                      className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                    >
                      Start Restaurant Registration
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = "/auth/verify-email")
                      }
                      className="px-6 py-2 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 transition-colors"
                    >
                      Verify Email
                    </button>
                  </div>
                </div>
              ) : (
                <VendorSignupForm
                  onSubmit={handleFormSubmit}
                  isSubmitting={isSubmitting}
                  submitStatus={submitStatus}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Main page component with Suspense wrapper
const VendorSignupPage: React.FC = () => {
  return (
    <Suspense fallback={<VendorSignupLoading />}>
      <VendorSignupContent />
    </Suspense>
  );
};

// Extracted sub-components for better organization
const HeroSection: React.FC<{ statistics: Statistic[] }> = ({ statistics }) => (
  <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-6">
            Partner with Restaurant Hub
          </h1>
          <p className="text-xl mb-8">
            Join thousands of restaurants already growing their business with
            us. Reach more customers and increase your revenue today.
          </p>
          <div className="flex flex-wrap gap-4">
            {statistics.map((stat, index) => (
              <div key={index} className="bg-white/20 rounded-lg px-4 py-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <p className="text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=60"
            alt="Restaurant kitchen"
            width={600}
            height={400}
            className="rounded-lg shadow-xl"
            priority
          />
        </div>
      </div>
    </div>
  </div>
);

const BenefitsSection: React.FC<{ benefits: Benefit[] }> = ({ benefits }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">
      Why Partner with Us?
    </h2>
    <div className="space-y-6">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-start space-x-4">
          <div className="text-teal-600 flex-shrink-0">{benefit.icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {benefit.title}
            </h3>
            <p className="text-gray-600 text-sm">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RequirementsSection: React.FC<{ requirements: string[] }> = ({
  requirements,
}) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
    <ul className="space-y-3">
      {requirements.map((requirement, index) => (
        <li key={index} className="flex items-center space-x-3">
          <FiCheck className="text-green-500 flex-shrink-0" />
          <span className="text-gray-700 text-sm">{requirement}</span>
        </li>
      ))}
    </ul>
  </div>
);

const CommissionInfoSection: React.FC = () => (
  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
    <h3 className="text-lg font-bold text-teal-800 mb-2">
      Commission Structure
    </h3>
    <p className="text-teal-700 text-sm mb-4">
      We charge a competitive commission on each order to cover platform
      maintenance, payment processing, and customer support.
    </p>
    <div className="text-2xl font-bold text-teal-600">15% Commission</div>
    <p className="text-xs text-teal-600 mt-1">Lowest in the industry</p>
  </div>
);

export default VendorSignupPage;
