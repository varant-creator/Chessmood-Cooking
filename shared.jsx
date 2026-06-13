/* eslint-disable */
// Shared primitives across all three ChessMood 3 homepage directions.
// Each direction restyles & recomposes these but the API stays steady.

const { useState, useEffect, useRef } = React;

// ============================================================
// Brand tokens — pulled from colors_and_type.css. Used as JS
// literals so artboards inside <DCArtboard> aren't affected by
// any rogue parent CSS.
// ============================================================
const T = {
  orange:  '#F57C00',
  orange600:'#E68A00',
  orange700:'#DF7100',
  orange50:'#FEF2E6',
  orange100:'#FCD6B0',
  warm:    '#FFCA82',
  fg:      '#2C2F32',
  fgMuted: '#686F78',
  fgSubtle:'#868C93',
  fgDisabled:'#9A9FA5',
  fgStrong:'#171717',
  border:  '#BABDC1',
  borderSubtle:'#D0D2D5',
  divider: '#E5E5E5',
  bgMuted: '#F7F8F9',
  bgSubtle:'#F0F1F2',
  white:   '#FFFFFF',
  dark:    '#1C2838',
  darker:  '#0F161F',
  blue:    '#4B9BBF',
  cadet:   '#8CAEBD',
};
const F = {
  sans: 'Roboto, system-ui, sans-serif',
  display: 'Inter, Roboto, system-ui, sans-serif',
};

// ============================================================
// Logo — keep the canonical 2-tone wordmark
// ============================================================
function CMLogo({ dark=false, height=24 }) {
  return <img src={dark? 'ds/logo-dark.svg':'ds/logo.svg'} alt="ChessMood" style={{height, display:'block'}}/>;
}

// ============================================================
// Button — covers all 4 variants. Sizes lg/md/sm.
// ============================================================
function Btn({ variant='primary', size='lg', children, icon, iconRight, style, ...rest }) {
  const base = {
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
    border:'none', cursor:'pointer', borderRadius:4, fontFamily:F.sans,
    fontWeight:500, transition:'all .15s cubic-bezier(.2,0,0,1)', whiteSpace:'nowrap',
    textDecoration:'none',
  };
  const sizes = {
    xl: { height:52, padding:'0 26px', fontSize:16, lineHeight:'24px' },
    lg: { height:44, padding:'0 20px', fontSize:15, lineHeight:'22px' },
    md: { height:36, padding:'0 14px', fontSize:14, lineHeight:'20px' },
    sm: { height:32, padding:'0 12px', fontSize:13, lineHeight:'18px' },
  };
  const variants = {
    primary:  { background:T.orange, color:'#fff' },
    secondary:{ background:T.orange50, color:T.orange },
    tertiary: { background:'#fff', color:'#4B525B', border:`1px solid ${T.border}` },
    outlined: { background:'transparent', color:T.orange, border:`1px solid ${T.orange}` },
    ghost:    { background:'transparent', color:T.fg },
    ghostDark:{ background:'transparent', color:'#fff' },
    link:     { background:'transparent', color:T.orange, padding:0, height:'auto' },
    dark:     { background:T.dark, color:'#fff' },
  };
  return (
    <button {...rest} style={{...base, ...sizes[size], ...variants[variant], ...style}}>
      {icon}
      {children}
      {iconRight}
    </button>
  );
}

// ============================================================
// Header — light variant by default. Some directions use dark.
// ============================================================
function CMHeader({ variant='light', cta='Test my skill' }) {
  const items = ['Courses','Tools','Streams','Pricing','Blog'];
  const dark = variant === 'dark';
  const fg = dark? '#fff' : T.fg;
  const subtleFg = dark? 'rgba(255,255,255,0.78)' : T.fgMuted;
  return (
    <header style={{
      height:72, display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 56px',
      background: dark? T.dark : '#fff',
      borderBottom: dark? 'none' : `1px solid ${T.divider}`,
      fontFamily:F.sans,
    }}>
      <div style={{display:'flex', alignItems:'center', gap:48}}>
        <CMLogo dark={dark} height={26}/>
        <nav style={{display:'flex', gap:32}}>
          {items.map(i =>
            <a key={i} href="#" style={{
              font:`400 14px/22px ${F.sans}`,
              color: subtleFg, textDecoration:'none',
            }}>{i}</a>
          )}
        </nav>
      </div>
      <div style={{display:'flex', gap:10, alignItems:'center'}}>
        <a href="#" style={{font:`500 14px/22px ${F.sans}`, color: fg, textDecoration:'none'}}>Log in</a>
        <Btn variant="primary" size="md">{cta}</Btn>
      </div>
    </header>
  );
}

