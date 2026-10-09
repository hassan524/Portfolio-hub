// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio2About({ props = {}, theme, onChange }: any) {
  const bgSecond = theme?.["bg-second"] || "#F9DDE8";
  const ink = theme?.ink || "#2B1720";
  const inkSecond = theme?.["ink-second"] || "#7A5362";
  const surface = theme?.surface || "rgba(83, 29, 51, 0.14)";
  const accent = theme?.accent || "#F03D87";

  const clients = props?.clients || [
    "pwc", "BARCLAYS", "EQUINITI", "nesta", "loveholidays", "TRX", "GSK", "studio"
  ];

  const steps = props?.steps || [
    {
      step: "01",
      title: "Understand",
      text: "Connection and understanding are integral to my process. I work with clients to understand their wants, behaviours, and challenges."
    },
    {
      step: "02",
      title: "Collaborate",
      text: "Bringing people together with different perspectives means a variety of ideas and a stronger answer."
    },
    {
      step: "03",
      title: "Deliver",
      text: "A considered system gives teams confidence and gives people a more useful way through."
    }
  ];

  return (
    <section
      id="about"
      className="border-b px-5 py-24 sm:px-8 lg:px-12 transition-colors font-serif"
      style={{
        backgroundColor: bgSecond,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl space-y-24">
        {/* Clients Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: accent }}>
              01 / Client work
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <Editable
                value={props?.clientsHeadline || "I’ve worked with a variety of clients."}
                onChange={(v) => onChange?.({ clientsHeadline: v })}
              />
            </h2>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 font-sans font-bold text-lg sm:text-xl tracking-tight text-center">
            {clients.map((c: string, i: number) => (
              <div
                key={i}
                className="p-5 rounded-2xl border backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  borderColor: surface,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="pt-16 border-t" style={{ borderColor: surface }}>
          <div className="mb-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: accent }}>
              03 / The Process
            </p>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Start with <em style={{ color: accent }}>why.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((st: any, i: number) => (
              <motion.article
                key={i}
                whileHover={{ y: -4 }}
                className="p-8 rounded-3xl border transition-all"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  borderColor: surface,
                  borderTopWidth: 4,
                  borderTopColor: accent,
                }}
              >
                <b className="font-mono text-xs uppercase" style={{ color: accent }}>
                  {st.step}
                </b>
                <h3 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight">
                  <Editable
                    value={st.title}
                    onChange={(v) =>
                      onChange?.({
                        steps: steps.map((s: any, idx: number) =>
                          idx === i ? { ...s, title: v } : s
                        ),
                      })
                    }
                  />
                </h3>
                <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed" style={{ color: inkSecond }}>
                  <Editable
                    value={st.text}
                    onChange={(v) =>
                      onChange?.({
                        steps: steps.map((s: any, idx: number) =>
                          idx === i ? { ...s, text: v } : s
                        ),
                      })
                    }
                  />
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
