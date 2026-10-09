// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio3Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#160B2B";
  const ink = theme?.ink || "#FFF8FF";
  const inkSecond = theme?.["ink-second"] || "#CDB9E8";
  const surface = theme?.surface || "rgba(255, 248, 255, 0.16)";
  const accent = theme?.accent || "#C98CFF";

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b px-5 py-20 sm:px-8 lg:px-12 transition-colors"
      style={{
        backgroundColor: bg,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Copy */}
        <div className="lg:col-span-7 space-y-6">
          <p
            className="font-mono text-xs uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            <Editable
              value={props?.tagline || "Designing interfaces with atmosphere."}
              onChange={(v) => onChange?.({ tagline: v })}
            />
          </p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-[clamp(3.8rem,9vw,9rem)] font-bold tracking-[-0.09em] leading-[0.8]"
          >
            Hasan<br />
            <span style={{ color: accent }}>
              <Editable
                value={props?.surname || "Senjig."}
                onChange={(v) => onChange?.({ surname: v })}
              />
            </span>
          </motion.h1>

          <div
            className="pt-4 font-mono text-xs uppercase tracking-widest leading-relaxed"
            style={{ color: inkSecond }}
          >
            <Editable
              value={props?.role || "UIUX Designer / Motion / Systems / Code"}
              onChange={(v) => onChange?.({ role: v })}
            />
          </div>
        </div>

        {/* Right Cosmic Orbit Visual */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full grid place-items-center"
            style={{
              background: "radial-gradient(circle at 48% 45%, #C98CFF 0%, #7D46C8 25%, #3A1C72 45%, transparent 65%)",
            }}
          >
            {/* Rotating Ring 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[90%] h-[35%] rounded-full border border-white/40 pointer-events-none"
              style={{ transform: "rotate(25deg)" }}
            />
            {/* Rotating Ring 2 */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute w-[105%] h-[24%] rounded-full border border-white/20 pointer-events-none"
              style={{ transform: "rotate(-15deg)" }}
            />
            {/* Glowing Moon */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-28 h-28 rounded-full shadow-2xl"
              style={{
                backgroundColor: "#F4C9F8",
                boxShadow: "0 0 60px #C98CFF",
              }}
            />
            <span className="absolute bottom-6 right-8 font-mono text-[9px] uppercase tracking-widest text-[#C98CFF]">
              01 / Portfolio
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
