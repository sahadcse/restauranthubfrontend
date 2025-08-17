export interface VendorFormData {
  // Personal Information - all required
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string; // Optional since it's only needed for step 1

  // Restaurant Information - all required
  restaurantName: string;
  cuisine: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;

  // Business Information - all required
  businessLicense: string;
  taxId: string;
  yearsInBusiness: string;
  currentLocations: string;

  // Documents - nullable for file uploads
  businessLicenseFile: File | null;
  foodLicenseFile: File | null;
  insuranceFile: File | null;
  menuFile: File | null;

  // Agreement - required booleans
  agreeToTerms: boolean;
  agreeToCommission: boolean;
}

export interface VendorSignupFormProps {
  onSubmit: (data: VendorFormData) => Promise<void>;
  isSubmitting?: boolean;
  submitStatus?: "idle" | "success" | "error";
}

export interface FormStepProps {
  formData: VendorFormData;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => void;
  errors: Record<string, string>; // Remove the optional ? to make it required
}

export const CUISINE_OPTIONS = [
  "American",
  "Italian",
  "Chinese",
  "Mexican",
  "Indian",
  "Japanese",
  "Thai",
  "Mediterranean",
  "French",
  "Korean",
  "Vietnamese",
  "Greek",
  "Spanish",
  "Lebanese",
  "Turkish",
  "Other",
] as const;

export type CuisineType = (typeof CUISINE_OPTIONS)[number];
