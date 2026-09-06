import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { loginSchema, type LoginInput } from "@/schemas/auth.schemas";
import { Button } from "@/components/ui/button";
import { AuthInput } from "./AuthInput";

type FieldErrors = Partial<Record<keyof LoginInput | "auth", string>>;

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, signInWithFacebook, error, clearError, preferredProvider } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const rememberedGoogle = preferredProvider === "google";
  const rememberedFacebook = preferredProvider === "facebook";

  const clearFieldError = (field: keyof LoginInput) => {
    clearError();
    setFieldErrors((prev) => {
      if (!prev[field] && !prev.auth) return prev;
      const next = { ...prev };
      delete next[field];
      delete next.auth;
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
    setIsSubmitting(true);
    const { success, error: signInError } = await signIn(result.data.email, result.data.password);
    setIsSubmitting(false);
    if (success) {
      navigate("/templates");
      return;
    }
    const message = signInError ?? "Invalid email or password";
    setFieldErrors({ email: message, password: message });
  };

  const socialButtonClass = "group relative w-full flex items-center gap-3 rounded-md border-white/10 bg-surface-elevated px-4 py-2.5 text-sm font-medium hover:bg-surface hover:border-white/20";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <style>{`input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus{-webkit-box-shadow:0 0 0 1000px oklch(0.21 0.016 135) inset !important;-webkit-text-fill-color:oklch(0.98 0.004 120) !important;border-color:oklch(1 0 0 / 12%) !important;caret-color:oklch(0.98 0.004 120)}`}</style>
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(700px 400px at 50% -5%, oklch(0.44 0.12 130 / 0.13), transparent 70%)" }} />
      <header className="relative z-10 w-full px-4 sm:px-6 py-3 flex items-center">
        <Link to="/"><img src="/logo.png" alt="Portflu" className="h-7 w-auto object-contain" /></Link>
      </header>
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-8">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full max-w-4xl">
          <div className="text-center mb-5 sm:mb-10">
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Sign in to Portflu</h1>
            <p className="mt-2 text-sm text-ink-soft">Don&apos;t have an account? <Link to="/auth/signup" className="font-medium text-foreground underline underline-offset-2 hover:opacity-80">Sign up</Link></p>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-0">
            <div className="w-full md:flex-1">
              <form className="space-y-3" onSubmit={handleSubmit} noValidate>
                <div>
                  <label className="mb-1 block text-xs font-medium text-ink-soft">Email address</label>
                  <AuthInput type="email" value={email} onChange={(event) => { setEmail(event.target.value); clearFieldError("email"); }} placeholder="you@example.com" icon={<Mail className="h-4 w-4" />} error={fieldErrors.email} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-ink-soft">Password</label>
                  <AuthInput type={showPassword ? "text" : "password"} value={password} onChange={(event) => { setPassword(event.target.value); clearFieldError("password"); }} placeholder="••••••••" icon={<Lock className="h-4 w-4" />} error={fieldErrors.password !== fieldErrors.email ? fieldErrors.password : undefined} endAdornment={<Button type="button" onClick={() => setShowPassword((value) => !value)} variant="ghost" size="icon" className="h-8 w-8 text-ink-soft hover:bg-transparent hover:text-ink">{showPassword ? <EyeOff /> : <Eye />}</Button>} />
                </div>
                {error && !fieldErrors.email && <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium"><AlertCircle className="h-3.5 w-3.5 shrink-0" />{error}</p>}
                <Button type="button" variant="link" onClick={() => navigate("/auth/forgot-password")} className="h-auto p-0 text-xs text-ink-soft hover:text-ink">Forgot password?</Button>
                <Button type="submit" disabled={isSubmitting} className="h-9 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90">{isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin shrink-0" /><span>Signing in...</span></> : <><span>Sign in</span><ArrowRight className="h-4 w-4" /></>}</Button>
              </form>
            </div>
            <div className="flex md:flex-col items-center justify-center w-full md:w-auto my-4 md:my-0 md:mx-6 gap-3 md:gap-0"><div className="flex-1 md:flex-none h-px md:h-20 w-full md:w-px bg-border" /><span className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft md:my-3">or</span><div className="flex-1 md:flex-none h-px md:h-20 w-full md:w-px bg-border" /></div>
            <div className="w-full md:flex-1 space-y-3">
              <Button type="button" onClick={signInWithGoogle} variant="outline" className={socialButtonClass}><svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg><span>Continue with Google</span>{rememberedGoogle && <span className="ml-auto text-[9px] font-semibold uppercase tracking-wide opacity-60">Last used</span>}</Button>
              <Button type="button" onClick={signInWithFacebook} variant="outline" className={socialButtonClass}><svg className="h-4 w-4 shrink-0 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg><span>Continue with Facebook</span>{rememberedFacebook && <span className="ml-auto text-[9px] font-semibold uppercase tracking-wide opacity-70">Last used</span>}</Button>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center gap-1.5"><Link to="/" className="text-sm text-ink-soft hover:text-ink transition-colors">← Back to Home</Link></div>
        </motion.div>
      </main>
    </div>
  );
}
