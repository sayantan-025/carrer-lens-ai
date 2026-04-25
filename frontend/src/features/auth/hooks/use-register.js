import { useAuth } from "./use-auth";
import { useAuthForm } from "./use-auth-form";

/**
 * Custom hook for registration with structured error handling
 */
export const useRegister = (onSuccess) => {
  const { register } = useAuth();
  
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  } = useAuthForm(
    { userName: "", email: "", password: "" },
    async (data) => await register(data),
    onSuccess
  );

  return {
    handleRegister: handleSubmit,
    isSubmitting,
    errors,
    formData,
    handleInputChange,
  };
};
