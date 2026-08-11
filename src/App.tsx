import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { ConfirmationProvider } from "@/context/ConfirmationContext";
import { LandingPage } from "@/components/individual/home/LandingPage";
import { AboutPage } from "@/components/individual/about/AboutPage";
import { ContactPage } from "@/components/individual/contact/ContactPage";
import { CookiesPage } from "@/components/individual/cookies/CookiesPage";
import { DashboardPage } from "@/components/individual/dashboard/DashboardPage";
import { HelpPage } from "@/components/individual/help/HelpPage";
import { PortfoliosPage } from "./components/individual/portfolios/PortfoliosPage";
import { PrivacyPage } from "@/components/individual/privacy/PrivacyPage";
import { RefundPage } from "@/components/individual/refund/RefundPage";
import { SocialRedirectPage } from "@/components/individual/social/SocialRedirectPage";
import { StatusPage } from "@/components/individual/status/StatusPage";
import { TemplatesPage } from "@/components/individual/templates/TemplatesPage";
import { TermsPage } from "@/components/individual/terms/TermsPage";
import { PricingPage } from "@/components/individual/pricing/PricingPage";
import { LoginPage } from "@/components/individual/auth/LoginPage";
import { SignupPage } from "@/components/individual/auth/SignupPage";
import { useAppContext } from "@/context/AppContext";
import { ScrollToTop } from "./components/common/ScrollToTop";

const queryClient = new QueryClient();

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

/**
 * Gate for pages that require an active session — dashboard, portfolios,
 * templates. Anyone without a session gets bounced to login instead of
 * seeing the page flash before redirecting. The current location is
 * passed along in state so LoginPage/SignupPage can send them back to
 * exactly where they were trying to go once they sign in.
 */
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, isInitializing } = useAppContext();
  const location = useLocation();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname + location.search }} />;
  }

  return <>{children}</>;
}

/**
 * Gate for auth-only pages — login, signup. A user who's already signed
 * in has no reason to see these, so send them straight to the destination or dashboard.
 */
function GuestRoute({ children }: { children: ReactNode }) {
  const { session, isInitializing } = useAppContext();
  const location = useLocation();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (session) {
    const from = (location.state as { from?: string })?.from || "/portfolios";
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
}

function AuthRoute({ children }: { children: ReactNode }) {
  return (
    <GuestRoute>
     {children}
    </GuestRoute>
  );
}

/**
 * Gate for pricing page — if a user is logged in and has already paid (is_paid === true),
 * prevent them from accessing the pricing page and redirect them to dashboard.
 */
function PricingRoute({ children }: { children: ReactNode }) {
  const { session, profile, isInitializing } = useAppContext();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (session && profile?.is_paid) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function SocialRoute() {
  const params = useParams();
  return <SocialRedirectPage splat={params["*"] ?? ""} />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ConfirmationProvider>
          <BrowserRouter>
          <ScrollToTop />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/:portfolioId"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/help" element={<HelpPage />} />
              <Route
                path="/portfolios"
                element={
                  <ProtectedRoute>
                    <PortfoliosPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/refunds" element={<RefundPage />} />
              <Route path="/status" element={<StatusPage />} />
              <Route
                path="/templates"
                element={
                  <ProtectedRoute>
                    <TemplatesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pricing"
                element={
                  <PricingRoute>
                    <PricingPage />
                  </PricingRoute>
                }
              />
              <Route path="/templates/:slug" element={<Navigate to="/templates" replace />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route
                path="/auth"
                element={
                  <AuthRoute>
                    <LoginPage />
                  </AuthRoute>
                }
              />
              <Route
                path="/auth/login"
                element={
                  <AuthRoute>
                    <LoginPage />
                  </AuthRoute>
                }
              />
              <Route
                path="/auth/signup"
                element={
                  <AuthRoute>
                    <SignupPage />
                  </AuthRoute>
                }
              />
              <Route path="/social/*" element={<SocialRoute />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </ConfirmationProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}