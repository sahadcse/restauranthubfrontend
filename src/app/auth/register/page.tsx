"use client";

import { useState } from "react";
// import { useAuth } from "../../../contexts/authContext";
import { useRouter } from "next/navigation";
import { authApi } from "../../../lib/api/auth";
import { UserRegistrationData } from "../../../lib/interfaces";
import { UserRole } from "../../../lib/interfaces/enums";
// import { redirectManager } from "../../../lib/services/redirectManager";
import { validationService } from "../../../lib/services/validationService";
import { useFormValidation } from "../../../hooks/useFormValidation";
import Link from "next/link";
import Image from "next/image";
import Header from "../../../components/layout/public/Header";
import Footer from "../../../components/layout/public/Footer";
import Breadcrumb, { BreadcrumbItem } from "../../../components/ui/Breadcrumb";
import Input from "../../../components/ui/Input";
import SocialLoginButtons from "../../../components/ui/SocialLoginButtons";
import socialData from "../../../data/socialData.json";
import { ApiError } from "../../../lib/errors/ApiError";
import {
  FaFacebookF,
  FaGoogle,
  FaUser,
  FaEnvelope,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

// Icon mapping for social icons - could be moved to a utility file
const getSocialIcon = (icon: string) => {
  const iconMap = {
    facebook: <FaFacebookF className="text-white text-xl" />,
    google: <FaGoogle className="text-white text-xl" />,
    twitter: <FaTwitter className="text-white text-xl" />,
    instagram: <FaInstagram className="text-white text-xl" />,
  };
  return iconMap[icon as keyof typeof iconMap] || null;
};

export default function Register() {
  const [role] = useState<UserRole.CUSTOMER | UserRole.RESTAURANT_OWNER>(
    UserRole.CUSTOMER
  );
  const [error, setError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const { login } = useAuth();
  const router = useRouter();

  const initialFormData: UserRegistrationData = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    privacyConsent: false,
  };

  const handleSubmit = async (formData: UserRegistrationData) => {
    if (!agreeToTerms) {
      setError("Please agree to the terms of service");
      throw new Error("Terms not agreed");
    }

    const userData: UserRegistrationData = {
      ...formData,
      privacyConsent: agreeToTerms,
    };

    try {
      const response = await authApi.register(userData, role);

      console.log("Registration response:", response);

      // Don't log in the user immediately - they need to verify their email first
      // const { user, token } = response.data;
      // login(token);

      // Clear any existing errors
      setError("");

      // Redirect to email verification page with user's email
      router.push(
        `/auth/verify-email?email=${encodeURIComponent(formData.email)}`
      );
    } catch (error) {
      console.error("Registration API error:", error);
      throw error; // Re-throw to be handled by the form validation hook
    }
  };

  const {
    formData,
    errors: fieldErrors,
    isSubmitting: loading,
    updateField,
    validateAndSubmit,
  } = useFormValidation({
    initialData: initialFormData,
    validationFn: validationService.validateRegistrationForm,
    onSubmit: handleSubmit,
  });

  const handleRegister = async (e: React.FormEvent) => {
    setError("");

    try {
      const success = await validateAndSubmit(e);
      if (!success) {
        // Validation failed or terms not agreed
        return;
      }
      // If we reach here, registration was successful and redirect should have happened
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = "Registration failed. Please try again.";

      if (error instanceof ApiError) {
        // Check if it's a validation error with details
        if (error.details?.errors && Array.isArray(error.details.errors)) {
          // Extract the first validation error message
          const validationError = error.details.errors[0];
          errorMessage = validationError.message || error.message;
        } else {
          // Use the main error message (e.g., "Email already in use")
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    }
  };

  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "User", href: "#" },
    { label: "Register" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb
        items={breadcrumbItems}
        className="container mx-auto max-w-7xl"
      />

      <div className="flex-1 flex container mx-auto max-w-7xl my-6 px-4">
        {/* Left Side - Background Image with Welcome */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/image/register_bg.avif"
              alt="Restaurant background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Welcome Content */}
          <div className="relative z-10 flex flex-col justify-between items-center text-center text-white p-12 w-full">
            <h1 className="text-4xl font-bold text-center">
              Welcome to <span className="text-teal-500">RestaurantHub</span>
            </h1>
            <p className="text-xl mb-8 max-w-md leading-relaxed text-justify">
              Discover amazing restaurants and delicious food delivered right to
              your doorstep. Join thousands of food lovers today.
            </p>

            {/* Dynamic Social Connect */}
            <div className="mb-8">
              <p className="text-sm mb-4 opacity-75">GET CONNECTED WITH</p>
              <div className="flex space-x-4">
                {socialData.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center transition-colors`}
                    aria-label={`Follow us on ${social.name}`}
                    title={`Follow us on ${social.name}`}
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex flex-col bg-gray-50 rounded-lg shadow-lg">
          {/* Header Tabs */}
          <div className="flex justify-center lg:justify-start lg:ml-8 lg:mr-8">
            <div className="flex w-full max-w-80">
              <Link
                href="/auth/login"
                className="flex-1 py-1.5 px-3 text-center text-gray-600 hover:text-gray-800 transition-colors rounded-bl-lg rounded-br-lg text-sm sm:text-base border border-gray-300 border-r-0"
              >
                Sign In
              </Link>
              <div className="flex-1 py-1.5 px-3 text-center bg-teal-500 text-white font-medium rounded-bl-md rounded-br-md text-sm sm:text-base border border-teal-500">
                Register
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-50">
            <div className="w-full max-w-md">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                Register
              </h2>

              {/* Social Login Buttons */}
              <div className="mb-4 sm:mb-6">
                <SocialLoginButtons onError={setError} disabled={loading} />
              </div>

              {/* Divider */}
              <div className="relative mb-4 sm:mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">
                    Or register with email
                  </span>
                </div>
              </div>

              <form
                onSubmit={handleRegister}
                className="space-y-4 sm:space-y-6"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName || ""}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    required
                    variant="ghost"
                    leftIcon={<FaUser className="h-4 w-4" />}
                    error={fieldErrors.firstName}
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName || ""}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    required
                    variant="ghost"
                    error={fieldErrors.lastName}
                  />
                </div>

                {/* Email */}
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                  value={formData.email || ""}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                  variant="ghost"
                  leftIcon={<FaEnvelope className="h-4 w-4" />}
                  error={fieldErrors.email}
                />

                {/* Phone Number */}
                <Input
                  type="tel"
                  placeholder="Enter Your Phone Number (e.g., +1234567890)"
                  value={formData.phoneNumber || ""}
                  onChange={(e) => updateField("phoneNumber", e.target.value)}
                  variant="ghost"
                  leftIcon={<FaPhone className="h-4 w-4" />}
                  error={fieldErrors.phoneNumber}
                />

                {/* Password */}
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  value={formData.password || ""}
                  onChange={(e) => updateField("password", e.target.value)}
                  required
                  variant="ghost"
                  leftIcon={<FaLock className="h-4 w-4" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 hover:text-gray-600 transition-colors pointer-events-auto"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-4 w-4" />
                      ) : (
                        <FaEye className="h-4 w-4" />
                      )}
                    </button>
                  }
                  error={fieldErrors.password}
                />

                {/* Terms Agreement */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500 flex-shrink-0"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to all the statements in{" "}
                    <Link
                      href="/terms"
                      className="text-teal-500 hover:text-teal-600"
                    >
                      Terms of service
                    </Link>
                  </label>
                </div>

                {error && (
                  <div className="text-red-500 text-sm text-center bg-red-50 border border-red-200 p-3 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-4 h-4 text-red-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="break-words">{error}</span>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !agreeToTerms}
                  className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </button>
              </form>

              {/* Additional Registration Option */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600 mb-3">
                  Want to register your restaurant?
                </p>
                <Link
                  href="/vendor-signup"
                  className="w-full block text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
                >
                  Restaurant Owner Registration
                </Link>
              </div>

              {/* Login Link */}
              <p className="mt-4 sm:mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-teal-500 hover:text-teal-600 font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
