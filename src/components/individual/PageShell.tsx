import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sparkles } from "lucide-react";

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
    <div className="relative min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Subtle background ambient overlay */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))]" aria-hidden="true" />

      <Header />
      
      <main className="flex-1 relative">
        {hasBanner && (
          <section className="relative border-b border-border/60 bg-surface/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={centered ? "text-center max-w-3xl mx-auto space-y-3" : "max-w-3xl space-y-3"}
              >
                {eyebrow && (
                  <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${centered ? "justify-center" : ""}`}>
                    <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                    <span>{eyebrow}</span>
                  </div>
                )}
                {title && (
                  <h1 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.15] tracking-tight text-foreground">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p
                    className={`text-sm sm:text-base text-muted-foreground leading-relaxed font-normal ${
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
              className={containerClassName ?? "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12"}
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
    <div className="max-w-3xl space-y-6 text-sm sm:text-base leading-relaxed text-foreground/90 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:text-muted-foreground [&_li]:mb-2">
      {children}
    </div>
  );
}