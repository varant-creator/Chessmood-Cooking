/* eslint-disable */
// Homepage section — "Cinematic portrait marquee" (Grandmasters).
// Auto-rotating, draggable filmstrip of the full 16-GM roster.
// At rest each card shows name · country · FIDE; role + quote reveal on hover.
// Self-contained (IIFE) so its locals don't collide with other section modules.
(function () {
  const { useRef, useEffect } = React;

  const GM = {
    avetik:       { n: "GM Avetik Grigoryan",   r: "Founder & Head Coach", c: "Armenia",     f: 2580, img: "ds/photo-avetik.webp",      q: "I built ChessMood to give players the structured path I wish I had at 1500." },
    gabuzyan:     { n: "GM Hovhannes Gabuzyan",  r: "Attack & Calculation", c: "Armenia",     f: 2620, img: "ds/photo-gabuzyan.webp",    q: "Sharp positions reward the player who calculates one move deeper." },
    avrukh:       { n: "GM Boris Avrukh",        r: "Opening Theory",       c: "Israel",      f: 2657, img: "ds/photo-avrukh.webp",      q: "A great repertoire removes the guesswork — you enter every game prepared." },
    leitao:       { n: "GM Rafael Leitão",       r: "Practical Play",       c: "Brazil",      f: 2659, img: "ds/photo-leitao.jpg",       q: "Knowing the idea means nothing until you can find it on the clock." },
    melkumyan:    { n: "GM Hrant Melkumyan",     r: "Dynamic Strategy",     c: "Armenia",     f: 2660, img: "ds/photo-melkumyan.jpg",    q: "Strategy is just a series of small, correct decisions." },
    fressinet:    { n: "GM Laurent Fressinet",   r: "Endgames",             c: "France",      f: 2660, img: "ds/photo-fressinet.jpg",    q: "Most games are decided in the endgame — so we train it relentlessly." },
    grandelius:   { n: "GM Nils Grandelius",     r: "Sharp Openings",       c: "Sweden",      f: 2670, img: "ds/photo-grandelius.jpg",   q: "Play the opening you understand, not the one you memorized." },
    akobian:      { n: "GM Varuzhan Akobian",    r: "Positional Play",      c: "USA",         f: 2620, img: "ds/photo-akobian.jpg",      q: "Good positions don’t win themselves — technique does." },
    andriasian:   { n: "GM Zaven Andriasian",    r: "Repertoire Design",    c: "Armenia",     f: 2610, img: "ds/photo-andriasian.jpg",  q: "Your repertoire should fit you, not someone else’s taste." },
    paehtz:       { n: "GM Elisabeth Pähtz",     r: "Attacking Chess",      c: "Germany",     f: 2480, img: "ds/photo-paehtz.jpg",      q: "Attack with purpose, defend without fear." },
    studer:       { n: "GM Noël Studer",         r: "Study Method",         c: "Switzerland", f: 2570, img: "ds/photo-studer.jpg",       q: "Improvement is a method, not a talent." },
    hovhannisyan: { n: "GM Robert Hovhannisyan", r: "Calculation",          c: "Armenia",     f: 2620, img: "ds/photo-hovhannisyan.jpg", q: "Calculate concretely, then trust what you see." },
    kuljasevic:   { n: "GM Davorin Kuljašević",  r: "Decision Making",      c: "Croatia",     f: 2570, img: "ds/photo-kuljasevic.png",   q: "Better decisions come from better questions at the board." },
    banusz:       { n: "GM Tamás Bánusz",        r: "Middlegames",          c: "Hungary",     f: 2590, img: "ds/photo-banusz.jpg",      q: "The middlegame is where preparation meets imagination." },
    cuenca:       { n: "GM Jose Cuenca",         r: "Tactics",              c: "Spain",       f: 2550, img: "ds/photo-cuenca.jpg",       q: "Tactics flow from a position you truly understand." },
    amin:         { n: "GM Bassem Amin",         r: "Classical Play",       c: "Egypt",       f: 2700, img: "ds/photo-amin.jpg",         q: "Classical principles still win modern games." },
  };
  const ROSTER = Object.values(GM);
  const FLAG = { Armenia: "🇦🇲", Israel: "🇮🇱", Brazil: "🇧🇷", France: "🇫🇷", Sweden: "🇸🇪", USA: "🇺🇸", Germany: "🇩🇪", Switzerland: "🇨🇭", Croatia: "🇭🇷", Hungary: "🇭🇺", Spain: "🇪🇸", Egypt: "🇪🇬" };
  const Img = ({ src, pos }) => <img className="ph" src={src} alt="" style={pos ? { objectPosition: pos } : null} />;

  function GMMarquee() {
    const ref = useRef(null);
    const paused = useRef(false);
    const drag = useRef({ down: false, x: 0, l: 0 });
    useEffect(() => {
      const el = ref.current; if (!el) return;
      const enter = () => { paused.current = true; };
      const leave = () => { paused.current = false; };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      let raf;
      const tick = () => {
        if (!paused.current && el.scrollWidth > el.clientWidth) {
          el.scrollLeft += 0.5;
          if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft -= el.scrollWidth / 2;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => { cancelAnimationFrame(raf); el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); };
    }, []);
    const nudge = (d) => { const el = ref.current; if (el) { paused.current = true; el.scrollBy({ left: d, behavior: "smooth" }); setTimeout(() => paused.current = false, 1500); } };
    const onDown = (e) => { paused.current = true; const el = ref.current; drag.current = { down: true, x: e.pageX, l: el.scrollLeft }; el.classList.add("grabbing"); };
    const onMove = (e) => { if (!drag.current.down) return; ref.current.scrollLeft = drag.current.l - (e.pageX - drag.current.x); };
    const onUp = () => { drag.current.down = false; const el = ref.current; if (el) el.classList.remove("grabbing"); setTimeout(() => paused.current = false, 900); };
    const loop = [...ROSTER, ...ROSTER];

    return (
      <div className="sec v3" data-screen-label="Grandmasters · Cinematic marquee">
        <div className="head">
          <div className="eyebrow">Guided by Grandmasters</div>
          <h2>The Grandmasters you will meet in the ChessMood system.</h2>
          <div className="navrow">
            <div className="arrows">
              <button aria-label="Scroll left" onClick={() => nudge(-560)}>‹</button>
              <button aria-label="Scroll right" onClick={() => nudge(560)}>›</button>
            </div>
          </div>
        </div>
        <div className="strip" ref={ref}
          onMouseEnter={() => paused.current = true} onMouseLeave={() => paused.current = false}
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
          {loop.map((m, i) => (
            <div className="col" key={i}>
              <Img src={m.img} pos="50% 16%" />
              <div className="grad"></div>
              <div className="fide">{m.f}<span className="lbl">FIDE</span></div>
              <div className="info">
                <div className="nm"><span className="pre">GM</span>{m.n.replace(/^GM/, "")}</div>
                <div className="ctry"><span className="flag">{FLAG[m.c]}</span>{m.c}</div>
                <div className="reveal">
                  <div className="role">{m.r}</div>
                  <div className="quote">“{m.q}”</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  window.GMMarquee = GMMarquee;
})();
