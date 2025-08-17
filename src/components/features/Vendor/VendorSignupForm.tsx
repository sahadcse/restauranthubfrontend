import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { VendorSignupFormProps } from "../../../lib/interfaces/vendorForm";
import { useVendorForm } from "../../../hooks/useVendorForm";
import { useAuth } from "../../../contexts/authContext";
import { authApi } from "../../../lib/api/auth";
import { UserRole } from "../../../lib/interfaces/enums";
import { StepIndicator } from "./smallComponents/StepIndicator";
import { PersonalInfoStep } from "./smallComponents/PersonalInfoStep";
import { RestaurantDetailsStep } from "./smallComponents/RestaurantDetailsStep";
import { DocumentsStep } from "./smallComponents/DocumentsStep";
import { FiMail } from "react-icons/fi";

const STEP_LABELS = [
  "Personal Information",
  "Restaurant Details",
  "Documents & Agreement",
];

// Loading component for the form
function FormLoading() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Main form component that uses useSearchParams
const VendorSignupFormContent: React.FC<VendorSignupFormProps> = ({
  onSubmit,
  isSubmitting = false,
  submitStatus = "idle",
}) => {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const isStep2 = searchParams.get("step") === "2";
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState("");

  const {
    formData,
    setFormData,
    errors,
    setErrors,
    currentStep,
    handleInputChange,
    handleFileChange,
    nextStep,
    prevStep,
    resetForm,
    validateStep,
    isStepValid,
  } = useVendorForm();

  // Auto-populate form data from user if in step 2
  useEffect(() => {
    if (isStep2 && user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
      }));
    }
  }, [isStep2, user, setFormData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isStep2 && currentStep === 1) {
      // Step 1: Register restaurant owner first
      if (!validateStep(currentStep)) {
        return;
      }

      try {
        await authApi.register(
          {
            email: formData.email,
            password: formData.password || "TempPassword123!",
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phone,
            privacyConsent: true,
          },
          UserRole.RESTAURANT_OWNER
        );

        // Store email for popup and show success modal
        setRegistrationEmail(formData.email);
        setShowSuccessModal(true);

        // Clear any previous errors
        setErrors({});

        return;
      } catch (error) {
        console.error("Registration error:", error);

        // Handle specific error cases
        if (error instanceof Error) {
          let errorMessage = "Registration failed. Please try again.";

          // Check for email already exists error
          if (
            error.message.includes("already exists") ||
            error.message.includes("duplicate") ||
            error.message.includes("409")
          ) {
            errorMessage =
              "An account with this email already exists. Please use a different email or try logging in.";
          } else if (error.message.includes("400")) {
            errorMessage = "Please check your information and try again.";
          } else if (error.message.includes("validation")) {
            errorMessage = "Please ensure all fields are filled correctly.";
          }

          setErrors({ submit: errorMessage });
        } else {
          setErrors({ submit: "Registration failed. Please try again." });
        }
        return;
      }
    }

    // For step 2 or other steps, continue with normal flow
    if (!validateStep(currentStep)) {
      return;
    }

    try {
      await onSubmit(formData);
      if (!isStep2) {
        resetForm();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      handleInputChange,
      handleFileChange,
      errors,
    };

    switch (currentStep) {
      case 1:
        return <PersonalInfoStep {...stepProps} isStep2={isStep2} />;
      case 2:
        return <RestaurantDetailsStep {...stepProps} />;
      case 3:
        return <DocumentsStep {...stepProps} />;
      default:
        return null;
    }
  };

  // Check if next button should be disabled
  const isNextDisabled = !isStepValid(currentStep);

  // Check if submit button should be disabled
  const isSubmitDisabled =
    isSubmitting ||
    (!isStep2 &&
      currentStep !== 1 &&
      (!formData.agreeToTerms || !formData.agreeToCommission)) ||
    !isStepValid(currentStep);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isStep2
              ? `Welcome ${
                  user?.firstName || "User"
                }! Complete Your Restaurant Profile`
              : "Restaurant Partnership Application"}
          </h2>
          {isStep2 && (
            <p className="text-gray-600 mb-4">
              Your account has been verified. Please provide your restaurant
              details to start accepting orders.
            </p>
          )}

          <StepIndicator
            currentStep={currentStep}
            totalSteps={3}
            stepLabels={STEP_LABELS}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderCurrentStep()}

          {/* Status Messages */}
          {submitStatus === "success" && !showSuccessModal && (
            <div
              className="p-4 bg-green-50 border border-green-200 rounded-lg"
              role="alert"
            >
              <p className="text-green-600 text-sm">
                {isStep2
                  ? "Profile completed successfully! Your restaurant is now under review."
                  : "Registration successful! Please check your email to verify your account and complete your restaurant profile."}
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div
              className="p-4 bg-red-50 border border-red-200 rounded-lg"
              role="alert"
            >
              <p className="text-red-600 text-sm">
                {errors.submit || "Failed to submit. Please try again."}
              </p>
            </div>
          )}

          {/* Show submit errors for step 1 registration */}
          {errors.submit && !isStep2 && currentStep === 1 && (
            <div
              className="p-4 bg-red-50 border border-red-200 rounded-lg"
              role="alert"
            >
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {!isStep2 && currentStep === 1 ? (
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="px-8 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            ) : currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={isNextDisabled}
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="px-8 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <FiMail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Account Created Successfully!
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                We&apos;ve sent an activation link to{" "}
                <strong>{registrationEmail}</strong>. Please check your email
                and click the activation link to verify your account and
                complete your restaurant profile.
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  resetForm();
                }}
                className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Exported component with Suspense wrapper
export const VendorSignupForm: React.FC<VendorSignupFormProps> = (props) => {
  return (
    <Suspense fallback={<FormLoading />}>
      <VendorSignupFormContent {...props} />
    </Suspense>
  );
};
