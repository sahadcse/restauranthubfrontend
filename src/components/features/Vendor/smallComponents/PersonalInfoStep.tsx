import React, { useState } from "react";
import { FormStepProps } from "../../../../lib/interfaces/vendorForm";

interface PersonalInfoStepProps extends FormStepProps {
  isStep2?: boolean;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  handleInputChange,
  errors = {}, // Provide default empty object
  isStep2 = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Show a notice for step 2 users that personal info is pre-filled
  if (isStep2) {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-blue-800 mb-2">
            Personal Information Confirmed
          </h3>
          <p className="text-sm text-blue-700">
            Your personal information has been verified and pre-filled from your
            account. You can proceed to the next step to enter your restaurant
            details.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-blue-900">Name:</span>
              <p className="text-sm text-blue-700">
                {formData.firstName} {formData.lastName}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-blue-900">Email:</span>
              <p className="text-sm text-blue-700">{formData.email}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-blue-900">Phone:</span>
              <p className="text-sm text-blue-700">{formData.phone}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Personal Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            readOnly={isStep2}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
              errors?.firstName ? "border-red-300" : "border-gray-300"
            } ${isStep2 ? "bg-gray-50 cursor-not-allowed" : ""}`}
          />
          {errors?.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            readOnly={isStep2}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
              errors?.lastName ? "border-red-300" : "border-gray-300"
            } ${isStep2 ? "bg-gray-50 cursor-not-allowed" : ""}`}
          />
          {errors?.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          readOnly={isStep2}
          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
            errors?.email ? "border-red-300" : "border-gray-300"
          } ${isStep2 ? "bg-gray-50 cursor-not-allowed" : ""}`}
        />
        {errors?.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
        {isStep2 && (
          <p className="mt-1 text-sm text-gray-500">
            Email address is already verified and cannot be changed.
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
            errors?.phone ? "border-red-300" : "border-gray-300"
          }`}
        />
        {errors?.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      {/* Password field - only show in step 1 (initial registration) */}
      {!isStep2 && (
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 pr-16 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                errors?.password ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter a strong password"
              autoComplete="new-password"
              data-testid="password-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-btn"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              data-testid="password-toggle"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors?.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Must be at least 8 characters long and include numbers and special
            characters.
          </p>
        </div>
      )}
    </div>
  );
};
