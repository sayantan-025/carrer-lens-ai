import { useState, useCallback } from "react";
import { useAuth } from "./use-auth";

/**
 * Custom hook for email login with structured error handling
 */
export const useLogin = () => {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const clearError = useCallback((field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const handleLogin = useCallback(async ({ email, password }) => {
    setIsSubmitting(true);
    setErrors({ email: "", password: "", general: "" });

    try {
      await login({ email, password });
      return { success: true };
    } catch (error) {
      if (!error.response || !error.response.data) {
        setErrors((prev) => ({
          ...prev,
          general: "Network error. Check internet.",
        }));
        return { success: false };
      }

      const { field, message } = error.response.data;

      if (field && message) {
        setErrors((prev) => ({
          ...prev,
          [field]: message,
        }));
      } else if (error.response.data.message) {
        setErrors((prev) => ({
          ...prev,
          general: error.response.data.message,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          general: "Error. Try again.",
        }));
      }
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  }, [login]);

  return {
    handleLogin,
    isSubmitting,
    errors,
    clearError,
  };
};
