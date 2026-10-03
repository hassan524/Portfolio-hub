// @ts-nocheck

export function CreativePortfolio2Navbar({ props = {}, theme, onChange }: any) {
  const accent = '#f03d87';
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="pink-header"><button onClick={() => scrollTo('pink-top')}>Liza / Product Designer</button><nav><button onClick={() => scrollTo('pink-clients')}>Clients</button><button onClick={() => scrollTo('pink-work')}>Approach</button><button onClick={() => scrollTo('pink-contact')}>Contact</button></nav><span style={{ color: accent }}>Available / 2025</span></header>
  );
}
