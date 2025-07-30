"use client";

import GoogleLoginButton from "./GoogleLoginButton";
import FacebookLoginButton from "./FacebookLoginButton";

interface SocialLoginButtonsProps {
  onError?: (error: string) => void;
  disabled?: boolean;
  className?: string;
}

export default function SocialLoginButtons({
  onError,
  disabled = false,
  className = "",
}: SocialLoginButtonsProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <GoogleLoginButton onError={onError} disabled={disabled} />
      <FacebookLoginButton onError={onError} disabled={disabled} />
    </div>
  );
}
