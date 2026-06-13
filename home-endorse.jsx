/* eslint-disable */
// Homepage section — "Featured testimonial trio" (ported from Endorsements · E1).
// Self-contained (IIFE) so its locals don't collide with other section modules.
(function () {
  const E = [
    { n: "Eric Rosen",   h: "IM · Content creator", img: "ds/creator-eric-rosen.webp",   q: "Finally — a path that tells an improver exactly what to work on next." },
    { n: "Sagar Shah",   h: "IM · ChessBase India", img: "ds/creator-sagar-shah.webp",   q: "The structure most self-taught players are missing, done properly." },
    { n: "Nelson Lopez", h: "Creator · ChessVibes", img: "ds/creator-nelson-lopez.jpeg", q: "The closest thing to having a Grandmaster sitting in your corner." },
  ];
  const Img = ({ src, pos }) => <img className="ph" src={src} alt="" style={pos ? { objectPosition: pos } : null} />;

  function EndorseTrio() {
    return (
      <div className="sec e1" data-screen-label="Endorsements · Featured trio">
        <div className="eyebrow">Endorsed by players, coaches &amp; Grandmasters</div>
        <h2>The chess world is talking.</h2>
        <div className="sub">Creators and titled players who know the space — and recommend the system.</div>
        <div className="trio">
          {E.map((p, i) => (
            <div className="card" key={i}>
              <div className="pic"><Img src={p.img} pos="50% 14%" /><div className="badge">{p.h}</div></div>
              <div className="body"><div className="q">“{p.q}”</div><div className="nm">{p.n}</div><div className="hd">{p.h}</div></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  window.EndorseTrio = EndorseTrio;
})();
