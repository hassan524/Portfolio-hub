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
      <Header />
      <main className="flex-1">
        {hasBanner && (
          <section className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className={centered ? "text-center mx-auto" : undefined}
              >
                {eyebrow && (
                  <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-accent">
                    <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                    {eyebrow}
                  </span>
                )}
                {title && (
                  <h1 className="mt-3 font-display text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-[1.1] tracking-tight">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p
                    className={`mt-4 max-w-xl text-sm md:text-[15px] text-ink-soft leading-relaxed ${
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