/* eslint-disable */
// Homepage section — "The Method" loop (light) — progress stepper + 3 product cards.
(function () {
  const gridIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
  const checkIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 6"/></svg>;
  const playIcon = <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l11-7z"/></svg>;

  const THEMES = [["Forks", true], ["Pins", false], ["Skewers", false], ["Endgames", true], ["Mating nets", false], ["Deflection", false]];

  function MethodLoop() {
    return (
      <section className="ml" data-screen-label="Method · The loop">
        <div className="ml-head">
          <div className="eyebrow">The Method</div>
          <h2>Diagnose. Study &amp; Practice. Fix.</h2>
          <p className="sub">One repeating loop, powered by Grandmasters and AI — the rhythm that turns effort into rating.</p>
        </div>

        <div className="ml-loop">
          <div className="ml-repeat">↻ The loop repeats</div>
          <div className="ml-track">
            <div className="ml-line"></div>
            <div className="ml-node done"><span className="dot"></span><span className="lab">Diagnose</span></div>
            <div className="ml-node on"><span className="dot"></span><span className="lab">Study &amp; Practice</span></div>
            <div className="ml-node"><span className="dot"></span><span className="lab">Fix</span></div>
          </div>
        </div>
        <p className="ml-cap">Train exactly what you need — then prove it against real resistance.</p>

        <div className="ml-cards">
          <div className="ml-card">
            <div className="ch"><i></i><i></i><i></i><span className="t">Puzzles · by theme</span><span className="badge gray">10,000</span></div>
            <div className="cb">
              <div className="note">Tagged by theme — drill exactly your weak spots.</div>
              <div className="chips">
                {THEMES.map(([t, dot], i) => <span className="chip" key={i}>{t}{dot && <em></em>}</span>)}
              </div>
            </div>
          </div>

          <div className="ml-card">
            <div className="ch"><i></i><i></i><i></i><span className="t">Interactive lesson</span><span className="badge blue">Your move</span></div>
            <div className="cb lesson">
              <div className="board"><img src="ds/chess-board.png" alt="" /></div>
              <div className="ltext">
                <div className="lt">The Italian, explained</div>
                <div className="ld">You’re Black. Find the principled developing move.</div>
                <a className="lbtn" href="#">Your move →</a>
              </div>
            </div>
          </div>

          <div className="ml-card">
            <div className="ch"><i></i><i></i><i></i><span className="t">Live · Simul</span><span className="badge live">Live</span></div>
            <div className="cb">
              <div className="gmrow"><img className="av" src="ds/photo-avetik.png" alt="" /><div><div className="gmn">GM Avetik</div><div className="gms">Simul · playing 12 boards</div></div></div>
              <div className="boards">
                <div className="mini"><img src="ds/chess-board.png" alt="" /></div>
                <div className="mini"><img src="ds/chess-board.png" alt="" /></div>
                <div className="more">+10<br />boards</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-foots">
          <div className="ft"><div className="fi">{gridIcon}</div><div className="fc"><div className="fl">10,000 puzzles</div><div className="fd">Practice exactly what you need — puzzles tagged by theme.</div></div></div>
          <div className="ft"><div className="fi">{checkIcon}</div><div className="fc"><div className="fl">ChessMood in Practice</div><div className="fd">Interactive lessons where you make the moves yourself.</div></div></div>
          <div className="ft"><div className="fi">{playIcon}</div><div className="fc"><div className="fl">Play with Grandmasters</div><div className="fd">Spar in live games and simuls against titled players.</div></div></div>
        </div>
      </section>
    );
  }
  window.MethodLoop = MethodLoop;
})();
