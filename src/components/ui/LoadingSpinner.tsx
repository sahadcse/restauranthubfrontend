import React from "react";

export interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "white";
  text?: string;
  showText?: boolean;
  fullScreen?: boolean;
  className?: string;
}

const sizeClasses = {
  small: "w-4 h-4",
  medium: "w-8 h-8",
  large: "w-12 h-12",
};

const variantClasses = {
  primary: "border-teal-600",
  secondary: "border-gray-600",
  white: "border-white",
};

export default function LoadingSpinner({
  size = "medium",
  variant = "primary",
  text = "Loading...",
  showText = true,
  fullScreen = false,
  className = "",
}: LoadingSpinnerProps) {
  const spinnerContent = (
    <div className={`text-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 mx-auto mb-4 ${sizeClasses[size]} ${variantClasses[variant]}`}
      />
      {showText && (
        <p className={`text-gray-600 ${size === "small" ? "text-sm" : ""}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
}

// Loading overlay component for specific sections
export function LoadingOverlay({
  isLoading,
  children,
  text = "Loading...",
  size = "medium",
}: {
  isLoading: boolean;
  children: React.ReactNode;
  text?: string;
  size?: "small" | "medium" | "large";
}) {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <LoadingSpinner size={size} text={text} />
      </div>
    </div>
  );
}

// Simple inline spinner for buttons
export function InlineSpinner({
  size = "small",
  variant = "white",
  className = "",
}: Pick<LoadingSpinnerProps, "size" | "variant" | "className">) {
  return (
    <div
      className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    />
  );
}

// Full screen spinner for authentication loading
export function AuthLoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );
}
