/* eslint-disable */
// Homepage section — Grandmasters scrollable row, data under each portrait.
(function () {
  const { useRef } = React;
  const GM = [
    { n: "GM Avetik Grigoryan",   r: "Founder & Head Coach", c: "Armenia",     f: 2580, img: "ds/photo-avetik.webp" },
    { n: "GM Hovhannes Gabuzyan",  r: "Attack & Calculation", c: "Armenia",     f: 2620, img: "ds/photo-gabuzyan.webp" },
    { n: "GM Boris Avrukh",        r: "Opening Theory",       c: "Israel",      f: 2657, img: "ds/photo-avrukh.webp" },
    { n: "GM Rafael Leitão",       r: "Practical Play",       c: "Brazil",      f: 2659, img: "ds/photo-leitao.jpg" },
    { n: "GM Hrant Melkumyan",     r: "Dynamic Strategy",     c: "Armenia",     f: 2660, img: "ds/photo-melkumyan.jpg" },
    { n: "GM Laurent Fressinet",   r: "Endgames",             c: "France",      f: 2660, img: "ds/photo-fressinet.jpg" },
    { n: "GM Nils Grandelius",     r: "Sharp Openings",       c: "Sweden",      f: 2670, img: "ds/photo-grandelius.jpg" },
    { n: "GM Varuzhan Akobian",    r: "Positional Play",      c: "USA",         f: 2620, img: "ds/photo-akobian.jpg" },
    { n: "GM Zaven Andriasian",    r: "Repertoire Design",    c: "Armenia",     f: 2610, img: "ds/photo-andriasian.jpg" },
    { n: "GM Noël Studer",         r: "Study Method",         c: "Switzerland", f: 2570, img: "ds/photo-studer.jpg" },
    { n: "GM Robert Hovhannisyan", r: "Calculation",          c: "Armenia",     f: 2620, img: "ds/photo-hovhannisyan.jpg" },
    { n: "GM Bassem Amin",         r: "Classical Play",       c: "Egypt",       f: 2700, img: "ds/photo-amin.jpg" },
  ];
  const Img = ({ src, pos }) => <img className="ph" src={src} alt="" style={pos ? { objectPosition: pos } : null} />;

  function GMGrid() {
    const ref = useRef(null);
    const drag = useRef({ down: false, x: 0, l: 0 });
    const nudge = (d) => ref.current && ref.current.scrollBy({ left: d, behavior: "smooth" });
    const onDown = (e) => { const el = ref.current; drag.current = { down: true, x: e.pageX, l: el.scrollLeft }; el.classList.add("grabbing"); };
    const onMove = (e) => { if (!drag.current.down) return; ref.current.scrollLeft = drag.current.l - (e.pageX - drag.current.x); };
    const onUp = () => { drag.current.down = false; ref.current && ref.current.classList.remove("grabbing"); };

    return (
      <div className="sec v1" data-screen-label="Grandmasters · Editorial grid">
        <div className="top">
          <div>
            <div className="eyebrow orange">Guided by Grandmasters</div>
            <h2 style={{ marginTop: 14 }}>The Grandmasters you will meet in the ChessMood system.</h2>
          </div>
          <div className="topr">
            <div className="lede">Every course, repertoire and review is built by a titled Grandmaster — not a marketer.</div>
            <div className="arrows">
              <button aria-label="Scroll left" onClick={() => nudge(-560)}>‹</button>
              <button aria-label="Scroll right" onClick={() => nudge(560)}>›</button>
            </div>
          </div>
        </div>
        <div className="grow" ref={ref} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
          {GM.map((m, i) => (
            <div className="gcard" key={i}>
              <div className="pic"><Img src={m.img} />{i === 0 && <div className="founder-tag">Founder</div>}</div>
              <div className="data">
                <div className="nm">{m.n.replace("GM ", "")}</div>
                <div className="rl">{m.r} · {m.c}</div>
                <div className="fide">{m.f}<span>FIDE</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  window.GMGrid = GMGrid;
})();
