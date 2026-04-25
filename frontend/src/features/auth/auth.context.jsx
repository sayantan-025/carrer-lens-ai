import { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as authApi from "./services/auth.api";
import { setGlobalAuthData } from "./api/axios-instance";
import { useToast } from "../../context/toast-context";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const { showErrorToast } = useToast();

  const isAuthenticated = !!user;

  const logout = useCallback(async (reason) => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      setUser(null);
      setAccessToken(null);
      setGlobalAuthData(null, null, null);
      setIsLoading(false);
      
      if (reason === "SESSION_EXPIRED") {
        showErrorToast("Your session has expired. Please log in again.");
      }
    }
  }, [showErrorToast]);

  const updateAuthData = useCallback((user, token) => {
    setUser(user);
    setAccessToken(token);
    setGlobalAuthData(token, setAccessToken, logout);
  }, [logout]);

  const login = useCallback(async (credentials) => {
    try {
      const data = await authApi.login(credentials);
      updateAuthData(data.user, data.accessToken);
      return data;
    } catch (error) {
      throw error;
    }
  }, [updateAuthData]);

  const verifyOTP = useCallback(async (otpData) => {
    try {
      const data = await authApi.verifyOTP(otpData);
      updateAuthData(data.user, data.accessToken);
      return data;
    } catch (error) {
      throw error;
    }
  }, [updateAuthData]);

  const checkAuth = useCallback(async () => {
    // Silent check on mount
    setIsAuthChecking(true);
    try {
      // 1. Try refreshing the token (using the refreshToken cookie)
      const refreshData = await authApi.refreshToken();
      // 2. If successful, get the user profile
      const userData = await authApi.getCurrentUser();
      updateAuthData(userData.user, refreshData.accessToken);
    } catch (error) {
      // Silent fail - user is just not logged in
      setUser(null);
      setAccessToken(null);
    } finally {
      setIsAuthChecking(false);
    }
  }, [updateAuthData]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value = {
    user,
    setUser,
    accessToken,
    setAccessToken,
    isLoading,
    setIsLoading,
    isAuthChecking,
    isAuthenticated,
    login,
    register: authApi.register,
    verifyOTP,
    resendOTP: authApi.resendOTP,
    forgotPassword: authApi.forgotPassword,
    resetPassword: authApi.resetPassword,
    changePassword: authApi.changePassword,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
