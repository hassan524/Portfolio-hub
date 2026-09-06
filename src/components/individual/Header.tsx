import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Settings,
  ChevronDown,
  Sparkles,
  LayoutTemplate,
  HelpCircle,
  Info,
  Activity,
  FileText,
  ShieldCheck,
  PhoneCall,
  LogOut,
  ChevronRight,
  FolderKanban,
  User,
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Mobile accordion state
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({
    products: false,
    resources: false,
    company: false,
  });

  const avatarRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { profile, session, signOut, authUser } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = authUser?.id || profile?.id || "";
  const portfoliosUrl = userId ? `/portfolios?userId=${encodeURIComponent(userId)}` : "/portfolios";

  const isLoggedIn = !!session;
  const hasPaid = profile?.is_paid;

  // Handle scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll on mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null);
    setAvatarOpen(false);
    setOpen(false);
  }, [location.pathname]);

  // Close avatar dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    }
    if (avatarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [avatarOpen]);

  // Hover handlers for navigation dropdowns with graceful timeout
  const handleMouseEnter = (menuName: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const displayName = profile?.full_name || profile?.email || "User";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    setAvatarOpen(false);
    setOpen(false);
    await signOut();
    navigate("/");
  };

  // Nav Dropdown Data Configurations (Clean & Essential)
  const PRODUCTS_ITEMS = [
    {
      label: "Templates Gallery",
      description: "Explore customizable portfolio themes",
      to: "/templates",
      icon: LayoutTemplate,
    },
    {
      label: "Features",
      description: "Custom domains, themes & portfolio editor",
      to: "/features",
      icon: Sparkles,
    },
    ...(isLoggedIn
      ? [
          {
            label: "My Portfolios",
            description: "Manage and publish your portfolio sites",
            to: portfoliosUrl,
            icon: FolderKanban,
          },
        ]
      : []),
  ];

  const RESOURCES_ITEMS = [
    {
      label: "Help Center",
      description: "Guides, FAQs, and documentation",
      to: "/help",
      icon: HelpCircle,
    },
    {
      label: "Contact Support",
      description: "Get in touch with our team",
      to: "/contact",
      icon: PhoneCall,
    },
    {
      label: "Refund Policy",
      description: "Terms and guarantee details",
      to: "/refunds",
      icon: ShieldCheck,
    },
  ];

  const COMPANY_ITEMS = [
    {
      label: "About Us",
      description: "Learn about our story and mission",
      to: "/about",
      icon: Info,
    },
    {
      label: "Privacy Policy",
      description: "How we manage and protect data",
      to: "/privacy",
      icon: FileText,
    },
    {
      label: "Terms of Service",
      description: "Conditions and user agreement",
      to: "/terms",
      icon: FileText,
    },
  ];

  const toggleMobileAccordion = (key: string) => {
    setMobileExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="sticky top-0 z-50 w-full" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`relative flex h-16 w-full items-center justify-between px-5 sm:px-8 backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "bg-background/80 border-b border-border/40 shadow-lift"
            : "bg-background/50 border-b border-border/20"
        }`}
      >
        {/* ─── Brand Logo ─── */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group cursor-pointer">
            <img
              src="/logo.png"
              alt="Portflu"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* ─── SaaS Desktop Navigation Header ─── */}
        <nav className="hidden md:flex items-center gap-1.5">
          {/* Home Link */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors cursor-pointer ${
                isActive
                  ? "bg-white/10 text-ink"
                  : "text-ink-soft hover:text-ink hover:bg-white/5"
              }`
            }
          >
            Home
          </NavLink>

          {/* 1. Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("products")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors cursor-pointer ${
                activeDropdown === "products" ||
                ["/templates", "/features", "/portfolios"].some((path) =>
                  location.pathname.startsWith(path)
                )
                  ? "bg-white/10 text-ink"
                  : "text-ink-soft hover:text-ink hover:bg-white/5"
              }`}
            >
              <span>Products</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === "products" ? "rotate-180 text-ink" : "text-ink-soft"
                }`}
              />
            </button>

            <AnimatePresence>
              {activeDropdown === "products" && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-full pt-2 w-72 z-50"
                >
                  <div className="rounded-2xl border border-border/80 bg-surface p-2 shadow-lift">
                    <div className="space-y-0.5">
                      {PRODUCTS_ITEMS.map((item) => {
                        const IconComponent = item.icon;
                        const isCurrent = location.pathname === item.to;
                        return (
                          <Link
                            key={item.label}
                            to={item.to}
                            className={`group flex items-start gap-3 rounded-xl p-2.5 transition-colors cursor-pointer ${
                              isCurrent
                                ? "bg-white/10 text-ink"
                                : "hover:bg-white/5 text-ink-soft hover:text-ink"
                            }`}
                          >
                            <IconComponent className="h-4 w-4 text-ink-soft group-hover:text-ink shrink-0 mt-0.5 transition-colors" />
                            <div className="min-w-0 flex-1">
                              <span className="text-sm font-medium text-ink group-hover:text-foreground">
                                {item.label}
                              </span>
                              <p className="text-xs text-ink-soft line-clamp-1 mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("resources")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors cursor-pointer ${
                activeDropdown === "resources" ||
                ["/help", "/contact", "/refunds"].some((path) =>
                  location.pathname.startsWith(path)
                )
                  ? "bg-white/10 text-ink"
                  : "text-ink-soft hover:text-ink hover:bg-white/5"
              }`}
            >
              <span>Resources</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === "resources" ? "rotate-180 text-ink" : "text-ink-soft"
                }`}
              />
            </button>

            <AnimatePresence>
              {activeDropdown === "resources" && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-full pt-2 w-72 z-50"
                >
                  <div className="rounded-2xl border border-border/80 bg-surface p-2 shadow-lift">
                    <div className="space-y-0.5">
                      {RESOURCES_ITEMS.map((item) => {
                        const IconComponent = item.icon;
                        const isCurrent = location.pathname === item.to;
                        return (
                          <Link
                            key={item.label}
                            to={item.to}
                            className={`group flex items-start gap-3 rounded-xl p-2.5 transition-colors cursor-pointer ${
                              isCurrent
                                ? "bg-white/10 text-ink"
                                : "hover:bg-white/5 text-ink-soft hover:text-ink"
                            }`}
                          >
                            <IconComponent className="h-4 w-4 text-ink-soft group-hover:text-ink shrink-0 mt-0.5 transition-colors" />
                            <div className="min-w-0 flex-1">
                              <span className="text-sm font-medium text-ink group-hover:text-foreground">
                                {item.label}
                              </span>
                              <p className="text-xs text-ink-soft line-clamp-1 mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Company Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("company")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors cursor-pointer ${
                activeDropdown === "company" ||
                ["/about", "/privacy", "/terms"].some((path) =>
                  location.pathname.startsWith(path)
                )
                  ? "bg-white/10 text-ink"
                  : "text-ink-soft hover:text-ink hover:bg-white/5"
              }`}
            >
              <span>Company</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === "company" ? "rotate-180 text-ink" : "text-ink-soft"
                }`}
              />
            </button>

            <AnimatePresence>
              {activeDropdown === "company" && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-full pt-2 w-72 z-50"
                >
                  <div className="rounded-2xl border border-border/80 bg-surface p-2 shadow-lift">
                    <div className="space-y-0.5">
                      {COMPANY_ITEMS.map((item) => {
                        const IconComponent = item.icon;
                        const isCurrent = location.pathname === item.to;
                        return (
                          <Link
                            key={item.label}
                            to={item.to}
                            className={`group flex items-start gap-3 rounded-xl p-2.5 transition-colors cursor-pointer ${
                              isCurrent
                                ? "bg-white/10 text-ink"
                                : "hover:bg-white/5 text-ink-soft hover:text-ink"
                            }`}
                          >
                            <IconComponent className="h-4 w-4 text-ink-soft group-hover:text-ink shrink-0 mt-0.5 transition-colors" />
                            <div className="min-w-0 flex-1">
                              <span className="text-sm font-medium text-ink group-hover:text-foreground">
                                {item.label}
                              </span>
                              <p className="text-xs text-ink-soft line-clamp-1 mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pricing Link */}
          {(!isLoggedIn || !hasPaid) && (
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-white/10 text-ink"
                    : "text-ink-soft hover:text-ink hover:bg-white/5"
                }`
              }
            >
              Pricing
            </NavLink>
          )}

          {/* Quick Dashboard link for logged-in users */}
          {isLoggedIn && (
            <NavLink
              to={portfoliosUrl}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-white/10 text-ink"
                    : "text-ink-soft hover:text-ink hover:bg-white/5"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* ─── Desktop Right User Menu (Clean Black Avatar + Name) ─── */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <div ref={avatarRef} className="relative">
              <button
                type="button"
                onClick={() => setAvatarOpen((v) => !v)}
                className="flex items-center gap-2.5 rounded-full px-2 py-1 hover:bg-white/5 transition-colors cursor-pointer"
              >
                {/* Black Avatar Circle */}
                <div className="grid h-8 w-8 place-items-center rounded-full bg-black border border-white/20 text-white font-semibold text-xs shadow-sm">
                  {avatarLetter}
                </div>
                <span className="text-xs font-medium text-ink truncate max-w-[120px]">
                  {displayName}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-ink-soft transition-transform duration-200 ${
                    avatarOpen ? "rotate-180 text-ink" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {avatarOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-11 w-60 rounded-2xl border border-border/80 bg-surface shadow-lift overflow-hidden z-50 p-2"
                  >
                    {/* User Info Header */}
                    <div className="px-3 py-2.5 border-b border-border/40 mb-1">
                      <div className="text-xs font-semibold text-ink truncate">
                        {profile?.full_name || "Account User"}
                      </div>
                      {profile?.email && (
                        <div className="text-[11px] text-ink-soft truncate mt-0.5">
                          {profile.email}
                        </div>
                      )}
                    </div>

                    {/* Simple Action Links: Settings & Sign Out */}
                    <div className="space-y-0.5">
                      <Link
                        to={portfoliosUrl}
                        onClick={() => setAvatarOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <FolderKanban className="h-4 w-4 text-ink-soft" />
                        My Portfolios
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setAvatarOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Settings className="h-4 w-4 text-ink-soft" />
                        Settings
                      </Link>

                      <div className="my-1 border-t border-border/40" />

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-[13px] font-medium text-ink-soft hover:text-ink transition-colors px-3 py-2 cursor-pointer"
              >
                Sign in
              </Link>

              <Link
                to="/auth/signup"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[13px] font-semibold text-background hover:opacity-90 transition-all shadow-soft cursor-pointer"
              >
                <span>Get started</span>
                <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </>
          )}
        </div>

        {/* ─── Mobile Hamburger Toggle ─── */}
        <button
          type="button"
          className="md:hidden p-2 -mr-2 rounded-lg hover:bg-white/5 transition-colors text-ink cursor-pointer"
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

      {/* ─── Mobile Navigation Drawer ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex min-h-dvh flex-col overflow-y-auto bg-surface/98 backdrop-blur-2xl md:hidden"
          >
            {/* Drawer Top Header */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border/40 px-5">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center cursor-pointer">
                <img src="/logo.png" alt="Portflu" className="h-8 w-auto object-contain" />
              </Link>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 text-ink transition-colors hover:bg-white/5 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Main Content */}
            <div className="flex flex-1 flex-col px-6 pb-8 pt-5 space-y-4 mt-1">
              {/* Home Link */}
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-2.5 text-[17px] font-semibold text-ink border-b border-white/10 cursor-pointer"
              >
                Home
              </Link>

              {/* Dashboard Link (for logged in users) */}
              {isLoggedIn && (
                <Link
                  to={portfoliosUrl}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-2.5 text-[17px] font-semibold text-ink border-b border-white/10 cursor-pointer"
                >
                  Dashboard
                </Link>
              )}

              {/* 1. Mobile Products Accordion */}
              <div className="border-b border-white/10 pb-2.5">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion("products")}
                  className="flex w-full items-center justify-between py-2.5 text-[17px] font-semibold text-ink cursor-pointer"
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`h-5 w-5 text-ink-soft transition-transform duration-200 ${
                      mobileExpanded.products ? "rotate-180 text-ink" : ""
                    }`}
                  />
                </button>
                {mobileExpanded.products && (
                  <div className="pl-3 pt-1 pb-1.5 space-y-1.5">
                    {PRODUCTS_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="block py-1.5 text-sm text-ink-soft hover:text-ink transition-colors cursor-pointer"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Mobile Resources Accordion */}
              <div className="border-b border-white/10 pb-2.5">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion("resources")}
                  className="flex w-full items-center justify-between py-2.5 text-[17px] font-semibold text-ink cursor-pointer"
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`h-5 w-5 text-ink-soft transition-transform duration-200 ${
                      mobileExpanded.resources ? "rotate-180 text-ink" : ""
                    }`}
                  />
                </button>
                {mobileExpanded.resources && (
                  <div className="pl-3 pt-1 pb-1.5 space-y-1.5">
                    {RESOURCES_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="block py-1.5 text-sm text-ink-soft hover:text-ink transition-colors cursor-pointer"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Mobile Company Accordion */}
              <div className="border-b border-white/10 pb-2.5">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion("company")}
                  className="flex w-full items-center justify-between py-2.5 text-[17px] font-semibold text-ink cursor-pointer"
                >
                  <span>Company</span>
                  <ChevronDown
                    className={`h-5 w-5 text-ink-soft transition-transform duration-200 ${
                      mobileExpanded.company ? "rotate-180 text-ink" : ""
                    }`}
                  />
                </button>
                {mobileExpanded.company && (
                  <div className="pl-3 pt-1 pb-1.5 space-y-1.5">
                    {COMPANY_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="block py-1.5 text-sm text-ink-soft hover:text-ink transition-colors cursor-pointer"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing Link */}
              {(!isLoggedIn || !hasPaid) && (
                <Link
                  to="/pricing"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-2.5 text-[17px] font-semibold text-ink border-b border-white/10 cursor-pointer"
                >
                  Pricing
                </Link>
              )}

              {/* Bottom Mobile Action Buttons */}
              <div className="mt-auto pt-6 space-y-3">
                {isLoggedIn ? (
                  <>
                    {/* Settings Button */}
                    <Link
                      to="/settings"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-3 text-sm font-semibold text-ink shadow-sm transition-all cursor-pointer"
                    >
                      <Settings className="h-4 w-4 text-ink-soft" />
                      <span>Settings</span>
                    </Link>

                    {/* Sign Out Button */}
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex items-center justify-center gap-2 w-full rounded-full border border-rose-500/35 bg-rose-500/10 hover:bg-rose-500/20 px-4 py-3 text-sm font-semibold text-rose-300 shadow-sm transition-all cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-ink transition-all hover:bg-white/10 cursor-pointer"
                    >
                      Sign In
                    </Link>

                    <Link
                      to="/auth/signup"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-soft transition-opacity hover:opacity-90 cursor-pointer"
                    >
                      Get Started
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



