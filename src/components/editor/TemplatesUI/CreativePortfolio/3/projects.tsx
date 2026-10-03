// @ts-nocheck
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function CreativePortfolio3Projects({ props = {}, theme, onChange }: any) {
  return (
    <section id="purple-work" className="purple-work"><div className="purple-work-heading"><span>03 / Selected signals</span><h2>A living library of worlds.</h2></div><div className="purple-signal-list"><motion.article whileHover={{ x: 22 }}><span>01</span><div><small>Product UI / Moonwave</small><h3>Sound you can see.</h3></div><ArrowUpRight /></motion.article><motion.article whileHover={{ x: 22 }}><span>02</span><div><small>Spatial brand / NOVA</small><h3>Find your way through.</h3></div><ArrowUpRight /></motion.article><motion.article whileHover={{ x: 22 }}><span>03</span><div><small>Motion system / Arc</small><h3>Every state has a feeling.</h3></div><ArrowUpRight /></motion.article><motion.article whileHover={{ x: 22 }}><span>04</span><div><small>Portfolio / Hasan</small><h3>Interfaces with atmosphere.</h3></div><ArrowUpRight /></motion.article></div></section>
  );
}
