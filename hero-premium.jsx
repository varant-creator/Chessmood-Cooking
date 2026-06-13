/* eslint-disable */
// ChessMood 3 — PREMIUM hero variants
// New brand world: deep-navy near-black studio base, soft blue spotlight glow,
// glass panels with real depth, big white display type, orange reserved for CTA.
// Built from the user's references: Webflow + GitHub heroes + a studio-sweep gradient.

const PW = 1440;

// ---- premium palette ----
const P = {
  ink: '#060A12', // near-black base
  ink2: '#0A1020',
  navy: '#0D1730',
  navyGlow: '#1C3563', // mid glow
  navyGlowHi: '#2C53A0', // bright glow center
  line: 'var(--cm-line, rgba(255,255,255,0.10))',
  lineSoft: 'var(--cm-lineSoft, rgba(255,255,255,0.06))',
  glass: 'var(--cm-glass, rgba(255,255,255,0.05))',
  glassHi: 'var(--cm-glassHi, rgba(255,255,255,0.08))',
  white: 'var(--cm-text, #FFFFFF)',
  mut: 'var(--cm-mut, rgba(255,255,255,0.66))',
  mut2: 'var(--cm-mut2, rgba(255,255,255,0.46))',
  orange: '#F57C00',
  orange600: '#E68A00',
  blueText: '#7FB0E8'
};

const PHEADLINE =
<>Structured chess improvement,<br />built and guided by <span style={{ whiteSpace: 'nowrap' }}>Grandmasters</span></>;

const PSUB = 'Stop drifting between random resources. Follow one proven, step-by-step method built by Grandmasters.';

// ---- shared, fully tweakable headline ----
// head = { headFont, headWeight, headSize, headLines, headEmphasis }
function Headline({ head, align = 'center', scale = 1, color = P.white }) {
  const font = `${head.headFont}, Inter, system-ui, sans-serif`;
  const weight = Number(head.headWeight) || 800;
  const size = Math.round((head.headSize || 58) * scale);
  if (head.headText && head.headText.trim()) {
    return (
      <h1 style={{ margin: 0, fontFamily: font, fontWeight: weight, fontSize: size,
        lineHeight: 1.07, letterSpacing: '-.04em', color, textAlign: align }}>
        {head.headText}
      </h1>);
  }
  const lines = head.headLines || 'auto';
  const emphasis = head.headEmphasis || 'none';
  const lineDefs = lines === 'two' ?
  [['Structured', 'chess', 'improvement', 'system,'], ['built', 'and', 'guided', 'by', 'Grandmasters']] :
  lines === 'three' ?
  [['Structured', 'chess', 'improvement', 'system,'], ['built', 'and', 'guided'], ['by', 'Grandmasters']] :
  [['Structured', 'chess', 'improvement', 'system,', 'built', 'and', 'guided', 'by', 'Grandmasters']];
  // "bold" emphasis: the concept words read bolder than the rest.
  const bold = emphasis !== 'none';
  const keyWords = { 'Structured': 1, 'system,': 1, 'Grandmasters': 1 };
  const lightWeight = Math.max(300, weight - 400);
  const baseWeight = bold ? lightWeight : weight;
  return (
    <h1 style={{ margin: 0, fontFamily: font, fontWeight: baseWeight, fontSize: size,
      lineHeight: 1.07, letterSpacing: '-.04em', color, textAlign: align }}>
      {lineDefs.map((ln, li) =>
      <span key={li} style={{ display: 'block' }}>
          {ln.map((w, wi) =>
        <React.Fragment key={wi}>
              {wi > 0 ? ' ' : ''}
              <span style={bold && keyWords[w] ? { fontWeight: weight } : null}>{w}</span>
            </React.Fragment>
        )}
        </span>
      )}
    </h1>);

}

function PArrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginLeft: -1 }}>
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function PPlay() {
  return <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" style={{ marginRight: 1 }}>
    <path d="M5 3.5L16 10L5 16.5V3.5Z" /></svg>;
}

