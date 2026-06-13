/* eslint-disable */
// Method — 10 more directions (x1–x10). Reuses shared helpers from the main
// script via window. Loaded AFTER the main inline script, BEFORE the final render.
const { React, useState, STEPS, INTRO, FrameScreen, Copy } = window;

const XHead = ({ title }) => (
  <div className="xhead">
    <div className="eyebrow">Built by Grandmasters · Enhanced by AI</div>
    <h2>{title || <>Diagnose. <span className="g">Study &amp; Practice.</span> Fix.</>}</h2>
    <p className="intro">{INTRO}</p>
  </div>
);

/* X1 — sticky accordion + pinned preview */
function X1(){
  const [a,setA] = useState(0);
  return <div className="sec x1 xd">
    <XHead/>
    <div className="x1-grid">
      <div className="x1-acc">
        {STEPS.map((p,i)=><div key={i} className={"x1-item"+(i===a?" on":"")} onClick={()=>setA(i)}>
          <div className="x1-bar"></div>
          <div>
            <div className="x1-k"><span className="n">{p.n}</span>{p.t}</div>
            <div className="x1-d">
              <p>{p.d}</p>
              <ul className="xlist">{p.points.map((q,j)=><li key={j}><span className="ck">✓</span>{q}</li>)}</ul>
            </div>
          </div>
        </div>)}
      </div>
      <div className="x1-prev"><div className="glass"><FrameScreen phase={a}/></div></div>
    </div>
  </div>;
}

/* X2 — filmstrip scroll-snap */
function X2(){
  return <div className="sec x2 xl">
    <div className="x2-head">
      <div>
        <div className="eyebrow">The ChessMood Method</div>
        <h2>Diagnose. Study &amp; Practice. Fix.</h2>
      </div>
      <p className="intro">{INTRO}</p>
    </div>
    <div className="x2-strip">
      {STEPS.map((p,i)=><div key={i} className="x2-card">
        <FrameScreen phase={i}/>
        <div className="x2-meta"><span className="x2-n">{p.n}</span><div><h3>{p.t}</h3><p>{p.d}</p></div></div>
      </div>)}
    </div>
  </div>;
}

/* X3 — big-type split */
function X3(){
  return <div className="sec x3 xl">
    <div className="x3-left">
      <div className="eyebrow">The ChessMood Method</div>
      <h2>Three moves to a higher rating.</h2>
      <p className="intro">{INTRO}</p>
      <div className="x3-tag">Diagnose · Study &amp; Practice · Fix</div>
    </div>
    <div className="x3-list">
      {STEPS.map((p,i)=><div key={i} className="x3-row">
        <span className="x3-n">{p.n}</span>
        <div className="x3-scr"><FrameScreen phase={i}/></div>
        <div className="x3-c"><h3>{p.t}</h3><p>{p.d}</p></div>
      </div>)}
    </div>
  </div>;
}

/* X4 — watermark zigzag */
function X4(){
  return <div className="sec x4 xl">
    <XHead/>
    <div className="x4-rows">
      {STEPS.map((p,i)=><div key={i} className={"x4-row"+(i%2?" rev":"")}>
        <div className="x4-scr"><FrameScreen phase={i}/></div>
        <div className="x4-c">
          <span className="x4-wm">{p.n}</span>
          <div className="x4-tag">{p.tag}</div>
          <h3>{p.head}</h3>
          <p>{p.d}</p>
          <ul className="xlist">{p.points.map((q,j)=><li key={j}><span className="ck">✓</span>{q}</li>)}</ul>
        </div>
      </div>)}
    </div>
  </div>;
}

/* X5 — orbit loop */
function X5(){
  const [a,setA] = useState(0);
  const pos = ['x5-top','x5-right','x5-left'];
  return <div className="sec x5 xd">
    <XHead title={<>A loop that never stops improving you.</>}/>
    <div className="x5-orbit">
      <div className="x5-ring"></div>
      <div className="x5-center"><div className="glass"><FrameScreen phase={a}/></div></div>
      {STEPS.map((p,i)=><button key={i} className={"x5-node "+pos[i]+(i===a?" on":"")} onClick={()=>setA(i)}>
        <span className="x5-n">{p.n}</span><span className="x5-t">{p.t}</span>
      </button>)}
    </div>
  </div>;
}

