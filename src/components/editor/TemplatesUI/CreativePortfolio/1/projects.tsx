// @ts-nocheck
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    number: '01',
    type: 'Brand system / 2024',
    title: 'Mahlis',
    description: 'A warm, considered identity for a contemporary food studio with roots in Lagos and a point of view that travels.',
    className: 'project-mahlis',
    label: 'MAHLIS',
  },
  {
    number: '02',
    type: 'Digital experience / 2024',
    title: 'Little View',
    description: 'Turning a complex education platform into an approachable, kinetic world for curious young minds.',
    className: 'project-little-view',
    label: 'LITTLE VIEW',
  },
  {
    number: '03',
    type: 'Art direction / 2023',
    title: 'Olistic View',
    description: 'A personal visual language for a creative practice built around clarity, confidence, and memorable detail.',
    className: 'project-olistic',
    label: 'OLISTIC VIEW',
  },
];

export function CreativePortfolio1Projects({ props = {}, theme, onChange }: any) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="work-section" id="work">
      <div className="section-label"><span>03 — Selected work</span><span>Identity / Digital / Direction</span></div>
      <div className="work-intro"><h2>Things I’ve<br /><i>made</i> recently.</h2><p>Somewhere between strategy and instinct, there is always a better answer.</p></div>
      <div className="projects-list">
        {projects.map((project, index) => (
          <motion.article className={`project-row ${index % 2 === 1 ? 'project-reverse' : ''}`} key={project.number} initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
            <div className={`project-art ${project.className}`}>
              
              <div className="art-label">{project.label}</div><div className="art-small">{project.number} / visual study</div>
              {index === 0 && <div className="art-sun" />}{index === 1 && <div className="art-window"><span>learn<br />by doing</span></div>}{index === 2 && <div className="art-portrait">A</div>}
            </div>
            <div className="project-copy"><div className="project-meta"><span>{project.number}</span><span>{project.type}</span></div><h3>{project.title}</h3><p>{project.description}</p><button className="text-button" onClick={() => scrollTo('contact')}>View project <ArrowUpRight size={18} /></button></div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
