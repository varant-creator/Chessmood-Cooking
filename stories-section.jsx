/* eslint-disable */
// ChessMood 3 — "Success stories" section. Real players, big faces, a result
// badge + headline + "Read full story" CTA linking to each interview.
// Built five ways. Photos drop straight in (set `photo` on a story).
// Uses globals PW, F (from hero-premium). Names SS-/ss- prefixed.

const { useState: useStateSS, useEffect: useEffectSS, useRef: useRefSS } = React;

const SS = {
  text:'var(--cm-text, #FFFFFF)', mut:'var(--cm-mut, rgba(255,255,255,0.66))',
  mut2:'var(--cm-mut2, rgba(255,255,255,0.46))', line:'var(--cm-line, rgba(255,255,255,0.10))',
  glass:'var(--cm-glass, rgba(255,255,255,0.05))', glassHi:'var(--cm-glassHi, rgba(255,255,255,0.08))',
  bg1:'var(--cm-bg1, #070C16)', bg2:'var(--cm-bg2, #0A1326)', orange:'#F57C00', blue:'#5B8FD6',
};
const ssHead = (head) => `${(head && head.headFont) || 'Inter'}, Inter, system-ui, sans-serif`;
const ssAlpha = (hex, a) => { const h=(hex||'#888').replace('#',''); const n=parseInt(h.length===3?h.split('').map(c=>c+c).join(''):h,16); return `rgba(${(n>>16)&255}, ${(n>>8)&255}, ${n&255}, ${a})`; };
const SS_BASE = 'https://chessmood.com/success-stories/';

// ---- the stories (real names, results, article links) --------------------
// `photo` set where we have a real image; others fall back to a warm placeholder.
const STORIES = [
  { slug:'avinash-ramesh-story',  name:'Avinash Ramesh',        meta:'India',                 delta:'1933 → 2400+',        headline:'From 1933 to 2400+ in a single year', flag:'🇮🇳', photo:'ds/story-avinash.png' },
  { slug:'zoubaier-amdouni',      name:'Zoubaier Amdouni',      meta:'FM · Tunisia',          delta:'National Champion',   headline:'From lost momentum to National Champion', flag:'🇹🇳', photo:'ds/story-zoubaier.png' },
  { slug:'kevin-goh-story',       name:'Kevin Goh',             meta:'GM · Singapore',        delta:'Became a GM',         headline:'The openings that helped him finally make Grandmaster', flag:'🇸🇬', photo:'ds/story-kevingoh.png' },
  { slug:'gian-carlo-di-martino', name:'Gian Carlo Di Martino', meta:'Adult improver · 74',   delta:'+350 in 4 months',    headline:'74 years old — and still climbing', flag:'🇮🇹', photo:'ds/inbox-3.png' },
  { slug:'sl-narayanan',          name:'SL Narayanan',          meta:'GM · India',            delta:'World top 100',       headline:"The anti-arrogant ChessMoodian's climb to the top 100", flag:'🇮🇳', photo:'ds/inbox-11.png' },
  { slug:'anastasiia-osadchuk',   name:'Anastasiia Osadchuk',   meta:'Ukraine',               delta:'World Am. Champion',  headline:'Through war and struggle to World Amateur Champion', flag:'🇺🇦', photo:'ds/story-anastasiia.png' },
  { slug:'prin-laohawirapap',     name:'Prin Laohawirapap',     meta:'IM · Thailand',         delta:'+600 · first IM',     headline:'+600 elo and the first IM of his country', flag:'🇹🇭', photo:'ds/story-prin.png' },
  { slug:'sandro-safar',          name:'Sandro Safar',          meta:'FM',                    delta:'Became an FM',        headline:'FM with just one hour of daily training', flag:'🇲🇪', photo:'ds/story-sandro.png' },
  { slug:'angelo-sifaleras',      name:'Angelo Sifaleras',      meta:'Professor · Greece',    delta:'Broke 2000',          headline:'How a math professor broke the plateau', flag:'🇬🇷', photo:'ds/story-angelo.png' },
  { slug:'jessica-metaneira',     name:'Jessica Metaneira',     meta:'Adult improver',        delta:'+550',                headline:'Blunderproofing her game and her mindset', flag:'🌍', photo:'ds/inbox-5.png' },
  { slug:'doctor-shahinur-haque-chess-improver', name:'Dr. Shahinur Haque', meta:'Doctor',    delta:'+400 in a year',      headline:'The doctor who used only ChessMood to gain 400', flag:'🇧🇩', photo:'ds/story-shahinur.png' },
  { slug:'mik-bernicchi',         name:'Mik Bernicchi',         meta:'Adult improver',        delta:'+600',                headline:'+600 points — and a visit to ChessMood', flag:'🇫🇷', hide:true },
  { slug:'karthik-ramesh',        name:'Karthik Ramesh',        meta:'India',                 delta:'+450',                headline:'+450 in under a year — with a full-time job', flag:'🇮🇳', photo:'ds/story-karthik.png' },
  { slug:'jules-carter',          name:'Jules Carter',          meta:'Adult improver',        delta:'+500 in 7 months',    headline:'500 points in seven months', flag:'🇺🇸', photo:'ds/story-jules.png' },
  { slug:'anthony-giles',         name:'Anthony Giles',         meta:'Adult improver',        delta:'One course, transformed', headline:'The one course that transformed his chess', flag:'🌍', photo:'ds/story-anthony.png' },
  { slug:'alexander-shapiro',     name:'Alexander Shapiro',     meta:'Adult improver',        delta:'Silver w/ Anand',     headline:'A career gambit — then silver alongside Anand', flag:'🌍', photo:'ds/story-shapiro.png' },
  { slug:'jeffrey-sweeney',       name:'Jeffrey Sweeney',       meta:'Adult improver',        delta:'+500 in 4 months',    headline:'No excuses, no compromises — then +500 in 4 months', flag:'🇺🇸', photo:'ds/story-jeffrey.png' },
  { slug:'william-graif',         name:'William Graif',         meta:'Chess Master · USA',    delta:'Skeptic → Master',    headline:'From skepticism to success with ChessMood', flag:'🇺🇸', photo:'ds/inbox-6.png' },
  { slug:'debasish-bhattacharjee',name:'Debasish Bhattacharjee',meta:'Adult improver',        delta:'+400 in a year',      headline:'The power of focused learning', flag:'🇮🇳', photo:'ds/inbox-9.png' },
  { slug:'vedant-garg',           name:'Vedant Garg',           meta:'Junior · India',        delta:'+700 elo',            headline:'Raising 700 elo with a simple mindshift', flag:'🇮🇳', photo:'ds/inbox-8.png' },
  { slug:'jay-garrison-adult-chess-improver', name:'Jay Garrison', meta:'Adult improver',      delta:'+500 in a year',      headline:'The adult improver doing the improbable', flag:'🇺🇸', photo:'ds/inbox-7.png' },
  { slug:'kevin-hall-story',      name:'Kevin Hall',            meta:'Adult improver',        delta:'+300 in 6 months',    headline:'+300 in 6 months — despite a full-time job', flag:'🇺🇸', photo:'ds/story-kevinhall.png' },
  { slug:'neo-toppinen',          name:'Neo Toppinen',          meta:'Adult improver',        delta:'+500 in 5 months',    headline:'+500 in 5 months after abandoning a popular belief', flag:'🇫🇮', photo:'ds/story-neo.png' },
].filter(s => !s.hide);

