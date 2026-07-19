import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { SiteLayout } from "./Layout";

export function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {eyebrow && (
              <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-ink-soft">
                {eyebrow}
              </span>
            )}
            <h1 className="mt-3 font-display text-5xl md:text-7xl leading-[0.95]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-6 max-w-2xl text-lg text-ink-soft leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </section>
      {children && (
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">{children}</section>
      )}
    </SiteLayout>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-2xl space-y-5 text-[15px] leading-[1.75] text-ink [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-2 [&_p]:text-ink-soft [&_a]:underline">
      {children}
    </div>
  );
}
