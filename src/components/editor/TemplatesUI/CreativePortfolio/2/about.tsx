// @ts-nocheck

export function CreativePortfolio2About({ props = {}, theme, onChange }: any) {
  const accent = '#f03d87';
  const muted = '#7a5362';

  return (
    <>
      <section id="pink-clients" className="pink-clients" style={{ backgroundColor: '#fff' }}><div><p className="pink-overline" style={{ color: accent }}>01 / Client work</p><h2>I’ve worked with a variety of clients.</h2></div><div className="pink-client-list"><span>pwc</span><span>BARCLAYS</span><span>EQUINITI</span><span>nesta</span><span>loveholidays</span><span>TRX</span><span>GSK</span><span>studio</span></div></section>
      <section id="pink-work" className="pink-approach"><div className="pink-approach-mark" style={{ color: accent }}>02 /</div><div><p className="pink-overline" style={{ color: accent }}>What I do</p><h2>Making products and services <em style={{ color: accent }}>better</em> for everyone.</h2><p className="pink-copy" style={{ color: muted }}>Whether that is helping a client improve their experience or creating something new for a better life, I design systems that help people do their best work.</p><div className="pink-services"><span>01 / User journeys</span><span>02 / UX research</span><span>03 / UI design</span><span>04 / Design systems</span></div></div></section>
    </>
  );
}
