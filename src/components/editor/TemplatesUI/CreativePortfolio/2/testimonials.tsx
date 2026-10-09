// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio2Testimonials({ props = {}, theme, onChange }: any) {
  const bgSecond = theme?.["bg-second"] || "#F9DDE8";
  const ink = theme?.ink || "#2B1720";
  const inkSecond = theme?.["ink-second"] || "#7A5362";
  const surface = theme?.surface || "rgba(83, 29, 51, 0.14)";
  const accent = theme?.accent || "#F03D87";

  const quotes = props?.quotes || [
    {
      quote: "Liza brought clarity and calm to a complex product. The result feels genuinely human.",
      author: "Ruth Ellison / PwC"
    },
    {
      quote: "She worked with us to give a complicated service a clear and welcoming front door.",
      author: "Michael Wallace / Barclays"
    },
    {
      quote: "Thoughtful, direct, and full of the details you notice long after the meeting ends.",
      author: "Maya Nkosi / Equiniti"
    }
  ];

  return (
    <section
      id="testimonials"
      className="border-b px-5 py-24 sm:px-8 lg:px-12 transition-colors font-serif"
      style={{
        backgroundColor: bgSecond,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: accent }}>
          04 / Don’t just take my word for it
        </p>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-16">
          Words from collaborators.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quotes.map((q: any, i: number) => (
            <motion.article
              key={i}
              whileHover={{ y: -4 }}
              className="p-8 rounded-3xl border flex flex-col justify-between"
              style={{
                backgroundColor: "#ffffff",
                borderColor: surface,
              }}
            >
              <div>
                <b className="block text-5xl font-bold" style={{ color: accent }}>
                  “
                </b>
                <p className="mt-4 text-xl sm:text-2xl leading-snug">
                  <Editable
                    value={q.quote}
                    onChange={(v) =>
                      onChange?.({
                        quotes: quotes.map((item: any, idx: number) =>
                          idx === i ? { ...item, quote: v } : item
                        ),
                      })
                    }
                  />
                </p>
              </div>
              <strong className="block mt-8 font-mono text-[10px] uppercase tracking-wider" style={{ color: inkSecond }}>
                <Editable
                  value={q.author}
                  onChange={(v) =>
                    onChange?.({
                      quotes: quotes.map((item: any, idx: number) =>
                        idx === i ? { ...item, author: v } : item
                      ),
                    })
                  }
                />
              </strong>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
