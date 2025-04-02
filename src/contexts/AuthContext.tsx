
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { verifyAdmin, adminLogout } from "@/services/authService";
import { toast } from "@/lib/toast";
import { useNavigate } from "react-router-dom";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (admin: Admin) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { admin } = await verifyAdmin();
        if (admin && admin.id) {
          setAdmin(admin as Admin);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setAdmin(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (admin: Admin) => {
    setAdmin(admin);
    setIsAuthenticated(true);
    toast.success("Successfully logged in");
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await adminLogout(); // Use the API service to logout
      setAdmin(null);
      setIsAuthenticated(false);
      toast.success("Successfully logged out");
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      setAdmin(null);
      setIsAuthenticated(false);
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
