// @ts-nocheck

export function CreativePortfolio3Navbar({ props = {}, theme, onChange }: any) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="purple-header"><button onClick={() => scrollTo('purple-top')}>Hasan Senjig</button><span>UIUX Designer / Creative Developer</span><nav><button onClick={() => scrollTo('purple-lab')}>Lab</button><button onClick={() => scrollTo('purple-work')}>Work</button><button onClick={() => scrollTo('purple-contact')}>Hire me</button></nav></header>
  );
}
