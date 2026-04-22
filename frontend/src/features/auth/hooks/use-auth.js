import { useAuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useAuthContext();
  
  return {
    user: context.user,
    isLoading: context.isLoading,
    isAuthenticated: context.isAuthenticated,
    login: context.login,
    register: context.register,
    verifyOTP: context.verifyOTP,
    resendOTP: context.resendOTP,
    forgotPassword: context.forgotPassword,
    resetPassword: context.resetPassword,
    logout: context.logout,
    checkAuth: context.checkAuth,
  };
};
