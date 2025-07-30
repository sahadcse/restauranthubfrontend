"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../contexts/authContext";

function SocialLoginSuccessContent() {
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const token = searchParams.get("token");
        const refreshToken = searchParams.get("refresh_token");
        // const userId = searchParams.get("user_id");
        const isNewUser = searchParams.get("is_new_user") === "true";

        if (!token) {
          throw new Error("No authentication token received");
        }

        // Store tokens and login user
        login(token, refreshToken || undefined);

        // Show welcome message for new users
        if (isNewUser) {
          // You could show a welcome modal or message here
          console.log("Welcome new user!");
        }

        // Redirect based on user role or to home
        router.replace("/");
      } catch (error) {
        console.error("Social login callback error:", error);
        setError(error instanceof Error ? error.message : "Authentication failed");
        setProcessing(false);
      }
    };

    processCallback();
  }, [searchParams, login, router]);

  if (processing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Completing your login...
          </h2>
          <p className="text-gray-600">Please wait while we finish setting up your account.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Authentication Failed
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/auth/login")}
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default function SocialLoginSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading...
          </h2>
          <p className="text-gray-600">Please wait while we process your authentication.</p>
        </div>
      </div>
    }>
      <SocialLoginSuccessContent />
    </Suspense>
  );
}
