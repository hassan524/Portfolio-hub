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
  align?: "left" | "center";
}

export function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
  containerClassName,
  align = "left",
}: PageShellProps) {
  const hasBanner = Boolean(eyebrow || title || subtitle);
  const centered = align === "center";

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {hasBanner && (
          <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={centered ? "text-center mx-auto" : undefined}
              >
                {eyebrow && (
                  <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-accent">
                    {eyebrow}
                  </span>
                )}
                {title && (
                  <h1 className="mt-2 font-display text-3xl md:text-4xl leading-tight tracking-tight">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p
                    className={`mt-3 max-w-2xl text-sm md:text-[15px] text-ink-soft leading-relaxed ${
                      centered ? "mx-auto" : ""
                    }`}
                  >
                    {subtitle}
                  </p>
                )}
              </motion.div>
            </div>
          </section>
        )}
        {children &&
          (hasBanner ? (
            <section
              className={containerClassName ?? "mx-auto max-w-5xl px-6 py-10 md:py-14"}
            >
              {children}
            </section>
          ) : (
            children
          ))}
      </main>
      <Footer />
    </div>
  );
}

export const SiteLayout = PageShell;

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-2xl space-y-6 text-sm leading-relaxed text-ink [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-0 [&_p]:text-ink-soft [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2">
      {children}
    </div>
  );
}
