
import { Credentials, AdminData } from "../types/admin";
import { apiClient } from "./apiClient";
import env from "@/config/env";

// Admin Authentication
export const adminSignup = async (credentials: Credentials) => {
  const response = await apiClient.post(env.ENDPOINTS.AUTH.SIGNUP, credentials);
  
  if (response.data.token) {
    localStorage.setItem(env.ADMIN_TOKEN_NAME, response.data.token);
    localStorage.setItem(env.ADMIN_USER_NAME, JSON.stringify(response.data.admin));
  }
  
  return response.data;
};

export const adminLogin = async (credentials: Credentials) => {
  const response = await apiClient.post(env.ENDPOINTS.AUTH.LOGIN, credentials);
  
  if (response.data.token) {
    localStorage.setItem(env.ADMIN_TOKEN_NAME, response.data.token);
    localStorage.setItem(env.ADMIN_USER_NAME, JSON.stringify(response.data.admin));
  }
  
  return response.data;
};

export const adminLogout = async () => {
  const response = await apiClient.post(env.ENDPOINTS.AUTH.LOGOUT);
  localStorage.removeItem(env.ADMIN_TOKEN_NAME);
  localStorage.removeItem(env.ADMIN_USER_NAME);
  return response.data;
};

export const verifyAdmin = async () => {
  try {
    const response = await apiClient.get(env.ENDPOINTS.AUTH.VERIFY);
    return { admin: response.data.admin, isAuthenticated: true };
  } catch (error) {
    localStorage.removeItem(env.ADMIN_TOKEN_NAME);
    localStorage.removeItem(env.ADMIN_USER_NAME);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  const response = await apiClient.post(env.ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  return response.data;
};

export const verifyPasswordResetToken = async (token: string) => {
  const response = await apiClient.get(`${env.ENDPOINTS.AUTH.VERIFY_RESET_TOKEN}?token=${token}`);
  return response.data;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await apiClient.post(env.ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
  return response.data;
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  const response = await apiClient.post(env.ENDPOINTS.AUTH.CHANGE_PASSWORD, { currentPassword, newPassword });
  return response.data;
};

export const verifyPasswordChange = async () => {
  const response = await apiClient.get(env.ENDPOINTS.AUTH.VERIFY_PASSWORD_CHANGE);
  return response.data;
};

// Admin Profile Management
export const getAdminProfile = async () => {
  const response = await apiClient.get(env.ENDPOINTS.PROFILE.GET);
  return response.data;
};

export const updateAdminProfile = async (profileData: Partial<AdminData>) => {
  const response = await apiClient.put(env.ENDPOINTS.PROFILE.UPDATE, profileData);
  return response.data;
};
