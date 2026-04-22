import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

let currentAccessToken = null;
let logoutHandler = null;
let setAccessTokenHandler = null;

/**
 * Updates the token used by the interceptor
 */
export const setGlobalAuthData = (token, setAccessToken, logout) => {
  currentAccessToken = token;
  if (setAccessToken) setAccessTokenHandler = setAccessToken;
  if (logout) logoutHandler = logout;
};

/**
 * Request interceptor to attach token
 */
axiosInstance.interceptors.request.use(
  (config) => {
    if (currentAccessToken) {
      config.headers.Authorization = `Bearer ${currentAccessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor for token refresh
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Use code: "TOKEN_EXPIRED" from backend to be precise
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Use standard axios for refresh to avoid interceptor loop if baseURL is inconsistent
        // but since we have a proxy, /api/auth/refresh-token is correct
        const refreshRes = await axios.post("/api/auth/refresh-token", {}, { withCredentials: true });
        const { accessToken: newAccessToken } = refreshRes.data;

        if (setAccessTokenHandler) {
          setAccessTokenHandler(newAccessToken);
        }
        
        currentAccessToken = newAccessToken;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (logoutHandler) {
          logoutHandler();
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
