import React from "react";
import { cn } from "../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "outline" | "filled" | "ghost";
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      variant = "outline",
      className,
      containerClassName,
      labelClassName,
      errorClassName,
      helperText,
      id,
      type = "text",
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || `input-${generatedId}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Determine if right icon should be interactive (for password fields with toggle buttons)
    const isRightIconInteractive = type === "password" && rightIcon;

    // Base input styles with proper icon spacing
    const baseInputStyles = cn(
      // Base styles
      "w-full transition-all duration-200 ease-in-out",
      "focus:outline-none focus:ring-2 focus:ring-offset-0",
      "placeholder:text-gray-400 dark:placeholder:text-gray-500",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "text-sm font-normal text-gray-900 dark:text-gray-100",
      "h-11 py-2",

      // Conditional padding based on icons - fixed spacing
      leftIcon && !rightIcon && "pl-10 pr-3",
      !leftIcon && rightIcon && "pl-3 pr-10",
      leftIcon && rightIcon && "pl-10 pr-10",
      !leftIcon && !rightIcon && "px-3"
    );

    // Variant styles
    const variantStyles = {
      outline: cn(
        "border border-gray-300 dark:border-gray-600",
        "bg-white dark:bg-gray-800",
        "hover:border-gray-400 dark:hover:border-gray-500",
        "focus:border-teal-500 dark:focus:border-teal-400",
        "focus:ring-teal-500/20 dark:focus:ring-teal-400/20",
        "rounded-md",
        error &&
          "border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500/20"
      ),
      filled: cn(
        "border-0 bg-gray-100 dark:bg-gray-700",
        "hover:bg-gray-200 dark:hover:bg-gray-600",
        "focus:bg-white dark:focus:bg-gray-800",
        "focus:ring-teal-500/20 dark:focus:ring-teal-400/20",
        "rounded-md",
        error &&
          "bg-red-50 dark:bg-red-900/20 focus:bg-red-50 focus:ring-red-500/20"
      ),
      ghost: cn(
        "border-0 border-b-2 border-gray-300 dark:border-gray-600",
        "bg-transparent",
        "hover:border-gray-400 dark:hover:border-gray-500",
        "focus:border-teal-500 dark:focus:border-teal-400",
        "focus:ring-0",
        "rounded-none",
        // Override padding for ghost variant to account for no side borders
        leftIcon && !rightIcon && "pl-8 pr-0",
        !leftIcon && rightIcon && "pl-0 pr-8",
        leftIcon && rightIcon && "pl-8 pr-8",
        !leftIcon && !rightIcon && "px-0",
        error && "border-red-500 dark:border-red-400 focus:border-red-500"
      ),
    };

    return (
      <div className={cn("space-y-1", containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium text-gray-700 dark:text-gray-300",
              required && "after:content-['*'] after:text-red-500 after:ml-1",
              disabled && "text-gray-400 dark:text-gray-600",
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10",
                "flex items-center justify-center",
                variant === "ghost" ? "left-0" : "left-3"
              )}
              style={{ pointerEvents: "none" }}
            >
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            className={cn(baseInputStyles, variantStyles[variant], className)}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={cn(error && errorId, helperText && helperId)}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10",
                "flex items-center justify-center",
                variant === "ghost" ? "right-0" : "right-3"
              )}
              style={{
                pointerEvents: isRightIconInteractive ? "auto" : "none",
              }}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {/* Helper Text */}
        {helperText && !error && (
          <p id={helperId} className="text-xs text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p
            id={errorId}
            className={cn(
              "text-xs text-red-600 dark:text-red-400 flex items-center gap-1",
              errorClassName
            )}
            role="alert"
          >
            <svg
              className="h-3 w-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default React.memo(Input);
