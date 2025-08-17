import React from "react";
import Link from "next/link";
import { FormStepProps } from "../../../../lib/interfaces/vendorForm";
import { FiUpload } from "react-icons/fi";

interface FileUploadFieldProps {
  id: string;
  label: string;
  file: File | null;
  onFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => void;
  fieldName: string;
  required?: boolean;
  error?: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  id,
  label,
  file,
  onFileChange,
  fieldName,
  required = false,
  error,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-gray-400 transition-colors">
      <FiUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => onFileChange(e, fieldName)}
        className="hidden"
        id={id}
        required={required}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label htmlFor={id} className="cursor-pointer">
        <span className="text-sm text-gray-600">
          {file ? file.name : "Click to upload"}
        </span>
      </label>
    </div>
    {error && (
      <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
        {error}
      </p>
    )}
  </div>
);

export const DocumentsStep: React.FC<FormStepProps> = ({
  formData,
  handleInputChange,
  handleFileChange,
  errors = {},
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUploadField
          id="businessLicense"
          label="Business License"
          file={formData.businessLicenseFile}
          onFileChange={handleFileChange}
          fieldName="businessLicenseFile"
          required
          error={errors.businessLicenseFile}
        />

        <FileUploadField
          id="foodLicense"
          label="Food License"
          file={formData.foodLicenseFile}
          onFileChange={handleFileChange}
          fieldName="foodLicenseFile"
          required
          error={errors.foodLicenseFile}
        />

        <FileUploadField
          id="insurance"
          label="Insurance Certificate"
          file={formData.insuranceFile}
          onFileChange={handleFileChange}
          fieldName="insuranceFile"
          required
          error={errors.insuranceFile}
        />

        <FileUploadField
          id="menu"
          label="Menu (Optional)"
          file={formData.menuFile}
          onFileChange={handleFileChange}
          fieldName="menuFile"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              required
              className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              aria-describedby={
                errors.agreeToTerms ? "agreeToTerms-error" : undefined
              }
            />
            <span className="text-sm text-gray-700">
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-teal-600 hover:text-teal-700 underline"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-teal-600 hover:text-teal-700 underline"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p id="agreeToTerms-error" className="mt-1 text-sm text-red-600">
              {errors.agreeToTerms}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="agreeToCommission"
              checked={formData.agreeToCommission}
              onChange={handleInputChange}
              required
              className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              aria-describedby={
                errors.agreeToCommission ? "agreeToCommission-error" : undefined
              }
            />
            <span className="text-sm text-gray-700">
              I agree to the 15% commission structure on each order
            </span>
          </label>
          {errors.agreeToCommission && (
            <p
              id="agreeToCommission-error"
              className="mt-1 text-sm text-red-600"
            >
              {errors.agreeToCommission}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
