import axios from "axios";
import { refreshAccessToken } from "../Utils/RefreshToken/refreshAccessToken";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // Your API base URL
  withCredentials: true, // Ensure credentials (cookies) are sent
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Axios response interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Pass successful responses as they are
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // console.log("getting inside the axiosinterceptors error block")
      originalRequest._retry = true;

      //   const newAccessToken = await refreshAccessToken({ userType:"admin" });

      const userType = originalRequest.userType || "admin"; // Default to "admin" if not specified
      const newAccessToken = await refreshAccessToken({ userType }); // Pass the userType

      // console.log(" axiosinterceptors new accessToken", newAccessToken)
      if (newAccessToken) {
        // Set the new access token in the request headers
        // originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // console.log("retring the original request form axiosinterceptors")
        return axiosInstance(originalRequest); // Retry the original request
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;