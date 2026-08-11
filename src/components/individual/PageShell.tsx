import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";

export interface PageShellProps {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  containerClassName?: string;
}

export function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
  containerClassName,
}: PageShellProps) {
  const hasBanner = Boolean(eyebrow || title || subtitle);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {hasBanner && (
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
                {title && (
                  <h1 className="mt-3 font-display text-5xl md:text-7xl leading-[0.95]">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="mt-6 max-w-2xl text-lg text-ink-soft leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </motion.div>
            </div>
          </section>
        )}
        {children && (
          hasBanner ? (
            <section className={containerClassName ?? "mx-auto max-w-5xl px-6 py-16 md:py-20"}>
              {children}
            </section>
          ) : (
            children
          )
        )}
      </main>
      <Footer />
    </div>
  );
}

export const SiteLayout = PageShell;

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-2xl space-y-5 text-[15px] leading-[1.75] text-ink [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-2 [&_p]:text-ink-soft [&_a]:underline">
      {children}
    </div>
  );
}