// ============================================================
// Overline — small caps tag, optionally with a dot
// ============================================================
function Overline({ children, dotColor=T.orange, color=T.orange, style={} }) {
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:8,
      font:`600 11px/16px ${F.sans}`, color, letterSpacing:'.14em', textTransform:'uppercase',
      ...style,
    }}>
      {dotColor && <span style={{width:5, height:5, background:dotColor, borderRadius:'50%'}}/>}
      {children}
    </div>
  );
}

// ============================================================
// FingerprintBoard — a small stylized chess board used by the
// "Fingerprint" preview module. Draws an 8×8 SVG board with a
// few subtle highlighted squares + a candidate-moves overlay.
// ============================================================
function FingerprintBoard({ size=320, highlights=['e4','d5','f3','c6'], from='e2', to='e4' }) {
  const sq = size/8;
  const sqIdx = (n) => {
    const file = n.charCodeAt(0) - 97; // a=0
    const rank = 8 - parseInt(n[1], 10); // 8=0 top
    return { x: file*sq, y: rank*sq };
  };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{display:'block', borderRadius:4, overflow:'hidden'}}>
      {/* squares */}
      {Array.from({length:64}).map((_, i) => {
        const r = Math.floor(i/8), c = i%8;
        const light = (r+c)%2 === 0;
        return <rect key={i} x={c*sq} y={r*sq} width={sq} height={sq}
          fill={light? '#EBE5D8' : '#B58863'}/>;
      })}
      {/* highlighted squares */}
      {highlights.map(h => {
        const p = sqIdx(h);
        return <rect key={h} x={p.x} y={p.y} width={sq} height={sq}
          fill={T.orange} opacity={0.22}/>;
      })}
      {/* candidate move arrow */}
      {from && to && (() => {
        const a = sqIdx(from), b = sqIdx(to);
        const cx1 = a.x+sq/2, cy1 = a.y+sq/2, cx2 = b.x+sq/2, cy2 = b.y+sq/2;
        return <g>
          <line x1={cx1} y1={cy1} x2={cx2} y2={cy2} stroke={T.orange} strokeWidth={6} strokeLinecap="round" opacity={0.85}/>
          <circle cx={cx2} cy={cy2} r={9} fill={T.orange}/>
        </g>;
      })()}
      {/* a couple of pieces drawn as type ornaments — keeps it abstract */}
      <g fontFamily="serif" fontSize={sq*0.7} textAnchor="middle" dominantBaseline="central" fill="#2C2F32">
        <text x={sqIdx('e1').x+sq/2} y={sqIdx('e1').y+sq/2}>♔</text>
        <text x={sqIdx('d1').x+sq/2} y={sqIdx('d1').y+sq/2}>♕</text>
        <text x={sqIdx('e8').x+sq/2} y={sqIdx('e8').y+sq/2} fill="#fff" stroke="#000" strokeWidth=".5">♚</text>
        <text x={sqIdx('d8').x+sq/2} y={sqIdx('d8').y+sq/2} fill="#fff" stroke="#000" strokeWidth=".5">♛</text>
        <text x={sqIdx('g1').x+sq/2} y={sqIdx('g1').y+sq/2}>♘</text>
        <text x={sqIdx('f3').x+sq/2} y={sqIdx('f3').y+sq/2}>♘</text>
        <text x={sqIdx('c6').x+sq/2} y={sqIdx('c6').y+sq/2} fill="#fff" stroke="#000" strokeWidth=".5">♞</text>
      </g>
    </svg>
  );
}

