import { StrictMode, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { RideProvider } from "@/context/RideContext";
import { WalletProvider } from "@/context/WalletContext";
import { Toaster } from "sonner";
import LoadingScreen from "@/components/LoadingScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
const ResendEmailOTP = lazy(() => import("@/pages/auth/ResendEmailOTP"));

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RideProvider>
        <WalletProvider>
          <Router>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route element={<AuthLayout />}>
                  <Route path="/auth/register" element={<Register />} />
                  <Route path="/auth/verify-email" element={<VerifyEmail />} />
                  <Route path="/auth/resend" element={<ResendEmailOTP />} />
                  <Route path="/auth/login" element={<Login />} />
                  <Route
                    path="/auth/password-reset"
                    element={<RequestPasswordReset />}
                  />
                  <Route
                    path="/auth/password-reset/confirm"
                    element={<ConfirmPasswordReset />}
                  />
                  <Route
                    path="/auth/accept-invite"
                    element={<AcceptInvite />}
                  />
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
              duration={4000}
              visibleToasts={3}
              toastOptions={{
                style: {
                  background: "#ffffff",
                  borderRadius: "0px", // <-- No rounded corners
                  border: "none", // <-- No border line
                  color: "#222",
                  fontFamily: "Lexend, sans-serif",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  "--sonner-progress-bar-color": "black", // <-- Black loading bar
                },
                className: "font-lexend text-sm",
              }}
              richColors
              invert={false}
            />
          </Router>
        </RideProvider>
        </WalletProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

export default App;