// ---- glass nav over the dark backdrop ----
function PNav() {
  const items = ['Courses', 'Success Stories', 'Blog', 'Pricing'];
  return (
    <header style={{ height: 74, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 56px', fontFamily: F.sans, position: 'relative', zIndex: 5 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 46 }}>
        <span className="cm-logo cm-logo-dark"><CMLogo dark height={26} /></span><span className="cm-logo cm-logo-light"><CMLogo height={26} /></span>
        <nav style={{ display: 'flex', gap: 30 }}>
          {items.map((i) => <a key={i} href="#" style={{ font: `400 14px/22px ${F.sans}`, color: P.mut, textDecoration: 'none' }}>{i}</a>)}
        </nav>
      </div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <a href="#" style={{ font: `500 14px/22px ${F.sans}`, color: P.white, textDecoration: 'none' }}>Log in</a>
        <Btn variant="primary" size="md" iconRight={<PArrow />}>Start free</Btn>
      </div>
    </header>);

}

// ---- aggregate rating on dark (all reviews, not just Trustpilot) ----
function PTrust({ size = 26 }) {
  return (
    <div style={{ textAlign: 'center', padding: '0 10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
        <span style={{ font: `700 ${size}px/${size + 4}px ${F.display}`, letterSpacing: '-.03em', color: P.white }}>4.9</span>
        <svg width={Math.round(size * 0.6)} height={Math.round(size * 0.6)} viewBox="0 0 24 24" fill="#F5A623">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 21.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </svg>
      </div>
      <div style={{ font: `600 12px/16px ${F.sans}`, color: P.mut2, letterSpacing: '.07em', textTransform: 'uppercase', whiteSpace: 'nowrap', marginTop: 7 }}>Based on 4,600 reviews</div>
    </div>);

}

// ---- premium glass stat bar ----
const PSTATS = [
{ v: '9,300+', l: 'Students' },
{ v: '500+ hrs', l: 'Courses by Grandmasters' },
{ v: '8+ yrs', l: 'Perfecting the method' }];

function PStatBar({ floating = true }) {
  const Item = ({ v, l }) =>
  <div style={{ textAlign: 'center', padding: '0 10px' }}>
      <div style={{ font: `700 30px/34px ${F.display}`, letterSpacing: '-.03em', color: P.white }}>{v}</div>
      <div style={{ font: `600 11px/15px ${F.sans}`, color: P.mut2, letterSpacing: '.07em', textTransform: 'uppercase', whiteSpace: 'nowrap', marginTop: 7 }}>{l}</div>
    </div>;

  const sep = <div style={{ width: 1, height: 46, background: P.line }} />;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 38,
      padding: '22px 40px', borderRadius: 18,
      background: floating ? P.glass : 'transparent',
      border: floating ? `1px solid ${P.line}` : 'none',
      backdropFilter: floating ? 'blur(14px)' : 'none',
      boxShadow: floating ? '0 20px 50px -24px rgba(0,0,0,0.6)' : 'none' }}>
      {PSTATS.map((s, i) => <React.Fragment key={i}>{i > 0 && sep}<Item {...s} /></React.Fragment>)}
      {sep}
      <PTrust size={30} />
    </div>);

}

// ============================================================
// VideoGlass — premium glass-framed 16:9 video placeholder
// ============================================================
function VideoGlass({ poster = 'ds/home-hero.webp', big = false, reflection = false, aspect = '16/9', autoplayBadge = true, light = false, cinematic = false, showTag = true, playPos = 'center', playReveal = 'always', badgeText = '2 MIN INTRO', title = 'How ChessMood actually works', caption = 'With GM Avetik Grigoryan, founder' }) {
  const frame =
  <div className={cinematic ? 'cm-vid' + (playReveal === 'hover' ? ' cm-vid-hover' : '') : undefined} style={{ position: 'relative', width: '100%', aspectRatio: aspect,
    borderRadius: 16, overflow: 'hidden',
    border: `1px solid ${P.glassHi}`,
    boxShadow: '0 2px 0 0 rgba(255,255,255,0.06) inset, 0 50px 110px -40px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,0,0,0.4)' }}>
      <img src={poster} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', filter: cinematic ? 'contrast(1.07) saturate(1.06) brightness(0.99)' : light ? 'brightness(1.5) saturate(1.04)' : 'none' }} />
      <div style={{ position: 'absolute', inset: 0,
      background: cinematic ?
      'linear-gradient(180deg, rgba(6,10,18,0.18) 0%, rgba(6,10,18,0) 30%, rgba(6,10,18,0.30) 66%, rgba(6,10,18,0.84) 100%)' :
      light ?
      'linear-gradient(180deg, rgba(12,20,34,0) 60%, rgba(8,14,24,0.1) 80%, rgba(8,14,24,0.58) 100%)' :
      'linear-gradient(180deg, rgba(6,10,18,0) 52%, rgba(6,10,18,0.22) 76%, rgba(6,10,18,0.74) 100%)' }} />
      {cinematic &&
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(120% 116% at 50% 38%, transparent 48%, rgba(4,7,14,0.52) 100%)',
      boxShadow: 'inset 0 0 120px 28px rgba(4,7,14,0.42)' }} />
    }
      {/* autoplay glass pill */}
      {autoplayBadge &&
    <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: 7,
      background: 'rgba(8,14,24,0.55)', border: `1px solid ${P.line}`, backdropFilter: 'blur(8px)',
      padding: '6px 12px', borderRadius: 999, font: `600 11px/1 ${F.sans}`, letterSpacing: '.12em', textTransform: 'uppercase', color: '#fff' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: P.orange }} />
        {badgeText}
      </div>
    }
      {showTag && <div style={{ position: 'absolute', top: 16, right: 16 }}><PlaceholderTag>video placeholder</PlaceholderTag></div>}
      {/* play */}
      <div className={cinematic && playReveal === 'hover' ? 'cm-play-reveal' : undefined}
    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
      justifyContent: cinematic && playPos === 'left' ? 'flex-start' : cinematic && playPos === 'right' ? 'flex-end' : 'center',
      padding: cinematic && playPos !== 'center' ? '0 7%' : 0, pointerEvents: 'none' }}>
        <div style={{ position: 'relative', width: cinematic ? big ? 72 : 64 : big ? 96 : 82, height: cinematic ? big ? 72 : 64 : big ? 96 : 82, pointerEvents: 'auto' }}>
          {!cinematic && <span className="cm-ring" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.6)' }} />}
          {cinematic ?
        <React.Fragment>
          <span className="cm-pulse" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.55)' }} />
          <div className="cm-play-disc" style={{ position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.85)',
            backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 26px rgba(0,0,0,0.32)', transition: 'background .18s cubic-bezier(.2,0,0,1), border-color .18s ease' }}>
            <svg width={big ? 20 : 18} height={big ? 23 : 21} viewBox="0 0 20 22" fill="none" style={{ marginLeft: 2, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.45))' }}><path d="M2 2L18 11L2 20V2Z" fill="#fff" /></svg>
          </div>
          </React.Fragment> :
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(255,255,255,0.96)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <svg width={big ? 28 : 24} height={big ? 32 : 27} viewBox="0 0 20 22" fill="none"><path d="M2 2L18 11L2 20V2Z" fill={P.orange} /></svg>
          </div>
        }
        </div>
      </div>
      {/* lower third */}
      {(title || caption) &&
    <div style={{ position: 'absolute', left: 18, right: 18, bottom: 16 }}>
        {title && <div style={{ font: `600 ${big ? 18 : 16}px/1.25 ${F.display}`, letterSpacing: '-.01em', color: '#fff' }}>{title}</div>}
        {caption && <div style={{ font: `400 13px/18px ${F.sans}`, color: 'rgba(255,255,255,0.76)', marginTop: 3 }}>{caption}</div>}
      </div>
    }
    </div>;

  if (!reflection) return frame;
  // studio floor reflection — mirror the poster, fading down
  return (
    <div style={{ position: 'relative' }}>
      {frame}
      <div aria-hidden style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, height: '42%',
        borderRadius: 16, overflow: 'hidden', transform: 'scaleY(-1)', opacity: 0.22,
        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent 75%)',
        maskImage: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent 75%)', pointerEvents: 'none' }}>
        <img src={poster} alt="" style={{ width: '100%', height: '238%', objectFit: 'cover', objectPosition: 'center 42%' }} />
      </div>
    </div>);

}

