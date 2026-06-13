/* eslint-disable */
// ChessMood 3 — "The Method" section: 5 layout models for the 3-phase loop,
// each phase holding 3 feature screens (mocks live in product-screens.jsx,
// which MUST load first). Uses globals PW, F, METHOD_PHASES, FeatureScreen,
// FeatureIcon. All names PD-/pd-prefixed to avoid collisions.

const { useState: useStatePS } = React;

const PD = {
  text:'var(--cm-text, #FFFFFF)', mut:'var(--cm-mut, rgba(255,255,255,0.66))',
  mut2:'var(--cm-mut2, rgba(255,255,255,0.46))', line:'var(--cm-line, rgba(255,255,255,0.10))',
  glass:'var(--cm-glass, rgba(255,255,255,0.05))', glassHi:'var(--cm-glassHi, rgba(255,255,255,0.08))',
  bg1:'var(--cm-bg1, #070C16)', bg2:'var(--cm-bg2, #0A1326)', orange:'#F57C00',
};
const pdHead = (head) => `${(head && head.headFont) || 'Inter'}, Inter, system-ui, sans-serif`;
const pdAlpha = (hex, a) => { const h=(hex||'#888').replace('#',''); const n=parseInt(h.length===3?h.split('').map(c=>c+c).join(''):h,16); return `rgba(${(n>>16)&255}, ${(n>>8)&255}, ${n&255}, ${a})`; };
// theme-aware section base: in light, a soft muted band so white product windows pop.
const pdSectionBg = (theme, glow) => theme==='light'
  ? (glow || 'linear-gradient(180deg, #EEF2F7 0%, #F6F8FB 60%, #EEF2F7 100%)')
  : (glow || 'linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 50%, var(--cm-bg1) 100%)');

const HEADLINE_M = <React.Fragment>Diagnose. Study &amp; Practice. Fix.</React.Fragment>;
const SUB_M = 'One repeating loop, powered by Grandmasters and AI — the rhythm that turns effort into rating.';

function MethodEyebrow() {
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:9, font:`600 12px/16px ${F.sans}`, letterSpacing:'.16em', textTransform:'uppercase', color:PD.orange }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:PD.orange }} /> The method
    </div>
  );
}
function MethodHeading({ head, sub=true, align='center', mb=52 }) {
  return (
    <div style={{ textAlign:align, marginBottom:mb, maxWidth: align==='center'?880:'none', marginLeft: align==='center'?'auto':0, marginRight: align==='center'?'auto':0 }}>
      <MethodEyebrow />
      <h2 style={{ margin:'18px 0 0', fontFamily:pdHead(head), fontWeight:700, fontSize:50, lineHeight:1.08, letterSpacing:'-.035em', color:PD.text }}>{HEADLINE_M}</h2>
      {sub && <p style={{ margin:'20px auto 0', maxWidth:620, font:`400 18px/29px ${F.sans}`, color:PD.mut }}>{SUB_M}</p>}
    </div>
  );
}

// phase number/name pill
function PhaseTag({ p, idx, active=true, onEnter, size='md' }) {
  const big = size==='md';
  return (
    <div onMouseEnter={onEnter} style={{ display:'inline-flex', alignItems:'center', gap:10, cursor:'default' }}>
      <span style={{ width:big?30:26, height:big?30:26, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
        background: active?pdAlpha(p.tint,0.18):'transparent', border:`1px solid ${active?pdAlpha(p.tint,0.6):PD.line}`,
        font:`700 ${big?13:11}px/1 ${F.sans}`, color: active?p.tint:PD.mut2 }}>{idx+1}</span>
      <span style={{ font:`600 ${big?18:15}px/1 ${F.sans}`, color: active?PD.text:PD.mut2 }}>{p.name}</span>
    </div>
  );
}

function LoopCue({ label='and the loop repeats', center=true }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent: center?'center':'flex-start', gap:12 }}>
      {center && <span style={{ height:1, width:56, background:PD.line }} />}
      <span style={{ display:'inline-flex', alignItems:'center', gap:8, font:`600 12px/1 ${F.sans}`, letterSpacing:'.09em', textTransform:'uppercase', color:PD.mut }}>
        <span style={{ color:PD.orange, fontSize:15 }}>↻</span> {label}
      </span>
      {center && <span style={{ height:1, width:56, background:PD.line }} />}
    </div>
  );
}

