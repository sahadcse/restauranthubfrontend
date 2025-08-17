"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/layout/public/Header";
import Footer from "../../../components/layout/public/Footer";
import Breadcrumb, { BreadcrumbItem } from "../../../components/ui/Breadcrumb";
import { authApi } from "../../../lib/api/auth";
import { useAuth } from "../../../contexts/authContext";
import { UserRole } from "../../../lib/interfaces/enums";
import { ApiError } from "../../../lib/errors/ApiError";
import {
  FaEnvelope,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";

// Loading component for Suspense fallback
function VerifyEmailLoading() {
  return (
    <div className="text-center">
      <FaSpinner className="w-16 h-16 text-teal-500 mx-auto mb-4 animate-spin" />
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h2>
      <p className="text-gray-600">
        Please wait while we process your request.
      </p>
    </div>
  );
}

// Main verification component that uses useSearchParams
function VerifyEmailContent() {
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "verifying" | "success" | "error" | "resending"
  >("pending");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [resendError, setResendError] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser, setToken } = useAuth();

  const token = searchParams.get("token");
  const emailParam = searchParams.get("email");

  const verifyEmailToken = useCallback(
    async (verificationToken: string) => {
      setVerificationStatus("verifying");

      try {
        const response = await authApi.verifyEmail(verificationToken);

        console.log("Email verification response From Verify-Email:", response);

        if (response.status === "success") {
          setVerificationStatus("success");
          setMessage(response.message || "Email verified successfully!");

          // Handle user data from response - it's directly in data field
          if (response.data) {
            console.log(
              "Email verification successful, user data:",
              response.data
            );

            // Ensure user data has required fields for restaurant owners
            // The server should return ACTIVE status after successful verification
            const userData = {
              ...response.data,
              role: response.data.role,
              accountStatus: response.data.accountStatus,
            };

            console.log("Enhanced user data for step 2:", userData);

            // IMPORTANT: Set user data FIRST, then token
            // This prevents token decoding from overwriting complete user data
            setUser(userData);
            localStorage.setItem("userData", JSON.stringify(userData));

            // Store the verification token as the authentication token for step 2
            setToken(verificationToken);
            localStorage.setItem("token", verificationToken);

            console.log("Stored user data and verification token for step 2");

            // Auto-redirect restaurant owners to complete their profile
            if (userData.role === UserRole.RESTAURANT_OWNER) {
              setIsRedirecting(true);
              setMessage(
                "Email verified successfully! Redirecting you to complete your restaurant profile..."
              );

              // Wait 5 seconds to show the success state and ensure data is persisted
              setTimeout(() => {
                router.push("/vendor-signup?step=2");
              }, 5000);
            } else {
              // For other users, redirect to login
              setTimeout(() => {
                router.push("/auth/login?verified=true");
              }, 3000);
            }
          } else {
            console.warn("No user data in verification response");
            // If no user data, just redirect to login
            setTimeout(() => {
              router.push("/auth/login?verified=true");
            }, 3000);
          }
        } else {
          setVerificationStatus("error");
          setMessage(response.message || "Email verification failed");
        }
      } catch (error) {
        console.error("Email verification error:", error);
        setVerificationStatus("error");

        let errorMessage = "Email verification failed. Please try again.";
        if (error instanceof ApiError) {
          errorMessage = error.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        setMessage(errorMessage);
      }
    },
    [router, setUser, setToken]
  );

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }

    // If token is provided, verify it automatically
    if (token) {
      verifyEmailToken(token);
    }
  }, [token, emailParam, verifyEmailToken]);

  const handleResendVerification = async () => {
    if (!email) {
      setResendError("Email address is required");
      return;
    }

    setVerificationStatus("resending");
    setResendError("");
    setResendSuccess(false);

    try {
      await authApi.resendVerificationEmail(email);
      setResendSuccess(true);
      setVerificationStatus("pending");
    } catch (error) {
      console.error("Resend verification error:", error);
      let errorMessage =
        "Failed to resend verification email. Please try again.";

      if (error instanceof ApiError) {
        errorMessage = error.message;
      }

      setResendError(errorMessage);
      setVerificationStatus("pending");
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case "verifying":
        return (
          <div className="text-center">
            <FaSpinner className="w-16 h-16 text-teal-500 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Verifying Your Email
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your email address...
            </p>
          </div>
        );

      case "success":
        return (
          <div className="text-center">
            <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>

            {/* Show verification details before redirecting */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-green-800 mb-2">
                Account Details
              </h3>
              <div className="text-sm text-green-700 space-y-1">
                <p>✓ Email verified successfully</p>
                <p>✓ Account status: ACTIVE</p>
                <p>✓ Role: Restaurant Owner</p>
                <p>✓ Ready to complete restaurant profile</p>
              </div>
            </div>

            {isRedirecting ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700 text-sm">
                  <FaSpinner className="inline w-4 h-4 animate-spin mr-2" />
                  Redirecting you to complete your restaurant profile...
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  You will be redirected in a few seconds. If not, click the button below.
                </p>
                <button
                  onClick={() => router.push("/vendor-signup?step=2")}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  Continue to Restaurant Profile
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/vendor-signup?step=2"
                  className="block w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
                >
                  Complete Restaurant Profile
                </Link>
                <Link
                  href="/auth/login"
                  className="block w-full border border-teal-600 text-teal-600 py-2 px-4 rounded-md hover:bg-teal-50 transition-colors"
                >
                  Continue to Login
                </Link>
              </div>
            )}
          </div>
        );

      case "error":
        return (
          <div className="text-center">
            <FaExclamationTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Verification Failed
            </h2>
            <p className="text-red-600 mb-6">{message}</p>
            <div className="space-y-4">
              <Link
                href="/auth/login"
                className="block w-full bg-teal-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-teal-600 transition-colors"
              >
                Back to Login
              </Link>
              <button
                onClick={handleResendVerification}
                className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Resend Verification Email
              </button>
              <Link
                href="/vendor-signup"
                className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Registration
              </Link>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <FaEnvelope className="w-16 h-16 text-teal-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Check Your Email
            </h2>
            <p className="text-gray-600 mb-6">
              We&apos;ve sent a verification link to{" "}
              <span className="font-medium">
                {email || "your email address"}
              </span>
              . Please check your email and click the link to verify your
              account.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> The verification link will expire in 24
                hours. If you don&apos;t see the email, check your spam folder.
              </p>
            </div>

            {resendSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-green-800">
                  Verification email sent successfully! Please check your inbox.
                </p>
              </div>
            )}

            {resendError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-800">{resendError}</p>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={handleResendVerification}
                disabled={verificationStatus === "resending" || !email}
                className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {verificationStatus === "resending" ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  "Resend Verification Email"
                )}
              </button>

              <Link
                href="/auth/login"
                className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">{renderContent()}</div>
  );
}

export default function VerifyEmail() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Auth", href: "#" },
    { label: "Verify Email" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <Breadcrumb
        items={breadcrumbItems}
        className="container mx-auto max-w-7xl"
      />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Suspense fallback={<VerifyEmailLoading />}>
            <VerifyEmailContent />
          </Suspense>
        </div>
      </div>

      <Footer />
    </div>
  );
}