// =========================================================================
// VARIANT A — STUDIO. Literal match to the uploaded gradient. Centered,
// video floats on the studio sweep with a floor reflection. Glass stat bar.
// =========================================================================
function HeroStudio({ head }) {
  return (
    <div data-screen-label="Hero · Studio" style={{ width: PW, position: 'relative', overflow: 'hidden', fontFamily: F.sans,
      background: 'var(--cm-bg1, #070C16)' }}>
      {/* studio sweep: center glow + vertical falloff + floor reflection band */}
      <div style={{ position: 'absolute', inset: 0, background: `
        radial-gradient(95% 62% at 50% 30%, rgb(var(--cm-glow) / calc(56% * var(--cm-glow-i))) 0%, rgb(var(--cm-glow) / calc(32% * var(--cm-glow-i))) 34%, transparent 64%),
        radial-gradient(70% 26% at 50% 99%, rgb(var(--cm-glow) / calc(42% * var(--cm-glow-i))) 0%, rgb(var(--cm-glow) / calc(12% * var(--cm-glow-i))) 45%, transparent 72%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 46%, var(--cm-bg1) 100%)` }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <PNav />
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '56px 64px 0', textAlign: 'center' }}>
          <Headline head={head} align="center" />
          <p style={{ margin: '26px auto 36px', maxWidth: 600, font: `400 19px/30px ${F.sans}`, color: P.mut }}>{PSUB}</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', alignItems: 'center' }}>
            <Btn variant="primary" size="xl" iconRight={<PArrow />}>Start free</Btn>
            <Btn size="xl" icon={<PPlay />} style={{ background: P.glass, color: P.white, border: `1px solid ${P.line}`, backdropFilter: 'blur(8px)' }}>Watch how it works</Btn>
          </div>
        </div>
        <div style={{ maxWidth: 880, margin: '52px auto 0', padding: '0 64px' }}>
          <VideoGlass big reflection />
        </div>
        <div style={{ textAlign: 'center', padding: '150px 64px 64px' }}>
          <PStatBar />
        </div>
      </div>
    </div>);

}

