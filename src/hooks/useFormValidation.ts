import { useState, useCallback } from "react";
import {
  validationService,
  ValidationErrors,
} from "../lib/services/validationService";

export interface UseFormValidationOptions<T> {
  initialData: T;
  validationFn: (data: T) => ValidationErrors;
  onSubmit: (data: T) => Promise<void> | void;
}

export function useFormValidation<T extends Record<string, unknown>>({
  initialData,
  validationFn,
  onSubmit,
}: UseFormValidationOptions<T>) {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback(
    (field: keyof T, value: unknown) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear field error when user starts typing
      if (errors[field as string]) {
        setErrors((prev) =>
          validationService.clearFieldError(prev, field as string)
        );
      }
    },
    [errors]
  );

  const validateAndSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      setErrors({});
      const validationErrors = validationFn(formData);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return false;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        return true;
      } catch (error) {
        console.error("Form submission error:", error);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validationFn, onSubmit]
  );

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setIsSubmitting(false);
  }, [initialData]);

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    validateAndSubmit,
    resetForm,
    setErrors,
  };
}