const ssInitials = (name) => name.replace(/^(GM|IM|FM|Dr\.) /,'').split(/[ ]/).map(s=>s[0]).slice(0,2).join('').toUpperCase();
// warm placeholder gradients (kept dark so overlay text always reads)
const SS_PH = ['linear-gradient(155deg,#3A2A1E,#241A12)','linear-gradient(155deg,#2A3340,#1A222E)','linear-gradient(155deg,#33271C,#221A14)','linear-gradient(155deg,#2E3138,#1E2026)','linear-gradient(155deg,#3A2B22,#241B16)'];

// ---- the story card (tall, full-bleed portrait, result + CTA) ------------
// flag emoji -> country label (matches the Grandmaster-section flag+country style)
const FLAG_COUNTRY = {
  '🇮🇳':'India','🇹🇳':'Tunisia','🇸🇬':'Singapore','🇮🇹':'Italy','🇺🇦':'Ukraine',
  '🇹🇭':'Thailand','🇲🇪':'Montenegro','🇬🇷':'Greece','🇧🇩':'Bangladesh',
  '🇺🇸':'United States','🇫🇮':'Finland','🇫🇷':'France',
};
// "Read the full story" CTA — four styles, switchable via the `storyCta` tweak.
//  solid   — filled orange (the original)
//  outline — hairline outline that fills orange on hover (lighter touch)
//  glass   — frosted white pill (reads on any photo, very modern)
//  link    — text + arrow only, warm-orange (most minimal / editorial)
function StoryCTA({ cta='solid', big=false, h=false }) {
  const label = 'Read the full story';
  const arrow = <span aria-hidden style={{ transition:'transform .2s ease', transform: h?'translateX(3px)':'none' }}>→</span>;
  const base = { display:'inline-flex', alignItems:'center', gap:7, marginTop:big?16:12, font:`600 14px/1 ${F.sans}`, alignSelf:'flex-start' };
  if (cta==='link')
    return <span style={{ ...base, color: h?'#FFB877':'#F7A34D', textDecoration: h?'underline':'none', textUnderlineOffset:3 }}>{label} {arrow}</span>;
  if (cta==='glass')
    return <span style={{ ...base, color:'#fff', padding:'10px 17px', borderRadius:10, background: h?'rgba(255,255,255,0.24)':'rgba(255,255,255,0.13)', border:'1px solid rgba(255,255,255,0.30)', backdropFilter:'blur(8px)', transition:'background .16s ease' }}>{label} {arrow}</span>;
  if (cta==='outline')
    return <span style={{ ...base, color:'#fff', padding:'9px 16px', borderRadius:8, background: h?'#F57C00':'transparent', border:`1px solid ${h?'#F57C00':'rgba(255,255,255,0.42)'}`, transition:'background .16s ease, border-color .16s ease' }}>{label} {arrow}</span>;
  return <span style={{ ...base, color:'#fff', padding:'10px 16px', borderRadius:8, background: h?'#E68A00':'#F57C00', border:`1px solid ${h?'#E68A00':'#F57C00'}`, transition:'background .16s ease, border-color .16s ease' }}>{label} {arrow}</span>;
}

