/* eslint-disable */
// Homepage sections — Final CTA (#8) + Site Footer (#9).
// Self-contained (IIFE). Uses the white wordmark for the dark footer.
(function () {
  const Arrow = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

  function FinalCTA() {
    return (
      <section className="fcta" data-screen-label="Final CTA">
        <div className="fcta-in">
          <h2>It’s your journey, and your next move.</h2>
          <p>Join thousands of chess lovers on a structured path built by Grandmasters.</p>
          <div className="btns">
            <a className="primary" href="#">Start your plan <Arrow /></a>
            <a className="ghost" href="#">See pricing</a>
          </div>
        </div>
      </section>
    );
  }

  const COLS = [
    { h: "Product", links: ["The method", "Courses", "Study plan", "Forum", "Pricing"] },
    { h: "Company", links: ["Our story", "Grandmasters", "Success stories", "Careers", "Contact"] },
  ];

  const SOCIAL = [
    { label: "Discord", d: "M20 4.4A18 18 0 0 0 15.5 3l-.3.5a16 16 0 0 1 3.9 1.3 13 13 0 0 0-11 0A16 16 0 0 1 12 3.5L11.7 3A18 18 0 0 0 4 4.4 19 19 0 0 0 1 18a18 18 0 0 0 5.4 2.7l.6-1.1A12 12 0 0 1 5 18.8l.4-.3a13 13 0 0 0 13.2 0l.4.3a12 12 0 0 1-2 .8l.6 1.1A18 18 0 0 0 23 18a19 19 0 0 0-3-13.6zM9 15.3c-.9 0-1.6-.9-1.6-1.9S8.1 11.5 9 11.5s1.6.9 1.6 1.9-.7 1.9-1.6 1.9zm6 0c-.9 0-1.6-.9-1.6-1.9s.7-1.9 1.6-1.9 1.6.9 1.6 1.9-.7 1.9-1.6 1.9z" },
    { label: "Facebook", d: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" },
    { label: "X", d: "M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.5L8.3 21H5l7.5-8.6L4.6 3H11l4.5 6 2-6zm-1.1 16h1.8L7.7 4.8H5.8l10.6 14.2z" },
    { label: "Instagram", d: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.2 1 .47 1.4.9.4.4.7.8.9 1.4.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38zm6.96-11.4a1.58 1.58 0 1 1-1.57-1.58 1.58 1.58 0 0 1 1.57 1.58z" },
    { label: "YouTube", d: "M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.5zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" },
  ];

  function SiteFooter() {
    return (
      <footer className="ftr" data-screen-label="Footer">
        <div className="top">
          <div className="brand">
            <img src="ds/logo-dark.svg" alt="ChessMood" style={{ height: 28, display: "block" }} />
            <p className="tag">A step-by-step system for chess improvement, built by Grandmasters.</p>
          </div>
          {COLS.map((c, i) => (
            <div className="col" key={i}>
              <h4>{c.h}</h4>
              {c.links.map((l, j) => <a href="#" key={j}>{l}</a>)}
            </div>
          ))}
          <div className="news">
            <h4>Get Grandmaster advice</h4>
            <p>Course updates and training tips, straight to your inbox. No spam, no sales — only value.</p>
            <form className="sub" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email" aria-label="Email" />
              <button type="submit">Subscribe</button>
            </form>
            <div className="social">
              {SOCIAL.map((s, i) => (
                <a href="#" key={i} aria-label={s.label}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="bottom">
          <span className="cr">Secured with SSL · Right Mood — Right Move</span>
          <span className="cr">© 2026 ChessMood</span>
        </div>
      </footer>
    );
  }

  window.FinalCTA = FinalCTA;
  window.SiteFooter = SiteFooter;
})();
