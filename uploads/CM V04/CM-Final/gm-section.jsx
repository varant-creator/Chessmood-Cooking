/* eslint-disable */
// ChessMood 3 — "Grandmasters & the Founder" section, v3.
//   • One heading sits above the founder + coaches, who share the same row /
//     section (merged, not a separate founder block off to the side).
//   • Founder = a "lead" portrait in the SAME card language as the coaches,
//     marked with an orange ring + "Founder" badge + one short line of voice.
//   • Coaches play as MOTION: a rotating spotlight, a vertical drifting wall,
//     or moving rails — big real photos, no name-only tiles, no roster counts.
//   • Per-section dark/light + editable heading are driven from the host page.
//
// PHOTOS live in GM_DATA / FOUNDER (set `photo`). Ratings/achievements are
// best-effort — fix them in this one array.

const { useState: useStateGM, useEffect: useEffectGM } = React;

const G = {
  text:'var(--cm-text, #FFFFFF)',
  mut:'var(--cm-mut, rgba(255,255,255,0.66))',
  mut2:'var(--cm-mut2, rgba(255,255,255,0.46))',
  line:'var(--cm-line, rgba(255,255,255,0.10))',
  lineSoft:'var(--cm-lineSoft, rgba(255,255,255,0.06))',
  glass:'var(--cm-glass, rgba(255,255,255,0.05))',
  glassHi:'var(--cm-glassHi, rgba(255,255,255,0.08))',
  bg1:'var(--cm-bg1, #070C16)',
  bg2:'var(--cm-bg2, #0A1326)',
  orange:'#F57C00',
  blue:'#7FB0E8',
};

const headFamily = (head) => `${(head && head.headFont) || 'Inter'}, Inter, system-ui, sans-serif`;
const SECTION_TITLE = 'Meet the Grandmasters in the ChessMood system';

const FOUNDER = {
  name:'GM Avetik Grigoryan', flag:'🇦🇲', country:'Armenia', peak:'2602',
  note:'Founder & head coach', photo:'ds/photo-avetik.png',
};

// peak rating + achievement: best-effort, flagged to verify — fix here.
const GM_DATA = [
  { name:'GM Hrant Melkumyan',      flag:'🇦🇲', country:'Armenia',     peak:'2695', note:'Armenian Champion', photo:'ds/photo-melkumyan.jpg' },
  { name:'GM Nils Grandelius',      flag:'🇸🇪', country:'Sweden',      peak:'2723', note:"Sweden's no. 1", photo:'ds/photo-grandelius.jpg' },
  { name:'GM Laurent Fressinet',    flag:'🇫🇷', country:'France',      peak:'2718', note:'2× French Champion', photo:'ds/photo-fressinet.jpg' },
  { name:'GM Bassem Amin',          flag:'🇪🇬', country:'Egypt',       peak:'2709', note:"Africa's no. 1", photo:'ds/photo-amin.jpg' },
  { name:'GM Varuzhan Akobian',     flag:'🇺🇸', country:'USA',         peak:'2671', note:'US Olympiad team', photo:'ds/photo-akobian.jpg' },
  { name:'GM Robert Hovhannisyan',  flag:'🇦🇲', country:'Armenia',     peak:'2661', note:'Armenian Champion', photo:'ds/photo-hovhannisyan.jpg' },
  { name:'GM Rafael Leitão',        flag:'🇧🇷', country:'Brazil',      peak:'2659', note:'5× Brazilian Champion', photo:'ds/photo-leitao.jpg' },
  { name:'GM Noël Studer',          flag:'🇨🇭', country:'Switzerland', peak:'2658', note:'Swiss Champion', photo:'ds/photo-studer.jpg' },
  { name:'GM Hovhannes Gabuzyan',   flag:'🇦🇲', country:'Armenia',     peak:'2658', note:'World Junior medalist', photo:'ds/photo-gabuzyan.webp' },
  { name:'GM Boris Avrukh',         flag:'🇮🇱', country:'Israel',      peak:'2657', note:'Bestselling author', photo:'ds/photo-avrukh.webp' },
  { name:'GM Pepe Cuenca',          flag:'🇪🇸', country:'Spain',       peak:'2654', note:'PhD & commentator', photo:'ds/photo-cuenca.jpg' },
  { name:'GM Zaven Andriasian',     flag:'🇦🇲', country:'Armenia',     peak:'2642', note:'World U16 Champion', photo:'ds/photo-andriasian.jpg' },
  { name:'GM Samvel Ter-Sahakyan',  flag:'🇦🇲', country:'Armenia',     peak:'2640', note:'Armenian Champion', photo:'ds/photo-tersahakyan.jpg' },
  { name:'GM Tamas Banusz',         flag:'🇭🇺', country:'Hungary',     peak:'2638', note:'Hungarian Champion', photo:'ds/photo-banusz.jpg' },
  { name:'GM Marin Bosiocic',       flag:'🇭🇷', country:'Croatia',     peak:'2637', note:'Croatian Champion', photo:'ds/photo-bosiocic.png' },
  { name:'GM Davorin Kuljasevic',   flag:'🇭🇷', country:'Croatia',     peak:'2607', note:'Author & trainer', photo:'ds/photo-kuljasevic.png' },
  { name:'GM Johan Hellsten',       flag:'🇸🇪', country:'Sweden',      peak:'2588', note:"'Mastering' series author", photo:'ds/photo-hellsten.png' },
  { name:'GM Nikola Nestorovic',    flag:'🇷🇸', country:'Serbia',      peak:'2570', note:'Serbian medalist', photo:'ds/photo-nestorovic.jpg' },
  { name:'GM Elisabeth Pähtz',      flag:'🇩🇪', country:'Germany',     peak:'2526', note:'Women’s world top-10', photo:'ds/photo-paehtz.jpg' },
  { name:'GM Felix Blohberger',     flag:'🇦🇹', country:'Austria',     peak:'2521', note:'Austrian Champion', photo:'ds/photo-blohberger.jpg' },
];