function StoryCard({ s, w=300, ratio='3/4', i=0, big=false, hideHeadline=false, subline=false, cta='solid', reflect=false, reflectBleed=0 }) {
  const [h, setH] = useStateSS(false);
  const real = !!s.photo;
  // Names are the primary label on cards with the headline hidden (ghost wall),
  // so they get the biggest size there; everywhere else they step up a notch too.
  const nameSize = big ? 23 : (hideHeadline ? 16 : 17);
  const card = (
    <a href={SS_BASE + s.slug} target="_blank" rel="noopener noreferrer"
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ display:'block', position:'relative', width:w, aspectRatio:ratio, borderRadius:16, overflow:'hidden', flexShrink:0,
        textDecoration:'none', border:`1px solid ${ssAlpha('#16243A',0.5)}`,
        background: real ? '#1A222E' : SS_PH[i % SS_PH.length],
        boxShadow: h ? '0 1.5px 3px rgba(16,24,40,0.18), 0 24px 44px -16px rgba(16,24,40,0.40), 0 48px 90px -40px rgba(16,24,40,0.52)' : '0 1.5px 3px rgba(16,24,40,0.16), 0 14px 26px -12px rgba(16,24,40,0.28), 0 34px 70px -38px rgba(16,24,40,0.40)',
        transform: h ? 'translateY(-6px)' : 'none', transition:'transform .2s cubic-bezier(.2,0,0,1), box-shadow .2s ease' }}>
      {/* portrait */}
      {real
        ? <img src={s.photo} alt={s.name} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 22%' }} />
        : <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ font:`800 ${big?120:90}px/1 ${F.display}`, letterSpacing:'-.04em', color:'rgba(255,255,255,0.10)' }}>{ssInitials(s.name)}</span>
          </div>}
      {/* gradients */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(8,12,22,0.42) 0%, transparent 26%, transparent 44%, rgba(6,10,18,0.92) 100%)' }} />
      {/* delta badge */}
      {!subline && <span style={{ position:'absolute', top:14, left:14, display:'inline-flex', alignItems:'center', gap:6, padding:'6px 12px', borderRadius:999,
        background:'var(--cm-badge-bg, rgba(8,12,22,0.5))', backdropFilter:'blur(8px)', border:'1px solid var(--cm-badge-bd, rgba(255,255,255,0.24))', font:`700 ${big?13:12}px/1 ${F.sans}`, letterSpacing:'.01em', color:'var(--cm-badge-fg, #fff)' }}>
        {s.delta}
      </span>}
      {!subline && <span style={{ position:'absolute', top:14, right:14, display:'inline-flex', alignItems:'center', padding: big?'5px 10px':'4px 9px', borderRadius:999,
        background:'rgba(8,12,22,0.5)', border:'1px solid rgba(255,255,255,0.2)', backdropFilter:'blur(6px)', fontSize: big?16:14, lineHeight:1 }}>{s.flag}</span>}
      {subline && <span style={{ position:'absolute', top:14, left:14, display:'inline-flex', alignItems:'center', gap:7, padding:'5px 11px', borderRadius:999,
        background:'rgba(8,12,22,0.5)', border:'1px solid rgba(255,255,255,0.2)', backdropFilter:'blur(6px)', font:`600 12px/1 ${F.sans}`, color:'#fff' }}>
        <span style={{ fontSize:14, lineHeight:1 }}>{s.flag}</span>
        {FLAG_COUNTRY[s.flag] && <span style={{ color:'rgba(255,255,255,0.85)' }}>{FLAG_COUNTRY[s.flag]}</span>}
      </span>}
      {/* placeholder hint */}
      {!real && <span style={{ position:'absolute', top:16, right:14, font:`500 10px/1 ${F.sans}`, letterSpacing:'.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)' }}>photo soon</span>}
      {/* bottom content */}
      <div style={{ position:'absolute', left:0, right:0, bottom:0, padding: big?'24px':'18px' }}>
        <div style={{ marginBottom: subline ? 8 : (big?12 : (hideHeadline?6:9)) }}>
          <span style={{ font:`700 ${nameSize}px/1.2 ${F.sans}`, color:'#fff' }}>{s.name}</span>
        </div>
        {subline && <div style={{ marginBottom:10 }}>
          <span style={{ display:'inline-flex', alignItems:'center', padding:'7px 14px', borderRadius:999,
            background:'var(--cm-badge-bg, rgba(8,12,22,0.5))', border:'1px solid var(--cm-badge-bd, rgba(255,255,255,0.24))', backdropFilter:'blur(8px)',
            font:`700 18px/1 ${F.sans}`, letterSpacing:'.01em', color:'var(--cm-badge-fg, #fff)' }}>{s.delta}</span>
        </div>}
        {!hideHeadline && <h3 style={{ margin:0, fontFamily:ssHead(), fontWeight:600, fontSize:big?23:17, lineHeight:1.22, letterSpacing:'-.01em', color:'#fff', textWrap:'pretty' }}>{s.headline}</h3>}
        <StoryCTA cta={cta} big={big} h={h} />
      </div>
    </a>
  );
  if (!reflect || !real) return card;
  const [rw, rh] = (ratio || '3/4').split('/').map(Number);
  const cardHpx = (typeof w === 'number') ? Math.round(w * rh / rw) : null;
  if (!cardHpx) return card;
  // a very slight mirrored reflection, so the card sits on a "floor"
  // (matches the hero video-thumbnail reflection)
  // a mirrored reflection so the card sits on a "floor" (matches the hero
  // video-thumbnail reflection). `reflectBleed` widens each reflection into the
  // card gap so neighbours butt together into ONE continuous reflective band.
  const bleed = reflectBleed || 0;
  return (
    <div style={{ display:'flex', flexDirection:'column', width:w, flexShrink:0 }}>
      {card}
      <div aria-hidden style={{ height:Math.round(cardHpx*0.32), marginTop:8, marginLeft:-bleed/2, marginRight:-bleed/2, width:(typeof w==='number'? w+bleed : '100%'), overflow:'hidden', transform:'scaleY(-1)', opacity:0.34, pointerEvents:'none',
        WebkitMaskImage:'linear-gradient(to top, rgba(0,0,0,0.85), transparent 74%)', maskImage:'linear-gradient(to top, rgba(0,0,0,0.85), transparent 74%)' }}>
        <img src={s.photo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center bottom' }} />
      </div>
    </div>
  );
}

// ---- section heading ------------------------------------------------------
function SSHeading({ head, align='center', mb=52 }) {
  return (
    <div style={{ textAlign:align, marginBottom:mb, maxWidth: align==='center'?880:'none', marginLeft: align==='center'?'auto':0, marginRight: align==='center'?'auto':0 }}>
      <h2 style={{ margin:'0', fontFamily:ssHead(head), fontWeight:700, fontSize:52, lineHeight:1.07, letterSpacing:'-.035em', color:SS.text }}>
        Real students. Real wins.
      </h2>
      <p style={{ margin:'20px auto 0', maxWidth:680, font:`400 18px/29px ${F.sans}`, color:SS.mut, marginLeft: align==='center'?'auto':0, marginRight: align==='center'?'auto':0 }}>
        Thousands of ChessMood students are improving with a Grandmaster-built plan. Here are a few of their stories.
      </p>
    </div>
  );
}

