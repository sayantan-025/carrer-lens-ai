import { useCallback } from "react";
import { useAuth } from "./use-auth";
import { useAuthForm } from "./use-auth-form";

/**
 * Custom hook for email login with structured error handling
 */
export const useLogin = (onSuccess) => {
  const { login } = useAuth();
  
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    clearErrors
  } = useAuthForm(
    { email: "", password: "" },
    async (data) => await login(data),
    onSuccess
  );

  return {
    handleLogin: handleSubmit,
    isSubmitting,
    errors,
    formData,
    handleInputChange,
    clearError: (field) => {
      // Mapping for backward compatibility if needed, 
      // but useAuthForm already clears errors on input change
    },
  };
};
