
// This file contains only the updates needed for the AuthContext
// It will be merged with the existing AuthContext file

// Update imports to include adminLogout
import { verifyAdmin, adminLogout } from "@/services/authService";

// Update the AuthContext logout method to call adminLogout from the service
const logout = async () => {
  try {
    setIsLoading(true);
    await adminLogout(); // Use the API service to logout
    setIsAuthenticated(false);
    setAdmin(null);
    navigate('/admin/login');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    setIsLoading(false);
  }
};
