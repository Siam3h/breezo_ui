import { StrictMode, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner"; // ✅ Add this import
import LoadingScreen from "@/components/LoadingScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Create a QueryClient instance
const queryClient = new QueryClient();

// Lazy load route components
const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const Register = lazy(() => import("@/pages/auth/Register"));
const VerifyEmail = lazy(() => import("@/pages/auth/VerifyEmail"));
const Login = lazy(() => import("@/pages/auth/Login"));
const RequestPasswordReset = lazy(
  () => import("@/pages/auth/RequestPasswordReset")
);
const ConfirmPasswordReset = lazy(
  () => import("@/pages/auth/ConfirmPasswordReset")
);
const ChangePassword = lazy(() => import("@/pages/auth/ChangePassword"));
const AcceptInvite = lazy(() => import("@/pages/auth/AcceptInvite"));
const RequestEmailUpdate = lazy(
  () => import("@/pages/auth/RequestEmailUpdate")
);
const ConfirmEmailUpdate = lazy(
  () => import("@/pages/auth/ConfirmEmailUpdate")
);
const CreateMinor = lazy(() => import("@/pages/auth/CreateMinor"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const PaymentVerify = lazy(
  () => import("@/pages/admin/user_admin/PaymentVerify")
);

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route element={<AuthLayout />}>
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/verify-email" element={<VerifyEmail />} />
                <Route path="/auth/login" element={<Login />} />
                <Route
                  path="/auth/password-reset"
                  element={<RequestPasswordReset />}
                />
                <Route
                  path="/auth/password-reset/confirm"
                  element={<ConfirmPasswordReset />}
                />
                <Route path="/auth/accept-invite" element={<AcceptInvite />} />
                <Route
                  path="/auth/password/change"
                  element={<ChangePassword />}
                />
                <Route
                  path="/auth/email/update"
                  element={<RequestEmailUpdate />}
                />
                <Route
                  path="/auth/email/update/confirm"
                  element={<ConfirmEmailUpdate />}
                />
                <Route path="/auth/minors" element={<CreateMinor />} />
                <Route path="/wallet/verify" element={<PaymentVerify />} />
              </Route>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster
            position="top-center"
            expand={false}
            closeButton
            duration={4000} // how long the toast stays (ms)
            visibleToasts={3} // optional: limits concurrent toasts
            toastOptions={{
              style: {
                background: "#ffffff",
                border: "2px solid #ff8b13",
                color: "#222",
                fontFamily: "Lexend, sans-serif",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              },
              className: "font-lexend text-sm",
            }}
            // ✅ Adds a progress bar that fills out as the toast is about to close
            richColors
            invert={false}
          />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

export default App;
