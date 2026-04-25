import { useAuth } from "./use-auth";
import { useAuthForm } from "./use-auth-form";

/**
 * Custom hook for forgot password with structured error handling
 */
export const useForgotPassword = (onSuccess) => {
  const { forgotPassword } = useAuth();
  
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  } = useAuthForm(
    { email: "" },
    async (data) => await forgotPassword(data),
    onSuccess
  );

  return {
    handleForgotPassword: handleSubmit,
    isSubmitting,
    errors,
    formData,
    handleInputChange,
  };
};

/**
 * Custom hook for reset password with structured error handling
 */
export const useResetPassword = (onSuccess) => {
  const { resetPassword } = useAuth();
  
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  } = useAuthForm(
    { email: "", otp: "", password: "" },
    async (data) => await resetPassword(data),
    onSuccess
  );

  return {
    handleResetPassword: handleSubmit,
    isSubmitting,
    errors,
    formData,
    handleInputChange,
  };
};

/**
 * Custom hook for change password with structured error handling
 */
export const useChangePassword = (onSuccess) => {
  const { changePassword } = useAuth();
  
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  } = useAuthForm(
    { oldPassword: "", newPassword: "" },
    async (data) => await changePassword(data),
    onSuccess
  );

  return {
    handleChangePassword: handleSubmit,
    isSubmitting,
    errors,
    formData,
    handleInputChange,
  };
};
