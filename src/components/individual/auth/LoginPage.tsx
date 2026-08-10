// LoginPage.tsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { AuthBrandPanel } from "./ui/AuthBrandPanel";
import { loginSchema, type LoginInput } from "@/schemas/auth.schemas";

type FieldErrors = Partial<Record<keyof LoginInput, string>>;

export function LoginPage() {
  const navigate = useNavigate();
  const {
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    loading,
    error,
    clearError,
    preferredProvider,
  } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const rememberedGoogle = preferredProvider === "google";
  const rememberedFacebook = preferredProvider === "facebook";

  const clearFieldError = (field: keyof LoginInput) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LoginInput;
        if (!errors[field]) errors[field] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    const ok = await signIn(result.data.email, result.data.password);
    if (ok) navigate("/");
  };

  const GoogleButton = (
    <button
      type="button"
      onClick={signInWithGoogle}
      className={`group relative w-full flex items-center justify-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-medium transition-all duration-300 cursor-pointer ${
        rememberedGoogle
          ? "border-transparent bg-foreground text-background hover:opacity-90 shadow-lift"
          : "border-border bg-surface-elevated hover:bg-surface hover:border-border/80 hover:shadow-soft"
      }`}
    >
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
      <span>{rememberedGoogle ? "Continue with Google" : "Sign in with Google"}</span>
      {rememberedGoogle && (
        <span className="absolute right-4 text-[10px] font-semibold uppercase tracking-wide opacity-60">
          Last used
        </span>
      )}
      {!rememberedGoogle && (
        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0 transition-all duration-300 absolute right-4" />
      )}
    </button>
  );

  const FacebookButton = (
    <button
      type="button"
      onClick={signInWithFacebook}
      className={`group relative w-full flex items-center justify-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-medium transition-all duration-300 cursor-pointer ${
        rememberedFacebook
          ? "border-transparent bg-[#1877F2] text-white hover:opacity-90 shadow-lift"
          : "border-border bg-surface-elevated hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-soft"
      }`}
    >
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
      <span>{rememberedFacebook ? "Continue with Facebook" : "Sign in with Facebook"}</span>
      {rememberedFacebook && (
        <span className="absolute right-4 text-[10px] font-semibold uppercase tracking-wide opacity-70">
          Last used
        </span>
      )}
      {!rememberedFacebook && (
        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300 absolute right-4" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* ────────── LEFT: Form ────────── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(600px 400px at 50% 40%, oklch(0.94 0.08 60 / 0.3), transparent 70%)",
          }}
        />

        <Link
          to="/"
          className="absolute top-6 left-6 lg:hidden inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        <div className="relative w-full max-w-[420px]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="font-display text-3xl sm:text-4xl leading-[0.95]">
              {rememberedGoogle || rememberedFacebook ? "Welcome back" : "Welcome back"}
            </h2>
            <p className="mt-3 text-sm text-ink-soft">
              {rememberedGoogle
                ? "You last signed in with Google."
                : rememberedFacebook
                ? "You last signed in with Facebook."
                : "Sign in to continue where you left off."}
            </p>
          </motion.div>

          {/* Social auth — remembered provider shown first and highlighted */}
          <div className="mt-8 space-y-3">
            {rememberedFacebook ? (
              <>
                {FacebookButton}
                {GoogleButton}
              </>
            ) : (
              <>
                {GoogleButton}
                {FacebookButton}
              </>
            )}
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-ink-soft uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-4"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-soft">Email address</label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-ink-soft">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError("email");
                  }}
                  placeholder="you@example.com"
                  aria-invalid={!!fieldErrors.email}
                  className={`w-full rounded-xl border bg-surface-elevated pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 transition-colors ${
                    fieldErrors.email
                      ? "border-red-500/60 focus:ring-red-500/20"
                      : "border-border focus:ring-foreground/20"
                  }`}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-ink-soft">Password</label>
                <button
                  type="button"
                  onClick={() => navigate("/auth/forgot-password")}
                  className="text-xs text-ink-soft hover:text-ink transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-ink-soft">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldError("password");
                  }}
                  placeholder="••••••••"
                  aria-invalid={!!fieldErrors.password}
                  className={`w-full rounded-xl border bg-surface-elevated pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 transition-colors ${
                    fieldErrors.password
                      ? "border-red-500/60 focus:ring-red-500/20"
                      : "border-border focus:ring-foreground/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 text-ink-soft hover:text-ink transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {error && (
              <p className="flex items-center gap-1.5 text-sm text-red-500">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-3.5 text-sm font-semibold shadow-lift hover:opacity-90 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-ink-soft">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="font-medium text-ink hover:underline underline-offset-4">
              Create one — it's free
            </Link>
          </p>
          <p className="mt-6 text-center text-[11px] text-ink-soft/60 leading-relaxed">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="underline underline-offset-2 hover:text-ink-soft">Terms</Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline underline-offset-2 hover:text-ink-soft">Privacy Policy</Link>{" "}
            and{" "}
            <Link to="/refunds" className="underline underline-offset-2 hover:text-ink-soft">Refund Policy</Link>.
          </p>
        </div>
      </motion.div>

      {/* ────────── RIGHT: Brand panel ────────── */}
      <AuthBrandPanel />
    </div>
  );
}