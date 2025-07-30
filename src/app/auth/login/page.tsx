"use client";

import { useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import { useRouter } from "next/navigation";
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
  FaEnvelope,
  FaTwitter,
  FaInstagram,
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { login } = useAuth();
  const router = useRouter();

  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Auth", href: "/auth" },
    { label: "Login" },
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!password.trim()) errors.password = "Password is required";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
        }/auth/login`,
        {
          email,
          password,
        }
      );

      login(response.data.token);

      // Redirect based on user role
      if (response.data.user.role === "RESTAURANT_OWNER") {
        router.push("/dashboard/orders");
      } else if (response.data.user.role === "ADMIN") {
        router.push("/admin/restaurants");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Login failed. Please try again.";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className="text-3xl font-bold text-center">
              Welcome Back to{" "}
              <span className="text-teal-500">RestaurantHub</span>
            </h1>
            <p className="text-md mb-8 max-w-md leading-relaxed text-justify">
              Sign in to access your account and continue enjoying delicious
              food from your favorite restaurants.
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
                    className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center transition-colors`}
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

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col bg-gray-50 rounded-lg shadow-lg">
          {/* Header Tabs */}
          <div className="flex mx-[60%] min-w-40">
            <div className="flex-1 py-1.5 px-3 text-center bg-teal-500 text-white font-medium rounded-bl-md rounded-br-md">
              Sign In
            </div>
            <Link
              href="/auth/register"
              className="flex-1 py-1.5 px-3 text-center text-gray-600 hover:text-gray-800 transition-colors rounded-bl-lg rounded-br-lg"
            >
              Register
            </Link>
          </div>

          {/* Form Content */}
          <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Sign In
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
                    Or continue with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
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

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-teal-500 hover:text-teal-600"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {error && (
                  <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              {/* Register Link */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-teal-500 hover:text-teal-600 font-medium"
                >
                  Register
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
