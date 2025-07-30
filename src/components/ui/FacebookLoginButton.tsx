"use client";

import { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { socialAuthService } from "../../services/socialAuth.service";

interface FacebookLoginButtonProps {
  onError?: (error: string) => void;
  className?: string;
  disabled?: boolean;
}

export default function FacebookLoginButton({
  onError,
  className = "",
  disabled = false,
}: FacebookLoginButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      await socialAuthService.initiateFacebookLogin();
    } catch (error) {
      console.error("Facebook login failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Facebook login failed";
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleFacebookLogin}
      disabled={disabled || loading}
      className={`w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      <FaFacebookF className="h-4 w-4" />
      {loading ? "Connecting..." : "Continue with Facebook"}
    </button>
  );
}
