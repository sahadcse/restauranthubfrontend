"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/layout/public/Header";
import Footer from "../../../components/layout/public/Footer";
import Breadcrumb, { BreadcrumbItem } from "../../../components/ui/Breadcrumb";
import { authApi } from "../../../lib/api/auth";
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
    "pending" | "success" | "error" | "resending"
  >("pending");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [resendError, setResendError] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const emailParam = searchParams.get("email");

  const verifyEmailToken = useCallback(
    async (verificationToken: string) => {
      try {
        const response = await authApi.verifyEmail(verificationToken);
        setMessage(response.message || "Email verified successfully!");
        setVerificationStatus("success");

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/auth/login?verified=true");
        }, 3000);
      } catch (error) {
        console.error("Email verification error:", error);
        let errorMessage = "Email verification failed. Please try again.";

        if (error instanceof ApiError) {
          errorMessage = error.message;
        }

        setMessage(errorMessage);
        setVerificationStatus("error");
      }
    },
    [router]
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
      case "success":
        return (
          <div className="text-center">
            <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500">
              Redirecting to login page in 3 seconds...
            </p>
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
              {email && (
                <button
                  onClick={handleResendVerification}
                  className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Resend Verification Email
                </button>
              )}
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