// ============================================================
// AvatarBlob — generated placeholder GM headshot.
// We mark these as placeholders so it's clear what's invented.
// ============================================================
function AvatarBlob({ name='GM', tone=0, size=72, ring=false }) {
  // deterministic warm-orange/anthracite tones
  const tones = [
    ['#F8C089','#E68A00'], // warm
    ['#2C2F32','#4B525B'], // dark
    ['#FCD6B0','#F57C00'], // peach
    ['#1C2838','#293A4F'], // antracite
    ['#FFCA82','#F79633'], // gold
    ['#393D42','#5F656D'], // gray
  ];
  const [a,b] = tones[tone % tones.length];
  const initials = name.replace('GM ','').split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
  return (
    <div style={{
      width:size, height:size, borderRadius:'50%',
      background:`linear-gradient(135deg, ${a}, ${b})`,
      display:'flex', alignItems:'center', justifyContent:'center',
      color:'#fff', font:`600 ${size*0.32}px/1 ${F.sans}`,
      boxShadow: ring? `0 0 0 3px #fff, 0 0 0 4px ${T.orange}` : '0 1px 2px rgba(16,24,40,.12)',
      flexShrink:0,
    }}>{initials}</div>
  );
}

// ============================================================
// Placeholder badge — used inline to flag invented content
// ============================================================
function PlaceholderTag({ children='placeholder' }) {
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:4,
      font:`500 9px/12px ${F.sans}`, letterSpacing:'.08em', textTransform:'uppercase',
      color:T.fgSubtle, background:T.bgSubtle, border:`1px dashed ${T.borderSubtle}`,
      padding:'2px 6px', borderRadius:3, verticalAlign:'middle',
    }}>{children}</span>
  );
}

