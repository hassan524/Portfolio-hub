import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X, LayoutDashboard, Settings } from "lucide-react";
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

  // Public (logged-out) nav — full marketing set
  const PUBLIC_NAV_LINKS = [
    { label: "Home", to: "/" as const },
    // { label: "Templates", to: "/templates" as const }, 
    { label: "Features", to: "/features" as const },
    { label: "Pricing", to: "/pricing" as const },
    { label: "About", to: "/about" as const },
    { label: "Help", to: "/help" as const },
    { label: "Contact", to: "/contact" as const },
  ];

  // App (logged-in) nav — trimmed to what a user actually needs,
  // Pricing stays visible only if they haven't upgraded yet
  const APP_NAV_LINKS = [
    { label: "Home", to: "/" as const },
    { label: "Dashboard", to: portfoliosUrl },
    { label: "Templates", to: "/templates" as const },
    { label: "Features", to: "/features" as const },
    ...(!hasPaid ? [{ label: "Pricing", to: "/pricing" as const }] : []),
    { label: "About", to: "/about" as const },
    { label: "Help", to: "/help" as const },
    { label: "Contact", to: "/contact" as const },
  ];

  const NAV_LINKS = isLoggedIn ? APP_NAV_LINKS : PUBLIC_NAV_LINKS;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
      className="sticky top-0 z-50 w-full"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`relative flex h-16 w-full items-center justify-between px-5 sm:px-8 backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "bg-transparent shadow-lift"
            : "bg-transparent"
        }`}
      >
        {/* ─── Logo + Desktop Nav ─── */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/logo.png"
              alt="Portflu"
              className="h-8 w-auto object-contain"
            />
          </Link>

        </div>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                  end={link.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-lg px-3 py-2 text-[15px] font-medium transition-colors hover:bg-white/5 ${
                    isActive
                      ? "bg-white/10 text-ink"
                      : "text-ink-soft hover:text-ink"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
        </nav>

        {/* ─── Desktop CTA ─── */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
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
                      className="absolute right-0 top-11 w-64 rounded-2xl border border-border/50 bg-black backdrop-blur-xl shadow-lift overflow-hidden z-50"
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
                            {profile?.email && (
                              <div className="text-xs text-ink-soft truncate">
                                {profile.email}
                              </div>
                            )}
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
                          My Portfolios
                        </Link>

                        <Link
                          to="/settings"
                          onClick={() => setAvatarOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink hover:bg-white/5 transition-colors"
                        >
                          <Settings className="h-4 w-4 text-ink-soft" />
                          Settings
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
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex min-h-dvh flex-col overflow-y-auto bg-background md:hidden"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border/40 px-5">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex items-center"
              >
                <img
                  src="/logo.png"
                  alt="Portflu"
                  className="h-8 w-auto object-contain"
                />
              </Link>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 text-ink transition-colors hover:bg-white/5"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
              className="flex flex-1 flex-col px-5 pb-8 pt-6"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.3,
                  }}
                  className="border-b border-white/15"
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-1 py-5 text-lg font-semibold transition-colors ${
                        isActive
                          ? "text-ink"
                          : "text-ink hover:text-ink-soft"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <div className="mt-auto space-y-3 pt-10">
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

                    <button
                      onClick={handleSignOut}
                      className="w-full rounded-full border border-border px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/5"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center rounded-full border border-border px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/5"
                    >
                      Sign In
                    </Link>

                    <Link
                      to="/auth/signup"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-soft transition-opacity hover:opacity-90"
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