const initialsOf = (name) => name.replace('GM ','').split(/[ -]/).map(s=>s[0]).slice(0,2).join('').toUpperCase();

// founder accent — calmer than orange by default, themeable from the host.
const lumOf = (hex) => { const h=(hex||'#5B8FD6').replace('#',''); const n=parseInt(h.length===3?h.split('').map(c=>c+c).join(''):h,16); return (0.299*((n>>16)&255)+0.587*((n>>8)&255)+0.114*(n&255))/255; };
const onAccent = (hex) => lumOf(hex) > 0.68 ? '#10203A' : '#fff';
const withAlpha = (hex, a) => { const h=(hex||'#5B8FD6').replace('#',''); const n=parseInt(h.length===3?h.split('').map(c=>c+c).join(''):h,16); return `rgba(${(n>>16)&255}, ${(n>>8)&255}, ${n&255}, ${a})`; };
const FOUNDER_ACCENT = '#5B8FD6';

const FOUNDER_QUOTE = 'Most Grandmasters seem distant and untouchable. We’re not — we open with “What’s up, man?”, then get to work.';

// ---- section heading ------------------------------------------------------
function SectionHeading({ head, text, marginBottom = 50 }) {
  return (
    <h2 className="gm-rise" style={{ textAlign:'center', margin:`0 auto ${marginBottom}px`, maxWidth:940,
      fontFamily:headFamily(head), fontWeight:700, fontSize:46, lineHeight:1.1, letterSpacing:'-.035em', color:G.text }}>
      {text || SECTION_TITLE}
    </h2>
  );
}

