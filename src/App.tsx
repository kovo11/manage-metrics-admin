
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Admin Auth pages
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";

// Admin Dashboard pages
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import OrdersPage from "./pages/OrdersPage";
import PaymentsPage from "./pages/PaymentsPage";
import CouponsPage from "./pages/CouponsPage";
import TicketsPage from "./pages/TicketsPage";
import TicketDetail from "./pages/TicketDetail";
import WalletPage from "./pages/WalletPage";
import ProfilePage from "./pages/ProfilePage";
import DigitalProductsPage from "./pages/DigitalProductsPage";
import HomepageManagementPage from "./pages/HomepageManagementPage";
import HomePage from "./pages/HomePage";

// Configure React Query with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Homepage route */}
            <Route path="/" element={<HomePage />} />
            
            {/* Admin Auth Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/reset-password" element={<ResetPassword />} />
            <Route path="/admin/change-password" element={<ChangePassword />} />

            {/* Redirect /admin to admin dashboard or login */}
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />

            {/* Protected Admin Routes wrapped in AdminLayout */}
            <Route path="/admin/dashboard" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="digital-products" element={<DigitalProductsPage />} />
              <Route path="homepage-management" element={<HomepageManagementPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="coupons" element={<CouponsPage />} />
              <Route path="tickets" element={<TicketsPage />} />
              <Route path="tickets/:ticketId" element={<TicketDetail />} />
              <Route path="wallet" element={<WalletPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
