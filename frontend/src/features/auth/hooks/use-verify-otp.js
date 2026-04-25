import { useAuth } from "./use-auth";
import { useAuthForm } from "./use-auth-form";

/**
 * Custom hook for OTP verification with structured error handling
 */
export const useVerifyOTP = (onSuccess) => {
  const { verifyOTP } = useAuth();
  
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    setFormData
  } = useAuthForm(
    { email: "", otp: "" },
    async (data) => await verifyOTP(data),
    onSuccess
  );

  return {
    handleVerify: handleSubmit,
    isSubmitting,
    errors,
    formData,
    handleInputChange,
    setFormData
  };
};
