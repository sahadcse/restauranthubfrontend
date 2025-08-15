"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await socialAuthService.initiateGoogleLogin(router);
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
      className={`
        w-full flex items-center justify-center gap-3 
        bg-white border-2 border-gray-200 text-gray-800 
        py-3.5 px-6 rounded-xl font-semibold text-sm
        shadow-sm hover:shadow-md hover:border-gray-300 hover:bg-gray-50
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-300
        disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-100 disabled:cursor-not-allowed disabled:shadow-none
        transform transition-all duration-200 ease-in-out
        hover:scale-[1.02] active:scale-[0.98]
        ${className}
      `}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-500"></div>
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <FaGoogle className="h-5 w-5 text-red-500" />
          <span>Continue with Google</span>
        </>
      )}
    </button>
  );
}