// caption under/over a feature screen (name + blurb)
function FeatureCaption({ f, align='left', maxWidth=300 }) {
  return (
    <div style={{ textAlign:align, maxWidth, marginLeft: align==='center'?'auto':0, marginRight: align==='center'?'auto':0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:9, justifyContent: align==='center'?'center':'flex-start' }}>
        <FeatureIcon feature={f} size={18} />
        <span style={{ font:`600 15px/19px ${F.sans}`, color:PD.text }}>{f.name}</span>
      </div>
      <p style={{ margin:'8px 0 0', font:`400 13.5px/20px ${F.sans}`, color:PD.mut }}>{f.blurb}</p>
    </div>
  );
}

// =====================================================================
// A · STUDIO — CONNECTED ANIMATED FLOW. An orange dot travels the path
// Diagnose → Study → Fix → (loops back); the active phase's 3 screens
// cross-fade in below. Auto-advances; hover the rail to pause, click a node.
// =====================================================================
function ProductStudio({ head }) {
  const [act, setAct] = useStatePS(0);
  const [paused, setPaused] = useStatePS(false);
  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setAct(a => (a + 1) % METHOD_PHASES.length), 4200);
    return () => clearInterval(id);
  }, [paused]);
  const p = METHOD_PHASES[act];
  const nodeX = [100/6, 50, 500/6];                 // node centres (%)
  const dotX = nodeX[act];
  return (
    <section data-screen-label="Method · Studio" style={{ position:'relative', width:PW, overflow:'hidden', background:PD.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background:`
        radial-gradient(70% 42% at 50% 6%, rgb(var(--cm-glow) / calc(34% * var(--cm-glow-i))) 0%, transparent 54%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 50%, var(--cm-bg1) 100%)` }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:1080, margin:'0 auto', padding:'104px 64px 110px' }}>
        <div className="gm-rise"><MethodHeading head={head} mb={44} /></div>

        {/* ---- the connected flow rail ---- */}
        <div className="gm-rise" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}
          style={{ animationDelay:'70ms', position:'relative', height:96, marginBottom:18 }}>
          {/* return-loop arc (Fix → Diagnose) */}
          <svg viewBox="0 0 100 34" preserveAspectRatio="none" style={{ position:'absolute', left:0, right:0, top:0, width:'100%', height:38, overflow:'visible' }}>
            <defs><marker id="loopArrow" markerWidth="5" markerHeight="5" refX="2.6" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill={PD.orange}/></marker></defs>
            <path className="gm-orbit" d={`M ${nodeX[2]} 30 C ${nodeX[2]} 2, ${nodeX[0]} 2, ${nodeX[0]} 28`} fill="none"
              stroke={pdAlpha('#F57C00',0.55)} strokeWidth="0.5" markerEnd="url(#loopArrow)" vectorEffect="non-scaling-stroke" />
          </svg>
          <span style={{ position:'absolute', left:'50%', top:0, transform:'translateX(-50%)', font:`600 10.5px/1 ${F.sans}`, letterSpacing:'.1em', textTransform:'uppercase', color:pdAlpha('#F57C00',0.85), display:'inline-flex', alignItems:'center', gap:6 }}>
            <span style={{ fontSize:13 }}>↻</span> the loop repeats
          </span>
          {/* base line */}
          <div style={{ position:'absolute', left:`${nodeX[0]}%`, right:`${100-nodeX[2]}%`, top:64, height:2, background:PD.line, borderRadius:2 }} />
          {/* orange progress fill up to active node */}
          <div style={{ position:'absolute', left:`${nodeX[0]}%`, top:64, height:2, borderRadius:2, background:PD.orange,
            width:`${dotX - nodeX[0]}%`, transition:'width .6s cubic-bezier(.2,0,0,1)' }} />
          {/* nodes */}
          {METHOD_PHASES.map((ph,i)=>{
            const on = i===act, done = i<act;
            return (
              <button key={ph.key} onClick={()=>setAct(i)} onMouseEnter={()=>setAct(i)}
                style={{ position:'absolute', left:`${nodeX[i]}%`, top:64, transform:'translate(-50%,-50%)', cursor:'pointer', background:'none', border:'none', padding:0,
                  display:'flex', flexDirection:'column', alignItems:'center' }}>
                <span style={{ width:on?20:14, height:on?20:14, borderRadius:'50%', transition:'all .3s ease',
                  background: on?PD.orange : done?pdAlpha('#F57C00',0.5):'var(--cm-bg1, #070C16)',
                  border:`2px solid ${on||done?PD.orange:PD.line}`, boxShadow: on?`0 0 0 6px ${pdAlpha('#F57C00',0.16)}`:'none' }} />
              </button>
            );
          })}
          {/* travelling dot */}
          <span style={{ position:'absolute', left:`${dotX}%`, top:64, transform:'translate(-50%,-50%)',
            width:8, height:8, borderRadius:'50%', background:'#fff', boxShadow:`0 0 10px 2px ${pdAlpha('#F57C00',0.9)}`,
            transition:'left .6s cubic-bezier(.2,0,0,1)', pointerEvents:'none' }} />
          {/* node labels */}
          {METHOD_PHASES.map((ph,i)=>(
            <span key={ph.key} style={{ position:'absolute', left:`${nodeX[i]}%`, top:80, transform:'translateX(-50%)', whiteSpace:'nowrap',
              font:`${i===act?700:500} 14px/1 ${F.sans}`, color: i===act?PD.text:PD.mut2, transition:'color .3s ease' }}>{ph.name}</span>
          ))}
        </div>

        <div style={{ textAlign:'center', minHeight:48, marginBottom:30 }}>
          <p key={p.key} className="gm-fade" style={{ margin:0, font:`400 16px/24px ${F.sans}`, color:PD.mut, maxWidth:560, marginInline:'auto' }}>{p.blurb}</p>
        </div>

        {/* active phase's 3 screens */}
        <div key={p.key} className="gm-fade" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}
          style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24, justifyItems:'center' }}>
          {p.features.map(f=>(
            <div key={f.key} style={{ display:'flex', flexDirection:'column', gap:15 }}>
              <FeatureScreen featureKey={f.key} w={300} />
              <FeatureCaption f={{...f, tint:p.tint}} align="center" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// A2 · STUDIO (trust first) — KRISP-STYLE sticky-tab product showcase.
// Pill tabs = phases (sticky). Active phase: feature list left (active one
// highlighted), big product screen right, play/scrubber auto-advances.
// =====================================================================
const PHASE_HEADLINE = { diagnose:'Know exactly where you stand.', study:'Train precisely what you need.', fix:'Close every leak — for good.' };

function ExtLink({ color }) {
  return <svg viewBox="0 0 24 24" width="16" height="16" style={{ stroke:color, strokeWidth:2, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' }}><path d="M14 5h5v5M19 5l-8 8M11 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/></svg>;
}

function ProductStudioTrust({ head }) {
  const [ph, setPh] = useStatePS(0);
  const [ft, setFt] = useStatePS(0);
  const [playing, setPlaying] = useStatePS(true);
  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setFt(prevF => {
        if (prevF < 2) return prevF + 1;
        setPh(prevP => (prevP + 1) % METHOD_PHASES.length);
        return 0;
      });
    }, 3800);
    return () => clearInterval(id);
  }, [playing]);
  const p = METHOD_PHASES[ph];
  const f = p.features[ft];
  return (
    <section data-screen-label="Method · Studio (trust first)" style={{ position:'relative', width:PW, overflow:'hidden', background:PD.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background:`
        radial-gradient(72% 40% at 50% 5%, rgb(var(--cm-glow) / calc(30% * var(--cm-glow-i))) 0%, transparent 52%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 50%, var(--cm-bg1) 100%)` }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:1240, margin:'0 auto', padding:'92px 64px 104px' }}>
        {/* sticky pill tabs */}
        <div style={{ position:'sticky', top:18, zIndex:5, marginBottom:30 }}>
          <div style={{ display:'inline-flex', gap:4, padding:5, borderRadius:999, background:PD.glass, border:`1px solid ${PD.line}`, backdropFilter:'blur(10px)' }}>
            {METHOD_PHASES.map((ph2,i)=>(
              <button key={ph2.key} onClick={()=>{ setPh(i); setFt(0); }} style={{ padding:'9px 18px', borderRadius:999, cursor:'pointer', border:'none',
                background: i===ph ? PD.text : 'transparent', transition:'background .16s ease',
                font:`600 14px/1 ${F.sans}`, color: i===ph ? PD.bg1 : PD.mut }}>{ph2.name}</button>
            ))}
          </div>
        </div>

        {/* per-phase headline */}
        <div key={'h'+p.key} className="gm-fade" style={{ marginBottom:36, maxWidth:760 }}>
          <h2 style={{ margin:0, fontFamily:pdHead(head), fontWeight:700, fontSize:46, lineHeight:1.1, letterSpacing:'-.03em', color:PD.text }}>{PHASE_HEADLINE[p.key]}</h2>
          <p style={{ margin:'16px 0 0', font:`400 18px/28px ${F.sans}`, color:PD.mut }}>{p.blurb}</p>
        </div>

        {/* showcase: feature list + screen */}
        <div style={{ display:'grid', gridTemplateColumns:'0.82fr 1.18fr', gap:48, alignItems:'start' }}>
          <div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {p.features.map((feat,i)=>{
                const on = i===ft;
                const inner = (
                  <button onClick={()=>setFt(i)} style={{ display:'block', width:'100%', textAlign:'left', cursor:'pointer', borderRadius:13,
                    border: on?'none':`1px solid transparent`, background: on?PD.bg1:'transparent', padding:'16px 18px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:11 }}>
                      <span style={{ width:9, height:9, borderRadius:'50%', flexShrink:0, background: on?PD.orange:PD.mut2 }} />
                      <span style={{ font:`600 18px/22px ${F.sans}`, color: on?PD.text:PD.mut }}>{feat.name}</span>
                      {on && <span style={{ marginLeft:'auto', display:'inline-flex', alignItems:'center', gap:10 }}>
                        <span style={{ padding:'3px 9px', borderRadius:6, background:PD.glassHi, font:`600 10px/1 ${F.sans}`, letterSpacing:'.06em', textTransform:'uppercase', color:PD.mut }}>demo</span>
                        <ExtLink color={PD.orange} />
                      </span>}
                    </div>
                    <p style={{ margin:'9px 0 0 20px', font:`400 14px/21px ${F.sans}`, color: on?PD.mut:PD.mut2, maxWidth:340 }}>{feat.blurb}</p>
                  </button>
                );
                return on
                  ? <div key={feat.key} style={{ borderRadius:14, padding:1, background:`linear-gradient(135deg, ${PD.orange}, ${pdAlpha(p.tint,0.8)})` }}>{inner}</div>
                  : <div key={feat.key}>{inner}</div>;
              })}
            </div>
            {/* play / scrubber */}
            <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:26, marginLeft:18 }}>
              <button onClick={()=>setPlaying(v=>!v)} style={{ width:42, height:42, borderRadius:'50%', cursor:'pointer',
                background:PD.glass, border:`1px solid ${PD.line}`, color:PD.text, display:'flex', alignItems:'center', justifyContent:'center', font:'14px/1 system-ui' }}>
                {playing ? '❚❚' : '▶'}
              </button>
              <div style={{ display:'flex', gap:7 }}>
                {p.features.map((_,i)=>(
                  <span key={i} style={{ width: i===ft?34:18, height:5, borderRadius:3, background: i===ft?PD.orange : i<ft?pdAlpha('#F57C00',0.4):PD.line, transition:'all .3s ease' }} />
                ))}
              </div>
            </div>
          </div>
          <div key={f.key} className="gm-fade" style={{ display:'flex', justifyContent:'center' }}>
            <FeatureScreen featureKey={f.key} w={560} />
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// B · AURORA — loop selector (pills + arrows); active phase's 3 screens glow.
// =====================================================================
function ProductAurora({ head }) {
  const [act, setAct] = useStatePS(0);
  const p = METHOD_PHASES[act];
  return (
    <section data-screen-label="Method · Aurora" style={{ position:'relative', width:PW, overflow:'hidden', background:PD.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background:`
        radial-gradient(120% 56% at 50% 116%, rgb(var(--cm-glow) / calc(50% * var(--cm-glow-i))) 0%, rgb(var(--cm-glow) / calc(18% * var(--cm-glow-i))) 38%, transparent 64%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 64%, var(--cm-bg1) 100%)` }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:1180, margin:'0 auto', padding:'104px 64px 116px' }}>
        <div className="gm-rise"><MethodHeading head={head} mb={36} /></div>
        {/* loop selector */}
        <div className="gm-rise" style={{ animationDelay:'60ms', display:'flex', alignItems:'center', justifyContent:'center', gap:14, marginBottom:42 }}>
          {METHOD_PHASES.map((ph,i)=>(
            <React.Fragment key={ph.key}>
              <button onMouseEnter={()=>setAct(i)} onClick={()=>setAct(i)} style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'10px 18px', borderRadius:999, cursor:'pointer',
                background: i===act ? pdAlpha(ph.tint,0.16) : PD.glass, border:`1px solid ${i===act ? pdAlpha(ph.tint,0.6) : PD.line}`, transition:'all .16s ease' }}>
                <span style={{ width:24, height:24, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                  background: i===act?ph.tint:'transparent', border:`1px solid ${i===act?ph.tint:PD.mut2}`, font:`700 11px/1 ${F.sans}`, color: i===act?'#fff':PD.mut2 }}>{i+1}</span>
                <span style={{ font:`600 15px/1 ${F.sans}`, color: i===act?PD.text:PD.mut }}>{ph.name}</span>
              </button>
              {i<2 && <span style={{ color:PD.mut2, fontSize:18 }}>→</span>}
            </React.Fragment>
          ))}
          <span style={{ color:PD.orange, fontSize:18, marginLeft:2 }}>↻</span>
        </div>
        <div style={{ textAlign:'center', marginBottom:26 }}>
          <p style={{ margin:0, font:`400 16px/24px ${F.sans}`, color:PD.mut, maxWidth:560, marginInline:'auto' }}>{p.blurb}</p>
        </div>
        <div key={p.key} className="gm-fade" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24, justifyItems:'center' }}>
          {p.features.map(f=>(
            <div key={f.key} style={{ display:'flex', flexDirection:'column', gap:15 }}>
              <FeatureScreen featureKey={f.key} w={300} />
              <FeatureCaption f={{...f, tint:p.tint}} align="center" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// C · OBSERVATORY — editorial: phase list left (hover to switch), screens right.
// =====================================================================
function ProductObservatory({ head }) {
  const [act, setAct] = useStatePS(0);
  const p = METHOD_PHASES[act];
  return (
    <section data-screen-label="Method · Observatory" style={{ position:'relative', width:PW, overflow:'hidden', background:PD.bg1, fontFamily:F.sans }}>
      <div style={{ position:'absolute', inset:0, background:`
        radial-gradient(50% 60% at 94% 4%, rgb(var(--cm-glow) / calc(40% * var(--cm-glow-i))) 0%, transparent 56%),
        radial-gradient(46% 54% at 2% 98%, rgba(245,124,0,0.09) 0%, transparent 60%)` }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:1240, margin:'0 auto', padding:'100px 64px 108px',
        display:'grid', gridTemplateColumns:'0.74fr 1.26fr', gap:64, alignItems:'start' }}>
        <div className="gm-rise" style={{ position:'sticky', top:40 }}>
          <MethodHeading head={head} sub={false} align="left" mb={22} />
          <p style={{ margin:'0 0 28px', font:`400 16px/26px ${F.sans}`, color:PD.mut, maxWidth:380 }}>{SUB_M}</p>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {METHOD_PHASES.map((ph,i)=>(
              <div key={ph.key} onMouseEnter={()=>setAct(i)}
                style={{ padding:'14px 16px', borderRadius:12, cursor:'default', transition:'all .18s ease',
                  background: i===act?PD.glass:'transparent', border:`1px solid ${i===act?pdAlpha(ph.tint,0.4):'transparent'}` }}>
                <div style={{ display:'flex', alignItems:'center', gap:11 }}>
                  <span style={{ width:28, height:28, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                    background: i===act?pdAlpha(ph.tint,0.2):'transparent', border:`1px solid ${i===act?pdAlpha(ph.tint,0.6):PD.line}`,
                    font:`700 12px/1 ${F.sans}`, color: i===act?ph.tint:PD.mut2 }}>{i+1}</span>
                  <span style={{ font:`600 18px/1 ${F.sans}`, color: i===act?PD.text:PD.mut }}>{ph.name}</span>
                </div>
                <div style={{ overflow:'hidden', maxHeight: i===act?60:0, opacity:i===act?1:0, transition:'all .22s ease' }}>
                  <p style={{ margin:'10px 0 0 39px', font:`400 13.5px/20px ${F.sans}`, color:PD.mut }}>{ph.blurb}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:22, marginLeft:16 }}><LoopCue center={false} /></div>
        </div>
        <div key={p.key} className="gm-fade" style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {p.features.map((f,fi)=>(
            <div key={f.key} style={{ display:'flex', gap:22, alignItems:'center', flexDirection: fi%2?'row-reverse':'row' }}>
              <FeatureScreen featureKey={f.key} w={360} />
              <FeatureCaption f={{...f, tint:p.tint}} maxWidth={220} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// D · STAGE — GUIDED PRODUCT TOUR. One floating ChessMood app window; an
// animated cursor walks the loop down the side rail, "clicks" each feature,
// and the main panel morphs to that screen. New, premium, cohesive.
// =====================================================================
const ST_RAIL_PADTOP = 18, ST_GROUP_H = 34, ST_ITEM_H = 46, ST_GROUP_GAP = 16;
function stCursorY(gi) {
  const pi = Math.floor(gi/3), within = gi%3;
  return ST_RAIL_PADTOP + pi*(ST_GROUP_H + 3*ST_ITEM_H + ST_GROUP_GAP) + ST_GROUP_H + within*ST_ITEM_H + ST_ITEM_H/2;
}
function ProductStage({ head }) {
  const flat = ALL_FEATURES;
  const [i, setI] = useStatePS(1);
  const [paused, setPaused] = useStatePS(false);
  const [clickTick, setClickTick] = useStatePS(0);
  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => { setI(v => (v + 1) % flat.length); setClickTick(t=>t+1); }, 3000);
    return () => clearInterval(id);
  }, [paused, flat.length]);
  const cur = flat[i];
  const phaseIdx = METHOD_PHASES.findIndex(p => p.key === cur.phase);
  const railW = 258;
  return (
    <section data-screen-label="Method · Stage" style={{ position:'relative', width:PW, overflow:'hidden', background:PD.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background:`
        radial-gradient(60% 56% at 50% 44%, rgb(var(--cm-glow) / calc(46% * var(--cm-glow-i))) 0%, transparent 62%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 52%, var(--cm-bg1) 100%)` }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:1180, margin:'0 auto', padding:'92px 64px 100px' }}>
        <div className="gm-rise" style={{ textAlign:'center', marginBottom:34 }}><MethodHeading head={head} mb={0} /></div>

        {/* floating app window */}
        <div className="gm-float" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}
          style={{ position:'relative', maxWidth:1000, margin:'0 auto' }}>
          <div style={{ position:'absolute', inset:'-6% -4%', borderRadius:32, zIndex:-1,
            background:`radial-gradient(60% 60% at 50% 50%, ${pdAlpha(cur.tint,0.4)} 0%, transparent 70%)`, filter:'blur(26px)', transition:'background .6s ease' }} />
          <div style={{ position:'relative', zIndex:1, borderRadius:16, overflow:'hidden', background:PRS.bg, border:`1px solid rgba(16,24,40,0.16)`,
            boxShadow:'0 44px 96px -34px rgba(16,24,40,0.45), 0 12px 32px -12px rgba(16,24,40,0.16)' }}>
            {/* browser bar */}
            <div style={{ display:'flex', alignItems:'center', gap:12, height:48, padding:'0 16px', background:'#fff', borderBottom:`1px solid ${PRS.line2}` }}>
              <span style={{ display:'flex', gap:6 }}>{['#FF5F57','#FEBC2E','#28C840'].map(c=><span key={c} style={{ width:11, height:11, borderRadius:'50%', background:c }} />)}</span>
              <div style={{ flex:1, display:'flex', justifyContent:'center' }}>
                <span style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:8, background:PRS.panel, border:`1px solid ${PRS.line2}`, font:`500 12px/1 ${F.sans}`, color:PRS.mut }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:PRS.green }} /> app.chessmood.com
                </span>
              </div>
              <span style={{ font:`800 14px/1 ${F.display}`, letterSpacing:'-.02em' }}><span style={{ color:PRS.ink }}>Chess</span><span style={{ color:PRS.orange }}>Mood</span></span>
            </div>
            <div style={{ display:'flex', minHeight:472 }}>
              {/* side rail with cursor */}
              <div style={{ width:railW, flexShrink:0, position:'relative', borderRight:`1px solid ${PRS.line2}`, background:PRS.panel, padding:`${ST_RAIL_PADTOP}px 14px` }}>
                {METHOD_PHASES.map((p,pi)=>(
                  <div key={p.key} style={{ marginBottom: pi<2?ST_GROUP_GAP:0 }}>
                    <div style={{ height:ST_GROUP_H, display:'flex', alignItems:'center', gap:8, padding:'0 8px' }}>
                      <span style={{ width:18, height:18, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                        background:msAlpha(p.tint,0.16), border:`1px solid ${msAlpha(p.tint,0.5)}`, font:`700 9px/1 ${F.sans}`, color:p.tint }}>{pi+1}</span>
                      <span style={{ font:`700 10.5px/1 ${F.sans}`, letterSpacing:'.07em', textTransform:'uppercase', color:PRS.mut2 }}>{p.name}</span>
                    </div>
                    {p.features.map(ft=>{
                      const gi = flat.findIndex(x=>x.key===ft.key);
                      const on = gi===i;
                      return (
                        <button key={ft.key} onClick={()=>{ setI(gi); setClickTick(t=>t+1); }}
                          style={{ display:'flex', alignItems:'center', gap:10, width:'100%', height:ST_ITEM_H, padding:'0 10px', borderRadius:9, cursor:'pointer', textAlign:'left',
                            background: on?'#fff':'transparent', border:`1px solid ${on?PRS.line:'transparent'}`, boxShadow: on?'0 1px 3px rgba(16,24,40,0.06)':'none', transition:'all .2s ease' }}>
                          <FeatureIcon feature={{...ft, tint:p.tint}} size={16} ring={false} />
                          <span style={{ font:`${on?600:500} 13px/16px ${F.sans}`, color: on?PRS.ink:PRS.mut }}>{ft.name}</span>
                          {on && <span style={{ marginLeft:'auto', width:6, height:6, borderRadius:'50%', background:PRS.orange }} />}
                        </button>
                      );
                    })}
                  </div>
                ))}
                {/* animated cursor */}
                <div style={{ position:'absolute', left:railW-150, top:stCursorY(i), transform:'translateY(-50%)', transition:'top .5s cubic-bezier(.2,0,0,1), left .5s cubic-bezier(.2,0,0,1)', pointerEvents:'none', zIndex:3 }}>
                  <span key={clickTick} className="gm-click" style={{ position:'absolute', left:-9, top:-9, width:34, height:34, borderRadius:'50%', border:`2px solid ${PRS.orange}` }} />
                  <svg viewBox="0 0 24 24" width="22" height="22" style={{ filter:'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}>
                    <path d="M4 2 L4 19 L9 14 L12.5 21 L15 20 L11.5 13 L18 13 Z" fill="#fff" stroke="#2C2F32" strokeWidth="1.3" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {/* main canvas */}
              <div style={{ flex:1, minWidth:0, background:'#fff', display:'flex', flexDirection:'column' }}>
                <div style={{ padding:'16px 22px 0' }}>
                  <div style={{ font:`700 16px/20px ${F.sans}`, color:PRS.ink }}>{cur.name}</div>
                  <div style={{ font:`400 12.5px/17px ${F.sans}`, color:PRS.mut, marginTop:2 }}>{cur.blurb}</div>
                </div>
                <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'18px 22px 24px', background:`linear-gradient(180deg, #fff, ${PRS.panel})` }}>
                  <div key={cur.key} className="gm-fade"><FeatureScreen featureKey={cur.key} w={420} h={296} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* phase progress under window */}
        <div className="gm-rise" style={{ animationDelay:'160ms', display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginTop:30 }}>
          {METHOD_PHASES.map((p,pi)=>(
            <React.Fragment key={p.key}>
              <span style={{ display:'inline-flex', alignItems:'center', gap:8, font:`600 13px/1 ${F.sans}`, color: pi===phaseIdx?PD.text:PD.mut2, transition:'color .3s' }}>
                {p.name}
                <span style={{ display:'inline-flex', gap:4 }}>
                  {p.features.map(ft=>{ const gi=flat.findIndex(x=>x.key===ft.key); return <span key={ft.key} style={{ width:gi===i?15:6, height:6, borderRadius:3, transition:'all .3s', background: gi===i?PD.orange:(pi<phaseIdx||(pi===phaseIdx&&gi<i))?pdAlpha('#F57C00',0.4):PD.line }} />; })}
                </span>
              </span>
              {pi<2 && <span style={{ color:PD.mut2, fontSize:14 }}>→</span>}
            </React.Fragment>
          ))}
          <span style={{ color:PD.orange, fontSize:15, marginLeft:2 }}>↻</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ProductStudio, ProductStudioTrust, ProductAurora, ProductObservatory, ProductStage });
