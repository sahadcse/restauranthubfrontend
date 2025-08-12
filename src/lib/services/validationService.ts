import { UserRegistrationData } from "./../interfaces/auth";
import { VALIDATION_RULES } from "../utils/constants";

export interface ValidationErrors {
  [key: string]: string;
}

class ValidationService {
  private emailRegex = VALIDATION_RULES.email.regex;
  private phoneRegex = VALIDATION_RULES.phone.regex;

  validateEmail(email: string | undefined): string | null {
    if (!email?.trim()) return "Email is required";
    if (!this.emailRegex.test(email)) return "Email is invalid";
    return null;
  }

  validatePassword(
    password: string | undefined,
    minLength = VALIDATION_RULES.password.minLength
  ): string | null {
    if (!password?.trim()) return "Password is required";
    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters`;
    }
    if (password.length > VALIDATION_RULES.password.maxLength) {
      return `Password cannot exceed ${VALIDATION_RULES.password.maxLength} characters`;
    }

    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }

    // Check for lowercase letter
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }

    // Check for number
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }

    // Check for special character
    if (!/[^A-Za-z0-9]/.test(password)) {
      return "Password must contain at least one special character";
    }

    return null;
  }

  validatePhone(phoneNumber: string | undefined): string | null {
    // Phone number is optional according to backend schema
    if (!phoneNumber?.trim()) return null;

    if (!this.phoneRegex.test(phoneNumber.replace(/\s+/g, ""))) {
      return "Phone number is invalid";
    }
    return null;
  }

  validateRequired(
    value: string | undefined,
    fieldName: string
  ): string | null {
    if (!value?.trim()) return `${fieldName} is required`;
    return null;
  }

  validateRegistrationForm = (
    formData: UserRegistrationData
  ): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Validate required fields
    const firstNameError = this.validateRequired(
      formData.firstName,
      "First name"
    );
    if (firstNameError) errors.firstName = firstNameError;

    const lastNameError = this.validateRequired(formData.lastName, "Last name");
    if (lastNameError) errors.lastName = lastNameError;

    // Validate email
    const emailError = this.validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    // Validate phone (optional)
    const phoneError = this.validatePhone(formData.phoneNumber);
    if (phoneError) errors.phoneNumber = phoneError;

    // Validate password
    const passwordError = this.validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    return errors;
  };

  clearFieldError(
    errors: ValidationErrors,
    fieldName: string
  ): ValidationErrors {
    const { [fieldName]: _, ...remainingErrors } = errors;
    console.log(_);
    return remainingErrors;
  }
}

export const validationService = new ValidationService();
