import { useState, useCallback } from "react";

/**
 * Custom hook for authentication forms with field-level error handling
 * @param {Object} initialState - The initial state of the form fields
 * @param {Function} submitAction - The function to call on form submission
 * @param {Function} onSuccess - Callback when submission is successful
 */
export const useAuthForm = (initialState, submitAction, onSuccess) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    // Clear general error if any
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();
    
    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await submitAction(formData);
      if (onSuccess) {
        onSuccess(result);
      }
      return { success: true, data: result };
    } catch (error) {
      console.error("Auth form error:", error);
      
      const newErrors = {};
      
      if (error.response && error.response.data) {
        const { field, message, errors: backendErrors } = error.response.data;
        
        // Helper to map message keywords to fields
        const mapMessageToField = (msg) => {
          const lowerMsg = msg.toLowerCase();
          if (lowerMsg.includes("email") || lowerMsg.includes("user not found")) return "email";
          if (lowerMsg.includes("password")) return "password";
          if (lowerMsg.includes("otp") || lowerMsg.includes("code")) return "otp";
          if (lowerMsg.includes("name") || lowerMsg.includes("username")) return "userName";
          return null;
        };

        // Handle specific field error
        if (field && message && field !== "general") {
          newErrors[field] = message;
        } 
        // Handle 'general' field with keyword mapping
        else if (field === "general" && message) {
          const mappedField = mapMessageToField(message);
          if (mappedField) {
            newErrors[mappedField] = message;
          } else {
            newErrors.general = message;
          }
        }
        // Handle multiple field errors if returned as an object
        else if (backendErrors && typeof backendErrors === 'object') {
          Object.assign(newErrors, backendErrors);
        }
        // Handle general message
        else if (error.response.data.message) {
          const mappedField = mapMessageToField(error.response.data.message);
          if (mappedField) {
            newErrors[mappedField] = error.response.data.message;
          } else {
            newErrors.general = error.response.data.message;
          }
        } else {
          newErrors.general = "An unexpected error occurred.";
        }
      } else {
        newErrors.general = "Network error. Please check your connection.";
      }
      
      setErrors(newErrors);
      return { success: false, errors: newErrors };
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, submitAction, onSuccess]);

  const clearErrors = useCallback(() => setErrors({}), []);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    clearErrors
  };
};
