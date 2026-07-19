import { useState } from "react";
import { motion } from "framer-motion";
import { Code, FileCode, Sparkles, AlertCircle, Loader2, Download } from "lucide-react";
import { type Portfolio } from "./types";

export function ExportPanel({ portfolio }: { portfolio: Portfolio }) {
  const [downloading, setDownloading] = useState(false);
  const [format, setFormat] = useState("static");

  const handleDownloadHTML = () => {
    setDownloading(true);
    
    setTimeout(() => {
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${portfolio.name} — ${portfolio.headline}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background-color: #fafafa;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 60px 20px;
    }
    header {
      margin-bottom: 50px;
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 30px;
    }
    h1 {
      font-size: 2.8rem;
      margin: 0 0 10px 0;
      color: #111;
      letter-spacing: -0.02em;
    }
    .headline {
      font-size: 1.3rem;
      color: #666;
      margin-bottom: 25px;
      font-weight: 500;
    }
    .bio {
      font-size: 1.15rem;
      color: #333;
      max-width: 600px;
    }
    section {
      margin-bottom: 50px;
    }
    h2 {
      font-size: 1.8rem;
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 8px;
      margin-bottom: 24px;
      letter-spacing: -0.01em;
    }
    .project-card {
      background: white;
      border: 1px solid #eaeaea;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    }
    .project-name {
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0 0 8px 0;
      color: #111;
    }
    .project-desc {
      color: #555;
      margin: 0;
      font-size: 0.95rem;
    }
    .contact-btn {
      display: inline-block;
      background: #111;
      color: white;
      padding: 12px 28px;
      border-radius: 99px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      transition: all 0.2s;
    }
    .contact-btn:hover {
      background: #333;
      transform: translateY(-1px);
    }
    footer {
      text-align: center;
      color: #888;
      font-size: 0.85rem;
      margin-top: 80px;
      border-top: 1px solid #eaeaea;
      padding-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${portfolio.name}</h1>
      <div class="headline">${portfolio.headline}</div>
      <p class="bio">${portfolio.bio}</p>
    </header>
    
    ${portfolio.showProjects ? `
    <section>
      <h2>Projects & Case Studies</h2>
      ${!portfolio.projects || portfolio.projects.length === 0 ? `
        <p style="color:#777; font-style:italic;">No work added yet.</p>
      ` : portfolio.projects.map((p: any) => `
      <div class="project-card">
        <div class="project-name">${p.name}</div>
        <p class="project-desc">${p.desc}</p>
      </div>
      `).join('')}
    </section>
    ` : ''}
    
    ${portfolio.showContact ? `
    <section>
      <h2>Get In Touch</h2>
      <p style="color:#555; margin-bottom:20px;">I'm currently open to new roles and consulting opportunities.</p>
      <a href="mailto:hello@example.com" class="contact-btn">Send Message</a>
    </section>
    ` : ''}
    
    <footer>
      <p>Published via PortfolioHub · Exported HTML bundle</p>
    </footer>
  </div>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${portfolio.subdomain || "portfolio"}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloading(false);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selector / Details */}
        <div className="lg:col-span-2 rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold font-display mb-1">Export Source Code</h3>
            <p className="text-xs text-ink-soft mb-6">
              Export your fully compiled custom portfolio layout to host elsewhere or modify by hand.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: "static", label: "Static HTML/CSS", desc: "No build steps required. Simple single file.", icon: FileCode },
                { id: "vite", label: "Vite React Starter", desc: "Standard React scaffold for modern developers.", icon: Code },
                { id: "next", label: "Next.js Template", desc: "Optimized SSR routing for maximum SEO & performance.", icon: Sparkles },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setFormat(item.id)}
                  className={`rounded-2xl border p-4.5 cursor-pointer transition-all ${
                    format === item.id
                      ? "border-foreground bg-secondary/35 shadow-soft"
                      : "border-border hover:border-foreground/20 bg-surface/50"
                  }`}
                >
                  <item.icon className="h-5 w-5 mb-2 text-ink-soft" />
                  <div className="text-xs font-bold mb-1">{item.label}</div>
                  <p className="text-[10px] text-ink-soft/90 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Code Directory File tree preview */}
            <div className="mt-6 rounded-2xl bg-zinc-950 border border-zinc-900 p-4 font-mono text-[11px] text-zinc-400 shadow-inner">
              <div className="text-zinc-650 mb-2"># Generated Directory Tree</div>
              <div>📁 {portfolio.subdomain || "portfolio"}-dist/</div>
              <div>├── 📄 index.html <span className="text-zinc-400">({format === "static" ? "static markup" : "React entrypoint"})</span></div>
              {format !== "static" && (
                <>
                  <div>├── 📄 package.json <span className="text-zinc-450">(scripts & dependencies)</span></div>
                  <div>├── 📁 src/</div>
                  <div>│   ├── 📄 main.tsx</div>
                  <div>│   └── 📄 App.tsx</div>
                </>
              )}
              <div>└── 📄 styles.css <span className="text-zinc-650">(compiled responsive tokens)</span></div>
            </div>
          </div>

          <div className="pt-6 border-t border-border mt-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-xs text-ink-soft font-semibold">
              <AlertCircle className="h-4 w-4" />
              <span>Includes compiled bio summaries and project assets</span>
            </div>
            <button
              onClick={handleDownloadHTML}
              disabled={downloading}
              className="rounded-xl bg-foreground text-background px-6 py-3.5 text-xs font-bold shadow-soft hover:shadow-lift transition-all cursor-pointer flex items-center gap-1.5"
            >
              {downloading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Bundling assets...
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  Download Codebase
                </>
              )}
            </button>
          </div>
        </div>

        {/* Static HTML Quick View */}
        <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold font-display mb-3">HTML File Preview</h3>
            <div className="rounded-2xl bg-zinc-950 border border-zinc-900 p-4.5 font-mono text-[10px] text-zinc-400 overflow-x-auto h-[240px] leading-relaxed shadow-inner">
              <span className="text-zinc-500">&lt;!DOCTYPE html&gt;</span><br />
              <span className="text-zinc-500">&lt;html lang="en"&gt;</span><br />
              <span className="text-zinc-500">&lt;head&gt;</span><br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;title&gt;</span>{portfolio.name}<span className="text-zinc-500">&lt;/title&gt;</span><br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;meta name="description" content="</span>{portfolio.headline}<span className="text-zinc-500">"&gt;</span><br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;/head&gt;</span><br />
              <span className="text-zinc-500">&lt;body&gt;</span><br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;header&gt;</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">&lt;h1&gt;</span>{portfolio.name}<span className="text-zinc-500">&lt;/h1&gt;</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">&lt;p&gt;</span>{portfolio.bio}<span className="text-zinc-500">&lt;/p&gt;</span><br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;/header&gt;</span><br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;section&gt;</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">&lt;h2&gt;</span>Projects<span className="text-zinc-500">&lt;/h2&gt;</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">/* Dynamic projects render */</span><br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;/section&gt;</span><br />
              <span className="text-zinc-500">&lt;/body&gt;</span><br />
              <span className="text-zinc-500">&lt;/html&gt;</span>
            </div>
          </div>

          <div className="pt-4 text-center">
            <span className="text-[10px] text-ink-soft/90 font-medium leading-relaxed">
              Fully optimized for hosting on Vercel, Netlify, or Github Pages
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
