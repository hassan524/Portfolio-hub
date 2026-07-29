import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { SocialAuthButtons } from "@/components/individual/auth/SocialAuthButtons";
import { OrDivider } from "@/components/individual/auth/OrDivider";
import { FormInput } from "@/components/individual/auth/FormInput";
import { SubmitButton } from "@/components/individual/auth/SubmitButton";
import { AuthFooter } from "@/components/individual/auth/AuthFooter";

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, signInWithFacebook, loading, error, clearError } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const ok = await signIn(email, password);
    if (ok) navigate("/");
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="font-display text-3xl sm:text-4xl leading-[0.95]">Welcome back</h2>
        <p className="mt-3 text-sm text-ink-soft">Sign in to continue where you left off.</p>
      </motion.div>

      <SocialAuthButtons onGoogleClick={signInWithGoogle} onFacebookClick={signInWithFacebook} />
      <OrDivider />

      <motion.form initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="space-y-4" onSubmit={handleSubmit}>
        <FormInput label="Email address" icon={<Mail className="h-4 w-4" />} type="email" placeholder="you@example.com" value={email} onChange={setEmail} />

        <FormInput
          label="Password"
          icon={<Lock className="h-4 w-4" />}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          labelAction={
            <button type="button" onClick={() => navigate("/auth/forgot-password")} className="text-xs text-ink-soft hover:text-ink transition-colors cursor-pointer">
              Forgot password?
            </button>
          }
          trailingAction={
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-ink-soft hover:text-ink transition-colors cursor-pointer">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <SubmitButton loading={loading}>{loading ? "Signing in..." : "Sign in"}</SubmitButton>
      </motion.form>

      <AuthFooter mode="login" />
    </>
  );
}
