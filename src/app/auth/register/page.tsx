"use client";

import { useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import { useRouter } from "next/navigation";
import { registerUser } from "../../../lib/api";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import Header from "../../../components/layout/public/Header";
import Footer from "../../../components/layout/public/Footer";
import Breadcrumb, { BreadcrumbItem } from "../../../components/ui/Breadcrumb";
import Input from "../../../components/ui/Input";
import SocialLoginButtons from "../../../components/ui/SocialLoginButtons";
import socialData from "../../../data/socialData.json";
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

// Icon mapping for social icons
const getSocialIcon = (icon: string) => {
  switch (icon) {
    case "facebook":
      return <FaFacebookF className="text-white text-xl" />;
    case "google":
      return <FaGoogle className="text-white text-xl" />;
    case "twitter":
      return <FaTwitter className="text-white text-xl" />;
    case "instagram":
      return <FaInstagram className="text-white text-xl" />;
    default:
      return null;
  }
};

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role] = useState<"customer" | "restaurant-owner">("customer"); // Fixed to customer
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { login } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!firstName.trim()) errors.firstName = "First name is required";
    if (!lastName.trim()) errors.lastName = "Last name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!phoneNumber.trim()) errors.phoneNumber = "Phone number is required";
    if (!password.trim()) errors.password = "Password is required";
    else if (password.length < 8)
      errors.password = "Password must be at least 8 characters";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (!validateForm()) return;

    if (!agreeToTerms) {
      setError("Please agree to the terms of service");
      return;
    }

    setLoading(true);

    try {
      const userData = {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        privacyConsent: agreeToTerms,
      };

      const response = await registerUser(userData, role);
      login(response.token);

      if (response.user.role === "RESTAURANT_OWNER") {
        router.push("/dashboard/orders");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = "Registration failed. Please try again.";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "User", href: "/auth" },
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

      <div className="flex-1 flex container mx-auto max-w-7xl my-6">
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
          <div className="flex mx-[60%] min-w-40">
            <Link
              href="/auth/login"
              className="flex-1 py-1.5 px-3 text-center text-gray-600 hover:text-gray-800 transition-colors rounded-bl-lg rounded-br-lg"
            >
              Sign In
            </Link>
            <div className="flex-1 py-1.5 px-3 text-center bg-teal-500 text-white font-medium rounded-bl-md rounded-br-md">
              Register
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Register
              </h2>

              {/* Social Login Buttons */}
              <div className="mb-6">
                <SocialLoginButtons onError={setError} disabled={loading} />
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">
                    Or register with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                {/* Role Selection - Hidden since it's fixed to customer */}
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    variant="ghost"
                    leftIcon={<FaUser className="h-4 w-4" />}
                    error={fieldErrors.firstName}
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    variant="ghost"
                    error={fieldErrors.lastName}
                  />
                </div>

                {/* Email */}
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="ghost"
                  leftIcon={<FaEnvelope className="h-4 w-4" />}
                  error={fieldErrors.email}
                />

                {/* Phone Number */}
                <Input
                  type="tel"
                  placeholder="Enter Your Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  variant="ghost"
                  leftIcon={<FaPhone className="h-4 w-4" />}
                  error={fieldErrors.phoneNumber}
                />

                {/* Password */}
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    className="mt-1 w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
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
                  <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded">
                    {error}
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
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600 mb-3">
                  Want to register your restaurant?
                </p>
                <Link
                  href="/restaurant/register"
                  className="w-full block text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Restaurant Owner Registration
                </Link>
              </div>

              {/* Login Link */}
              <p className="mt-6 text-center text-sm text-gray-600">
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
