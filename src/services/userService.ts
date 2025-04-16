
import { delay } from "./utils/apiUtils";
import { mockUsers } from "./mockData";
import { API_BASE_URL } from "@/config/api";
import axios from "axios";

// Get all users
export const getAllUsers = async (): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data; // Assuming the response contains a `users` array
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (userId: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data; // Assuming the response contains the user object
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

// Update user profile
export const updateUser = async (userId: string, userData: any): Promise<any> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
    return response.data; // Assuming the response contains the updated user object
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

// Delete user account
export const deleteUser = async (userId: string): Promise<any> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
    return response.data; // Assuming the response confirms the deletion
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};
