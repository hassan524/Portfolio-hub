// @ts-nocheck
import { ArrowUpRight } from 'lucide-react';

export function CreativePortfolio1Contact({ props = {}, theme, onChange }: any) {
  return (
    <section className="contact-section" id="contact">
      <div className="section-label"><span>05 — Start a conversation</span><span>Let’s make a little noise</span></div>
      <div className="contact-content"><h2>Have a good<br /><i>one?</i></h2><div className="contact-aside"><p>Tell me what you’re building, what’s not working, or what you can’t stop thinking about.</p><button className="contact-button" onClick={() => window.location.href = 'mailto:hello@abiola.studio'}>hello@abiola.studio <ArrowUpRight size={22} /></button></div></div>
    </section>
  );
}
