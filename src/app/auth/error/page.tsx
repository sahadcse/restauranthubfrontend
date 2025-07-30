"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Header from "../../../components/layout/public/Header";
import Footer from "../../../components/layout/public/Footer";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error") || "Authentication failed";

  const getErrorMessage = (error: string) => {
    switch (error) {
      case "access_denied":
        return "You cancelled the authentication process.";
      case "invalid_request":
        return "Invalid authentication request.";
      case "unauthorized_client":
        return "Authentication service is not properly configured.";
      case "unsupported_response_type":
        return "Authentication method not supported.";
      case "user_denied":
        return "You denied permission to access your account.";
      case "server_error":
        return "A server error occurred during authentication.";
      case "temporarily_unavailable":
        return "Authentication service is temporarily unavailable.";
      default:
        return "An error occurred during authentication. Please try again.";
    }
  };

  const getProviderFromError = (error: string) => {
    // Attempt to determine which provider caused the error based on common error patterns
    if (error.includes("facebook") || error.includes("fb")) {
      return "Facebook";
    } else if (error.includes("google")) {
      return "Google";
    }
    return "Social";
  };

  const provider = getProviderFromError(error);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center bg-gray-50 py-12">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {provider} Authentication Error
          </h1>

          <p className="text-gray-600 mb-6">{getErrorMessage(error)}</p>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/auth/login")}
              className="w-full bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors font-medium"
            >
              Try Again
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Go Home
            </button>
          </div>

          <details className="mt-6 text-left">
            <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
              Technical Details
            </summary>
            <p className="text-xs text-gray-400 mt-2 font-mono bg-gray-100 p-2 rounded">
              Error code: {error}
            </p>
          </details>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