/* X6 — metric tabs */
function X6(){
  const [a,setA] = useState(0); const s = STEPS[a];
  const stats = [
    [['100+','games scanned'],['1','weakness map'],['Your','true level']],
    [['500+','GM hours'],['Daily','tuned puzzles'],['Live','titled sparring']],
    [['Auto','re-diagnosis'],['Every','turning point'],['1-tap','ask a GM']],
  ];
  return <div className="sec x6 xl">
    <XHead/>
    <div className="x6-tabs">
      {STEPS.map((p,i)=><button key={i} className={"x6-tab"+(i===a?" on":"")} onClick={()=>setA(i)}>
        <span className="n">{p.n}</span>{p.t}</button>)}
    </div>
    <div className="x6-body">
      <Copy s={s}/>
      <div className="x6-right">
        <FrameScreen phase={a}/>
        <div className="x6-stats">{stats[a].map(([v,l],i)=><div key={i} className="x6-stat"><div className="v">{v}</div><div className="l">{l}</div></div>)}</div>
      </div>
    </div>
  </div>;
}

/* X7 — console log */
function X7(){
  const cmd = ['diagnose','study_and_practice','fix'];
  return <div className="sec x7 xd">
    <div className="x7-grid">
      <div className="x7-left">
        <div className="eyebrow">The ChessMood Method</div>
        <h2>The loop, step by step.</h2>
        <p className="intro">{INTRO}</p>
        <div className="x7-log">
          {STEPS.map((p,i)=><div key={i} className="x7-line">
            <span className="x7-pr">→</span>
            <span className="x7-cmd">{cmd[i]}</span>
            <span className="x7-out">{p.d}</span>
          </div>)}
        </div>
      </div>
      <div className="x7-right"><div className="glass"><FrameScreen phase={0}/></div></div>
    </div>
  </div>;
}

/* X8 — hover-reveal columns */
function X8(){
  const [a,setA] = useState(0);
  return <div className="sec x8 xl">
    <XHead/>
    <div className="x8-cols">
      {STEPS.map((p,i)=><div key={i} className={"x8-col"+(i===a?" on":"")} onMouseEnter={()=>setA(i)}>
        <div className="x8-scr"><FrameScreen phase={i}/></div>
        <div className="x8-info"><span className="x8-n">{p.n} · {p.tag}</span><h3>{p.t}</h3><p>{p.d}</p></div>
      </div>)}
    </div>
  </div>;
}

/* X9 — magazine feature */
function X9(){
  return <div className="sec x9 xl">
    <XHead/>
    <div className="x9-grid">
      <div className="x9-feat">
        <FrameScreen phase={0}/>
        <div className="x9-fc"><span className="x9-n">01</span><div><h3>{STEPS[0].head}</h3><p>{STEPS[0].d}</p></div></div>
      </div>
      <div className="x9-side">
        {[1,2].map(i=><div key={i} className="x9-mini">
          <FrameScreen phase={i}/>
          <div className="x9-mc"><span className="x9-n">{STEPS[i].n} · {STEPS[i].tag}</span><h3>{STEPS[i].t}</h3><p>{STEPS[i].d}</p></div>
        </div>)}
      </div>
    </div>
  </div>;
}

/* X10 — vertical progress rail */
function X10(){
  const [a,setA] = useState(0);
  return <div className="sec x10 xl">
    <div className="x10-grid">
      <div className="x10-rail">
        <div className="x10-head">
          <div className="eyebrow">The ChessMood Method</div>
          <h2>Diagnose. Study &amp; Practice. Fix.</h2>
          <p className="intro">{INTRO}</p>
        </div>
        {STEPS.map((p,i)=><button key={i} className={"x10-step"+(i===a?" on":"")} onClick={()=>setA(i)}>
          <span className="x10-n">{p.n}</span>
          <div className="x10-c"><div className="x10-t">{p.t}</div><div className="x10-d">{p.d}</div></div>
        </button>)}
      </div>
      <div className="x10-prev"><FrameScreen phase={a}/></div>
    </div>
  </div>;
}

Object.assign(window, { X1, X2, X3, X4, X5, X6, X7, X8, X9, X10 });
