
import { toast } from "@/components/ui/sonner";

// Mock service implementation for demo purposes
// In a real application, this would use axios or fetch to call your backend APIs

interface Credentials {
  email: string;
  password: string;
}

interface AdminData {
  id?: string;
  name?: string;
  email: string;
  role?: string;
  createdAt?: string;
}

interface ProductData {
  id?: string;
  name: string;
  description: string;
  price: number;
  featured?: boolean;
  imageUrl?: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface OrderData {
  id: string;
  userId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface MetricData {
  id?: string;
  name: string;
  value: number;
  date: string;
}

// Mock data
const mockAdmins: AdminData[] = [
  { id: "1", name: "Admin User", email: "admin@example.com", role: "admin", createdAt: "2023-01-01" },
  { id: "2", name: "Editor User", email: "editor@example.com", role: "editor", createdAt: "2023-02-15" }
];

const mockProducts: ProductData[] = [
  { id: "1", name: "Premium Digital Package", description: "Full suite of digital templates", price: 99.99, featured: true, imageUrl: "/placeholder.svg" },
  { id: "2", name: "Business Strategy Guide", description: "Complete business strategy toolkit", price: 49.99, featured: true, imageUrl: "/placeholder.svg" },
  { id: "3", name: "Social Media Templates", description: "20 premium social media templates", price: 29.99, featured: false, imageUrl: "/placeholder.svg" }
];

const mockUsers: UserData[] = [
  { id: "1", name: "John Doe", email: "john@example.com", createdAt: "2023-01-10" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", createdAt: "2023-02-05" },
  { id: "3", name: "Robert Johnson", email: "robert@example.com", createdAt: "2023-03-15" }
];

const mockOrders: OrderData[] = [
  { id: "1", userId: "1", products: [{ productId: "1", quantity: 1, price: 99.99 }], totalAmount: 99.99, status: "completed", createdAt: "2023-03-10" },
  { id: "2", userId: "2", products: [{ productId: "2", quantity: 1, price: 49.99 }], totalAmount: 49.99, status: "processing", createdAt: "2023-03-18" },
  { id: "3", userId: "3", products: [{ productId: "3", quantity: 2, price: 29.99 }], totalAmount: 59.98, status: "completed", createdAt: "2023-03-20" }
];

const mockMetrics: MetricData[] = [
  { id: "1", name: "sales", value: 15000, date: "2023-03-01" },
  { id: "2", name: "users", value: 120, date: "2023-03-01" },
  { id: "3", name: "orders", value: 45, date: "2023-03-01" },
  { id: "4", name: "sales", value: 18000, date: "2023-04-01" },
  { id: "5", name: "users", value: 150, date: "2023-04-01" },
  { id: "6", name: "orders", value: 60, date: "2023-04-01" }
];

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Admin Authentication
export const adminSignup = async (credentials: Credentials) => {
  await delay(1000);
  const existingAdmin = mockAdmins.find(admin => admin.email === credentials.email);
  if (existingAdmin) {
    throw new Error("Admin with this email already exists");
  }
  
  const newAdmin = {
    id: (mockAdmins.length + 1).toString(),
    name: "New Admin",
    email: credentials.email,
    role: "admin",
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  mockAdmins.push(newAdmin);
  localStorage.setItem("adminToken", "mock-jwt-token");
  localStorage.setItem("adminUser", JSON.stringify(newAdmin));
  
  return { admin: newAdmin, token: "mock-jwt-token" };
};

export const adminLogin = async (credentials: Credentials) => {
  await delay(1000);
  const admin = mockAdmins.find(admin => admin.email === credentials.email);
  
  if (!admin) {
    throw new Error("Invalid credentials");
  }
  
  localStorage.setItem("adminToken", "mock-jwt-token");
  localStorage.setItem("adminUser", JSON.stringify(admin));
  
  return { admin, token: "mock-jwt-token" };
};

export const adminLogout = async () => {
  await delay(500);
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
  return { success: true };
};

export const verifyAdmin = async () => {
  await delay(500);
  const token = localStorage.getItem("adminToken");
  const adminUser = localStorage.getItem("adminUser");
  
  if (!token || !adminUser) {
    throw new Error("Not authenticated");
  }
  
  return { admin: JSON.parse(adminUser), isAuthenticated: true };
};

// Admin Management
export const getAdmins = async () => {
  await delay(800);
  return { admins: mockAdmins };
};

export const getAdminById = async (id: string) => {
  await delay(800);
  const admin = mockAdmins.find(admin => admin.id === id);
  
  if (!admin) {
    throw new Error("Admin not found");
  }
  
  return { admin };
};

export const updateAdmin = async (id: string, data: Partial<AdminData>) => {
  await delay(1000);
  const adminIndex = mockAdmins.findIndex(admin => admin.id === id);
  
  if (adminIndex === -1) {
    throw new Error("Admin not found");
  }
  
  mockAdmins[adminIndex] = { ...mockAdmins[adminIndex], ...data };
  return { admin: mockAdmins[adminIndex] };
};

export const deleteAdmin = async (id: string) => {
  await delay(1000);
  const adminIndex = mockAdmins.findIndex(admin => admin.id === id);
  
  if (adminIndex === -1) {
    throw new Error("Admin not found");
  }
  
  mockAdmins.splice(adminIndex, 1);
  return { success: true };
};

// Homepage Products Management
export const getFeaturedProducts = async () => {
  await delay(800);
  const featured = mockProducts.filter(product => product.featured);
  return { products: featured };
};

export const getAllProducts = async () => {
  await delay(800);
  return { products: mockProducts };
};

export const postProductToHomepage = async (productData: ProductData) => {
  await delay(1000);
  const newProduct = {
    ...productData,
    id: (mockProducts.length + 1).toString(),
    featured: true
  };
  
  mockProducts.push(newProduct);
  return { product: newProduct };
};

export const updateProductOnHomepage = async (id: string, productData: Partial<ProductData>) => {
  await delay(1000);
  const productIndex = mockProducts.findIndex(product => product.id === id);
  
  if (productIndex === -1) {
    throw new Error("Product not found");
  }
  
  mockProducts[productIndex] = { ...mockProducts[productIndex], ...productData };
  return { product: mockProducts[productIndex] };
};

export const removeProductFromHomepage = async (id: string) => {
  await delay(1000);
  const productIndex = mockProducts.findIndex(product => product.id === id);
  
  if (productIndex === -1) {
    throw new Error("Product not found");
  }
  
  // Instead of deleting, just mark as not featured
  mockProducts[productIndex].featured = false;
  return { success: true };
};

// User Management
export const getUsers = async () => {
  await delay(800);
  return { users: mockUsers };
};

// Order Management
export const getOrders = async () => {
  await delay(800);
  return { orders: mockOrders };
};

// Analytics/Metrics
export const getMetrics = async () => {
  await delay(800);
  return { metrics: mockMetrics };
};

export const createMetric = async (metricData: MetricData) => {
  await delay(1000);
  const newMetric = {
    ...metricData,
    id: (mockMetrics.length + 1).toString()
  };
  
  mockMetrics.push(newMetric);
  return { metric: newMetric };
};

export const updateMetric = async (id: string, metricData: Partial<MetricData>) => {
  await delay(1000);
  const metricIndex = mockMetrics.findIndex(metric => metric.id === id);
  
  if (metricIndex === -1) {
    throw new Error("Metric not found");
  }
  
  mockMetrics[metricIndex] = { ...mockMetrics[metricIndex], ...metricData };
  return { metric: mockMetrics[metricIndex] };
};

export const deleteMetric = async (id: string) => {
  await delay(1000);
  const metricIndex = mockMetrics.findIndex(metric => metric.id === id);
  
  if (metricIndex === -1) {
    throw new Error("Metric not found");
  }
  
  mockMetrics.splice(metricIndex, 1);
  return { success: true };
};

// Error wrapper for API calls
export const apiWrapper = async (apiCall: () => Promise<any>, successMessage?: string) => {
  try {
    const result = await apiCall();
    if (successMessage) {
      toast.success(successMessage);
    }
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    toast.error(message);
    throw error;
  }
};
