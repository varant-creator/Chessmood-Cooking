/* eslint-disable */
// Homepage section — Endorsements "Split editorial" (dark, from E6).
(function () {
  const E = [
    { n: "Eric Rosen",   h: "IM · Content creator", img: "ds/creator-eric-rosen.webp",   q: "Finally — a path that tells an improver exactly what to work on next." },
    { n: "Sagar Shah",   h: "IM · ChessBase India", img: "ds/creator-sagar-shah.webp",   q: "The structure most self-taught players are missing, done properly." },
    { n: "Nelson Lopez", h: "Creator · ChessVibes", img: "ds/creator-nelson-lopez.jpeg", q: "The closest thing to having a Grandmaster sitting in your corner." },
  ];
  const FQ = { n: "GM Bassem Amin", h: "Egypt · 2700 FIDE", img: "ds/photo-amin.jpg", q: "A genuinely serious training system — built the way players actually improve." };
  const Img = ({ src, pos }) => <img className="ph" src={src} alt="" style={pos ? { objectPosition: pos } : null} />;

  function EndorseSplit() {
    const qs = [E[0], E[1], FQ, E[2]];
    return (
      <div className="sec e6" data-screen-label="Endorsements · Split editorial">
        <div className="left">
          <div className="eyebrow">The chess world is talking</div>
          <h2>Endorsed by the people who know chess best.</h2>
          <div className="lede">Titled players, respected coaches, and the creators shaping how the world learns chess.</div>
          <div className="stat">
            <div><div className="n">40+</div><div className="l">Titled endorsers</div></div>
            <div><div className="n">4.9★</div><div className="l">4,600 reviews</div></div>
          </div>
        </div>
        <div className="right">
          {qs.map((p, i) => (
            <div className="q" key={i}>
              <p>“{p.q}”</p>
              <div className="who"><div className="av"><Img src={p.img} pos="50% 18%" /></div><div><div className="nm">{p.n}</div><div className="hd">{p.h}</div></div></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  window.EndorseSplit = EndorseSplit;
})();
