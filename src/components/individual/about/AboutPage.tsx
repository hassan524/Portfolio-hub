import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/individual/PageShell";
import { useAppContext } from "@/context/AppContext";

type Side = "left" | "right";

const STORY: { title: string; body: string; side: Side }[] = [
  {
    side: "left",
    title: "Who's behind this",
    body: "Portflu is built and run by one person — me. No support tickets vanishing into a queue, no roadmap decided in a meeting. If something's broken, I'm the one who fixes it. If you email support, I'm the one reading it.",
  },
  {
    side: "right",
    title: "The problem",
    body: "I kept meeting brilliant designers, developers, and writers who had incredible work and no portfolio online. Everyone said the same thing — \"I'll set one up this weekend.\" Weekends came and went. The friction was never talent. It was the tools.",
  },
  {
    side: "left",
    title: "What I built",
    body: "A calm editor, templates that don't look like templates, and one-click publishing. No WordPress rabbit holes, no $200 themes, no wrestling with DNS at midnight. The path from \"I have work\" to \"here's my link\" takes five minutes, not five days.",
  },
  {
    side: "right",
    title: "What's next",
    body: "More templates, deeper analytics, and a headless API so your content can live anywhere. Shipped when it's ready, not when a roadmap says so.",
  },
];

function dotX(side: Side) {
  return side === "right" ? 56 : 44;
}

function StoryRow({ item, index }: { item: (typeof STORY)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative border-t border-border pt-6 md:border-none md:pt-2"
    >
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="absolute top-0 z-10 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-background md:block"
        style={{ left: `${dotX(item.side)}%` }}
      />
      <div className={`flex ${item.side === "right" ? "md:justify-end" : "md:justify-start"}`}>
        <div className="w-full md:w-[48%]">
          <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
          <p className="mt-2 text-base leading-relaxed text-ink-soft">{item.body}</p>
        </div>
      </div>
    </motion.div>
  );
}

function Connector({ from, to }: { from: Side; to: Side }) {
  const x1 = dotX(from);
  const x2 = dotX(to);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.15 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative hidden h-16 w-full md:block"
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1={x1} y1={0} x2={x2} y2={100} strokeWidth={1} className="stroke-border" />
        <motion.line
          x1={x1}
          y1={0}
          x2={x2}
          y2={100}
          strokeWidth={1.5}
          className="stroke-primary"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.15 }}
        />
      </svg>
    </motion.div>
  );
}

export function AboutPage() {
  const { session, authUser, profile } = useAppContext();
  const isLoggedIn = !!session;
  const portfoliosUrl = "/dashboard"; // adjust to your actual route

  return (
    <PageShell
      eyebrow="About"
      title="Portfolios shouldn't take a weekend."
      subtitle="The short story behind Portflu — and what's next."
    >
      <div className="mx-auto max-w-5xl">
        {/* Lede card */}
        <div className="rounded-2xl border border-border bg-card/40 p-6 sm:p-8">
          <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
            Portflu started as a way to stop watching good work sit in folders. Here's the short
            version of why it exists, what's in it today, and where it's headed next.
          </p>
        </div>

        {/* Story */}
        <div className="mt-14">
          {STORY.map((item, i) => (
            <div key={item.title}>
              <StoryRow item={item} index={i} />
              {i < STORY.length - 1 && <Connector from={item.side} to={STORY[i + 1].side} />}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col items-start justify-between gap-5 border-t border-border pt-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-foreground">
              {isLoggedIn ? "Your dashboard is ready." : "Ready to try it?"}
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              {isLoggedIn
                ? "Publish, track traffic, and manage your domain from one place."
                : "Pick a template and go live in under ten minutes."}
            </p>
          </div>
          <Link
            to={isLoggedIn ? portfoliosUrl : "/auth/signup"}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-all hover:opacity-90"
          >
            {isLoggedIn ? "Open dashboard" : "Get started free"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}