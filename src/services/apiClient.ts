
import axios from "axios";
import { toast } from "@/lib/toast";

const apiClient = axios.create({
  baseURL: "/", // Adjust if your API is hosted elsewhere
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add token to the request if it exists
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle authentication errors
    if (response && response.status === 401) {
      // Clear token and user data
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      
      // Redirect to login if not already there
      if (!window.location.pathname.includes("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }
    
    // Format error message for toast
    const errorMessage = response?.data?.message || error.message || "An error occurred";
    toast.error(errorMessage);
    
    return Promise.reject(error);
  }
);

export { apiClient };
