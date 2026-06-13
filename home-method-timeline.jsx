/* eslint-disable */
// Homepage section — Method "Vertical timeline + screen" (dark, from M2).
(function () {
  const PH = [
    { t: "Diagnose", tag: "AI Coach", d: "Charlie, your AI coach, scans your real games and surfaces the exact gaps holding your rating back." },
    { t: "Study & Practice", tag: "Courses & Puzzles", d: "Grandmaster-taught courses, handpicked puzzles and quizzes that lock every concept into memory." },
    { t: "Fix", tag: "Adaptive Plan", d: "We re-diagnose as you grow and rebuild your plan — so you’re always training what matters next." },
  ];
  const Img = ({ src, pos }) => <img className="ph" src={src} alt="" style={pos ? { objectPosition: pos } : null} />;
  const Bar = () => <div className="bar"><i></i><i></i><i></i><div className="pill"></div></div>;
  const Coach = () => (
    <div className="ui coach">
      <div className="uihead"><span className="dot"></span>Charlie · AI Coach<span className="tagr">142 games</span></div>
      <div className="evalbar"><b style={{ left: '63%' }}></b></div>
      <div className="wk"><em className="hi"></em>Hanging pieces in the opening<s className="hi">High</s></div>
      <div className="wk"><em className="md"></em>Rook endgame technique<s className="md">Medium</s></div>
      <div className="wk"><em className="lo"></em>Time management in the middlegame<s className="lo">Low</s></div>
    </div>
  );
  const Plan = () => (
    <div className="ui plan">
      <div className="uihead"><span className="dot"></span>Your plan · this week<span className="tagr">62%</span></div>
      <div className="prog"><b style={{ width: '62%' }}></b></div>
      <div className="task done"><span className="ck">✓</span>Caro-Kann · main line review</div>
      <div className="task done"><span className="ck">✓</span>20 handpicked tactics</div>
      <div className="task"><span className="ck"></span>Rook endgames · lesson 3</div>
    </div>
  );
  const Screen = ({ phase }) => phase === 1 ? <Img src="ds/chess-board.png" pos="50% 50%" /> : (phase === 2 ? <Plan /> : <Coach />);
  const FrameScreen = ({ phase }) => <div className="frame"><Bar /><div className="scr"><Screen phase={phase} /></div></div>;

  function MethodTimeline() {
    return (
      <div className="sec m2" data-screen-label="Method · Vertical timeline">
        <div className="left">
          <div className="eyebrow">How the method works</div>
          <h2>Diagnose. Study &amp; Practice. Fix.</h2>
          {PH.map((p, i) => (
            <div className={"step" + (i === 0 ? " on" : "")} key={i}>
              <div className="b">{i + 1}</div>
              <div><h3>{p.t}</h3><p>{p.d}</p></div>
            </div>
          ))}
        </div>
        <div className="right"><FrameScreen phase={0} /></div>
      </div>
    );
  }
  window.MethodTimeline = MethodTimeline;
})();