// =========================================================================
// VARIANT A2 — STUDIO + TRUST FIRST. Same studio look, but the trust stats
// sit right above the video (proof before the watch).
// =========================================================================
function HeroStudioTrust({ head, poster, cinematic, playPos, playReveal }) {
  return (
    <div data-screen-label="Hero · Studio (trust first)" style={{ width: PW, position: 'relative', overflow: 'hidden', fontFamily: F.sans,
      background: 'var(--cm-bg1, #070C16)' }}>
      <div style={{ position: 'absolute', inset: 0, background: `
        radial-gradient(95% 62% at 50% 30%, rgb(var(--cm-glow) / calc(56% * var(--cm-glow-i))) 0%, rgb(var(--cm-glow) / calc(32% * var(--cm-glow-i))) 34%, transparent 64%),
        radial-gradient(70% 26% at 50% 99%, rgb(var(--cm-glow) / calc(42% * var(--cm-glow-i))) 0%, rgb(var(--cm-glow) / calc(12% * var(--cm-glow-i))) 45%, transparent 72%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 46%, var(--cm-bg1) 100%)` }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <PNav />
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', padding: "96px 64px 0px" }}>
          <Headline head={head} align="center" />
          <p style={{ margin: '26px auto 34px', maxWidth: 600, font: `400 19px/30px ${F.sans}`, color: P.mut }}>{PSUB}</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', alignItems: 'center' }}>
            <Btn variant="primary" size="xl" iconRight={<PArrow />}>Start free</Btn>
            <Btn size="xl" icon={<PPlay />} style={{ background: P.glass, color: P.white, border: `1px solid ${P.line}`, backdropFilter: 'blur(8px)' }}>Watch how it works</Btn>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: "40px 64px 0px" }}>
          <PStatBar />
        </div>
        <div style={{ maxWidth: 880, margin: '40px auto 0', padding: '0 64px 220px' }}>
          <VideoGlass big poster={poster} cinematic={cinematic} showTag={!cinematic} playPos={playPos} playReveal={playReveal} />
        </div>
      </div>
    </div>);

}

