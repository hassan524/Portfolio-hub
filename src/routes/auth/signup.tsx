import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { SocialAuthButtons } from "../../components/auth/SocialAuthButtons";
import { OrDivider } from "../../components/auth/OrDivider";
import { FormInput } from "../../components/auth/FormInput";
import { SubmitButton } from "../../components/auth/SubmitButton";
import { AuthFooter } from "../../components/auth/AuthFooter";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — PortfolioHub" },
      { name: "description", content: "Create your free PortfolioHub account. Build a portfolio you're proud of in minutes." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
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
    if (ok) navigate({ to: "/" });
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h2 className="font-display text-3xl sm:text-4xl leading-[0.95]">Create your account</h2>
        <p className="mt-3 text-sm text-ink-soft">Start building your portfolio in minutes.</p>
      </motion.div>

      <SocialAuthButtons onGoogleClick={signInWithGoogle} onFacebookClick={signInWithFacebook} />
      <OrDivider />

      <motion.form initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="space-y-4" onSubmit={handleSubmit}>
        <FormInput label="Full name" icon={<User className="h-4 w-4" />} type="text" placeholder="Hassan Mughal" value={fullName} onChange={setFullName} />
        <FormInput label="Email address" icon={<Mail className="h-4 w-4" />} type="email" placeholder="you@example.com" value={email} onChange={setEmail} />

        <FormInput
          label="Password"
          icon={<Lock className="h-4 w-4" />}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          trailingAction={
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-ink-soft hover:text-ink transition-colors cursor-pointer">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <SubmitButton loading={loading}>{loading ? "Creating account..." : "Create free account"}</SubmitButton>
      </motion.form>

      <AuthFooter mode="signup" />
    </>
  );
}