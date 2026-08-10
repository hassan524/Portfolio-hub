import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X, LayoutDashboard, ChevronRight } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  const { profile, session, signOut, authUser } = useAppContext();
  const navigate = useNavigate();

  const userId = authUser?.id || profile?.id || "";
  const portfoliosUrl = userId ? `/portfolios?userId=${encodeURIComponent(userId)}` : "/portfolios";

  const isLoggedIn = !!session;
  const hasPaid = profile?.is_paid;

  const NAV_LINKS = [
    { label: "Templates", to: "/templates" as const },
    { label: "Features", to: "/features" as const },
    ...(!hasPaid ? [{ label: "Pricing", to: "/pricing" as const }] : []),
    { label: "About", to: "/about" as const },
    { label: "Help", to: "/help" as const },
    { label: "Contact", to: "/contact" as const },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close avatar dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(e.target as Node)
      ) {
        setAvatarOpen(false);
      }
    }

    if (avatarOpen) {
      document.addEventListener("mousedown", handleClickOutside);

      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [avatarOpen]);

  const displayName =
    profile?.full_name || profile?.email || "User";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    setAvatarOpen(false);
    setOpen(false);

    await signOut();

    navigate("/");
  };

  return (
    <div
      className="sticky top-0 z-50 px-0 md:top-4 md:px-3 sm:md:px-4"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`flex h-14 w-full items-center justify-between border-b px-5 sm:px-6 backdrop-blur-xl transition-all duration-300
          md:mx-auto md:max-w-6xl md:w-auto md:rounded-2xl md:border-t md:border-x md:px-5 ${
            scrolled
              ? "bg-surface-elevated/90 border-border/50 md:bg-surface-elevated/40 md:shadow-lift"
              : "bg-surface-elevated/90 border-border/40 md:border-border/25 md:bg-surface-elevated/15 md:shadow-none"
          }`}
      >
        {/* ─── Logo ─── */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="Portflu"
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* ─── Desktop Nav ─── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="relative px-3.5 py-2 text-[13px] font-medium text-ink-soft hover:text-ink transition-colors rounded-lg hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ─── Desktop CTA ─── */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                to={portfoliosUrl}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-soft hover:text-ink transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
              >
                <LayoutDashboard className="h-4 w-4" />
                SaaS
              </Link>

              {/* Avatar dropdown */}
              <div ref={avatarRef} className="relative">
                <button
                  onClick={() => setAvatarOpen((v) => !v)}
                  className="group relative grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-white text-sm font-semibold shadow-soft hover:shadow-lift transition-all duration-300 hover:scale-105"
                >
                  {avatarLetter}
                </button>

                <AnimatePresence>
                  {avatarOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8,
                        scale: 0.95,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 8,
                        scale: 0.95,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute right-0 top-11 w-64 rounded-2xl border border-border/50 bg-surface-elevated/90 backdrop-blur-xl shadow-lift overflow-hidden z-50"
                    >
                      {/* User info */}
                      <div className="px-4 py-4 border-b border-border/50">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-white text-sm font-semibold shrink-0">
                            {avatarLetter}
                          </div>

                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate">
                              {profile?.full_name || "User"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="p-2">
                        <Link
                          to={portfoliosUrl}
                          onClick={() => setAvatarOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink hover:bg-white/5 transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4 text-ink-soft" />
                          SaaS
                        </Link>

                        <button
                          onClick={handleSignOut}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink hover:bg-white/5 transition-colors"
                        >
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-[13px] font-medium text-ink-soft hover:text-ink transition-colors px-3 py-2"
              >
                Sign in
              </Link>

              <Link
                to="/auth/signup"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[13px] font-semibold text-background hover:opacity-90 transition-all"
              >
                Get started

                <svg
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </>
          )}
        </div>

        {/* ─── Mobile Hamburger ─── */}
        <button
          className="md:hidden p-2 -mr-2 rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.header>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="md:hidden absolute left-0 right-0 top-full mx-auto w-full overflow-hidden border-b border-border/40 bg-surface-elevated/95 backdrop-blur-xl shadow-lift md:mt-2 md:max-w-6xl md:rounded-2xl md:border"
          >
            <div className="flex flex-col px-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.3,
                  }}
                  className={
                    i !== NAV_LINKS.length - 1
                      ? "border-b border-border/30"
                      : ""
                  }
                >
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-3 py-4 text-base font-semibold text-ink hover:text-ink-soft transition-colors"
                  >
                    {link.label}
                    <ChevronRight className="h-4 w-4 text-ink-soft" />
                  </Link>
                </motion.div>
              ))}

              <div className="mt-4 mb-3 px-3 space-y-3">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-3 pb-1">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-white text-xs font-semibold shrink-0">
                        {avatarLetter}
                      </div>

                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">
                          {displayName}
                        </div>
                      </div>
                    </div>

                    <Link
                      to={portfoliosUrl}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-semibold text-ink hover:bg-white/5 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      SaaS
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-soft"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center rounded-full border border-border px-4 py-3 text-sm font-semibold text-ink hover:bg-white/5 transition-colors"
                    >
                      Sign In
                    </Link>

                    <Link
                      to="/auth/signup"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-soft"
                    >
                      Get started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}