// ---- big portrait (real photo, else on-brand monogram) --------------------
function BigPortrait({ g, ratio='4/5', radius=18, founder=false, dim=false, caption=false, monoScale=1, accent=FOUNDER_ACCENT, ratingPlace='top', countryMode='full', fideColor='#7FB0E8', countrySide='left', gmColor='#F57C00' }) {
  const real = !!g.photo;
  const fc = fideColor || G.blue;
  const ratingTop = ratingPlace === 'top';
  const cSide = ratingTop ? 'left' : countrySide;
  const gmStyle = Array.isArray(gmColor)
    ? { backgroundImage:`linear-gradient(135deg, ${gmColor[0]} 0%, ${gmColor[1]} 100%)`, WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent', color:'transparent' }
    : { color: gmColor };
  return (
    <div style={{ position:'relative', width:'100%', aspectRatio:ratio, borderRadius:radius, overflow:'hidden',
      border:`1px solid ${founder ? withAlpha(accent, 0.85) : G.lineSoft}`,
      background: real ? 'linear-gradient(160deg,#EDF2F9,#D6E0EF)'
                       : 'linear-gradient(155deg, rgba(255,255,255,0.13), rgba(255,255,255,0.02))',
      boxShadow: founder ? `0 36px 80px -42px rgba(0,0,0,0.85), 0 0 56px -28px ${withAlpha(accent, 0.6)}`
                         : '0 30px 70px -38px rgba(0,0,0,0.8)',
      filter: dim ? 'brightness(0.46) saturate(0.85)' : 'none', transition:'filter .45s ease' }}>
      {real
        ? <img src={g.photo} alt={g.name} onError={(e)=>{const i=e.currentTarget;const n=+(i.dataset.retry||0);if(n<5){i.dataset.retry=n+1;const u=g.photo;setTimeout(()=>{i.src=u+(u.indexOf('?')<0?'?':'&')+'r='+Date.now();},220*(n+1));}}} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 16%' }} />
        : <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
            font:`800 ${Math.round(96*monoScale)}px/1 ${F.display}`, letterSpacing:'-.04em', color:'rgba(255,255,255,0.13)' }}>{initialsOf(g.name)}</div>}
      {founder && (
        <span style={{ position:'absolute', top:12, left:12, padding:'4px 11px', borderRadius:999,
          background:accent, font:`700 10px/1 ${F.sans}`, letterSpacing:'.12em', textTransform:'uppercase',
          color:onAccent(accent), boxShadow:`0 4px 14px ${withAlpha(accent, 0.45)}` }}>Founder</span>
      )}
      {caption && (
        <React.Fragment>
          <div style={{ position:'absolute', top:12, ...(cSide==='right'?{right:12}:{left:12}), display:'flex', alignItems:'center', gap:6,
            padding: countryMode==='full' ? '5px 10px 5px 8px' : '5px 7px', borderRadius:999, background:'rgba(8,14,24,0.5)',
            border:`1px solid ${G.line}`, backdropFilter:'blur(6px)' }}>
            <span style={{ fontSize:14, lineHeight:1 }}>{g.flag}</span>
            {countryMode==='full' && <span style={{ font:`600 11px/1 ${F.sans}`, color:'#fff' }}>{g.country}</span>}
          </div>
          {ratingTop && (
          <div style={{ position:'absolute', top:12, right:12, display:'flex', alignItems:'baseline', gap:4,
            padding:'5px 10px', borderRadius:999, background:'rgba(8,14,24,0.5)',
            border:`1px solid ${G.line}`, backdropFilter:'blur(6px)' }}>
            <span style={{ font:`700 12px/1 ${F.sans}`, color:'#fff' }}>{g.peak}</span>
            <span style={{ font:`600 9px/1 ${F.sans}`, letterSpacing:'.08em', color:fc }}>FIDE</span>
          </div>
          )}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 32%, rgba(3,6,14,0.5) 62%, rgba(3,6,14,0.96) 100%)' }} />
          <div style={{ position:'absolute', left:16, right:16, bottom:16 }}>
            {ratingPlace==='above' && (
              <div style={{ display:'flex', alignItems:'baseline', gap:5, marginBottom:6 }}>
                <span style={{ font:`700 15px/1 ${F.sans}`, letterSpacing:'-.01em', color:'#fff' }}>{g.peak}</span>
                <span style={{ font:`500 10px/1 ${F.sans}`, letterSpacing:'.12em', color:fc }}>FIDE</span>
              </div>
            )}
            <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
              <span style={{ font:`900 17px/1 ${F.sans}`, letterSpacing:'.04em', ...gmStyle }}>GM</span>
              <span style={{ font:`700 20px/24px ${F.sans}`, color:'#fff' }}>{g.name.replace('GM ','')}</span>
            </div>
            {ratingPlace==='name' && <div style={{ font:`700 12px/16px ${F.sans}`, color:fc, marginTop:5 }}>{g.peak} FIDE</div>}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

// ---- founder "lead" — same portrait language as the team + one short line --
function FounderLead({ head, w=300, accent=FOUNDER_ACCENT }) {
  return (
    <div className="gm-rise" style={{ width:w, flexShrink:0 }}>
      <BigPortrait g={FOUNDER} ratio="4/5" radius={16} caption founder accent={accent} />
      <blockquote style={{ margin:'16px 0 0', fontFamily:headFamily(head), fontWeight:500, fontSize:16, lineHeight:1.45,
        letterSpacing:'-.005em', color:G.text }}>“{FOUNDER_QUOTE}”</blockquote>
    </div>
  );
}

// ---- on-design directional arrow control ----------------------------------
// A real, visible affordance ON the gallery — press & hold to push the coaches,
// click to step. Horizontal arrows for rails, vertical for the wall.
function NavArrow({ glyph, label, onClick, onPress, onRelease, style }) {
  const press = (e) => { e.preventDefault(); onPress && onPress(); };
  const release = () => { onRelease && onRelease(); };
  return (
    <button type="button" aria-label={label} className="gm-nav"
      onClick={onClick} onPointerDown={press} onPointerUp={release} onPointerLeave={release} onPointerCancel={release}
      style={{ position:'absolute', zIndex:7, width:46, height:46, borderRadius:'50%', cursor:'pointer',
        display:'flex', alignItems:'center', justifyContent:'center', padding:0,
        border:`1px solid var(--cm-navborder, ${G.glassHi})`, background:'var(--cm-navbg, rgba(8,12,22,0.6))', backdropFilter:'blur(10px)',
        color:'var(--cm-navfg, #fff)', font:'500 22px/1 system-ui, sans-serif', boxShadow:'0 12px 34px -14px rgba(0,0,0,0.5)',
        ...style }}>
      {glyph}
    </button>
  );
}

// ---- team spotlight — one BIG face at a time + prev/next arrows ------------
function TeamSpotlight({ roster, head, interval=5800, peeks=true, mainW=300 }) {
  const [idx, setIdx] = useStateGM(0);
  const [paused, setPaused] = useStateGM(false);
  useEffectGM(() => {
    if (paused) return;
    const id = setInterval(() => setIdx(i => (i + 1) % roster.length), interval);
    return () => clearInterval(id);
  }, [paused, roster.length, interval]);
  const go = (s) => setIdx(i => (i + s + roster.length) % roster.length);
  const at = (o) => roster[(idx + o + roster.length) % roster.length];
  const g = at(0);
  const stageH = Math.round(mainW * 1.25 + 22);
  return (
    <div onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}
      style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
      <div style={{ position:'relative', width:'100%', height:stageH, display:'flex', alignItems:'center', justifyContent:'center' }}>
        {peeks && (
          <React.Fragment>
            <div style={{ position:'absolute', left:'1%', top:'50%', width:mainW*0.6, transform:'translateY(-50%)', zIndex:1 }}>
              <BigPortrait g={at(-1)} dim caption monoScale={0.6} />
            </div>
            <div style={{ position:'absolute', right:'1%', top:'50%', width:mainW*0.6, transform:'translateY(-50%)', zIndex:1 }}>
              <BigPortrait g={at(1)} dim caption monoScale={0.6} />
            </div>
          </React.Fragment>
        )}
        <div key={idx} className="gm-face-in" style={{ position:'relative', zIndex:3, width:mainW }}>
          <BigPortrait g={g} caption />
        </div>
        <NavArrow glyph="‹" label="Previous Grandmaster" onClick={()=>go(-1)} style={{ left:8, top:'50%', transform:'translateY(-50%)' }} />
        <NavArrow glyph="›" label="Next Grandmaster" onClick={()=>go(1)} style={{ right:8, top:'50%', transform:'translateY(-50%)' }} />
      </div>
      <div key={'m'+idx} className="gm-meta-in" style={{ marginTop:16, textAlign:'center', minHeight:58 }}>
        <div style={{ font:`700 16px/20px ${F.sans}`, color:G.text }}>{g.note}</div>
        <div style={{ font:`400 13px/18px ${F.sans}`, color:G.mut2, marginTop:4 }}>{g.country} · peak FIDE {g.peak}</div>
      </div>
      <div style={{ width:Math.min(mainW, 200), height:3, borderRadius:3, background:G.line, overflow:'hidden', marginTop:6 }}>
        <div key={'p'+idx} className="gm-wipe" style={{ height:'100%', background:G.blue, transformOrigin:'left',
          animationDuration:`${interval}ms`, animationPlayState: paused ? 'paused' : 'running' }} />
      </div>
    </div>
  );
}

// ---- JS drift engine: gentle auto-motion + press-to-scrub via arrows -------
const REDUCE = () => typeof window!=='undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function useDriftControl() {
  return React.useRef({ vel: { current: 0 }, paused: { current: false } }).current;
}
// One moving track (doubled for a seamless loop). Reads a shared control so
// several columns can be pushed together by the same arrows.
function DriftRail({ items, axis='x', cardMain=200, ratio='4/5', gap=14, baseDir=1, baseSpeed=20, control, startOffset=0, mini=false }) {
  const horizontal = axis === 'x';
  const ratioF = (() => { const p=(ratio||'4/5').split('/').map(Number); return (p[1]&&p[0]) ? p[1]/p[0] : 1.25; })();
  const trackRef = React.useRef(null);
  const offset = React.useRef(startOffset);
  const last = React.useRef(0);
  const ownCtl = useDriftControl();
  const ctl = control || ownCtl;
  const doubled = [...items, ...items];
  useEffectGM(() => {
    const cardFull = horizontal ? (cardMain + gap) : (cardMain * ratioF + gap);
    const loop = cardFull * items.length;
    let raf = 0;
    const tick = (ts) => {
      if (!last.current) last.current = ts;
      const dt = Math.min(0.05, (ts - last.current) / 1000); last.current = ts;
      const auto = (ctl.paused.current || REDUCE()) ? 0 : baseSpeed * baseDir;
      const v = ctl.vel.current !== 0 ? ctl.vel.current : auto;
      offset.current = ((offset.current + v * dt) % loop + loop) % loop;
      if (trackRef.current) trackRef.current.style.transform = horizontal ? `translate3d(${-offset.current}px,0,0)` : `translate3d(0,${-offset.current}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [items.length, cardMain, gap, horizontal, baseDir, baseSpeed, ctl]);
  return (
    <div style={{ overflow:'hidden', flex: horizontal ? 'none' : 1, minWidth:0 }}>
      <div ref={trackRef} style={ horizontal
        ? { display:'flex', gap, width:'max-content', willChange:'transform' }
        : { display:'flex', flexDirection:'column', gap, willChange:'transform' } }>
        {doubled.map((g, i) => (
          <div key={i} style={ horizontal ? { width:cardMain, flexShrink:0 } : {} }>
            {mini ? <MiniPortrait g={g} ratio={ratio} /> : <BigPortrait g={g} ratio={ratio} radius={14} caption monoScale={0.62} />}
          </div>
        ))}
      </div>
    </div>
  );
}

// Stage / Observatory — horizontal rail(s); ‹ › arrows push coaches left/right.
function HRail({ roster, cardW=196, rows=1 }) {
  const ctl = useDriftControl();
  const SCRUB = 560;
  const half = Math.ceil(roster.length / 2);
  const lines = rows === 2 ? [roster.slice(0, half), roster.slice(half)] : [roster];
  return (
    <div onMouseEnter={()=>ctl.paused.current=true} onMouseLeave={()=>ctl.paused.current=false}
      style={{ position:'relative', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', flexDirection:'column', gap:14,
        WebkitMaskImage:'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        maskImage:'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}>
        {lines.map((ln, i) => (
          <DriftRail key={i} items={ln} axis="x" cardMain={cardW} baseDir={1} control={ctl} startOffset={i ? (cardW+14) * 1.5 : 0} />
        ))}
      </div>
      <NavArrow glyph="‹" label="Move coaches left"  onPress={()=>ctl.vel.current=-SCRUB} onRelease={()=>ctl.vel.current=0}
        style={{ left:8, top:'50%', transform:'translateY(-50%)' }} />
      <NavArrow glyph="›" label="Move coaches right" onPress={()=>ctl.vel.current=SCRUB}  onRelease={()=>ctl.vel.current=0}
        style={{ right:8, top:'50%', transform:'translateY(-50%)' }} />
    </div>
  );
}

// A2 — vertical wall of columns; ↑ ↓ arrows push the coaches up / down.
function VWall({ roster, height=560 }) {
  const ctl = useDriftControl();
  const SCRUB = 540;
  const colA = roster.slice(0, 7), colB = roster.slice(7, 14), colC = roster.slice(14);
  return (
    <div onMouseEnter={()=>ctl.paused.current=true} onMouseLeave={()=>ctl.paused.current=false}
      style={{ position:'relative', flex:1, minWidth:0 }}>
      <div style={{ display:'flex', gap:14, height, overflow:'hidden',
        WebkitMaskImage:'linear-gradient(180deg, transparent, #000 9%, #000 91%, transparent)',
        maskImage:'linear-gradient(180deg, transparent, #000 9%, #000 91%, transparent)' }}>
        <DriftRail items={colA} axis="y" cardMain={150} baseDir={1} control={ctl} startOffset={0} />
        <DriftRail items={colB} axis="y" cardMain={150} baseDir={1} control={ctl} startOffset={120} />
        <DriftRail items={colC} axis="y" cardMain={150} baseDir={1} control={ctl} startOffset={60} />
      </div>
      <NavArrow glyph="↑" label="Move coaches up"   onPress={()=>ctl.vel.current=-SCRUB} onRelease={()=>ctl.vel.current=0}
        style={{ left:'50%', top:8, transform:'translateX(-50%)' }} />
      <NavArrow glyph="↓" label="Move coaches down" onPress={()=>ctl.vel.current=SCRUB}  onRelease={()=>ctl.vel.current=0}
        style={{ left:'50%', bottom:8, transform:'translateX(-50%)' }} />
    </div>
  );
}

// =========================================================================
// A · STUDIO — founder lead + rotating spotlight, centered & calm.
// =========================================================================
function GMStudio({ head, heading, accent, dir }) {
  return (
    <section data-screen-label="GMs · Studio" style={{ position:'relative', width:PW, overflow:'hidden', background:G.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background:`
        radial-gradient(72% 50% at 50% 12%, rgb(var(--cm-glow) / calc(40% * var(--cm-glow-i))) 0%, transparent 58%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 44%, var(--cm-bg1) 100%)` }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:1240, margin:'0 auto', padding:'100px 64px 104px' }}>
        <SectionHeading head={head} text={heading} />
        <div className="gm-rise" style={{ animationDelay:'80ms', display:'flex', gap:44, alignItems:'center', justifyContent:'center' }}>
          <FounderLead head={head} w={300} accent={accent} />
          <div style={{ flex:1, minWidth:0, maxWidth:760 }}>
            <TeamSpotlight roster={GM_DATA} head={head} mainW={300} interval={6000} />
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// A2 · STUDIO (vertical wall) — founder lead + columns drifting up/down.
// =========================================================================
function GMStudioTrust({ head, heading, accent }) {
  return (
    <section data-screen-label="GMs · Studio (trust first)" style={{ position:'relative', width:PW, overflow:'hidden', background:G.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background:`
        radial-gradient(74% 46% at 50% 8%, rgb(var(--cm-glow) / calc(38% * var(--cm-glow-i))) 0%, transparent 56%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 40%, var(--cm-bg1) 100%)` }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:1240, margin:'0 auto', padding:'100px 64px 104px' }}>
        <SectionHeading head={head} text={heading} marginBottom={46} />
        <div className="gm-rise" style={{ animationDelay:'80ms', display:'flex', gap:40, alignItems:'center' }}>
          <FounderLead head={head} w={300} accent={accent} />
          <VWall roster={GM_DATA} height={560} />
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// B · AURORA — founder lead + spotlight floating in the aurora glow.
// =========================================================================
function GMAurora({ head, heading, accent, dir }) {
  return (
    <section data-screen-label="GMs · Aurora" style={{ position:'relative', width:PW, overflow:'hidden', background:G.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background:`
        radial-gradient(120% 60% at 50% 116%, rgb(var(--cm-glow) / calc(54% * var(--cm-glow-i))) 0%, rgb(var(--cm-glow) / calc(22% * var(--cm-glow-i))) 34%, transparent 64%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 64%, var(--cm-bg1) 100%)` }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:1240, margin:'0 auto', padding:'100px 64px 108px' }}>
        <SectionHeading head={head} text={heading} marginBottom={48} />
        <div className="gm-rise" style={{ animationDelay:'80ms', display:'flex', gap:48, alignItems:'center', justifyContent:'center' }}>
          <FounderLead head={head} w={300} accent={accent} />
          <HRail roster={GM_DATA} cardW={300} rows={1} />
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// C · OBSERVATORY — founder lead + single big rotating portrait, restrained.
// =========================================================================
function GMObservatory({ head, heading, accent, dir }) {
  return (
    <section data-screen-label="GMs · Observatory" style={{ position:'relative', width:PW, overflow:'hidden', background:G.bg1, fontFamily:F.sans }}>
      <div style={{ position:'absolute', inset:0, background:`
        radial-gradient(50% 60% at 92% 4%, rgb(var(--cm-glow) / calc(42% * var(--cm-glow-i))) 0%, transparent 56%),
        radial-gradient(46% 54% at 4% 98%, rgba(245,124,0,0.12) 0%, transparent 60%)` }} />
      <div className="gm-breathe" style={{ position:'absolute', inset:0, opacity:0.5,
        backgroundImage:'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize:'34px 34px',
        WebkitMaskImage:'radial-gradient(90% 80% at 50% 40%, #000 30%, transparent 82%)',
        maskImage:'radial-gradient(90% 80% at 50% 40%, #000 30%, transparent 82%)' }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:1140, margin:'0 auto', padding:'100px 64px 104px' }}>
        <SectionHeading head={head} text={heading} marginBottom={48} />
        <div className="gm-rise" style={{ animationDelay:'80ms', display:'flex', gap:56, alignItems:'center', justifyContent:'center' }}>
          <FounderLead head={head} w={300} accent={accent} />
          <HRail roster={GM_DATA} cardW={250} rows={1} />
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// D · STAGE — founder lead + two moving rails of big portraits.
// =========================================================================
function GMStage({ head, heading, accent }) {
  return (
    <section data-screen-label="GMs · Stage" style={{ position:'relative', width:PW, overflow:'hidden', background:G.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background:`
        radial-gradient(58% 70% at 14% 42%, rgb(var(--cm-glow) / calc(48% * var(--cm-glow-i))) 0%, transparent 60%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg1) 100%)` }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:1320, margin:'0 auto', padding:'96px 64px 100px' }}>
        <SectionHeading head={head} text={heading} marginBottom={46} />
        <div className="gm-rise" style={{ animationDelay:'80ms', display:'flex', gap:44, alignItems:'center' }}>
          <FounderLead head={head} w={320} accent={accent} />
          <HRail roster={GM_DATA} cardW={176} rows={2} />
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// UNIFIED OPTIONS — Avetik folded in among the coaches (Founder badge only,
// no quote, not separated). Two featured leads + a sense of "lots of coaches".
// =========================================================================
const FOUNDER_LEAD2 = { ...FOUNDER, role: 'Founder & head coach' };
const SECOND_FEATURED = { ...(GM_DATA.find(g => /Gabuzyan/.test(g.name)) || GM_DATA[0]), role: 'Attack & calculation' };
const REST_ROSTER = GM_DATA.filter(g => !/Gabuzyan/.test(g.name));

// small roster tile — photo, flag, name + rating
function MiniPortrait({ g, ratio = '1/1' }) {
  const real = !!g.photo;
  return (
    <div style={{ position:'relative', width:'100%', aspectRatio:ratio, borderRadius:12, overflow:'hidden',
      border:`1px solid ${G.glassHi}`,
      background: real ? 'linear-gradient(160deg,#EDF2F9,#D6E0EF)' : 'linear-gradient(155deg, rgba(255,255,255,0.13), rgba(255,255,255,0.02))',
      boxShadow:'0 18px 40px -28px rgba(0,0,0,0.8)' }}>
      {real
        ? <img src={g.photo} alt={g.name} onError={(e)=>{const i=e.currentTarget;const n=+(i.dataset.retry||0);if(n<5){i.dataset.retry=n+1;const u=g.photo;setTimeout(()=>{i.src=u+(u.indexOf('?')<0?'?':'&')+'r='+Date.now();},220*(n+1));}}} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 16%' }} />
        : <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', font:`800 38px/1 ${F.display}`, color:'rgba(255,255,255,0.14)' }}>{initialsOf(g.name)}</div>}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 48%, rgba(3,6,14,0.86) 100%)' }} />
      <div style={{ position:'absolute', left:10, right:10, bottom:8 }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:5 }}>
          <span style={{ font:`800 10px/1 ${F.sans}`, letterSpacing:'.04em', color:G.orange }}>GM</span>
          <span style={{ font:`700 12px/15px ${F.sans}`, color:'#fff', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{g.name.replace('GM ','')}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:2 }}>
          <span style={{ fontSize:12, lineHeight:1 }}>{g.flag}</span>
          <span style={{ font:`600 10px/13px ${F.sans}`, color:G.blue }}>{g.peak} FIDE</span>
        </div>
      </div>
    </div>
  );
}

// two featured leads (founder + one), same card language, role label, no quote
function FeaturedTwo({ accent = FOUNDER_ACCENT, w = 300, dir = 'row' }) {
  const row = dir === 'row';
  const list = [{ g: FOUNDER_LEAD2, founder: true }, { g: SECOND_FEATURED, founder: false }];
  return (
    <div style={{ display:'flex', flexDirection:dir, gap: row ? 26 : 22, justifyContent:'center', alignItems: row ? 'flex-start' : 'stretch' }}>
      {list.map((it, i) => (
        <div key={i} style={{ width: row ? w : '100%' }}>
          <BigPortrait g={it.g} ratio={row ? '4/5' : '5/4'} radius={16} caption founder={it.founder} accent={accent} />
        </div>
      ))}
    </div>
  );
}

// OPTION 1 — two leads + a tidy static roster grid below ("calm")
function GMUnifiedGrid({ head, heading, accent }) {
  const tiles = REST_ROSTER.slice(0, 18);
  return (
    <section data-screen-label="GMs · Two + grid" style={{ position:'relative', width:PW, overflow:'hidden', background:G.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background:`
        radial-gradient(72% 50% at 50% 12%, rgb(var(--cm-glow) / calc(40% * var(--cm-glow-i))) 0%, transparent 58%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 44%, var(--cm-bg1) 100%)` }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:1240, margin:'0 auto', padding:'100px 64px 104px' }}>
        <SectionHeading head={head} text={heading} marginBottom={44} />
        <div className="gm-rise" style={{ animationDelay:'80ms' }}><FeaturedTwo accent={accent} w={300} /></div>
        <div className="gm-rise" style={{ animationDelay:'160ms', marginTop:42, display:'grid', gridTemplateColumns:'repeat(9, 1fr)', gap:12 }}>
          {tiles.map((g, i) => <MiniPortrait key={i} g={g} />)}
        </div>
        <div className="gm-rise" style={{ animationDelay:'220ms', marginTop:24, textAlign:'center', font:`500 14px/20px ${F.sans}`, color:G.mut }}>
          20+ Grandmasters teach in ChessMood — rated up to 2723 FIDE
        </div>
      </div>
    </section>
  );
}

// OPTION 2 — two leads + an infinite drifting marquee of the whole roster ("lively")
function GMUnifiedMarquee({ head, heading, accent }) {
  const ctl = useDriftControl();
  return (
    <section data-screen-label="GMs · Two + marquee" style={{ position:'relative', width:PW, overflow:'hidden', background:G.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background:`
        radial-gradient(74% 48% at 50% 10%, rgb(var(--cm-glow) / calc(40% * var(--cm-glow-i))) 0%, transparent 58%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 44%, var(--cm-bg1) 100%)` }} />
      <div style={{ position:'relative', zIndex:2 }}>
        <div style={{ maxWidth:1240, margin:'0 auto', padding:'100px 64px 0' }}>
          <SectionHeading head={head} text={heading} marginBottom={44} />
          <div className="gm-rise" style={{ animationDelay:'80ms' }}><FeaturedTwo accent={accent} w={300} /></div>
        </div>
        <div className="gm-rise" onMouseEnter={() => ctl.paused.current = true} onMouseLeave={() => ctl.paused.current = false}
          style={{ animationDelay:'160ms', marginTop:48, padding:'0 0 100px',
          WebkitMaskImage:'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
          maskImage:'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)' }}>
          <DriftRail items={GM_DATA} axis="x" cardMain={150} ratio="1/1" gap={12} baseDir={1} baseSpeed={26} mini control={ctl} />
          <div style={{ textAlign:'center', marginTop:26, font:`500 14px/20px ${F.sans}`, color:G.mut }}>20+ Grandmasters, rated up to 2723 FIDE</div>
        </div>
      </div>
    </section>
  );
}

// OPTION 3 — two leads on the left + a drifting multi-column wall ("immersive")
function GMUnifiedWall({ head, heading, accent }) {
  const ctl = useDriftControl();
  const SCRUB = 540;
  const cols = [REST_ROSTER.slice(0, 7), REST_ROSTER.slice(7, 13), REST_ROSTER.slice(13, 19)];
  return (
    <section data-screen-label="GMs · Two + wall" style={{ position:'relative', width:PW, overflow:'hidden', background:G.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background:`
        radial-gradient(74% 46% at 50% 8%, rgb(var(--cm-glow) / calc(38% * var(--cm-glow-i))) 0%, transparent 56%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 40%, var(--cm-bg1) 100%)` }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:1280, margin:'0 auto', padding:'100px 64px 104px' }}>
        <SectionHeading head={head} text={heading} marginBottom={46} />
        <div className="gm-rise" style={{ animationDelay:'80ms', display:'flex', gap:40, alignItems:'center' }}>
          <div style={{ width:300, flexShrink:0 }}><FeaturedTwo accent={accent} dir="col" /></div>
          <div onMouseEnter={() => ctl.paused.current = true} onMouseLeave={() => ctl.paused.current = false} style={{ position:'relative', flex:1, minWidth:0 }}>
            <div style={{ display:'flex', gap:12, height:520, overflow:'hidden',
              WebkitMaskImage:'linear-gradient(180deg, transparent, #000 9%, #000 91%, transparent)',
              maskImage:'linear-gradient(180deg, transparent, #000 9%, #000 91%, transparent)' }}>
              <DriftRail items={cols[0]} axis="y" cardMain={132} ratio="1/1" gap={12} baseDir={1} control={ctl} startOffset={0} mini />
              <DriftRail items={cols[1]} axis="y" cardMain={132} ratio="1/1" gap={12} baseDir={1} control={ctl} startOffset={90} mini />
              <DriftRail items={cols[2]} axis="y" cardMain={132} ratio="1/1" gap={12} baseDir={1} control={ctl} startOffset={45} mini />
            </div>
            <NavArrow glyph="↑" label="Move coaches up" onPress={() => ctl.vel.current = -SCRUB} onRelease={() => ctl.vel.current = 0} style={{ left:'50%', top:8, transform:'translateX(-50%)' }} />
            <NavArrow glyph="↓" label="Move coaches down" onPress={() => ctl.vel.current = SCRUB} onRelease={() => ctl.vel.current = 0} style={{ left:'50%', bottom:8, transform:'translateX(-50%)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// OPTION 4 — spotlight carousel: N big portraits on stage + dimmed side peeks,
// ‹ › arrows + gentle auto-advance. Avetik rotates in like everyone else.
// Reorder so no two GMs of the same country sit next to each other (so they
// never share the carousel stage). Greedy: always place from the largest
// remaining country group whose flag differs from the last two placed, then a
// circular repair pass to fix the wrap-around seam.
function spaceByCountry(list) {
  let buckets = Object.values(list.reduce((m, g) => { (m[g.country] = m[g.country] || []).push(g); return m; }, {}));
  const out = [];
  while (out.length < list.length) {
    buckets = buckets.filter(b => b.length).sort((a, b) => b.length - a.length);
    const c1 = out.length ? out[out.length - 1].country : null;
    const c2 = out.length > 1 ? out[out.length - 2].country : null;
    const pick = buckets.find(b => b[0].country !== c1 && b[0].country !== c2) || buckets[0];
    out.push(pick.shift());
  }
  const n = out.length;
  for (let i = 0; i < n; i++) {
    if (out[i].country === out[(i + 1) % n].country) {
      for (let k = 0; k < n; k++) {
        if (k === i || k === (i + 1) % n) continue;
        const A = out[(i + 1) % n], B = out[k];
        if (out[i].country !== B.country && out[(i + 2) % n].country !== B.country &&
            out[(k - 1 + n) % n].country !== A.country && out[(k + 1) % n].country !== A.country) {
          out[(i + 1) % n] = B; out[k] = A; break;
        }
      }
    }
  }
  return out;
}
const CAROUSEL_ROSTER = spaceByCountry([FOUNDER, ...GM_DATA]);

function GMSpotlightRow({ head, heading, accent, bigCount = 2, bigW = 300, interval = 5200, ratingPlace = 'top', countryMode = 'full', fideColor = '#7FB0E8', countrySide = 'left', gmColor = '#F57C00' }) {
  const roster = CAROUSEL_ROSTER;
  const n = roster.length;
  const [idx, setIdx] = useStateGM(0);
  const [paused, setPaused] = useStateGM(false);
  useEffectGM(() => {
    if (paused) return;
    const id = setInterval(() => setIdx(i => (i + 1) % n), interval);
    return () => clearInterval(id);
  }, [paused, n, interval]);
  const at = (o) => roster[(((idx + o) % n) + n) % n];
  const go = (s) => setIdx(i => (((i + s) % n) + n) % n);
  const peekW = Math.round(bigW * 0.62);
  const bigs = Array.from({ length: bigCount }, (_, i) => at(i));
  return (
    <section data-screen-label={`GMs · ${bigCount} big + peeks`} style={{ position:'relative', width:PW, overflow:'hidden', background:G.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background:`
        radial-gradient(72% 50% at 50% 12%, rgb(var(--cm-glow) / calc(40% * var(--cm-glow-i))) 0%, transparent 58%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 44%, var(--cm-bg1) 100%)` }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:1320, margin:'0 auto', padding:'100px 48px 100px' }}>
        <SectionHeading head={head} text={heading} marginBottom={46} />
        <div className="gm-rise" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center', gap:18 }}>
          <div style={{ width:peekW, flexShrink:0 }}><BigPortrait g={at(-1)} dim monoScale={0.6} /></div>
          <div style={{ display:'flex', gap:18, justifyContent:'center' }}>
            {bigs.map((g) => (
              <div key={g.name} className="gm-fade" style={{ width:bigW, flexShrink:0 }}><BigPortrait g={g} caption founder={g.founder} accent={accent} ratingPlace={ratingPlace} countryMode={countryMode} fideColor={fideColor} countrySide={countrySide} gmColor={gmColor} /></div>
            ))}
          </div>
          <div style={{ width:peekW, flexShrink:0 }}><BigPortrait g={at(bigCount)} dim monoScale={0.6} /></div>
          <NavArrow glyph="‹" label="Previous Grandmasters" onClick={() => go(-1)} style={{ left: peekW * 0.5 - 23, top:'50%', transform:'translateY(-50%)' }} />
          <NavArrow glyph="›" label="Next Grandmasters" onClick={() => go(1)} style={{ right: peekW * 0.5 - 23, top:'50%', transform:'translateY(-50%)' }} />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { GMStudio, GMStudioTrust, GMAurora, GMObservatory, GMStage,
  GMUnifiedGrid, GMUnifiedMarquee, GMUnifiedWall, GMSpotlightRow });
