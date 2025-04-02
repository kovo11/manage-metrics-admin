import { Credentials, AdminData } from "../types/admin";
import { apiClient } from "./apiClient";
import env from "@/config/env";

// Admin Authentication
export const adminSignup = async (credentials: Credentials) => {
  const response = await apiClient.post('/api/admin-signup', credentials);
  
  if (response.data.token) {
    localStorage.setItem(env.ADMIN_TOKEN_NAME, response.data.token);
    localStorage.setItem(env.ADMIN_USER_NAME, JSON.stringify(response.data.admin));
  }
  
  return response.data;
};

export const adminLogin = async (credentials: Credentials) => {
  const response = await apiClient.post('/api/admin-login', credentials);
  
  if (response.data.token) {
    localStorage.setItem(env.ADMIN_TOKEN_NAME, response.data.token);
    localStorage.setItem(env.ADMIN_USER_NAME, JSON.stringify(response.data.admin));
  }
  
  return response.data;
};

export const adminLogout = async () => {
  const response = await apiClient.post('/api/admin-logout');
  localStorage.removeItem(env.ADMIN_TOKEN_NAME);
  localStorage.removeItem(env.ADMIN_USER_NAME);
  return response.data;
};

export const verifyAdmin = async () => {
  try {
    const response = await apiClient.get('/api/verifyAdmin');
    return { admin: response.data.admin, isAuthenticated: true };
  } catch (error) {
    localStorage.removeItem(env.ADMIN_TOKEN_NAME);
    localStorage.removeItem(env.ADMIN_USER_NAME);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  const response = await apiClient.post('/api/admin-forgot-password', { email });
  return response.data;
};

export const verifyPasswordResetToken = async (token: string) => {
  const response = await apiClient.get(`/api/verifyAdminPasswordReset?token=${token}`);
  return response.data;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await apiClient.post('/api/approve-admin-forgot-password', { token, newPassword });
  return response.data;
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  const response = await apiClient.post('/api/admin-change-password', { currentPassword, newPassword });
  return response.data;
};

export const verifyPasswordChange = async () => {
  const response = await apiClient.get('/api/verifyAdminPasswordChange');
  return response.data;
};

// Admin Profile Management
export const getAdminProfile = async () => {
  const response = await apiClient.get('/api/admin/profile');
  return response.data;
};

export const updateAdminProfile = async (profileData: Partial<AdminData>) => {
  const response = await apiClient.put('/api/admin/profile', profileData);
  return response.data;
};