// auto-drift hook (horizontal or vertical scroll container, seamless loop)
function useSSDrift(ref, { axis='x', speed=0.45 } = {}) {
  const paused = useRefSS(false);
  useEffectSS(() => {
    const el = ref.current; if (!el) return;
    let raf;
    const tick = () => {
      if (!paused.current) {
        if (axis==='x') {
          el.scrollLeft += speed;
          if (el.scrollLeft >= el.scrollWidth/2) el.scrollLeft -= el.scrollWidth/2;
        } else {
          el.scrollTop += speed;
          if (el.scrollTop >= el.scrollHeight/2) el.scrollTop -= el.scrollHeight/2;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return paused;
}

function SSArrow({ glyph, onClick, style }) {
  return (
    <button onClick={onClick} aria-label="scroll" className="gm-nav"
      style={{ position:'absolute', zIndex:6, width:46, height:46, borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', padding:0,
        border:`1px solid var(--cm-navborder, ${SS.glassHi})`, background:'var(--cm-navbg, rgba(8,12,22,0.6))', backdropFilter:'blur(10px)', color:'var(--cm-navfg, #fff)', font:'500 22px/1 system-ui', boxShadow:'0 12px 34px -14px rgba(0,0,0,0.5)', ...style }}>
      {glyph}
    </button>
  );
}

// =====================================================================
// A · STUDIO — the reference: centered heading + one big horizontal rail
// that auto-drifts; ‹ › arrows nudge it. Tall portrait cards.
// =====================================================================
function StoriesStudio({ head }) {
  const ref = useRefSS(null);
  const paused = useSSDrift(ref, { axis:'x', speed:0.4 });
  const loop = [...STORIES, ...STORIES];
  const nudge = (d) => { const el=ref.current; if(el){ paused.current=true; el.scrollBy({ left:d*340, behavior:'smooth' }); setTimeout(()=>paused.current=false, 1400);} };
  return (
    <section data-screen-label="Stories · Studio" style={{ position:'relative', width:PW, overflow:'hidden', background:SS.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background:`
        radial-gradient(70% 42% at 50% 8%, rgb(var(--cm-glow) / calc(34% * var(--cm-glow-i))) 0%, transparent 56%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 50%, var(--cm-bg1) 100%)` }} />
      <div style={{ position:'relative', zIndex:2, padding:'104px 0 110px' }}>
        <div className="gm-rise" style={{ maxWidth:1200, margin:'0 auto', padding:'0 64px' }}><SSHeading head={head} /></div>
        <div className="gm-rise" style={{ animationDelay:'90ms', position:'relative' }}
          onMouseEnter={()=>paused.current=true} onMouseLeave={()=>paused.current=false}>
          <div ref={ref} style={{ display:'flex', gap:20, overflowX:'auto', padding:'8px 64px 8px', scrollbarWidth:'none',
            WebkitMaskImage:'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)', maskImage:'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)' }}>
            {loop.map((s,i)=><StoryCard key={i} s={s} i={i} w={306} ratio="3/4" />)}
          </div>
          <SSArrow glyph="‹" onClick={()=>nudge(-1)} style={{ left:18, top:'50%', transform:'translateY(-50%)' }} />
          <SSArrow glyph="›" onClick={()=>nudge(1)} style={{ right:18, top:'50%', transform:'translateY(-50%)' }} />
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// A2 · STUDIO (trust first) — aggregate proof strip, then TWO rails
// drifting in opposite directions (lots of stories at a glance).
// =====================================================================
function StoriesStudioTrust({ head }) {
  const refA = useRefSS(null), refB = useRefSS(null);
  const pa = useSSDrift(refA, { axis:'x', speed:0.36 });
  const pb = useSSDrift(refB, { axis:'x', speed:0.36 });
  const half = Math.ceil(STORIES.length/2);
  const rowA = [...STORIES.slice(0,half), ...STORIES.slice(0,half)];
  const rowB = [...STORIES.slice(half), ...STORIES.slice(half)];
  // start row B scrolled so the two rows look offset
  useEffectSS(()=>{ if(refB.current) refB.current.scrollLeft = 170; }, []);
  return (
    <section data-screen-label="Stories · Studio (trust first)" style={{ position:'relative', width:PW, overflow:'hidden', background:SS.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background:`
        radial-gradient(72% 38% at 50% 6%, rgb(var(--cm-glow) / calc(32% * var(--cm-glow-i))) 0%, transparent 54%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 50%, var(--cm-bg1) 100%)` }} />
      <div style={{ position:'relative', zIndex:2, padding:'100px 0 108px' }}>
        <div className="gm-rise" style={{ maxWidth:1100, margin:'0 auto', padding:'0 64px', textAlign:'center' }}>
          <SSHeading head={head} mb={20} />
        </div>
        {[['A',refA,pa,rowA],['B',refB,pb,rowB]].map(([k,ref,paused,row],ri)=>(
          <div key={k} className="gm-rise" style={{ animationDelay:`${120+ri*60}ms`, marginTop: ri?16:30 }}
            onMouseEnter={()=>paused.current=true} onMouseLeave={()=>paused.current=false}>
            <div ref={ref} style={{ display:'flex', gap:18, overflowX:'auto', padding:'4px 64px', scrollbarWidth:'none',
              WebkitMaskImage:'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)', maskImage:'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)' }}>
              {row.map((s,i)=><StoryCard key={i} s={s} i={i+ri} w={252} ratio="4/5" />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// =====================================================================
// AMBIENT CROWD — a faint wall of the SAME testimonial cards, just smaller:
// ~4 lines drifting left/right (alternating) at very low opacity, so you feel
// the volume of students without it competing with the foreground rail.
// =====================================================================
function AmbientMini({ s }) {
  return (
    <div style={{ position:'relative', width:118, aspectRatio:'3/4', borderRadius:10, overflow:'hidden', flexShrink:0,
      border:'1px solid rgba(255,255,255,0.14)', background:'#1A222E' }}>
      <img src={s.photo} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 22%' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(8,12,22,0.18) 0%, transparent 30%, transparent 52%, rgba(6,10,18,0.9) 100%)' }} />
      <span style={{ position:'absolute', top:7, left:7, padding:'3px 6px', borderRadius:999, background:'var(--cm-badge-bg, rgba(8,12,22,0.5))',
        border:'1px solid var(--cm-badge-bd, rgba(255,255,255,0.24))', font:`700 7px/1 ${F.sans}`, color:'var(--cm-badge-fg, #fff)' }}>{s.delta}</span>
      <div style={{ position:'absolute', left:8, right:8, bottom:8 }}>
        <div style={{ font:`700 9px/1.15 ${F.sans}`, color:'#fff', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.name}</div>
        <div style={{ font:`400 8px/1.2 ${F.sans}`, color:'rgba(255,255,255,0.62)', marginTop:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.meta}</div>
      </div>
    </div>
  );
}
// One faint, slow-drifting line of mini cards — used once above the rail and
// once below it, framing the foreground with a sense of "many more".
function AmbientRow({ dir='left', opacity=0.14 }) {
  const list = STORIES.filter(s=>s.photo);
  const off = dir==='right' ? 7 : 0;
  const shifted = [...list.slice(off), ...list.slice(0, off)];
  const loop = [...shifted, ...shifted];
  return (
    <div aria-hidden style={{ overflow:'hidden', opacity, pointerEvents:'none',
      WebkitMaskImage:'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
      maskImage:'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)' }}>
      <div className={`gm-marquee-track ${dir==='right'?'gm-marquee-rev':''}`}
        style={{ display:'flex', gap:16, paddingRight:16, animationDuration:'160s' }}>
        {loop.map((s,i)=><AmbientMini key={i} s={s} />)}
      </div>
    </div>
  );
}

// Studio-style centered rail (one big auto-drifting row of tall portraits),
// floating over the ambient crowd. `glow` picks the backdrop flavor so Aurora
// keeps its glow-from-below while Observatory gets the studio top glow.
function StoriesAmbient({ head, glow='top', label='Stories' }) {
  const ref = useRefSS(null);
  const paused = useSSDrift(ref, { axis:'x', speed:0.4 });
  const loop = [...STORIES, ...STORIES];
  const nudge = (d) => { const el=ref.current; if(el){ paused.current=true; el.scrollBy({ left:d*340, behavior:'smooth' }); setTimeout(()=>paused.current=false, 1400);} };
  const backdrop = glow==='bottom'
    ? `radial-gradient(120% 60% at 50% 120%, rgb(var(--cm-glow) / calc(48% * var(--cm-glow-i))) 0%, rgb(var(--cm-glow) / calc(16% * var(--cm-glow-i))) 40%, transparent 66%),
       linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 60%, var(--cm-bg1) 100%)`
    : `radial-gradient(72% 44% at 50% 6%, rgb(var(--cm-glow) / calc(34% * var(--cm-glow-i))) 0%, transparent 56%),
       linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 50%, var(--cm-bg1) 100%)`;
  return (
    <section data-screen-label={label} style={{ position:'relative', width:PW, overflow:'hidden', background:SS.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background: backdrop }} />
      <div style={{ position:'relative', zIndex:2, padding:'72px 0 78px' }}>
        <AmbientRow dir="left" />
        <div className="gm-rise" style={{ maxWidth:1200, margin:'0 auto', padding:'0 64px', marginTop:58 }}><SSHeading head={head} /></div>
        <div className="gm-rise" style={{ animationDelay:'90ms', position:'relative', marginBottom:58 }}
          onMouseEnter={()=>paused.current=true} onMouseLeave={()=>paused.current=false}>
          <div ref={ref} style={{ display:'flex', gap:20, overflowX:'auto', padding:'8px 64px', scrollbarWidth:'none',
            WebkitMaskImage:'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)', maskImage:'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)' }}>
            {loop.map((s,i)=><StoryCard key={i} s={s} i={i} w={306} ratio="3/4" />)}
          </div>
          <SSArrow glyph="‹" onClick={()=>nudge(-1)} style={{ left:18, top:'50%', transform:'translateY(-50%)' }} />
          <SSArrow glyph="›" onClick={()=>nudge(1)} style={{ right:18, top:'50%', transform:'translateY(-50%)' }} />
        </div>
        <AmbientRow dir="right" />
      </div>
    </section>
  );
}

// =====================================================================
// B · AURORA — Studio rail + ambient crowd, kept over Aurora's glow-from-below.
// =====================================================================
function StoriesAurora({ head }) {
  return <StoriesAmbient head={head} glow="bottom" label="Stories · Aurora" />;
}

// =====================================================================
// C · OBSERVATORY — editorial: a big featured portrait + quote on the left,
// a clickable list of stories on the right; hover/click switches the feature.
// =====================================================================
function StoriesObservatory({ head }) {
  const [act, setAct] = useStateSS(0);
  const s = STORIES[act];
  return (
    <section data-screen-label="Stories · Observatory" style={{ position:'relative', width:PW, overflow:'hidden', background:SS.bg1, fontFamily:F.sans }}>
      <div style={{ position:'absolute', inset:0, background:`
        radial-gradient(50% 60% at 94% 4%, rgb(var(--cm-glow) / calc(40% * var(--cm-glow-i))) 0%, transparent 56%),
        radial-gradient(46% 54% at 2% 98%, rgba(245,124,0,0.09) 0%, transparent 60%)` }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:1240, margin:'0 auto', padding:'100px 64px 108px' }}>
        <div className="gm-rise" style={{ marginBottom:44 }}><SSHeading head={head} align="left" mb={0} /></div>
        <div style={{ display:'grid', gridTemplateColumns:'420px 1fr', gap:56, alignItems:'start' }}>
          <div key={s.slug} className="gm-fade"><StoryCard s={s} w={'100%'} ratio="4/5" big /></div>
          <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
            {STORIES.slice(0,8).map((st,i)=>{
              const on = i===act;
              return (
                <div key={st.slug} onMouseEnter={()=>setAct(i)}
                  style={{ display:'flex', alignItems:'center', gap:16, padding:'14px 16px', borderRadius:12, cursor:'default',
                    background: on?SS.glass:'transparent', border:`1px solid ${on?ssAlpha('#F57C00',0.3):'transparent'}`, transition:'all .16s ease' }}>
                  <span style={{ font:`700 13px/1 ${F.sans}`, color: on?SS.orange:SS.mut2, width:22, flexShrink:0 }}>{String(i+1).padStart(2,'0')}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ font:`600 17px/22px ${F.sans}`, color: on?SS.text:SS.mut, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{st.headline}</div>
                    <div style={{ font:`400 13px/17px ${F.sans}`, color:SS.mut2, marginTop:2 }}>{st.name} · {st.meta}</div>
                  </div>
                  <span style={{ flexShrink:0, padding:'5px 11px', borderRadius:999, background: on?ssAlpha('#F57C00',0.16):SS.glass, border:`1px solid ${on?ssAlpha('#F57C00',0.4):SS.line}`, font:`700 12px/1 ${F.sans}`, color: on?SS.orange:SS.mut }}>{st.delta}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// D · STAGE — vertical drift: three columns of story cards moving up/down
// (alternating), with ↑ ↓ arrows. "Lots of them", in motion.
// =====================================================================
function StoriesStage({ head }) {
  const cols = [[], [], []];
  STORIES.forEach((s,i)=>cols[i%3].push(s));
  return (
    <section data-screen-label="Stories · Stage" style={{ position:'relative', width:PW, overflow:'hidden', background:SS.bg1, fontFamily:F.sans }}>
      <div className="gm-breathe" style={{ position:'absolute', inset:0, background:`
        radial-gradient(60% 60% at 50% 40%, rgb(var(--cm-glow) / calc(44% * var(--cm-glow-i))) 0%, transparent 62%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 52%, var(--cm-bg1) 100%)` }} />
      <div style={{ position:'relative', zIndex:2, display:'grid', gridTemplateColumns:'minmax(340px, 0.9fr) 1.3fr', gap:56, maxWidth:1280, margin:'0 auto', padding:'100px 64px 100px', alignItems:'center' }}>
        <div className="gm-rise"><SSHeading head={head} align="left" mb={0} /></div>
        <div style={{ position:'relative', height:560, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16, overflow:'hidden',
          WebkitMaskImage:'linear-gradient(180deg, transparent, #000 9%, #000 91%, transparent)', maskImage:'linear-gradient(180deg, transparent, #000 9%, #000 91%, transparent)' }}>
          {cols.map((col,ci)=>(
            <SSVColumn key={ci} stories={col} dir={ci%2?'down':'up'} delay={ci*-7} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SSVColumn({ stories, dir='up', delay=0 }) {
  const loop = [...stories, ...stories];
  return (
    <div style={{ overflow:'hidden' }}>
      <div className={`gm-vrail ${dir==='down'?'gm-vrail-rev':''}`} style={{ display:'flex', flexDirection:'column', gap:16, animationDelay:`${delay}s` }}>
        {loop.map((s,i)=><StoryCard key={i} s={s} i={i} w={'100%'} ratio="3/4" />)}
      </div>
    </div>
  );
}

// =====================================================================
// REAL-STUDENTS WALL — 5 takes for Option 3 (Aurora). All use horizontal
// left/right drift; they differ in feel, card size and heading placement.
// Switch between them with the `wallTake` tweak. (Shares STORIES, StoryCard,
// AmbientMini, SSHeading from above.)
// =====================================================================
const WALL_MASK_X = 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)';
const WALL_MASK_Y = 'linear-gradient(180deg, transparent, #000 10%, #000 90%, transparent)';

// one drifting row of full story cards
function WallRow({ cards, dir='left', gap=18, speed=170, cardW=220, ratio='3/4', hideHeadline=false }) {
  const loop = [...cards, ...cards];
  return (
    <div className="gm-marquee" style={{ overflow:'hidden', WebkitMaskImage:WALL_MASK_X, maskImage:WALL_MASK_X }}>
      <div className={`gm-marquee-track ${dir==='right'?'gm-marquee-rev':''}`}
        style={{ display:'flex', gap, paddingRight:gap, animationDuration:`${speed}s`, alignItems:'stretch' }}>
        {loop.map((s,i)=><StoryCard key={i} s={s} i={i} w={cardW} ratio={ratio} hideHeadline={hideHeadline} />)}
      </div>
    </div>
  );
}
// one drifting row of small tiles (faces over detail)
function WallTileRow({ cards, dir='left', speed=150 }) {
  const loop = [...cards, ...cards];
  return (
    <div className="gm-marquee" style={{ overflow:'hidden', WebkitMaskImage:WALL_MASK_X, maskImage:WALL_MASK_X }}>
      <div className={`gm-marquee-track ${dir==='right'?'gm-marquee-rev':''}`}
        style={{ display:'flex', gap:14, paddingRight:14, animationDuration:`${speed}s` }}>
        {loop.map((s,i)=><AmbientMini key={i} s={s} />)}
      </div>
    </div>
  );
}
function wallSplit(n) {
  const rows = Array.from({ length:n }, ()=>[]);
  STORIES.forEach((s,i)=>rows[i%n].push(s));
  return rows;
}
// Faces for the ghost-wall background — testimonial/review photos only (no
// story needed). Drop more image paths in here as students send photos; the
// crowd scales up automatically.
const FACES = [
  'ds/story-avinash.png','ds/story-zoubaier.png','ds/story-kevingoh.png','ds/story-anastasiia.png',
  'ds/story-prin.png','ds/story-sandro.png','ds/story-angelo.png','ds/story-shahinur.png',
  'ds/story-karthik.png','ds/story-jules.png','ds/story-anthony.png','ds/story-shapiro.png',
  'ds/story-jeffrey.png','ds/story-kevinhall.png','ds/story-neo.png',
];

function FaceTile({ src }) {
  return (
    <div style={{ position:'relative', width:118, aspectRatio:'3/4', borderRadius:4, overflow:'hidden', flexShrink:0, background:'#1A222E' }}>
      <img src={src} alt="" loading="lazy" onError={(e)=>{const i=e.currentTarget;const n=+(i.dataset.retry||0);if(n<5){i.dataset.retry=n+1;setTimeout(()=>{i.src=src+(src.indexOf('?')<0?'?':'&')+'r='+Date.now();},220*(n+1));}}} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 22%' }} />
    </div>
  );
}
function FaceRow({ faces, dir='left', speed=150 }) {
  const loop = [...faces, ...faces];
  return (
    <div className="gm-marquee" style={{ overflow:'hidden', WebkitMaskImage:WALL_MASK_X, maskImage:WALL_MASK_X }}>
      <div className={`gm-marquee-track ${dir==='right'?'gm-marquee-rev':''}`}
        style={{ display:'flex', gap:6, paddingRight:6, animationDuration:`${speed}s`, alignItems:'center' }}>
        {loop.map((src,i)=><FaceTile key={i} src={src} />)}
      </div>
    </div>
  );
}
// Ghost-crowd rows: every row uses the FULL faces pool, each rotated to a
// different start (and alternate rows reversed) so the same face never lines
// up across rows and only repeats once per full loop (not every few tiles).
function ghostRows(n) {
  const pool = FACES;
  return Array.from({ length:n }, (_, r) => {
    const rot = (Math.floor(pool.length * r / n) + r * 3) % pool.length;
    const arr = [...pool.slice(rot), ...pool.slice(0, rot)];
    return r % 2 ? arr.reverse() : arr;
  });
}
function WallTitle({ head, align='center', sub='Thousands of ChessMood students are improving with a Grandmaster-built plan. Here are a few of their stories.', size=54 }) {
  return (
    <div style={{ textAlign:align, maxWidth: align==='center'?620:'none' }}>
      <h2 style={{ margin:0, fontFamily:ssHead(head), fontWeight:700, fontSize:size, lineHeight:1.06, letterSpacing:'-.035em', color:SS.text }}>Real students. Real wins.</h2>
      <p style={{ margin:'18px 0 0', maxWidth:480, marginLeft: align==='center'?'auto':0, marginRight: align==='center'?'auto':0, font:`400 18px/28px ${F.sans}`, color:SS.mut }}>{sub}</p>
    </div>
  );
}
function WallBackdrop({ from='bottom' }) {
  const g = from==='bottom'
    ? `radial-gradient(120% 70% at 50% 124%, rgb(var(--cm-glow) / calc(40% * var(--cm-glow-i))) 0%, transparent 64%),
       linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 58%, var(--cm-bg1) 100%)`
    : `radial-gradient(72% 44% at 50% 6%, rgb(var(--cm-glow) / calc(34% * var(--cm-glow-i))) 0%, transparent 56%),
       linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 50%, var(--cm-bg1) 100%)`;
  return <div className="gm-breathe" style={{ position:'absolute', inset:0, background:g }} />;
}

// TAKE 1 — IMMERSIVE: the wall fills the section; the headline sits in a calm
// spotlight clearing in the middle. (also powers the dense MOSAIC take.)
function WallImmersive({ head, rowsN=4, cardW=210, tile=false, h=880 }) {
  const rows = wallSplit(rowsN);
  return (
    <section data-screen-label="Stories · Aurora" style={{ position:'relative', width:PW, height:h, overflow:'hidden', background:SS.bg1, fontFamily:F.sans }}>
      <WallBackdrop from="bottom" />
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'center', gap: tile?14:18,
        WebkitMaskImage:WALL_MASK_Y, maskImage:WALL_MASK_Y }}>
        {rows.map((row,ri)=> tile
          ? <WallTileRow key={ri} cards={row} dir={ri%2?'right':'left'} speed={150+ri*15} />
          : <WallRow key={ri} cards={row} dir={ri%2?'right':'left'} cardW={cardW} ratio="3/4" speed={150+ri*16} />)}
      </div>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(46% 62% at 50% 50%, var(--cm-bg1) 24%, rgba(0,0,0,0) 72%)' }} />
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', padding:'0 64px' }}>
        <WallTitle head={head} align="center" />
      </div>
    </section>
  );
}

// TAKE 2 — FEATURED + CROWD: one big story in focus, a drifting crowd beside it.
function WallFeatured({ head }) {
  const feat = STORIES[0];
  const crowd = STORIES.slice(1);
  const rows = [crowd.filter((_,i)=>i%3===0), crowd.filter((_,i)=>i%3===1), crowd.filter((_,i)=>i%3===2)];
  return (
    <section data-screen-label="Stories · Aurora" style={{ position:'relative', width:PW, height:900, overflow:'hidden', background:SS.bg1, fontFamily:F.sans }}>
      <WallBackdrop from="bottom" />
      <div style={{ position:'relative', zIndex:2, height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', maxWidth:1240, margin:'0 auto', padding:'0 64px' }}>
        <div style={{ marginBottom:32 }}><WallTitle head={head} align="left" /></div>
        <div style={{ display:'grid', gridTemplateColumns:'minmax(320px,380px) 1fr', gap:36, alignItems:'stretch' }}>
          <StoryCard s={feat} w={'100%'} ratio="4/5" big />
          <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', gap:16, overflow:'hidden',
            WebkitMaskImage:WALL_MASK_Y, maskImage:WALL_MASK_Y }}>
            {rows.map((row,ri)=><WallRow key={ri} cards={row} dir={ri%2?'right':'left'} cardW={172} ratio="3/4" speed={150+ri*16} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// TAKE 3 — LIVING SPLIT: headline + stats on the left, a framed living wall
// (several drifting rows) on the right.
function WallSplitView({ head }) {
  const rows = wallSplit(4);
  return (
    <section data-screen-label="Stories · Aurora" style={{ position:'relative', width:PW, height:900, overflow:'hidden', background:SS.bg1, fontFamily:F.sans }}>
      <WallBackdrop from="bottom" />
      <div style={{ position:'relative', zIndex:2, height:'100%', display:'flex', alignItems:'center' }}>
        <div style={{ width:'100%', maxWidth:1280, margin:'0 auto', padding:'0 64px',
          display:'grid', gridTemplateColumns:'0.86fr 1.25fr', gap:56, alignItems:'center' }}>
          <div>
            <WallTitle head={head} align="left" sub="Thousands of players are climbing the rating ladder with a Grandmaster-built plan." size={50} />
            <div style={{ display:'flex', gap:30, marginTop:30 }}>
              {[['3,000+','students'],['+500','avg. gain'],['100k+','training']].map((st,i)=>(
                <div key={i}>
                  <div style={{ font:`700 30px/34px ${F.display}`, letterSpacing:'-.03em', color:SS.text }}>{st[0]}</div>
                  <div style={{ font:`500 12px/16px ${F.sans}`, letterSpacing:'.05em', textTransform:'uppercase', color:SS.mut2, marginTop:5 }}>{st[1]}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position:'relative', height:560, borderRadius:18, overflow:'hidden', border:`1px solid ${SS.line}`,
            display:'flex', flexDirection:'column', justifyContent:'center', gap:16,
            WebkitMaskImage:WALL_MASK_Y, maskImage:WALL_MASK_Y }}>
            {rows.map((row,ri)=><WallRow key={ri} cards={row} dir={ri%2?'right':'left'} cardW={172} ratio="3/4" speed={150+ri*15} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// TAKE 4 — BIG MARQUEE: heading on top, two rows of LARGE readable cards
// drifting opposite ways. (Directly answers "the photos felt too small".)
function WallMarquee({ head }) {
  const half = Math.ceil(STORIES.length/2);
  const rowA = STORIES.slice(0, half);
  const rowB = STORIES.slice(half);
  return (
    <section data-screen-label="Stories · Aurora" style={{ position:'relative', width:PW, height:900, overflow:'hidden', background:SS.bg1, fontFamily:F.sans }}>
      <WallBackdrop from="bottom" />
      <div style={{ position:'relative', zIndex:2, height:'100%', display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <div style={{ maxWidth:1100, margin:'0 auto 40px', padding:'0 64px', display:'flex', justifyContent:'center' }}>
          <WallTitle head={head} align="center" />
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <WallRow cards={rowA} dir="left" cardW={250} ratio="3/4" speed={185} />
          <WallRow cards={rowB} dir="right" cardW={250} ratio="3/4" speed={185} />
        </div>
      </div>
    </section>
  );
}

// TAKE 5 — GHOST WALL: a faded crowd of students drifts right→left across the
// whole section (volume + wow); a few featured stories stay crisp in front.
function WallGhost({ head, cta='solid' }) {
  const rows = ghostRows(6);
  const railRef = useRefSS(null);
  const paused = useSSDrift(railRef, { axis:'x', speed:0.3 });
  const loop = [...STORIES, ...STORIES];
  const nudge = (d) => { const el=railRef.current; if(el){ paused.current=true; el.scrollBy({ left:d*340, behavior:'smooth' }); setTimeout(()=>paused.current=false, 1400);} };
  return (
    <section data-screen-label="Stories · Aurora" style={{ position:'relative', width:PW, height:800, overflow:'hidden', background:SS.bg1, fontFamily:F.sans }}>
      <WallBackdrop from="bottom" />
      {/* the ghost wall: a near-continuous mosaic of whole student faces */}
      <div aria-hidden style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'center', gap:6, opacity:0.2, pointerEvents:'none',
        WebkitMaskImage:WALL_MASK_Y, maskImage:WALL_MASK_Y }}>
        {rows.map((faces,ri)=><FaceRow key={ri} faces={faces} dir={ri%2?'right':'left'} speed={240+ri*22} />)}
      </div>
      {/* clean top & bottom edges — theme-aware (works on light + dark stories themes) */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'linear-gradient(180deg, var(--cm-bg1) 0%, transparent 18%, transparent 74%, var(--cm-bg1) 100%)' }} />
      <div style={{ position:'relative', zIndex:2, height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', paddingTop:58 }}>
        <div className="gm-rise" style={{ position:'relative', marginBottom:54, padding:'0 64px' }}>
          {/* soft clearing so the heading + description always read over the crowd */}
          <div aria-hidden style={{ position:'absolute', left:'50%', top:'46%', transform:'translate(-50%,-50%)', width:980, height:320, background:'radial-gradient(60% 64% at 50% 50%, var(--cm-bg1) 52%, transparent 82%)', pointerEvents:'none' }} />
          <div style={{ position:'relative' }}><WallTitle head={head} align="center" /></div>
        </div>
        <div className="gm-rise" style={{ animationDelay:'90ms', position:'relative', width:'100%', marginTop:60 }}
          onMouseEnter={()=>paused.current=true} onMouseLeave={()=>paused.current=false}>
          <div ref={railRef} style={{ display:'flex', gap:14, overflowX:'auto', padding:'8px 64px 0', scrollbarWidth:'none',
            WebkitMaskImage:WALL_MASK_X, maskImage:WALL_MASK_X }}>
            {loop.map((s,i)=><StoryCard key={i} s={s} i={i} w={268} ratio="3/4" hideHeadline subline cta={cta} />)}
          </div>
          <SSArrow glyph="‹" onClick={()=>nudge(-1)} style={{ left:18, top:'42%', transform:'translateY(-50%)' }} />
          <SSArrow glyph="›" onClick={()=>nudge(1)} style={{ right:18, top:'42%', transform:'translateY(-50%)' }} />
        </div>
      </div>
    </section>
  );
}

// dispatcher driven by the `wallTake` tweak
function StudentsWall({ head, take='immersive', cta='solid' }) {
  switch (take) {
    case 'ghost':    return <WallGhost head={head} cta={cta} />;
    case 'featured': return <WallFeatured head={head} />;
    case 'split':    return <WallSplitView head={head} />;
    case 'marquee':  return <WallMarquee head={head} />;
    case 'mosaic':   return <WallImmersive head={head} tile rowsN={6} h={900} />;
    case 'immersive':
    default:         return <WallImmersive head={head} rowsN={4} cardW={210} h={900} />;
  }
}

Object.assign(window, { StoriesStudio, StoriesStudioTrust, StoriesAurora, StoriesObservatory, StoriesStage, StudentsWall });
