"use client";

import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { socialAuthService } from "../../services/socialAuth.service";

interface GoogleLoginButtonProps {
  onError?: (error: string) => void;
  className?: string;
  disabled?: boolean;
}

export default function GoogleLoginButton({
  onError,
  className = "",
  disabled = false,
}: GoogleLoginButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await socialAuthService.initiateGoogleLogin();
    } catch (error) {
      console.error("Google login failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Google login failed";
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={disabled || loading}
      className={`w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      <FaGoogle className="h-4 w-4 text-red-500" />
      {loading ? "Connecting..." : "Continue with Google"}
    </button>
  );
}
