import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  children: string;
  loading: boolean;
}

export function SubmitButton({ children }: SubmitButtonProps) {
  return (
    <motion.button
      type="submit"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-3.5 text-sm font-semibold shadow-lift hover:opacity-90 transition-all cursor-pointer"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </motion.button>
  );
}
