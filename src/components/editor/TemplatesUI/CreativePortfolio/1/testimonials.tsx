// @ts-nocheck
import { motion } from 'framer-motion';

export function CreativePortfolio1Testimonials({ props = {}, theme, onChange }: any) {
  return (
    <section className="statement-section">
      <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}><span className="statement-mark">“</span><p>Good work doesn’t just look right.<br /><em>It changes what feels possible.</em></p><span className="statement-credit">— A.</span></motion.div>
    </section>
  );
}
