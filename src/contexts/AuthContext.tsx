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

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  admin: Admin | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (admin: Admin) => void;
  logout: () => void;
  signup: (name: string, email: string, password: string, code: string) => Promise<void>;
  verifyCode: (email: string, code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminUser");
    if (storedAdmin) {
      try {
        const adminData = JSON.parse(storedAdmin) as Admin;
        setAdmin(adminData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored admin data:", error);
        localStorage.removeItem("adminUser");
      }
    }
    
    const checkAuthStatus = async () => {
      try {
        const adminData = await verifyAdmin();
        console.log("Admin verification data:", adminData);
        if (adminData && adminData.admin_id) {
          setAdmin(adminData as Admin);
          setIsAuthenticated(true);
        } else {
          // If the API check fails but we have local data, keep using that
          const storedAdmin = localStorage.getItem("adminUser");
          if (!storedAdmin) {
            setAdmin(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error("Auth verification error:", error);
        // Don't clear local auth state on API error - this prevents logout when API is down
        const storedAdmin = localStorage.getItem("adminUser");
        if (!storedAdmin) {
          setAdmin(null);
          setIsAuthenticated(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (adminData: Admin) => {
    console.log("Setting admin data:", adminData);
    setAdmin(adminData);
    setIsAuthenticated(true);
    
    // Store admin data in localStorage for persistence
    if (adminData.admin_id) {
      localStorage.setItem("adminUser", JSON.stringify(adminData));
      localStorage.setItem("adminToken", "dummy-token"); // Store a token for apiClient
    }
    
    toast.success("Successfully logged in");
  };

  const logout = () => {
    setAdmin(null);
    setIsAuthenticated(false);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Successfully logged out");
  };
  
  // Added mock signup function
  const signup = async (name: string, email: string, password: string, code: string) => {
    setIsLoading(true);
    try {
      // In a real app, call API endpoint for signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };
  
  // Added mock verify code function
  const verifyCode = async (email: string, code: string) => {
    setIsLoading(true);
    try {
      // In a real app, call API endpoint for verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        signup,
        verifyCode
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
