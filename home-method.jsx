/* eslint-disable */
// Homepage section — "Linear glass console" (ported from Method · N1).
// Self-contained (IIFE) so its locals don't collide with other section modules.
(function () {
  const { useState } = React;

  const STEPS = [
    { n: '01', t: 'Diagnose', tag: 'AI Coach', tint: '#5B8FD6',
      head: 'Know exactly where you stand.',
      d: 'Charlie, your AI coach, scans your real games and surfaces the exact gaps holding your rating back.',
      points: ['Analysis across your last 100+ games', 'A weakness map ranked by lost rating', 'A calibration test pins your true level'] },
    { n: '02', t: 'Study & Practice', tag: 'Courses & Puzzles', tint: '#7C8AD9',
      head: 'Train precisely what you need.',
      d: 'Grandmaster-taught courses, handpicked puzzles and quizzes that lock every concept into memory.',
      points: ['500+ hours of Grandmaster courses', 'Daily puzzles matched to your level', 'Spar in live games with titled players'] },
    { n: '03', t: 'Fix', tag: 'Adaptive Plan', tint: '#3FA6A0',
      head: 'Close every leak — for good.',
      d: 'We re-diagnose as you grow and rebuild your plan, so you’re always training what matters next.',
      points: ['BugZone tracks recurring mistakes', 'FixMood finds every turning point', 'Ask a GM about any position'] },
  ];

  const INTRO = "We’ve spent 8 years crafting and evolving the ChessMood method with thousands of students, and we’re confident it works.";

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

  function Copy({ s, cls = 'copy' }) {
    return (
      <div className={cls}>
        <div className="tag">{s.tag}</div>
        <h3>{s.head}</h3>
        <p>{s.d}</p>
        <ul>{s.points.map((p, i) => <li key={i}><span className="ck">✓</span>{p}</li>)}</ul>
      </div>
    );
  }

  // Framed product UI for the 3/4 column (board graphic + in-product text panel)
  const DiagnoseUI = () => (
    <div className="pane">
      <div className="bd">
        <img src="ds/chess-board.png" alt="" />
        <div className="badge"><em></em>Analyzing 142 games</div>
      </div>
      <div className="pnl">
        <div className="ph"><span className="dot"></span>Charlie · AI Coach<span className="r">Live</span></div>
        <div className="bignum"><span className="lab">Estimated strength</span><span className="v">1642</span></div>
        <div className="evalbar2"><b style={{ left: '63%' }}></b></div>
        <div className="wklist">
          <div className="wk"><em className="hi"></em>Hanging pieces in the opening<s className="hi">High</s></div>
          <div className="wk"><em className="md"></em>Rook endgame technique<s className="md">Med</s></div>
          <div className="wk"><em className="lo"></em>Time management<s className="lo">Low</s></div>
        </div>
      </div>
    </div>
  );
  const StudyUI = () => (
    <div className="pane">
      <div className="bd">
        <img src="ds/chess-board.png" alt="" />
        <div className="badge"><em></em>Scotch Gambit · Lesson 4</div>
      </div>
      <div className="pnl">
        <div className="ph"><span className="dot"></span>Grandmaster course<span className="r">4 / 12</span></div>
        <div className="gmrow"><img src="ds/photo-avetik.png" alt="" /><div><div className="gmn">GM Avetik Grigoryan</div><div className="gmt">Founder · 2600+ FIDE</div></div></div>
        <div className="prog2"><b style={{ width: '34%' }}></b></div>
        <div className="lessons">
          <div className="ls done"><span className="lk">✓</span>Key ideas &amp; pawn breaks</div>
          <div className="ls done"><span className="lk">✓</span>Typical middlegame plans</div>
          <div className="ls on"><span className="lk">▶</span>Handling the d5 push</div>
        </div>
        <div className="puz"><span>Today’s puzzles</span><b>12 solved</b></div>
      </div>
    </div>
  );
  const FixUI = () => (
    <div className="pane">
      <div className="bd">
        <img src="ds/chess-board.png" alt="" />
        <div className="badge"><em></em>FixMood · turning point</div>
      </div>
      <div className="pnl">
        <div className="ph"><span className="dot"></span>Your plan · this week<span className="r">62%</span></div>
        <div className="prog2"><b style={{ width: '62%' }}></b></div>
        <div className="lessons">
          <div className="ls done"><span className="lk">✓</span>Caro-Kann · main line review</div>
          <div className="ls done"><span className="lk">✓</span>20 handpicked tactics</div>
          <div className="ls on"><span className="lk">▶</span>Rook endgames · lesson 3</div>
        </div>
        <div className="bug">
          <div className="bugh">BugZone · recurring</div>
          <div className="bugrow"><em className="hi"></em>Hanging pieces<s>3×</s></div>
          <div className="bugrow"><em className="md"></em>Premature attacks<s>2×</s></div>
        </div>
      </div>
    </div>
  );
  const ConsoleUI = ({ phase }) => (
    <div className="stepui">
      <div className="tb"><i></i><i></i><i></i><span className="u">chessmood.com/app</span></div>
      {phase === 0 && <DiagnoseUI />}
      {phase === 1 && <StudyUI />}
      {phase === 2 && <FixUI />}
    </div>
  );

  function MethodConsole() {
    const [a, setA] = useState(0);
    const s = STEPS[a];
    return (
      <div className="sec n1" data-screen-label="Method · Linear glass console">
        <div className="head">
          <div className="eyebrow">Built by Grandmasters · Enhanced by AI</div>
          <h2>Diagnose. <span className="g">Study &amp; Practice.</span> Fix.</h2>
          <p className="intro">{INTRO}</p>
        </div>
        <div className="tabswrap"><div className="tabs">
          {STEPS.map((p, i) => <React.Fragment key={i}>
            {i > 0 && <span className="seq" aria-hidden="true">›</span>}
            <button className={"tab" + (i === a ? " on" : "")} onClick={() => setA(i)}>{p.t}</button>
          </React.Fragment>)}
        </div></div>
        <div className="stage"><Copy s={s} /><div className="glass"><ConsoleUI phase={a} /></div></div>
      </div>
    );
  }

  window.MethodConsole = MethodConsole;
})();
