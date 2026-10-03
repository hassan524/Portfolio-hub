// @ts-nocheck

export function CreativePortfolio2Testimonials({ props = {}, theme, onChange }: any) {
  const rose = '#f9dce8';
  const accent = '#f03d87';

  return (
    <section className="pink-voices" style={{ backgroundColor: rose }}><p className="pink-overline" style={{ color: accent }}>04 / Don’t just take my word for it.</p><div className="pink-quotes"><article><b style={{ color: accent }}>“</b><p>Liza brought clarity and calm to a complex product. The result feels genuinely human.</p><strong>Ruth Ellison / PwC</strong></article><article><b style={{ color: accent }}>“</b><p>She worked with us to give a complicated service a clear and welcoming front door.</p><strong>Michael Wallace / Barclays</strong></article><article><b style={{ color: accent }}>“</b><p>Thoughtful, direct, and full of the details you notice long after the meeting ends.</p><strong>Maya Nkosi / Equiniti</strong></article></div></section>
  );
}
