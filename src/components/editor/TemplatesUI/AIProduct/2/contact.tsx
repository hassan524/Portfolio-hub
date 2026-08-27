import { useState } from "react";
import { Mail, Copy, Check, Send, Sparkles, Clock, Globe } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
import type { ContactProps } from "@/types/builder.schema";

type Props = BlockComponentProps<ContactProps>;
const ICONS: Record<string, any> = { github: FaGithub, linkedin: FaLinkedin, twitter: FaTwitter, email: Mail };

export function AIProduct2Contact({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const emailText = "hello@example.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-28">
      
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-wide" style={{ color: accent, background: `${accent}10` }}>
          <Sparkles className="h-3.5 w-3.5" />
          <span>Let's Build Together</span>
        </div>
        <Editable
          as="h2"
          value={props.heading || "Have a project in mind? Let's talk about what we can create."}
          onChange={(v) => onChange({ heading: v })}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]"
          style={{ color: ink }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div 
            onClick={copyEmail}
            className="p-8 rounded-3xl transition-all hover:scale-[1.01] cursor-pointer group flex flex-col justify-between"
            style={{ background: `${ink}02` }}
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-50" style={{ color: ink }}>Direct Inquiries</div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight mb-4 flex items-center justify-between" style={{ color: ink }}>
                <span>{emailText}</span>
                <div className="h-10 w-10 rounded-xl flex items-center justify-center transition-colors group-hover:bg-black/5" style={{ background: `${ink}04` }}>
                  {copied ? <Check className="h-4 w-4" style={{ color: accent }} /> : <Copy className="h-4 w-4" style={{ color: ink }} />}
                </div>
              </div>
            </div>
            <div className="text-xs font-semibold opacity-60" style={{ color: ink }}>
              {copied ? "Copied to clipboard!" : "Click anywhere to copy email address"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl" style={{ background: `${ink}02` }}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 opacity-50" style={{ color: ink }}>
                <Clock className="h-3.5 w-3.5" /> Timezone
              </div>
              <div className="text-base font-bold" style={{ color: ink }}>UTC / GMT-5</div>
            </div>

            <div className="p-6 rounded-3xl" style={{ background: `${ink}02` }}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 opacity-50" style={{ color: ink }}>
                <Globe className="h-3.5 w-3.5" /> Status
              </div>
              <div className="flex items-center gap-2 text-base font-bold" style={{ color: ink }}>
                <span className="h-2 w-2 rounded-full" style={{ background: accent }}></span>
                Open
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl flex flex-col justify-center shadow-sm" style={{ background: `${ink}02` }}>
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="h-14 w-14 rounded-full mx-auto flex items-center justify-center shadow-md" style={{ background: accent, color: bg }}>
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight" style={{ color: ink }}>Message Dispatched</h3>
              <p className="text-sm max-w-sm mx-auto opacity-70" style={{ color: ink }}>
                Thanks for reaching out. I'll get back to your inbox within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70" style={{ color: ink }}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                    style={{ background: `${ink}03`, color: ink }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70" style={{ color: ink }}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                    style={{ background: `${ink}03`, color: ink }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70" style={{ color: ink }}>Project Scope</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your product timeline, tech stack, and goals..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl text-sm resize-none outline-none transition-all"
                  style={{ background: `${ink}03`, color: ink }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-sm tracking-wide shadow-md transition-transform hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
                style={{ background: accent, color: bg }}
              >
                <span>Send Project Inquiry</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}