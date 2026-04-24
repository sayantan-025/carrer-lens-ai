import axiosInstance from "../api/axios-instance";

// register
export const register = async ({ userName, email, password }) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      userName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// verify-otp
export const verifyOTP = async ({ email, otp }) => {
  try {
    const response = await axiosInstance.post("/auth/verify-otp", { email, otp });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// resend-otp
export const resendOTP = async ({ email }) => {
  try {
    const response = await axiosInstance.post("/auth/resend-otp", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// login
export const login = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// refresh-token
export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post("/auth/refresh-token");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// forgot-password
export const forgotPassword = async ({ email }) => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// reset-password
export const resetPassword = async ({ email, otp, newPassword }) => {
  try {
    const response = await axiosInstance.post("/auth/reset-password", { email, otp, newPassword });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// change-password
export const changePassword = async ({ oldPassword: currentPassword, newPassword }) => {
  try {
    const response = await axiosInstance.post("/auth/change-password", { currentPassword, newPassword });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// logout
export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get current user
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/get-me");
    return response.data;
  } catch (error) {
    throw error;
  }
};
