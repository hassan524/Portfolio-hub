import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { BrandPanel } from "@/components/individual/auth/BrandPanel";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* ────────── LEFT PANEL: Brand / Info ────────── */}
      <BrandPanel />

      {/* ────────── RIGHT PANEL: Auth Form ────────── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative"
      >
        {/* Subtle glow behind form */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(600px 400px at 50% 40%, oklch(0.94 0.08 60 / 0.3), transparent 70%)",
          }}
        />

        {/* Back to home — mobile */}
        <Link
          to="/"
          className="absolute top-6 left-6 lg:hidden inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        <div className="relative w-full max-w-[420px]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
