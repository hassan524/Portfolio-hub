// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const getT = (theme: any = {}) => ({
    bg: theme.bg || "#07070D",
    bg2: theme["bg-second"] || "#0E0E18",
    text: theme.text || theme.ink || "#EEF0FF",
    muted: theme["text-second"] || "#8B8FA8",
    surface: theme.surface || "#151524",
    accent: theme.accent || "#7C9DFF",
    accent2: theme["accent-second"] || "#C084FC",
});

export function DesignerPortfolio2Navbar({ props = {}, theme, onChange }: any) {
    const t = getT(theme);
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState<string | null>(null);
    const links = props.navLinks || [
        { label: "Work", href: "#projects" },
        { label: "About", href: "#about" },
        { label: "Kind words", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full px-4 pt-4 font-['Poppins',sans-serif]" style={{ color: t.text }}>
            <motion.nav
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full py-2 pl-2 pr-2 backdrop-blur-xl"
                style={{ background: `${t.surface}cc`, border: `1px solid ${t.text}14`, boxShadow: `0 20px 60px -20px ${t.accent}40` }}
            >
                <a href="#home" className="flex items-center gap-3 pl-1">
                    <span
                        className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold"
                        style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`, color: t.bg }}
                    >
                        <Editable as="span" value={props.monogram || "NR"} onChange={(v) => onChange?.({ monogram: v })} />
                    </span>
                    <span className="hidden text-sm font-semibold sm:block">
                        <Editable as="span" value={props.brandName || "Nova Reyes"} onChange={(v) => onChange?.({ brandName: v })} />
                    </span>
                </a>

                <ul className="hidden items-center md:flex" onMouseLeave={() => setHover(null)}>
                    {links.map((l: any) => (
                        <li key={l.label} className="relative">
                            {hover === l.label && (
                                <motion.span layoutId="dp2-nav-hover" className="absolute inset-0 rounded-full" style={{ background: `${t.text}10` }} transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                            )}
                            <a href={l.href} onMouseEnter={() => setHover(l.label)} className="relative block px-4 py-2 text-[13px] font-medium" style={{ color: hover === l.label ? t.text : t.muted }}>
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <a
                        href="#contact"
                        className="group hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-transform hover:scale-[1.03] sm:inline-flex"
                        style={{ background: t.text, color: t.bg }}
                    >
                        <Editable as="span" value={props.navCta || "Hire me"} onChange={(v) => onChange?.({ navCta: v })} />
                        <ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" />
                    </a>
                    <button type="button" aria-label="Toggle menu" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full md:hidden" style={{ background: `${t.text}10` }}>
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        className="mx-auto mt-2 max-w-4xl rounded-3xl p-3 backdrop-blur-xl md:hidden"
                        style={{ background: `${t.surface}f2`, border: `1px solid ${t.text}14` }}
                    >
                        {links.map((l: any) => (
                            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-base font-medium" style={{ color: t.text }}>
                                {l.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default DesignerPortfolio2Navbar;
