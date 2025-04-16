
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { verifyAdmin } from "@/services/authService";
import { toast } from "@/lib/toast";

interface Admin {
  admin_id: string;
  username: string;
  email: string;
  role: string;
  wallet_balance: number;
  created_at: string;
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

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const adminData = await verifyAdmin();
        console.log("Admin data:", adminData);
        if (adminData && adminData.admin_id) {
          setAdmin(adminData as Admin);
          setIsAuthenticated(true);
        } else {
          // If no valid admin data, make sure to set admin to null
          setAdmin(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth verification error:", error);
        setAdmin(null);
        setIsAuthenticated(false);
        // Changed from true to false - this was a bug
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

  const logout = () => {
    setAdmin(null);
    setIsAuthenticated(false);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Successfully logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated,
        isLoading,
        login,
        logout,
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
