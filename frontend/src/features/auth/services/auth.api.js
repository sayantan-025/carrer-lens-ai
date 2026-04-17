import axios from "axios";

const api = axios.create({
  baseURL: "https://carrer-lens-ai.onrender.com",
  withCredentials: true,
});

// register

export const register = async ({ userName, email, password }) => {
  try {
    const response = await api.post("/api/auth/register", {
      userName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// login

export const login = async ({ email, password }) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// logout

export const logout = async () => {
  try {
    const response = await api.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// get current user

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (error) {
    console.error("Get current user error:", error);
  }
};
