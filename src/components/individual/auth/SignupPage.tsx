// SignupPage.tsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { signupSchema, type SignupInput } from "@/schemas/auth.schemas";

type FieldErrors = Partial<Record<keyof SignupInput | "auth", string>>;

export function SignupPage() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, signInWithFacebook, error, clearError } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const clearFieldError = (field: keyof SignupInput) => {
    clearError();
    setFieldErrors((prev) => {
      if (!prev[field] && !prev.auth) return prev;
      const next = { ...prev };
      delete next[field];
      delete next.auth;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const result = signupSchema.safeParse({ fullName, email, password });
    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof SignupInput;
        if (!errors[field]) errors[field] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);
    const { success, error: signUpError } = await signUp(
      result.data.email,
      result.data.password,
      result.data.fullName
    );
    setIsSubmitting(false);

    if (success) {
      navigate("/templates");
      return;
    }

    setFieldErrors({
      email: signUpError ?? "Failed to create account. Please try again.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Autofill dark theme fix */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px oklch(0.21 0.016 135) inset !important;
          -webkit-text-fill-color: oklch(0.98 0.004 120) !important;
          border-color: oklch(1 0 0 / 12%) !important;
          caret-color: oklch(0.98 0.004 120);
        }
      `}</style>

      {/* Subtle gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(700px 400px at 50% -5%, oklch(0.44 0.12 130 / 0.13), transparent 70%)",
        }}
      />

      {/* ── Top nav ── */}
      <header className="relative z-10 w-full px-6 sm:px-10 py-4 flex items-center justify-between">
        <Link to="/">
          <img src="/logo.png" alt="Portflu" className="h-8 w-auto object-contain" />
        </Link>
        <Link
          to="/auth/login"
          className="text-sm text-ink-soft hover:text-ink transition-colors"
        >
          Already have an account?
        </Link>
      </header>

      {/* ── Main ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          {/* Logo + title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="Portflu" className="h-10 w-auto object-contain" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-ink-soft">
              By continuing you agree to our{" "}
              <Link to="/terms" className="underline underline-offset-2 hover:text-ink">Terms of Service</Link>{" "}
              and have read our{" "}
              <Link to="/privacy" className="underline underline-offset-2 hover:text-ink">Privacy Policy</Link>.
            </p>
          </div>

          {/* Split layout — form | OR | social */}
          <div className="flex flex-col sm:flex-row items-start gap-0 sm:gap-0">

            {/* ── Left: form ── */}
            <div className="w-full sm:flex-1">
              <form className="space-y-3" onSubmit={handleSubmit} noValidate>
                {/* Full name */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-ink-soft">Full name</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-ink-soft pointer-events-none">
                      <User className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => { setFullName(e.target.value); clearFieldError("fullName"); }}
                      placeholder="Hassan Mughal"
                      aria-invalid={!!fieldErrors.fullName}
                      className={`w-full rounded-lg border bg-surface-elevated pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                        fieldErrors.fullName
                          ? "border-red-500/60 focus:ring-red-500/20 bg-red-500/5"
                          : "border-white/10 focus:ring-foreground/15 focus:border-white/20"
                      }`}
                    />
                  </div>
                  {fieldErrors.fullName && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-medium">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      {fieldErrors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-ink-soft">Email address</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-ink-soft pointer-events-none">
                      <Mail className="h-4 w-4" />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
                      placeholder="you@example.com"
                      aria-invalid={!!fieldErrors.email}
                      className={`w-full rounded-lg border bg-surface-elevated pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                        fieldErrors.email
                          ? "border-red-500/60 focus:ring-red-500/20 bg-red-500/5"
                          : "border-white/10 focus:ring-foreground/15 focus:border-white/20"
                      }`}
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-medium">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-ink-soft">Password</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-ink-soft pointer-events-none">
                      <Lock className="h-4 w-4" />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); clearFieldError("password"); }}
                      placeholder="••••••••"
                      aria-invalid={!!fieldErrors.password}
                      className={`w-full rounded-lg border bg-surface-elevated pl-9 pr-9 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                        fieldErrors.password
                          ? "border-red-500/60 focus:ring-red-500/20 bg-red-500/5"
                          : "border-white/10 focus:ring-foreground/15 focus:border-white/20"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 text-ink-soft hover:text-ink transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500 font-medium">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                {error && !fieldErrors.email && (
                  <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {error}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.005 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-90 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin shrink-0" /><span>Creating account...</span></>
                  ) : (
                    <><span>Create free account</span><ArrowRight className="h-4 w-4" /></>
                  )}
                </motion.button>
              </form>
            </div>

            {/* ── OR divider ── */}
            <div className="flex sm:flex-col items-center justify-center w-full sm:w-auto my-5 sm:my-0 sm:mx-8 gap-3 sm:gap-0">
              <div className="flex-1 sm:flex-none sm:h-24 w-full sm:w-px bg-border" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft sm:my-3">or</span>
              <div className="flex-1 sm:flex-none sm:h-24 w-full sm:w-px bg-border" />
            </div>

            {/* ── Right: social ── */}
            <div className="w-full sm:flex-1 space-y-2">
              {/* Google */}
              <button
                type="button"
                onClick={signInWithGoogle}
                className="w-full flex items-center gap-3 rounded-lg border border-white/10 bg-surface-elevated px-4 py-2.5 text-sm font-medium hover:bg-surface hover:border-white/20 transition-all duration-200 cursor-pointer"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={signInWithFacebook}
                className="w-full flex items-center gap-3 rounded-lg border border-white/10 bg-surface-elevated px-4 py-2.5 text-sm font-medium hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-200 cursor-pointer"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Continue with Facebook</span>
              </button>
            </div>
          </div>

          {/* Bottom links */}
          <div className="mt-8 flex flex-col items-center gap-1.5">
            <Link
              to="/"
              className="text-sm text-ink-soft hover:text-ink transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}