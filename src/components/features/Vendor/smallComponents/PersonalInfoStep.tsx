import React, { useState } from "react";
import { FormStepProps } from "../../../../lib/interfaces/vendorForm";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
              className={`w-full px-3 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                errors?.password ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <FiEyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <FiEye className="h-4 w-4 text-gray-400" />
              )}
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
