import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import AuthLayout from "@/layouts/AuthLayout";

// Auth pages
import Register from "@/pages/auth/Register";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import Login from "@/pages/auth/Login";
import RequestPasswordReset from "@/pages/auth/RequestPasswordReset";
import ConfirmPasswordReset from "@/pages/auth/ConfirmPasswordReset";
import ChangePassword from "@/pages/auth/ChangePassword";
import AcceptInvite from "@/pages/auth/AcceptInvite";
import RequestEmailUpdate from "@/pages/auth/RequestEmailUpdate";
import ConfirmEmailUpdate from "@/pages/auth/ConfirmEmailUpdate";
import CreateMinor from "@/pages/auth/CreateMinor";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import PaymentVerify from "@/pages/admin/user_admin/PaymentVerify";

// Auth context + guards
// You must UNCOMMENT the import for GuestRoute and ProtectedRoute
// if you plan to use them, but since the goal is to REMOVE auth,
// you should leave them commented out and remove them from the JSX.
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/routing/ProtectedRoute";
import GuestRoute from "@/components/routing/GuestRoute"; // <-- This import was missing!

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>

      <TooltipProvider>
<AuthProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            {/* Public route */}
            <Route path="/" element={<Index />} />

            {/* All auth routes made public by removing GuestRoute/ProtectedRoute */}
            {/* The routes are now wrapped in AuthLayout for consistent styling/structure */}
            <Route element={<AuthLayout />}>
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/verify-email" element={<VerifyEmail />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/password-reset" element={<RequestPasswordReset />} />
              <Route path="/auth/password-reset/confirm" element={<ConfirmPasswordReset />} />
              <Route path="/auth/accept-invite" element={<AcceptInvite />} />
              <Route path="/auth/password/change" element={<ChangePassword />} />
              <Route path="/auth/email/update" element={<RequestEmailUpdate />} />
              <Route path="/auth/email/update/confirm" element={<ConfirmEmailUpdate />} />
              <Route path="/auth/minors" element={<CreateMinor />} />
              <Route path="/wallet/verify" element={<PaymentVerify />} />
            </Route>

            {/* Example: Dashboard (now public) */}
            {/* If the dashboard also needs AuthLayout, move it inside the AuthLayout Route */}
            <Route path="/dashboard" element={<AdminDashboard />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
</AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>
);

export default App;
