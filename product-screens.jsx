/* eslint-disable */
// ChessMood 3 — "The Method": per-feature product mocks (the product isn't
// shipped yet, so these are honest, on-brand mockups of each step's screen).
// White ChessMood app surface (DS-correct), real brand board, real GM photos.
//
// Loads BEFORE product-section.jsx. Uses globals PW, F (from hero-premium).
// All names PRS-/ms- prefixed to avoid colliding with gm-section.jsx globals.
// Exposes: METHOD_PHASES, FeatureScreen (+ a few helpers) on window.

// ---- the product surface palette (fixed white app, regardless of section) -
const PRS = {
  bg:'#FFFFFF', panel:'#F7F8F9', line:'#E4E7EA', line2:'#EEF0F2',
  ink:'#2C2F32', mut:'#686F78', mut2:'#868C93',
  orange:'#F57C00', orange50:'#FEF2E6', blue:'#4B9BBF', green:'#1F8A5B', red:'#D8584F',
};

const msAlpha = (hex, a) => { const h=(hex||'#888').replace('#',''); const n=parseInt(h.length===3?h.split('').map(c=>c+c).join(''):h,16); return `rgba(${(n>>16)&255}, ${(n>>8)&255}, ${n&255}, ${a})`; };
const TOOL_LABEL = { aicoach:'AI Coach', lab:'Lab', testdrive:'TestDrive', fixmood:'FixMood', bugzone:'BugZone', naptracker:'NapTracker', askgm:'AskGM' };

// ---- the loop: 3 phases × 3 features --------------------------------------
const METHOD_PHASES = [
  { key:'diagnose', name:'Diagnose', tint:'#5B8FD6',
    blurb:'See exactly where you stand — and where the points are leaking out.',
    features:[
      { key:'goals',   name:'Understand goals', blurb:'Tell us where you want to go — we map the path there.', glyph:'target' },
      { key:'aireview',name:'AI review',        blurb:'AI Coach reviews your games and finds the real leaks.',  tool:'aicoach' },
      { key:'puztest', name:'Puzzle test',      blurb:'A quick calibration test pins down your true level.',    glyph:'gauge' },
    ]},
  { key:'study', name:'Study & Practice', tint:'#7C8AD9',
    blurb:'Train exactly what you need — then prove it against real resistance.',
    features:[
      { key:'puz10k',  name:'10,000 puzzles',        blurb:'Practice exactly what you need — puzzles tagged by theme.',   glyph:'grid' },
      { key:'practice',name:'ChessMood in Practice', blurb:'Interactive lessons where you make the moves yourself.',      tool:'testdrive' },
      { key:'playgm',  name:'Play with Grandmasters',blurb:'Spar in live games and simuls against titled players.',       glyph:'live' },
    ]},
  { key:'fix', name:'Fix', tint:'#3FA6A0',
    blurb:'Close each leak for good — and keep it closed.',
    features:[
      { key:'bugzone', name:'BugZone', blurb:'Your recurring mistakes, tracked until they’re gone.',     tool:'bugzone' },
      { key:'fixmood', name:'FixMood', blurb:'Analyse your games and see every turning point.',          tool:'fixmood' },
      { key:'askgm',   name:'Ask GM',  blurb:'Post your position and get an answer straight from a GM.',  tool:'askgm' },
    ]},
];

// flat lookup
const ALL_FEATURES = METHOD_PHASES.flatMap(p => p.features.map(f => ({ ...f, phase:p.key, tint:p.tint })));
const featureByKey = (k) => ALL_FEATURES.find(f => f.key === k);