// =========================================================================
// VARIANT B — AURORA. Webflow-style glow rising from below. Headline up top,
// video sits in the light, three glass product cards float beneath it.
// =========================================================================
function PProductCard({ title, body }) {
  return (
    <div style={{ flex: 1, background: P.glass, border: `1px solid ${P.line}`, borderRadius: 14,
      padding: '20px 22px', backdropFilter: 'blur(12px)',
      boxShadow: '0 1px 0 0 rgba(255,255,255,0.05) inset' }}>
      <div style={{ font: `600 16px/20px ${F.sans}`, color: P.white, marginBottom: 7 }}>{title}</div>
      <div style={{ font: `400 13px/19px ${F.sans}`, color: P.mut }}>{body}</div>
    </div>);

}
function HeroAurora({ head }) {
  return (
    <div data-screen-label="Hero · Aurora" style={{ width: PW, position: 'relative', overflow: 'hidden', fontFamily: F.sans,
      background: 'var(--cm-bg1, #05080F)' }}>
      <div style={{ position: 'absolute', inset: 0, background: `
        radial-gradient(120% 75% at 50% 118%, rgb(var(--cm-glow) / calc(62% * var(--cm-glow-i))) 0%, rgb(var(--cm-glow) / calc(34% * var(--cm-glow-i))) 30%, transparent 62%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg2) 60%, var(--cm-bg1) 100%)` }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <PNav />
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '52px 64px 0', textAlign: 'center' }}>
          <Headline head={head} align="center" />
          <p style={{ margin: '24px auto 34px', maxWidth: 580, font: `400 19px/30px ${F.sans}`, color: P.mut }}>{PSUB}</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', alignItems: 'center' }}>
            <Btn variant="primary" size="xl" iconRight={<PArrow />}>Start free</Btn>
            <Btn size="xl" icon={<PPlay />} style={{ background: 'transparent', color: P.white, border: `1px solid ${P.line}` }}>Watch how it works</Btn>
          </div>
        </div>
        <div style={{ maxWidth: 1180, margin: '48px auto 0', padding: '0 64px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}><VideoGlass /></div>
          <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
            <PProductCard title="500+ hours of courses" body="Full opening repertoires, classical analysis & endgames — taught only by Grandmasters." />
            <PProductCard title="AI Coach" body="Spots your recurring mistakes from real games and tells you exactly what to fix next." />
            <PProductCard title="Daily handpicked puzzles" body="Tactics matched to your level, so practice always meets you where you are." />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 64px 60px' }}>
          <PStatBar floating={false} />
        </div>
      </div>
    </div>);

}

// =========================================================================
// VARIANT C — OBSERVATORY. GitHub-style. Near-black, blue corner glow +
// faint warm counter-glow, subtle dotted grid. Split: big type left, video
// as a floating glass card right. Most restrained / editorial-premium.
// =========================================================================
function HeroObservatory({ head }) {
  return (
    <div data-screen-label="Hero · Observatory" style={{ width: PW, position: 'relative', overflow: 'hidden', fontFamily: F.sans,
      background: 'var(--cm-bg1, #060911)' }}>
      {/* corner glows */}
      <div style={{ position: 'absolute', inset: 0, background: `
        radial-gradient(60% 70% at 88% 6%, rgb(var(--cm-glow) / calc(50% * var(--cm-glow-i))) 0%, rgb(var(--cm-glow) / calc(18% * var(--cm-glow-i))) 36%, transparent 60%),
        radial-gradient(50% 60% at 6% 100%, rgba(245,124,0,0.14) 0%, rgba(245,124,0,0.04) 40%, transparent 64%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg1) 100%)` }} />
      {/* faint dotted grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '34px 34px',
        WebkitMaskImage: 'radial-gradient(90% 90% at 50% 40%, #000 30%, transparent 80%)',
        maskImage: 'radial-gradient(90% 90% at 50% 40%, #000 30%, transparent 80%)' }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <PNav />
        <div style={{ maxWidth: 1312, margin: '0 auto', padding: '60px 64px 70px',
          display: 'grid', gridTemplateColumns: '1fr 1.04fr', gap: 64, alignItems: 'center' }}>
          <div>
            <Headline head={head} align="left" scale={0.92} />
            <p style={{ margin: '24px 0 34px', maxWidth: 480, font: `400 18px/29px ${F.sans}`, color: P.mut }}>{PSUB}</p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 42 }}>
              <Btn variant="primary" size="xl" iconRight={<PArrow />}>Start free</Btn>
              <Btn size="xl" icon={<PPlay />} style={{ background: P.glass, color: P.white, border: `1px solid ${P.line}`, backdropFilter: 'blur(8px)' }}>Watch how it works</Btn>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 30, paddingTop: 30, borderTop: `1px solid ${P.line}`, flexWrap: 'wrap' }}>
              {PSTATS.map((s, i) =>
              <div key={i}>
                  <div style={{ font: `700 26px/28px ${F.display}`, letterSpacing: '-.03em', color: P.white }}>{s.v}</div>
                  <div style={{ font: `500 11px/15px ${F.sans}`, color: P.mut2, letterSpacing: '.08em', textTransform: 'uppercase', marginTop: 4 }}>{s.l}</div>
                </div>
              )}
              <div style={{ width: 1, height: 38, background: P.line }} />
              <PTrust />
            </div>
          </div>
          <VideoGlass />
        </div>
      </div>
    </div>);

}

// =========================================================================
// VARIANT D — STAGE. Otter-style split: copy + testimonial left, a large
// floating video card right with GM avatar tiles layered over the top.
// Video aspect is freed from 16:9 to fill the column.
// =========================================================================
function GMTileBar() {
  const gms = ['GM Avetik', 'GM Gabuzyan', 'GM Petrosyan', 'GM Sargissian'];
  const tones = [4, 2, 0, 5];
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 13, padding: '9px 18px 9px 13px',
      background: 'rgba(10,16,28,0.66)', border: `1px solid ${P.line}`, borderRadius: 14,
      backdropFilter: 'blur(14px)', boxShadow: '0 22px 50px -18px rgba(0,0,0,0.7)' }}>
      <div style={{ display: 'flex' }}>
        {gms.map((g, i) =>
        <div key={i} style={{ marginLeft: i === 0 ? 0 : -10, boxShadow: '0 0 0 2px #0A1422', borderRadius: '50%' }}>
            <AvatarBlob name={g} tone={tones[i]} size={32} />
          </div>
        )}
      </div>
      <div style={{ lineHeight: 1.2 }}>
        <div style={{ font: `600 13px/17px ${F.sans}`, color: '#fff', whiteSpace: 'nowrap' }}>Taught by 13 Grandmasters</div>
        <div style={{ font: `400 11px/15px ${F.sans}`, color: P.mut2, whiteSpace: 'nowrap' }}>Avetik · Gabuzyan · Petrosyan · +10</div>
      </div>
    </div>);

}

function HeroStage({ head, videoY = 0 }) {
  return (
    <div data-screen-label="Hero · Stage" style={{ width: PW, position: 'relative', overflow: 'hidden', fontFamily: F.sans,
      background: 'var(--cm-bg1, #060A14)' }}>
      <div style={{ position: 'absolute', inset: 0, background: `
        radial-gradient(60% 78% at 86% 40%, rgb(var(--cm-glow) / calc(58% * var(--cm-glow-i))) 0%, rgb(var(--cm-glow) / calc(24% * var(--cm-glow-i))) 40%, transparent 64%),
        linear-gradient(180deg, var(--cm-bg1) 0%, var(--cm-bg1) 100%)` }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <PNav />
        <div style={{ maxWidth: 1312, margin: '0 auto', padding: '58px 64px 72px',
          display: 'grid', gridTemplateColumns: '1fr 1.06fr', gap: 60, alignItems: 'start' }}>
          <div>
            <Headline head={head} align="left" scale={0.8} />
            <p style={{ margin: '24px 0 32px', maxWidth: 440, font: `400 18px/29px ${F.sans}`, color: P.mut }}>{PSUB}</p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Btn variant="primary" size="xl" iconRight={<PArrow />}>Start free</Btn>
              <Btn size="xl" icon={<PPlay />} style={{ background: P.glass, color: P.white, border: `1px solid ${P.line}`, backdropFilter: 'blur(8px)' }}>Watch how it works</Btn>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 38, paddingTop: 30, borderTop: `1px solid ${P.line}`, flexWrap: 'wrap' }}>
              {PSTATS.map((s, i) =>
              <div key={i}>
                <div style={{ font: `700 26px/28px ${F.display}`, letterSpacing: '-.03em', color: P.white }}>{s.v}</div>
                <div style={{ font: `500 11px/15px ${F.sans}`, color: P.mut2, letterSpacing: '.08em', textTransform: 'uppercase', marginTop: 4 }}>{s.l}</div>
              </div>
              )}
              <div style={{ width: 1, height: 38, background: P.line }} />
              <PTrust />
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 500, transform: `translateY(${videoY}px)` }}>
              <VideoGlass big aspect="10/11" light />
            </div>
          </div>
        </div>
      </div>
    </div>);

}

Object.assign(window, { HeroStudio, HeroStudioTrust, HeroAurora, HeroObservatory, HeroStage });