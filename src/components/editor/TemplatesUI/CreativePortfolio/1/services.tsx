// @ts-nocheck
import { ArrowUpRight } from 'lucide-react';

const services = ['Brand identity', 'Art direction', 'Digital design', 'Creative strategy'];

export function CreativePortfolio1Services({ props = {}, theme, onChange }: any) {
  return (
    <section className="services-section">
      <div className="section-label"><span>04 — What I do</span><span>Built around your ambition</span></div>
      <div className="services-layout"><h2>Make it<br /><i>matter.</i></h2><div className="services-list">{services.map((service, index) => <div className="service-line" key={service}><span>0{index + 1}</span><strong>{service}</strong><ArrowUpRight size={21} /></div>)}</div></div>
      <div className="services-footer"><span>Available for selected collaborations</span><span>Brand worlds / websites / campaigns</span></div>
    </section>
  );
}
