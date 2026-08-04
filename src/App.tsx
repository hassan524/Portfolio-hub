import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { ConfirmationProvider } from "@/context/ConfirmationContext";
import { LandingPage } from "@/components/individual/home/LandingPage";
import { AboutPage } from "@/components/individual/about/AboutPage";
import { ContactPage } from "@/components/individual/contact/ContactPage";
import { CookiesPage } from "@/components/individual/cookies/CookiesPage";
import { DashboardPage } from "@/components/individual/dashboard/DashboardPage";
import { HelpPage } from "@/components/individual/help/HelpPage";
import { PortfoliosPage } from "@/components/individual/dashboard/PortfoliosPage";
import { PrivacyPage } from "@/components/individual/privacy/PrivacyPage";
import { RefundPage } from "@/components/individual/refund/RefundPage";
import { SocialRedirectPage } from "@/components/individual/social/SocialRedirectPage";
import { StatusPage } from "@/components/individual/status/StatusPage";
import { TemplatesPage } from "@/components/individual/templates/TemplatesPage";
import { TermsPage } from "@/components/individual/terms/TermsPage";
import { PricingPage } from "@/components/individual/pricing/PricingPage";
import { AuthLayout } from "@/components/individual/auth/AuthLayout";
import { LoginPage } from "@/components/individual/auth/LoginPage";
import { SignupPage } from "@/components/individual/auth/SignupPage";

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

function AuthRoute({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
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
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/portfolios" element={<PortfoliosPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/refund" element={<RefundPage />} />
              <Route path="/status" element={<StatusPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
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