// ---- tiny inline glyphs for the non-tool features -------------------------
function MsGlyph({ name, size=18, color=PRS.orange }) {
  const s = { width:size, height:size, display:'block', stroke:color, strokeWidth:1.9, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' };
  if (name==='target') return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.6" fill={color} stroke="none"/></svg>;
  if (name==='gauge')  return <svg viewBox="0 0 24 24" style={s}><path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 18l4-4"/></svg>;
  if (name==='grid')   return <svg viewBox="0 0 24 24" style={s}><rect x="4" y="4" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1"/></svg>;
  if (name==='live')   return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="3"/><path d="M6.5 6.5a8 8 0 0 0 0 11M17.5 6.5a8 8 0 0 1 0 11"/></svg>;
  return null;
}

function FeatureIcon({ feature, size=20, ring=true }) {
  return (
    <span style={{ width:ring?34:size+4, height:ring?34:size+4, borderRadius:9, flexShrink:0,
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      background:'#fff', border:`1px solid ${PRS.line}`, boxShadow:'0 1px 2px rgba(16,24,40,0.05)' }}>
      {feature.tool
        ? <img src={`ds/icons/${feature.tool}.svg`} alt={TOOL_LABEL[feature.tool]} style={{ width:size, height:size }} />
        : <MsGlyph name={feature.glyph} size={size} color={feature.tint || PRS.orange} />}
    </span>
  );
}

// ---- shared app frame + mini board ---------------------------------------
function ScreenFrame({ tag, title, w=320, h, accent=PRS.orange, children, pad=14, bodyH }) {
  return (
    <div style={{ width:w, height:h, display:'flex', flexDirection:'column', borderRadius:13, overflow:'hidden', background:PRS.bg, border:`1px solid rgba(16,24,40,0.12)`,
      boxShadow:'0 22px 48px -18px rgba(16,24,40,0.30), 0 4px 12px -4px rgba(16,24,40,0.10)', fontFamily:F.sans, color:PRS.ink }}>
      <div style={{ display:'flex', alignItems:'center', gap:9, height:40, flexShrink:0, padding:'0 13px', borderBottom:`1px solid ${PRS.line2}`, background:'#fff' }}>
        <span style={{ display:'flex', gap:5 }}>
          {['#E2E5E8','#E2E5E8','#E2E5E8'].map((c,i)=><span key={i} style={{ width:8, height:8, borderRadius:'50%', background:c }} />)}
        </span>
        <span style={{ marginLeft:4, font:`600 12.5px/40px ${F.sans}`, color:PRS.ink }}>{title}</span>
        {tag && <span style={{ marginLeft:'auto', padding:'3px 8px', borderRadius:5, background:msAlpha(accent,0.1),
          font:`700 9.5px/1 ${F.sans}`, letterSpacing:'.08em', textTransform:'uppercase', color:accent }}>{tag}</span>}
      </div>
      <div style={{ padding:pad, height:bodyH, flex: h?1:'none', minHeight:0, overflow:'hidden', boxSizing:'border-box' }}>{children}</div>
    </div>
  );
}

function MiniBoard({ size=150, arrow, evalPct=50, qmark=false, badge }) {
  const c=(i)=>(i+0.5)*(100/8);
  return (
    <div style={{ position:'relative', width:size, height:size, borderRadius:7, overflow:'hidden', border:`1px solid ${PRS.line}`, flexShrink:0 }}>
      <img src="ds/chess-board.png" alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:6, background:'#3A3F45' }}>
        <div style={{ position:'absolute', left:0, right:0, top:0, height:`${100-evalPct}%`, background:'#fff' }} />
      </div>
      {arrow && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
          <defs><marker id={`m-${arrow.color.replace('#','')}`} markerWidth="4" markerHeight="4" refX="2.4" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4 Z" fill={arrow.color}/></marker></defs>
          <line x1={c(arrow.from[0])} y1={c(arrow.from[1])} x2={c(arrow.to[0])} y2={c(arrow.to[1])} stroke={arrow.color} strokeWidth="2.6" strokeLinecap="round" markerEnd={`url(#m-${arrow.color.replace('#','')})`} opacity="0.95"/>
        </svg>
      )}
      {qmark && <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <span style={{ width:34, height:34, borderRadius:'50%', background:msAlpha('#000',0.5), color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', font:`700 18px/1 ${F.sans}` }}>?</span></div>}
      {badge && <span style={{ position:'absolute', left:8, bottom:8, padding:'3px 8px', borderRadius:5, background:msAlpha('#000',0.62), color:'#fff', font:`600 10px/1 ${F.sans}` }}>{badge}</span>}
    </div>
  );
}

const Row = ({ children, style }) => <div style={{ display:'flex', alignItems:'center', gap:10, ...style }}>{children}</div>;

// =====================================================================
// THE 9 SCREENS
// =====================================================================
function FeatureScreen({ featureKey, w=320, h=300 }) {
  const f = featureByKey(featureKey);
  if (!f) return null;
  const accent = f.tint || PRS.orange;

  // ---------- DIAGNOSE ----------
  if (featureKey==='goals') {
    const mil = [['Now','1480',false],['','1600',false],['','1700',false],['Goal','1800',true]];
    return (
      <ScreenFrame title="Your plan" tag="Goals" w={w} h={h} accent={accent}>
        <div style={{ font:`400 13px/19px ${F.sans}`, color:PRS.mut, marginBottom:14 }}>Where do you want to go?</div>
        <Row style={{ justifyContent:'space-between', marginBottom:18 }}>
          <div><div style={{ font:`700 26px/1 ${F.display}`, color:PRS.ink }}>1480</div><div style={{ font:`400 11px/14px ${F.sans}`, color:PRS.mut2 }}>current</div></div>
          <span style={{ color:PRS.mut2 }}>→</span>
          <div style={{ textAlign:'right' }}><div style={{ font:`700 26px/1 ${F.display}`, color:accent }}>1800</div><div style={{ font:`400 11px/14px ${F.sans}`, color:PRS.mut2 }}>goal · ~7 mo</div></div>
        </Row>
        <div style={{ position:'relative', height:4, borderRadius:3, background:PRS.line2, margin:'0 4px' }}>
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'30%', background:accent, borderRadius:3 }} />
          {mil.map((m,i)=>(<span key={i} style={{ position:'absolute', left:`${i/(mil.length-1)*100}%`, top:'50%', transform:'translate(-50%,-50%)',
            width:10, height:10, borderRadius:'50%', background: i===0?accent:'#fff', border:`2px solid ${i===0?accent:PRS.line}` }} />))}
        </div>
        <Row style={{ justifyContent:'space-between', marginTop:10 }}>
          {mil.map((m,i)=><span key={i} style={{ font:`600 10.5px/14px ${F.sans}`, color: m[2]?accent:PRS.mut2 }}>{m[1]}</span>)}
        </Row>
      </ScreenFrame>
    );
  }
  if (featureKey==='aireview') {
    return (
      <ScreenFrame title="AI Coach" tag="142 games" w={w} h={h} accent={accent}>
        <Row style={{ alignItems:'flex-start', gap:13 }}>
          <MiniBoard size={132} arrow={{from:[4,6],to:[7,5],color:PRS.red}} evalPct={64} />
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ padding:'9px 10px', borderRadius:8, background:PRS.orange50, border:`1px solid ${msAlpha(PRS.orange,0.28)}`, marginBottom:10 }}>
              <div style={{ font:`700 9.5px/13px ${F.sans}`, letterSpacing:'.05em', textTransform:'uppercase', color:PRS.orange, marginBottom:3 }}>Recurring leak</div>
              <div style={{ font:`400 11.5px/16px ${F.sans}`, color:PRS.ink }}>12…h6 — costs you in 7 of 10 Italian losses.</div>
            </div>
            {[['Italian, Black',0.41],['Hanging f-pawn',0.3]].map((r,i)=>(
              <div key={i} style={{ marginBottom:7 }}>
                <div style={{ font:`500 10.5px/14px ${F.sans}`, color:PRS.mut, marginBottom:3 }}>{r[0]}</div>
                <div style={{ height:4, borderRadius:3, background:PRS.line2 }}><div style={{ width:`${r[1]*100}%`, height:'100%', background:PRS.orange, borderRadius:3 }} /></div>
              </div>
            ))}
          </div>
        </Row>
      </ScreenFrame>
    );
  }
  if (featureKey==='puztest') {
    return (
      <ScreenFrame title="Calibration" tag="7 / 10" w={w} h={h} accent={accent}>
        <Row style={{ alignItems:'flex-start', gap:13 }}>
          <MiniBoard size={140} qmark badge="White to move" />
          <div style={{ flex:1 }}>
            <div style={{ font:`400 12px/17px ${F.sans}`, color:PRS.mut, marginBottom:12 }}>Find the best move.</div>
            <div style={{ padding:'10px 12px', borderRadius:8, border:`1px solid ${PRS.line}`, marginBottom:12 }}>
              <div style={{ font:`400 10.5px/14px ${F.sans}`, color:PRS.mut2 }}>Your level</div>
              <div style={{ font:`700 22px/1 ${F.display}`, color:accent, marginTop:3 }}>≈ 1640</div>
            </div>
            <Row style={{ gap:5 }}>{Array.from({length:10}).map((_,i)=><span key={i} style={{ flex:1, height:4, borderRadius:2, background: i<7?accent:PRS.line2 }} />)}</Row>
          </div>
        </Row>
      </ScreenFrame>
    );
  }

  // ---------- STUDY & PRACTICE ----------
  if (featureKey==='puz10k') {
    const themes=[['Forks',true],['Pins',false],['Skewers',false],['Endgames',true],['Mating nets',false],['Deflection',false]];
    return (
      <ScreenFrame title="Puzzles · by theme" tag="10,000" w={w} h={h} accent={accent}>
        <div style={{ font:`400 12px/17px ${F.sans}`, color:PRS.mut, marginBottom:12 }}>Tagged by theme — drill exactly your weak spots.</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {themes.map((t,i)=>(
            <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'9px 11px', borderRadius:8,
              background: t[1]?msAlpha(accent,0.08):PRS.panel, border:`1px solid ${t[1]?msAlpha(accent,0.32):PRS.line2}` }}>
              <span style={{ font:`600 12px/15px ${F.sans}`, color:PRS.ink }}>{t[0]}</span>
              {t[1] && <span style={{ width:7, height:7, borderRadius:'50%', background:accent }} />}
            </div>
          ))}
        </div>
      </ScreenFrame>
    );
  }
  if (featureKey==='practice') {
    return (
      <ScreenFrame title="Interactive lesson" tag="Your move" w={w} h={h} accent={accent}>
        <Row style={{ alignItems:'flex-start', gap:13 }}>
          <MiniBoard size={140} arrow={{from:[4,6],to:[4,4],color:PRS.blue}} evalPct={52} />
          <div style={{ flex:1 }}>
            <div style={{ font:`600 13px/17px ${F.sans}`, color:PRS.ink, marginBottom:5 }}>The Italian, explained</div>
            <div style={{ font:`400 11.5px/16px ${F.sans}`, color:PRS.mut, marginBottom:12 }}>You’re Black. Find the principled developing move.</div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'7px 11px', borderRadius:7, background:msAlpha(PRS.blue,0.1), border:`1px solid ${msAlpha(PRS.blue,0.3)}` }}>
              <span style={{ font:`600 11.5px/1 ${F.sans}`, color:PRS.blue }}>Your move →</span>
            </div>
          </div>
        </Row>
      </ScreenFrame>
    );
  }
  if (featureKey==='playgm') {
    return (
      <ScreenFrame title="Live · Simul" tag="● live" w={w} h={h} accent={PRS.red}>
        <Row style={{ gap:12, marginBottom:12 }}>
          <span style={{ position:'relative' }}>
            <img src="ds/photo-avetik.png" alt="" style={{ width:46, height:46, borderRadius:'50%', objectFit:'cover', objectPosition:'center 18%', border:`1px solid ${PRS.line}` }} />
            <span style={{ position:'absolute', right:-1, bottom:-1, width:13, height:13, borderRadius:'50%', background:PRS.red, border:'2px solid #fff' }} />
          </span>
          <div><div style={{ font:`600 13px/17px ${F.sans}`, color:PRS.ink }}>GM Avetik</div>
            <div style={{ font:`400 11px/15px ${F.sans}`, color:PRS.mut }}>Simul · playing 12 boards</div></div>
        </Row>
        <Row style={{ gap:8 }}>
          <MiniBoard size={96} evalPct={48} />
          <MiniBoard size={96} evalPct={57} />
          <div style={{ flex:1, alignSelf:'stretch', borderRadius:7, border:`1px dashed ${PRS.line}`, display:'flex', alignItems:'center', justifyContent:'center',
            font:`600 12px/16px ${F.sans}`, color:PRS.mut2, textAlign:'center' }}>+10<br/>boards</div>
        </Row>
      </ScreenFrame>
    );
  }

  // ---------- FIX ----------
  if (featureKey==='bugzone') {
    const bugs=[['Hanging pieces',12,3],['Back-rank',8,2],['Missed forks',6,1]];
    return (
      <ScreenFrame title="BugZone" tag="tracked" w={w} h={h} accent={accent}>
        <div style={{ font:`400 12px/17px ${F.sans}`, color:PRS.mut, marginBottom:13 }}>Your recurring mistakes — tracked until they’re gone.</div>
        {bugs.map((b,i)=>(
          <div key={i} style={{ marginBottom:11 }}>
            <Row style={{ justifyContent:'space-between', marginBottom:4 }}>
              <span style={{ font:`500 12px/15px ${F.sans}`, color:PRS.ink }}>{b[0]}</span>
              <span style={{ font:`600 11px/15px ${F.sans}`, color:PRS.green }}>{b[1]} → {b[2]}</span>
            </Row>
            <div style={{ height:5, borderRadius:3, background:PRS.line2, position:'relative', overflow:'hidden' }}>
              <div style={{ width:`${b[2]/b[1]*100}%`, height:'100%', background:accent, borderRadius:3 }} />
            </div>
          </div>
        ))}
      </ScreenFrame>
    );
  }
  if (featureKey==='fixmood') {
    const pts=[12,18,15,40,34,30,62,55,58]; const max=70;
    const path = pts.map((v,i)=>`${(i/(pts.length-1))*100},${40-(v/max)*38}`).join(' ');
    const turns=[3,6];
    return (
      <ScreenFrame title="FixMood · analysis" tag="3 turns" w={w} h={h} accent={accent}>
        <div style={{ font:`400 12px/17px ${F.sans}`, color:PRS.mut, marginBottom:12 }}>Every turning point in your game, found.</div>
        <div style={{ borderRadius:8, border:`1px solid ${PRS.line2}`, padding:'12px 10px', background:PRS.panel }}>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ width:'100%', height:64, display:'block' }}>
            <line x1="0" y1="20" x2="100" y2="20" stroke={PRS.line} strokeWidth="0.5" strokeDasharray="2 2"/>
            <polyline points={path} fill="none" stroke={accent} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"/>
            {turns.map((t,i)=>(<circle key={i} cx={(t/(pts.length-1))*100} cy={40-(pts[t]/max)*38} r="2.4" fill="#fff" stroke={PRS.red} strokeWidth="1.4"/>))}
          </svg>
        </div>
        <Row style={{ gap:14, marginTop:10 }}>
          <Row style={{ gap:6 }}><span style={{ width:8, height:8, borderRadius:'50%', background:accent }}/><span style={{ font:`500 11px/14px ${F.sans}`, color:PRS.mut }}>eval</span></Row>
          <Row style={{ gap:6 }}><span style={{ width:8, height:8, borderRadius:'50%', background:'#fff', border:`1.4px solid ${PRS.red}` }}/><span style={{ font:`500 11px/14px ${F.sans}`, color:PRS.mut }}>turning point</span></Row>
        </Row>
      </ScreenFrame>
    );
  }
  if (featureKey==='askgm') {
    return (
      <ScreenFrame title="Ask GM" tag="answered" w={w} h={h} accent={accent}>
        <Row style={{ alignItems:'flex-start', gap:10, marginBottom:12 }}>
          <span style={{ width:30, height:30, borderRadius:'50%', background:PRS.panel, border:`1px solid ${PRS.line}`, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', font:`600 11px/1 ${F.sans}`, color:PRS.mut2 }}>You</span>
          <div style={{ flex:1 }}>
            <div style={{ font:`400 11.5px/16px ${F.sans}`, color:PRS.ink, marginBottom:7 }}>“Is my position lost, or can I hold this?”</div>
            <MiniBoard size={104} evalPct={44} />
          </div>
        </Row>
        <Row style={{ alignItems:'flex-start', gap:10, padding:'10px', borderRadius:8, background:msAlpha(accent,0.07), border:`1px solid ${msAlpha(accent,0.25)}` }}>
          <img src="ds/photo-melkumyan.png" alt="" style={{ width:30, height:30, borderRadius:'50%', objectFit:'cover', flexShrink:0 }} />
          <div style={{ flex:1 }}>
            <div style={{ font:`600 11.5px/15px ${F.sans}`, color:PRS.ink }}>GM Melkumyan</div>
            <div style={{ font:`400 11.5px/16px ${F.sans}`, color:PRS.mut, marginTop:2 }}>Holdable — trade the bishops first, then …Rd8 and your king walks up.</div>
          </div>
        </Row>
      </ScreenFrame>
    );
  }
  return null;
}

Object.assign(window, { METHOD_PHASES, ALL_FEATURES, featureByKey, FeatureScreen, FeatureIcon, ScreenFrame, MiniBoard, MsGlyph, PRS, msAlpha, TOOL_LABEL });