// ============================================================
// MiniCoachChat — a faux AI Coach conversation
// ============================================================
function MiniCoachChat({ compact=false }) {
  const pad = compact? 16 : 20;
  return (
    <div style={{
      background:'#fff', border:`1px solid ${T.divider}`, borderRadius:8,
      overflow:'hidden', boxShadow:'0 1px 2px -1px rgba(16,24,40,.08), 0 1px 3px rgba(16,24,40,.10)',
      fontFamily:F.sans,
    }}>
      <div style={{
        display:'flex', alignItems:'center', gap:10,
        padding:`12px ${pad}px`, borderBottom:`1px solid ${T.divider}`, background:'#fff',
      }}>
        <div style={{
          width:24, height:24, borderRadius:'50%', background:T.blue,
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'#fff', font:`700 11px/1 ${F.sans}`,
        }}>C</div>
        <div style={{font:`600 13px/16px ${F.sans}`, color:T.fg}}>Charlie</div>
        <div style={{font:`400 11px/14px ${F.sans}`, color:T.fgSubtle}}>· AI Coach</div>
        <div style={{marginLeft:'auto', display:'flex', gap:4}}>
          <span style={{width:8, height:8, borderRadius:'50%', background:'#10B981'}}/>
          <span style={{font:`400 11px/14px ${F.sans}`, color:T.fgSubtle}}>live</span>
        </div>
      </div>
      <div style={{padding:`${pad}px`, display:'flex', flexDirection:'column', gap:14, background:T.bgMuted}}>
        <div style={{alignSelf:'flex-end', maxWidth:'78%', background:T.orange, color:'#fff',
          padding:'10px 14px', borderRadius:'12px 12px 2px 12px',
          font:`400 14px/20px ${F.sans}`,
        }}>
          I keep losing in the Caro‑Kann as White. What am I missing?
        </div>
        <div style={{alignSelf:'flex-start', maxWidth:'88%', background:'#fff', color:T.fg,
          padding:'10px 14px', borderRadius:'12px 12px 12px 2px', border:`1px solid ${T.divider}`,
          font:`400 14px/20px ${F.sans}`,
        }}>
          <div>Looking at your last 8 Caro‑Kann games — you're surrendering the center on move 5 in 6 of them.</div>
          <div style={{marginTop:8, color:T.fgMuted}}>Two things to fix, in order:</div>
          <ol style={{margin:'4px 0 0', paddingLeft:18, color:T.fg}}>
            <li>The <b>Advance variation</b> after 3.e5 — learn the c3/Be3 setup.</li>
            <li>Stop trading on f5. You're handing Black a free game.</li>
          </ol>
          <div style={{marginTop:10, display:'flex', gap:8, flexWrap:'wrap'}}>
            <a href="#" style={{
              font:`500 12px/16px ${F.sans}`, color:T.orange, textDecoration:'none',
              background:T.orange50, padding:'4px 10px', borderRadius:4,
            }}>Open the course →</a>
            <a href="#" style={{
              font:`500 12px/16px ${F.sans}`, color:T.fg, textDecoration:'none',
              background:'#fff', padding:'4px 10px', borderRadius:4, border:`1px solid ${T.divider}`,
            }}>Drill it in TestDrive</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CoursePreview — looks like the player UI
// ============================================================
function CoursePreview() {
  return (
    <div style={{
      background:'#fff', border:`1px solid ${T.divider}`, borderRadius:8,
      overflow:'hidden', boxShadow:'0 1px 2px -1px rgba(16,24,40,.08), 0 1px 3px rgba(16,24,40,.10)',
      fontFamily:F.sans,
    }}>
      <div style={{aspectRatio:'16/9', position:'relative', background:'#1C2838'}}>
        <img src="ds/chess-board.webp" style={{width:'100%', height:'100%', objectFit:'cover', opacity:.92}}/>
        <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 50%, rgba(0,0,0,.45) 100%)'}}/>
        <div style={{
          position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)',
          width:56, height:56, borderRadius:'50%', background:'rgba(255,255,255,.92)',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 4px 12px rgba(0,0,0,.3)',
        }}>
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
            <path d="M2 2L18 11L2 20V2Z" fill={T.orange}/>
          </svg>
        </div>
        <div style={{position:'absolute', left:16, bottom:16, color:'#fff', font:`600 13px/16px ${F.sans}`}}>
          Chapter 4 · The c3 plan against the Caro‑Kann
        </div>
        <div style={{position:'absolute', right:16, top:16,
          background:'rgba(0,0,0,.55)', color:'#fff', padding:'4px 8px', borderRadius:3,
          font:`500 11px/14px ${F.sans}`,
        }}>14:22</div>
      </div>
      <div style={{padding:'14px 18px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <div style={{font:`600 14px/18px ${F.sans}`, color:T.fg}}>Beating the Caro‑Kann</div>
          <div style={{font:`400 12px/16px ${F.sans}`, color:T.fgMuted, marginTop:2}}>
            GM Gabuzyan · 9h 05m · 23 lessons
          </div>
        </div>
        <div style={{
          width:42, height:42, borderRadius:'50%',
          background:`conic-gradient(${T.orange} 38%, ${T.bgSubtle} 0)`,
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <div style={{width:34, height:34, borderRadius:'50%', background:'#fff',
            display:'flex', alignItems:'center', justifyContent:'center',
            font:`600 11px/1 ${F.sans}`, color:T.fg,
          }}>38%</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PuzzlePreview — small chess puzzle card
// ============================================================
function PuzzlePreview() {
  return (
    <div style={{
      background:'#fff', border:`1px solid ${T.divider}`, borderRadius:8,
      padding:18, fontFamily:F.sans,
      boxShadow:'0 1px 2px -1px rgba(16,24,40,.08), 0 1px 3px rgba(16,24,40,.10)',
    }}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14}}>
        <div>
          <div style={{font:`600 14px/18px ${F.sans}`, color:T.fg}}>Handpicked puzzle</div>
          <div style={{font:`400 12px/16px ${F.sans}`, color:T.fgMuted, marginTop:2}}>
            Middlegame · Tactics · 1850 rated
          </div>
        </div>
        <span style={{
          font:`600 10px/14px ${F.sans}`, letterSpacing:'.08em', textTransform:'uppercase',
          color:T.orange, background:T.orange50, padding:'4px 8px', borderRadius:3,
        }}>Day 47</span>
      </div>
      <FingerprintBoard size={240} highlights={['f7','g5']} from="d1" to="h5"/>
      <div style={{marginTop:14, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{font:`500 13px/18px ${F.sans}`, color:T.fg}}>White to move. Find the mate in 2.</div>
        <a href="#" style={{font:`500 13px/18px ${F.sans}`, color:T.orange, textDecoration:'none'}}>Solve →</a>
      </div>
    </div>
  );
}

// ============================================================
// Testimonial — with rating delta, marked placeholder
// ============================================================
function Testimonial({ quote, name, before, after, months, country, tone=0 }) {
  return (
    <figure style={{
      margin:0, background:'#fff', border:`1px solid ${T.divider}`, borderRadius:8,
      padding:'28px 28px 24px', fontFamily:F.sans, display:'flex', flexDirection:'column', gap:18,
    }}>
      <blockquote style={{margin:0, font:`400 17px/26px ${F.sans}`, color:T.fg, letterSpacing:'-.005em'}}>
        “{quote}”
      </blockquote>
      <figcaption style={{display:'flex', alignItems:'center', gap:12, marginTop:'auto'}}>
        <AvatarBlob name={name} tone={tone} size={40}/>
        <div style={{flex:1, minWidth:0}}>
          <div style={{display:'flex', alignItems:'center', gap:6, font:`600 13px/18px ${F.sans}`, color:T.fg}}>
            {name} <PlaceholderTag>example</PlaceholderTag>
          </div>
          <div style={{font:`400 12px/16px ${F.sans}`, color:T.fgMuted}}>{country} · {months} months on ChessMood</div>
        </div>
        <div style={{
          display:'flex', alignItems:'center', gap:6,
          font:`600 14px/18px ${F.sans}`, color:T.fg,
          background:T.orange50, padding:'6px 10px', borderRadius:4,
        }}>
          <span style={{color:T.fgMuted}}>{before}</span>
          <span style={{color:T.orange}}>→</span>
          <span>{after}</span>
        </div>
      </figcaption>
    </figure>
  );
}

// ============================================================
// GMCard — used in GM gallery
// ============================================================
function GMCard({ name, role, tone, isReal=false }) {
  return (
    <div style={{display:'flex', flexDirection:'column', gap:14, fontFamily:F.sans}}>
      <div style={{aspectRatio:'4/5', borderRadius:8, overflow:'hidden', position:'relative',
        background:`linear-gradient(160deg, ${T.bgSubtle}, ${T.bgMuted})`,
        border:`1px solid ${T.divider}`,
      }}>
        {/* big initials silhouette */}
        <div style={{
          position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
          font:`900 120px/1 ${F.display}`, color:'#fff',
          background:`linear-gradient(160deg, #2C2F32 0%, #1C2838 100%)`,
        }}>{name.replace('GM ','').split(' ').map(s=>s[0]).join('')}</div>
        {!isReal && <div style={{position:'absolute', top:10, right:10}}><PlaceholderTag>placeholder photo</PlaceholderTag></div>}
      </div>
      <div>
        <div style={{font:`600 16px/20px ${F.sans}`, color:T.fg, display:'flex', alignItems:'center', gap:6}}>
          {name}
          {!isReal && <PlaceholderTag>example</PlaceholderTag>}
        </div>
        <div style={{font:`400 13px/18px ${F.sans}`, color:T.fgMuted, marginTop:4}}>{role}</div>
      </div>
    </div>
  );
}

// Export to window
Object.assign(window, {
  T, F,
  CMLogo, Btn, CMHeader, Overline,
  FingerprintBoard, AvatarBlob, PlaceholderTag,
  MiniCoachChat, CoursePreview, PuzzlePreview,
  Testimonial, GMCard,
});
