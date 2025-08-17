import { useState, useCallback, useMemo } from "react";
import { VendorFormData } from "../lib/interfaces/vendorForm";

const initialFormData: VendorFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "", // Add password field
  restaurantName: "",
  cuisine: "",
  description: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  businessLicense: "",
  taxId: "",
  yearsInBusiness: "",
  currentLocations: "",
  businessLicenseFile: null,
  foodLicenseFile: null,
  insuranceFile: null,
  menuFile: null,
  agreeToTerms: false,
  agreeToCommission: false,
};

export const useVendorForm = () => {
  const [formData, setFormData] = useState<VendorFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);

  // Memoized validation function that doesn't depend on formData
  const getValidationErrors = useCallback(
    (step: number, data: VendorFormData): Record<string, string> => {
      const newErrors: Record<string, string> = {};

      switch (step) {
        case 1:
          if (!data.firstName.trim())
            newErrors.firstName = "First name is required";
          if (!data.lastName.trim())
            newErrors.lastName = "Last name is required";
          if (!data.email.trim()) newErrors.email = "Email is required";
          else if (!/\S+@\S+\.\S+/.test(data.email))
            newErrors.email = "Email is invalid";
          if (!data.phone.trim()) newErrors.phone = "Phone number is required";

          // Password validation - only for step 1 initial registration
          if (data.password !== undefined) {
            if (!data.password.trim()) {
              newErrors.password = "Password is required";
            } else if (data.password.length < 8) {
              newErrors.password = "Password must be at least 8 characters";
            } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(data.password)) {
              newErrors.password =
                "Password must include numbers and special characters";
            }
          }
          break;

        case 2:
          if (!data.restaurantName.trim())
            newErrors.restaurantName = "Restaurant name is required";
          if (!data.cuisine) newErrors.cuisine = "Cuisine type is required";
          if (!data.description.trim())
            newErrors.description = "Description is required";
          if (!data.address.trim()) newErrors.address = "Address is required";
          if (!data.city.trim()) newErrors.city = "City is required";
          if (!data.state.trim()) newErrors.state = "State is required";
          if (!data.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
          if (!data.businessLicense.trim())
            newErrors.businessLicense = "Business license is required";
          if (!data.taxId.trim()) newErrors.taxId = "Tax ID is required";
          if (!data.yearsInBusiness.trim())
            newErrors.yearsInBusiness = "Years in business is required";
          break;

        case 3:
          if (!data.businessLicenseFile)
            newErrors.businessLicenseFile = "Business license file is required";
          if (!data.foodLicenseFile)
            newErrors.foodLicenseFile = "Food license file is required";
          if (!data.insuranceFile)
            newErrors.insuranceFile = "Insurance file is required";
          if (!data.agreeToTerms)
            newErrors.agreeToTerms = "You must agree to terms and conditions";
          if (!data.agreeToCommission)
            newErrors.agreeToCommission =
              "You must agree to commission structure";
          break;
      }

      return newErrors;
    },
    []
  );

  // Validate step function that doesn't cause re-renders
  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors = getValidationErrors(step, formData);
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData, getValidationErrors]
  );

  // Check if a step is valid without setting errors
  const isStepValid = useMemo(() => {
    return (step: number): boolean => {
      const stepErrors = getValidationErrors(step, formData);
      return Object.keys(stepErrors).length === 0;
    };
  }, [formData, getValidationErrors]);

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target;

      if (type === "checkbox") {
        const target = e.target as HTMLInputElement;
        setFormData((prev) => ({
          ...prev,
          [name]: target.checked,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
      const file = e.target.files?.[0] || null;
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));

      // Clear error when file is selected
      if (errors[fieldName]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const nextStep = useCallback(() => {
    if (validateStep(currentStep) && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setCurrentStep(1);
  }, []);

  return {
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
  };
};
