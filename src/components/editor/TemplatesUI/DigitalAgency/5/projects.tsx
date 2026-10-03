// @ts-nocheck
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency5Projects({ props = {}, theme, onChange }: any) {
  const [filter, setFilter] = useState("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  const bg = theme?.bg || "#0B26E8";
  const bgSecond = theme?.["bg-second"] || "#061385";
  const ink = theme?.ink || "#FFFFFF";
  const inkSecond = theme?.["ink-second"] || "rgba(255, 255, 255, 0.75)";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.12)";
  const accent = theme?.accent || "#FFFFFF";

  const cases = [
    {
      id: "kora-ai",
      category: "ai",
      title: "Kora AI Experience",
      client: "Kora Global // London",
      tagline: "Generative AI Platform & Interface System",
      impact: "+320% User Activation",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85",
      badge: "AI & WebGL",
    },
    {
      id: "florist-campaign",
      category: "web",
      title: "Florist Omnichannel",
      client: "Botanica Paris // France",
      tagline: "High-Yield Digital Identity & Commerce",
      impact: "+180% Direct Orders",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=85",
      badge: "Brand & Web",
    },
    {
      id: "atrosia-fintech",
      category: "mobile",
      title: "Atrosia App of the Year",
      client: "Atrosia Labs // Zurich",
      tagline: "Next-Gen Mobile Trading Experience",
      impact: "1.2M Downloads",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85",
      badge: "Mobile UI/UX",
    },
    {
      id: "design-source",
      category: "3d",
      title: "DesignSource System",
      client: "DesignSource // San Francisco",
      tagline: "Playful 3D Clay Brand Universe",
      impact: "Featured on Awwwards",
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=85",
      badge: "3D & Motion",
    },
    {
      id: "codereyes-portal",
      category: "web",
      title: "CoderEyes Cloud Portal",
      client: "CoderEyes Tech // Singapore",
      tagline: "Enterprise Cloud Scalability & SaaS",
      impact: "99.99% Uptime",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=85",
      badge: "Enterprise Platform",
    },
  ];

  const filtered = filter === "all" ? cases : cases.filter((c) => c.category === filter);

  const scrollHorizontally = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="projects"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12 overflow-hidden border-t"
      style={{
        backgroundColor: bg,
        borderColor: surface,
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b pb-10" style={{ borderColor: surface }}>
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] font-semibold" style={{ color: inkSecond }}>
              Portfolio of Work
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-none font-sans">
              <Editable
                value={props?.projectsHeadline || "Recent Case Studies"}
                onChange={(v) => onChange?.({ projectsHeadline: v })}
              />
            </h2>
          </div>

          {/* Filter Pills & Horizontal Scroll Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 p-1.5 rounded-full border backdrop-blur-md"
              style={{ backgroundColor: surface, borderColor: surface }}
            >
              {[
                { id: "all", label: "All Cases" },
                { id: "ai", label: "AI & Platform" },
                { id: "web", label: "Web Design" },
                { id: "mobile", label: "Mobile" },
                { id: "3d", label: "3D & Brand" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    filter === f.id ? "bg-white text-blue-900 shadow-md" : ""
                  }`}
                  style={{
                    color: filter === f.id ? bg : inkSecond,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Horizontal Scroll Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollHorizontally("left")}
                className="p-2.5 rounded-full border backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                style={{ backgroundColor: surface, borderColor: surface, color: ink }}
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollHorizontally("right")}
                className="p-2.5 rounded-full border backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                style={{ backgroundColor: surface, borderColor: surface, color: ink }}
                aria-label="Scroll right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Showcase Row */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -8 }}
              className="flex-shrink-0 w-[300px] sm:w-[380px] md:w-[440px] snap-start rounded-3xl border overflow-hidden backdrop-blur-xl flex flex-col justify-between transition-all shadow-xl hover:shadow-2xl group"
              style={{
                backgroundColor: surface,
                borderColor: surface,
              }}
            >
              {/* Image Preview with Hover Overlay */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/30">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold backdrop-blur-md shadow-md"
                    style={{ backgroundColor: "#FFFFFF", color: bg }}
                  >
                    {item.badge}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                  <span>{item.client}</span>
                  <span className="font-bold text-emerald-400">{item.impact}</span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase" style={{ color: ink }}>
                    {item.title}
                  </h3>
                  <p className="text-xs font-light leading-relaxed" style={{ color: inkSecond }}>
                    {item.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: surface }}>
                  <span className="text-[11px] font-mono uppercase tracking-wider opacity-75" style={{ color: inkSecond }}>
                    Human + AI Sprint
                  </span>

                  <motion.a
                    href="#contact"
                    onClick={(e) => handleSmoothScroll(e, "#contact")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: bg,
                    }}
                  >
                    <span>Inquire Project</span>
                    <ArrowUpRight size={13} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DigitalAgency5Projects;
