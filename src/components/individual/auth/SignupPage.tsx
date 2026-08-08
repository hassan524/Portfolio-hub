// SignupPage.tsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { AuthBrandPanel } from "./AuthBrandPanel";

export function SignupPage() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, signInWithFacebook, loading, error, clearError } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const ok = await signUp(email, password, fullName);
    if (ok) navigate("/");
  };

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
            <h2 className="font-display text-3xl sm:text-4xl leading-[0.95]">Create your account</h2>
            <p className="mt-3 text-sm text-ink-soft">Start building your portfolio in minutes.</p>
          </motion.div>

          {/* Social auth */}
          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={signInWithGoogle}
              className="group relative w-full flex items-center justify-center gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-3.5 text-sm font-medium hover:bg-surface hover:border-border/80 hover:shadow-soft transition-all duration-300 cursor-pointer"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Continue with Google</span>
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0 transition-all duration-300 absolute right-4" />
            </button>

            <button
              type="button"
              onClick={signInWithFacebook}
              className="group relative w-full flex items-center justify-center gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-3.5 text-sm font-medium hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-soft transition-all duration-300 cursor-pointer"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Continue with Facebook</span>
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300 absolute right-4" />
            </button>
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
          >
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-soft">Full name</label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-ink-soft">
                  <User className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Hassan Mughal"
                  required
                  className="w-full rounded-xl border border-border bg-surface-elevated pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-soft">Email address</label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-ink-soft">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-border bg-surface-elevated pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-soft">Password</label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-ink-soft">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-border bg-surface-elevated pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 text-ink-soft hover:text-ink transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-3.5 text-sm font-semibold shadow-lift hover:opacity-90 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create free account"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-ink-soft">
            Already have an account?{" "}
            <Link to="/auth/login" className="font-medium text-ink hover:underline underline-offset-4">
              Sign in
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