// DGF Website — design system (CSS-in-string, injected via <style> for clean SSR).
//
// Structure: tokens → base → nav/menu → hero → shared UI → sections → footer →
// floating UI → hover-capable devices only → breakpoints → reduced motion.
//
// Conventions:
// • Every class is prefixed `dgf-`.
// • Mobile-first: base styles target small screens; 520/768/1024px widen.
// • Hover transforms live inside `@media (hover:hover) and (pointer:fine)` so
//   touch devices never get "stuck" hover states.
// • Sections with an `id` carry `scroll-margin-top` so anchors land below the
//   fixed header.

export const dgfStyles = `
/* ───────────────────────── tokens ───────────────────────── */
.dgf-root {
  --dark: #0a1f15; --dark-2: #061611; --dark-3: #06120c;
  --green: #1d7648; --green-bright: #2ea76d; --green-accent: #3CAB6E; --mint: #8FE3B4;
  --paper: #f5f8f5; --border: #e3eae5;
  --text: #0a1f15; --text-soft: #45564a; --text-muted: #62726a;
  /* On-dark tones tuned for WCAG AA at small sizes. */
  --on-dark: rgba(255,255,255,0.94); --on-dark-2: rgba(255,255,255,0.74); --on-dark-3: rgba(255,255,255,0.66);
  --fs-eyebrow: 0.6875rem; --fs-sm: 0.8125rem;
  --fs-body: clamp(0.95rem, 0.9rem + 0.25vw, 1.0625rem);
  --fs-lead: clamp(1rem, 0.94rem + 0.4vw, 1.1875rem);
  --fs-h3: 1.125rem;
  --fs-h2: clamp(2rem, 1.35rem + 2.7vw, 3.25rem);
  --fs-hero: clamp(2.55rem, 1.1rem + 5.6vw, 6rem);
  --section-y: clamp(4.5rem, 3rem + 6vw, 7.5rem);
  --gutter: clamp(1.25rem, 0.4rem + 3.4vw, 3.75rem);
  --maxw: 1280px; --maxw-narrow: 960px;
  --r-sm: 10px; --r-md: 12px; --r-lg: 16px; --r-xl: 20px; --r-pill: 100px;
  --shadow-card: 0 8px 32px rgba(29,118,72,0.08); --shadow-lift: 0 14px 40px rgba(0,0,0,0.12);
  --header-h: 60px;
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
  color: var(--text); background: #fff; overflow-x: hidden;
}

/* ───────────────────────── base ───────────────────────── */
.dgf-root *, .dgf-root *::before, .dgf-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.dgf-root img { max-width: 100%; }
html, body { overflow-x: hidden; max-width: 100%; }
.serif { font-family: inherit; font-style: normal; font-weight: 500; }
.dgf-root :focus-visible { outline: 2px solid var(--green-accent); outline-offset: 3px; border-radius: 4px; }
/* Anchored sections stop below the fixed header instead of underneath it. */
.dgf-root section[id] { scroll-margin-top: calc(var(--header-h) + 16px); }
.dgf-skip { position: absolute; left: 12px; top: -60px; z-index: 200; background: var(--green); color: #fff; padding: 10px 18px; border-radius: var(--r-sm); font-size: 14px; font-weight: 600; transition: top 0.2s var(--ease); }
.dgf-skip:focus { top: 12px; }

.dgf-section { padding: var(--section-y) var(--gutter); position: relative; overflow: hidden; }
.dgf-section--dark { background: var(--dark); color: var(--on-dark); }
.dgf-section--paper { background: var(--paper); }
.dgf-section--white { background: #fff; }
.dgf-container { max-width: var(--maxw); margin: 0 auto; position: relative; }
.dgf-container--narrow { max-width: var(--maxw-narrow); }
.dgf-blob { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(80px); }
.dgf-eyebrow { font-size: var(--fs-eyebrow); font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--green); margin-bottom: 18px; }
.dgf-eyebrow--light { color: var(--green-accent); }
.dgf-h2 { font-size: var(--fs-h2); font-weight: 500; letter-spacing: -0.03em; line-height: 1.05; color: var(--dark); margin-bottom: 18px; }
.dgf-section--dark .dgf-h2 { color: #fff; }
.dgf-lead { font-size: var(--fs-lead); color: var(--text-soft); line-height: 1.65; max-width: 60ch; }
.dgf-section--dark .dgf-lead { color: var(--on-dark-2); }

/* ───────────────────────── nav + mobile menu ───────────────────────── */
.dgf-nav { position: fixed; inset: 0 0 auto 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; height: var(--header-h); padding: 0 20px; background: linear-gradient(180deg, rgba(10,31,21,0.28), rgba(10,31,21,0.04)); -webkit-backdrop-filter: blur(10px) saturate(130%); backdrop-filter: blur(10px) saturate(130%); border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.35s var(--ease), backdrop-filter 0.35s var(--ease), border-color 0.35s var(--ease), box-shadow 0.35s var(--ease); }
.dgf-nav--scrolled { background: linear-gradient(180deg, rgba(10,31,21,0.82), rgba(10,31,21,0.66)); -webkit-backdrop-filter: blur(18px) saturate(160%); backdrop-filter: blur(18px) saturate(160%); border-bottom-color: rgba(255,255,255,0.08); box-shadow: 0 8px 32px rgba(0,0,0,0.22); }
.dgf-brand { display: inline-flex; background: none; border: 0; cursor: pointer; padding: 4px; }
.dgf-nav__links { display: none; align-items: center; gap: 4px; }
.dgf-navlink { font-size: 13.5px; font-weight: 500; color: var(--on-dark-2); background: none; border: 0; cursor: pointer; padding: 10px 15px; border-radius: 8px; transition: color 0.2s var(--ease); font-family: inherit; }
.dgf-navlink--active { color: #fff; }
.dgf-navlink--active::after { content: ""; display: block; height: 2px; width: 16px; margin: 3px auto 0; background: var(--green-accent); border-radius: 2px; }
.dgf-cta { display: inline-block; background: var(--green); color: #fff; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: 0; font-family: inherit; text-decoration: none; transition: background 0.2s var(--ease), transform 0.2s var(--ease), box-shadow 0.2s var(--ease); }
.dgf-nav__cta { display: none; margin-left: 12px; }
/* 44px tap target on the burger. */
.dgf-burger { display: inline-flex; flex-direction: column; justify-content: center; gap: 5px; padding: 12px; margin: -4px; background: none; border: 0; cursor: pointer; }
.dgf-burger__bar { width: 22px; height: 2px; background: #fff; border-radius: 2px; transition: transform 0.3s var(--ease), opacity 0.3s var(--ease); }
.dgf-burger[aria-expanded="true"] .dgf-burger__bar:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.dgf-burger[aria-expanded="true"] .dgf-burger__bar:nth-child(2) { opacity: 0; }
.dgf-burger[aria-expanded="true"] .dgf-burger__bar:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
.dgf-mobilemenu__backdrop { position: fixed; inset: var(--header-h) 0 0 0; z-index: 98; background: rgba(6,18,12,0.55); -webkit-backdrop-filter: blur(2px); backdrop-filter: blur(2px); }
.dgf-mobilemenu { position: fixed; top: var(--header-h); left: 0; right: 0; z-index: 99; max-height: calc(100dvh - var(--header-h)); overflow-y: auto; background: rgba(10,31,21,0.94); -webkit-backdrop-filter: blur(18px) saturate(160%); backdrop-filter: blur(18px) saturate(160%); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 16px 20px 20px; display: flex; flex-direction: column; gap: 2px; box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
.dgf-mobilemenu__link { font-size: 16px; font-weight: 500; color: #fff; text-align: left; background: none; border: 0; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 14px 4px; cursor: pointer; font-family: inherit; }
.dgf-mobilemenu .dgf-cta { margin-top: 14px; text-align: center; padding: 14px 20px; font-size: 14px; }

/* ───────────────────────── hero ───────────────────────── */
.dgf-hero { position: relative; overflow: hidden; min-height: 100svh; display: flex; flex-direction: column; justify-content: center; padding: clamp(96px, 18vw, 140px) 20px 64px; background: linear-gradient(180deg, var(--dark) 0%, var(--dark-2) 100%); color: var(--on-dark); }
.dgf-hero__blob { top: -20%; right: -10%; width: min(600px, 90vw); height: min(600px, 90vw); background: radial-gradient(circle, var(--green) 0%, transparent 70%); opacity: 0.18; }
.dgf-badge { display: inline-flex; align-items: center; gap: 10px; width: fit-content; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); padding: 7px 14px; border-radius: var(--r-pill); font-size: 12px; color: var(--on-dark-2); margin-bottom: 32px; -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }
.dgf-badge__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green-accent); flex-shrink: 0; }
.dgf-glow { animation: dgf-glow 2.5s infinite; }
@keyframes dgf-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(60,171,110,0.4); } 50% { box-shadow: 0 0 0 8px rgba(60,171,110,0); } }
.dgf-hero__title { font-size: var(--fs-hero); font-weight: 600; line-height: 1.02; letter-spacing: -0.035em; color: #fff; max-width: 20ch; margin-bottom: 28px; }
.dgf-hero__title .dim { color: var(--on-dark-3); font-weight: 300; }
.dgf-grad-text { background: linear-gradient(105deg, var(--green-accent) 0%, var(--mint) 55%, #fff 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; padding-right: 0.08em; }
.dgf-hero__sub { font-size: var(--fs-lead); color: var(--on-dark-2); max-width: 52ch; line-height: 1.65; margin-bottom: 40px; }
.dgf-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.dgf-hero__stats { margin-top: 56px; display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 32px 0; max-width: 760px; width: 100%; margin-left: auto; margin-right: auto; }
.dgf-hstat { text-align: center; padding: 0 8px; }
.dgf-hstat + .dgf-hstat { border-left: 1px solid rgba(255,255,255,0.08); }
.dgf-hstat__num { font-size: clamp(26px, 5vw, 44px); font-weight: 500; color: #fff; letter-spacing: -0.02em; line-height: 1; margin-bottom: 10px; }
.dgf-hstat__num .suffix { color: var(--green-accent); }
.dgf-hstat__label { font-size: 11.5px; color: var(--on-dark-3); letter-spacing: 0.08em; text-transform: uppercase; }

/* ───────────────────────── shared UI ───────────────────────── */
.dgf-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 26px; border-radius: var(--r-sm); font-size: 14px; font-weight: 500; cursor: pointer; border: 1px solid transparent; font-family: inherit; text-decoration: none; transition: background 0.25s var(--ease), transform 0.25s var(--ease), box-shadow 0.25s var(--ease), border-color 0.25s var(--ease); }
.dgf-btn--primary { background: var(--green); color: #fff; }
.dgf-btn--ghost { background: rgba(255,255,255,0.04); color: var(--on-dark); border-color: rgba(255,255,255,0.15); }
.dgf-sources { margin-top: 32px; display: flex; flex-wrap: wrap; gap: 14px; }
.dgf-source { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--green); text-decoration: none; padding: 11px 16px; border-radius: var(--r-pill); border: 1px solid var(--border); background: #fff; transition: border-color 0.2s var(--ease), transform 0.2s var(--ease), color 0.2s var(--ease); }
.dgf-callout { margin-top: 8px; padding: 16px 20px; border-left: 3px solid var(--green); background: #fff; border-radius: var(--r-md); box-shadow: var(--shadow-card); }
.dgf-callout strong { color: var(--dark); font-weight: 600; }

/* ───────────────────────── about ───────────────────────── */
.dgf-about { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
.dgf-about__body p { font-size: var(--fs-body); color: var(--text-soft); line-height: 1.75; }
.dgf-about__body p + p { margin-top: 16px; }
.dgf-about__body strong { color: var(--dark); font-weight: 600; }
.dgf-about__cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.dgf-card-hero { grid-column: 1 / -1; background: var(--dark); border-radius: var(--r-xl); padding: 28px 26px; color: #fff; position: relative; overflow: hidden; }
.dgf-card-hero__blob { position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: radial-gradient(circle, var(--green), transparent 70%); opacity: 0.4; filter: blur(40px); }
.dgf-card-stat { background: var(--paper); border-radius: var(--r-xl); padding: 24px; border: 1px solid var(--border); }
.dgf-card-num { font-size: 38px; font-weight: 500; letter-spacing: -0.03em; line-height: 1; margin-bottom: 6px; color: var(--dark); }
.dgf-card-hero .dgf-card-num { color: #fff; }
.dgf-card-num .accent { color: var(--green); font-size: 0.55em; font-weight: 400; }
.dgf-card-label { font-size: 12.5px; color: var(--text-soft); }
.dgf-card-hero .dgf-card-label { color: rgba(255,255,255,0.62); }

/* ───────────────────────── thesis ───────────────────────── */
.dgf-grid-3 { display: grid; grid-template-columns: 1fr; gap: 14px; }
.dgf-thesis { padding: 28px 22px; background: #fff; border-radius: var(--r-lg); border: 1px solid var(--border); height: 100%; transition: transform 0.25s var(--ease), background 0.25s var(--ease), box-shadow 0.25s var(--ease); }
.dgf-thesis__n { font-size: 12px; font-weight: 600; color: var(--green); letter-spacing: 0.1em; margin-bottom: 16px; }
.dgf-thesis h3 { font-size: var(--fs-h3); font-weight: 500; color: var(--dark); margin-bottom: 10px; letter-spacing: -0.01em; }
.dgf-thesis p { font-size: 14px; color: var(--text-soft); line-height: 1.65; }

/* ───────────────────────── portfolio ───────────────────────── */
.dgf-portfolio__head { display: flex; flex-direction: column; gap: 20px; align-items: flex-start; margin-bottom: 24px; }
.dgf-filters { display: flex; gap: 6px; flex-wrap: wrap; }
.dgf-filter { padding: 10px 16px; border-radius: var(--r-pill); font-size: 13px; font-weight: 500; border: 1px solid rgba(255,255,255,0.14); background: transparent; color: var(--on-dark-2); cursor: pointer; transition: all 0.2s var(--ease); font-family: inherit; }
.dgf-filter[aria-pressed="true"] { background: var(--green-bright); border-color: var(--green-bright); color: #fff; }
.dgf-filter__count { opacity: 0.7; margin-left: 6px; font-variant-numeric: tabular-nums; }
.dgf-search { position: relative; max-width: 420px; margin-bottom: 14px; }
.dgf-search svg { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: var(--on-dark-3); pointer-events: none; }
.dgf-search input { width: 100%; padding: 12px 44px 12px 42px; border-radius: var(--r-pill); border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.04); color: #fff; font-family: inherit; font-size: 14px; appearance: none; -webkit-appearance: none; }
.dgf-search input::placeholder { color: var(--on-dark-3); }
.dgf-search input::-webkit-search-cancel-button { display: none; }
.dgf-search input:focus { outline: none; border-color: var(--green-bright); box-shadow: 0 0 0 3px rgba(46,167,109,0.22); }
.dgf-search__clear { position: absolute; right: 7px; top: 50%; transform: translateY(-50%); width: 30px; height: 30px; border-radius: 50%; border: 0; background: rgba(255,255,255,0.1); color: #fff; cursor: pointer; font-size: 16px; line-height: 1; font-family: inherit; }
.dgf-results { font-size: 13px; color: var(--on-dark-3); margin: 0 0 18px 4px; }
/* Equal-height rows: every card stretches to the tallest of the whole grid.
 * NOTE: do NOT use `content-visibility: auto` here — it implies paint
 * containment, which clips the top border of first-row cards when they lift on
 * hover. The small perf win is not worth the visual glitch. */
.dgf-cards { display: grid; grid-template-columns: 1fr; grid-auto-rows: 1fr; gap: 14px; }
.dgf-cards > .dgf-reveal { height: 100%; }
.dgf-cocard { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--r-lg); padding: 24px 22px; min-height: 176px; height: 100%; display: flex; flex-direction: column; gap: 14px; text-align: left; transition: transform 0.3s var(--ease), border-color 0.3s var(--ease), box-shadow 0.3s var(--ease); }
a.dgf-cocard { text-decoration: none; color: inherit; }
.dgf-cocard__badge { width: 46px; height: 46px; border-radius: var(--r-md); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; color: #fff; letter-spacing: -0.02em; background: linear-gradient(135deg, var(--green), var(--green-bright)); flex-shrink: 0; }
.dgf-cocard__badge--exit { background: #fff; color: var(--green); border: 1px solid rgba(255,255,255,0.12); }
.dgf-cocard__badge--img { background: #fff; padding: 7px; border: 1px solid rgba(255,255,255,0.12); }
.dgf-cocard__badge--img img { width: 100%; height: 100%; object-fit: contain; filter: grayscale(1); transition: filter 0.25s var(--ease); }
.dgf-cocard__body { flex: 1; }
.dgf-cocard__name { font-size: 15.5px; font-weight: 500; color: #fff; margin-bottom: 6px; letter-spacing: -0.01em; }
.dgf-cocard__desc { font-size: 13.5px; color: var(--on-dark-3); line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.dgf-cocard__foot { display: flex; justify-content: space-between; align-items: center; padding-top: 4px; }
.dgf-tag { font-size: 11px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; }
.dgf-tag--ativo { color: var(--green-accent); }
.dgf-tag--saida { color: var(--on-dark-3); }
.dgf-cocard--cta { background: rgba(60,171,110,0.06); border: 1px dashed rgba(60,171,110,0.35); cursor: pointer; }
.dgf-cocard--cta .dgf-cocard__badge { background: rgba(60,171,110,0.18); color: var(--green-accent); font-size: 24px; font-weight: 300; }
.dgf-empty { grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: var(--on-dark-3); font-size: 14px; border: 1px dashed rgba(255,255,255,0.12); border-radius: var(--r-lg); }

/* ───────────────────────── track record ───────────────────────── */
.dgf-trackgrid { display: grid; grid-template-columns: 1fr; gap: 12px; }
.dgf-trackcard { border-radius: var(--r-xl); padding: 36px 28px; color: #fff; position: relative; overflow: hidden; min-height: 200px; display: flex; flex-direction: column; justify-content: space-between; }
.dgf-trackcard--dark { background: var(--dark); }
.dgf-trackcard--light { background: var(--green); }
.dgf-trackcard__blob { position: absolute; top: -30px; right: -30px; width: 140px; height: 140px; pointer-events: none; }
.dgf-trackcard--dark .dgf-trackcard__blob { background: radial-gradient(circle, var(--green), transparent 70%); opacity: 0.35; filter: blur(30px); }
.dgf-trackcard--light .dgf-trackcard__blob { background: rgba(255,255,255,0.08); border-radius: 50%; }
.dgf-trackcard__label { position: relative; font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px; }
.dgf-trackcard--dark .dgf-trackcard__label { color: var(--green-accent); }
.dgf-trackcard--light .dgf-trackcard__label { color: rgba(255,255,255,0.85); }
.dgf-trackcard__value { position: relative; display: flex; align-items: baseline; gap: 2px; }
.dgf-trackcard__num { font-size: clamp(48px, 4.5vw, 72px); font-weight: 600; letter-spacing: -0.04em; line-height: 1; color: #fff; }
/* Long textual values ("Top Quartile") scale down so they never overflow. */
.dgf-trackcard__num--text { font-size: clamp(24px, 2.4vw, 38px); line-height: 1.15; letter-spacing: -0.02em; }
.dgf-trackcard__suffix { font-size: clamp(28px, 2.5vw, 40px); font-weight: 500; color: rgba(255,255,255,0.7); letter-spacing: -0.02em; }

/* ───────────────────────── team ───────────────────────── */
/* Same reasoning as .dgf-cards: no paint containment, cards lift on hover. */
.dgf-team { display: grid; grid-template-columns: 1fr; gap: 16px; }
.dgf-teamcard { display: block; padding: 28px 26px; border: 1px solid var(--border); border-radius: var(--r-lg); height: 100%; text-decoration: none; color: inherit; transition: border-color 0.25s var(--ease), background 0.25s var(--ease), transform 0.25s var(--ease); }
.dgf-teamcard__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.dgf-teamcard__badge { width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg, var(--green), var(--green-bright)); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 16px; color: #fff; letter-spacing: -0.02em; }
.dgf-teamcard__name { font-size: 17px; font-weight: 500; color: var(--dark); margin-bottom: 5px; letter-spacing: -0.01em; }
.dgf-teamcard__role { font-size: 12.5px; color: var(--green); font-weight: 500; }
.dgf-teamcard__bio { font-size: 13.5px; color: var(--text-soft); line-height: 1.65; margin-top: 12px; }
.dgf-teamcard__li { color: var(--green); opacity: 0.7; transition: opacity 0.2s var(--ease); }

/* ───────────────────────── contact ───────────────────────── */
.dgf-contact { text-align: center; }
.dgf-contact__blob { bottom: -200px; left: 50%; transform: translateX(-50%); width: min(800px, 95vw); height: 400px; background: radial-gradient(ellipse, var(--green) 0%, transparent 70%); opacity: 0.2; filter: blur(60px); border-radius: 0; }
.dgf-contact .dgf-h2 { max-width: 20ch; margin-left: auto; margin-right: auto; }
.dgf-contact__sub { font-size: var(--fs-body); color: var(--on-dark-2); max-width: 52ch; margin: 0 auto 36px; line-height: 1.65; }
.dgf-contact__actions { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
.dgf-contact__email { display: block; margin-top: 24px; font-size: 13px; color: var(--on-dark-3); }
.dgf-contact__email a { color: var(--mint); text-decoration: none; }
.dgf-contact__email a:hover { text-decoration: underline; }

/* ───────────────────────── footer ───────────────────────── */
.dgf-footer { background: var(--dark-3); padding: 48px 20px; display: flex; flex-direction: column; align-items: center; gap: 20px; text-align: center; }
.dgf-footer__links { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.dgf-footer__link { font-size: 13px; color: var(--on-dark-3); background: none; border: 0; cursor: pointer; text-decoration: none; letter-spacing: 0.02em; font-family: inherit; padding: 10px 8px; transition: color 0.2s var(--ease); }
.dgf-footer__link:hover { color: var(--on-dark); }
.dgf-footer__rule { width: 40px; height: 1px; background: rgba(255,255,255,0.1); }
.dgf-footer__copy { font-size: 11.5px; color: rgba(255,255,255,0.4); letter-spacing: 0.02em; }

/* ───────────────────────── floating UI ───────────────────────── */
.dgf-totop { position: fixed; right: 18px; bottom: 18px; z-index: 90; width: 46px; height: 46px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.14); background: var(--green); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; transform: translateY(12px); pointer-events: none; transition: opacity 0.3s var(--ease), transform 0.3s var(--ease), background 0.2s var(--ease); box-shadow: 0 10px 28px rgba(0,0,0,0.28); }
.dgf-totop svg { width: 18px; height: 18px; }
.dgf-totop.is-visible { opacity: 1; transform: none; pointer-events: auto; }

/* ───────────────────────── reveal animation ───────────────────────── */
.dgf-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.7s var(--ease), transform 0.7s var(--ease); }
.dgf-reveal.is-visible { opacity: 1; transform: none; }

/* ───────────────────────── CVM page ───────────────────────── */
.dgf-cvm { max-width: 900px; margin: 0 auto; padding: 120px 20px 80px; }
.dgf-cvm h1 { font-size: var(--fs-h2); font-weight: 500; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 24px; color: var(--dark); }
.dgf-cvm h2 { font-size: 1.5rem; font-weight: 500; letter-spacing: -0.02em; margin: 48px 0 16px; color: var(--dark); }
.dgf-cvm p { font-size: var(--fs-body); color: var(--text-soft); line-height: 1.75; margin-bottom: 16px; }
.dgf-cvm__back { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--green); text-decoration: none; margin-bottom: 24px; padding: 6px 0; }
.dgf-cvm__back:hover { color: var(--green-bright); }
.dgf-cvm__lang { display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--green); background: rgba(29,118,72,0.08); padding: 4px 10px; border-radius: var(--r-pill); margin-bottom: 24px; }
.dgf-cvm__docs { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 24px; }
.dgf-cvm__doc { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 20px; background: #fff; border: 1px solid var(--border); border-radius: var(--r-md); color: var(--dark); text-decoration: none; font-size: 14px; transition: border-color 0.2s var(--ease), transform 0.2s var(--ease), box-shadow 0.2s var(--ease); }
.dgf-cvm__doc svg { flex-shrink: 0; color: var(--green); }

/* ─────────────── hover-capable devices only (no sticky touch hovers) ─────────────── */
@media (hover: hover) and (pointer: fine) {
  .dgf-navlink:hover { color: #fff; }
  .dgf-cta:hover { background: var(--green-bright); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(46,167,109,0.25); }
  .dgf-btn--primary:hover { background: var(--green-bright); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(46,167,109,0.25); }
  .dgf-btn--ghost:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.08); }
  .dgf-source:hover { border-color: var(--green-bright); color: var(--green-bright); transform: translateY(-1px); }
  .dgf-filter:hover { border-color: var(--green-bright); color: #fff; }
  .dgf-thesis:hover { background: var(--paper); transform: translateY(-2px); box-shadow: var(--shadow-card); }
  .dgf-cocard:hover { border-color: var(--green-bright); transform: translateY(-3px); box-shadow: 0 8px 32px rgba(29,118,72,0.18); }
  .dgf-cocard:hover .dgf-cocard__badge--img img { filter: none; }
  a.dgf-teamcard:hover { border-color: var(--green-bright); background: var(--paper); transform: translateY(-2px); }
  a.dgf-teamcard:hover .dgf-teamcard__li { opacity: 1; }
  .dgf-cvm__doc:hover { border-color: var(--green); transform: translateY(-1px); box-shadow: var(--shadow-card); }
  .dgf-totop:hover { background: var(--green-bright); }
}

/* ───────────────────────── breakpoints ───────────────────────── */
@media (max-width: 400px) {
  .dgf-hstat__label { font-size: 10px; letter-spacing: 0.05em; }
}
@media (min-width: 520px) {
  .dgf-cards { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 768px) {
  .dgf-root { --header-h: 68px; }
  .dgf-nav { padding: 0 40px; }
  .dgf-nav__links, .dgf-nav__cta { display: flex; }
  .dgf-burger { display: none; }
  .dgf-hero { padding: 140px 6vw 120px; }
  .dgf-section { padding: var(--section-y) 6vw; }
  .dgf-hero__stats { margin-top: 96px; padding: 48px 0; }
  .dgf-hstat { padding: 0 28px; }
  .dgf-grid-3 { grid-template-columns: 1fr 1fr; }
  .dgf-team { grid-template-columns: 1fr 1fr; }
  .dgf-portfolio__head { flex-direction: row; justify-content: space-between; align-items: flex-end; }
  .dgf-trackgrid { grid-template-columns: repeat(2, 1fr); }
  .dgf-cvm__docs { grid-template-columns: 1fr 1fr; }
  .dgf-totop { right: 28px; bottom: 28px; }
}
@media (min-width: 1024px) {
  .dgf-about { grid-template-columns: 1.1fr 0.9fr; gap: 80px; }
  .dgf-grid-3 { grid-template-columns: repeat(3, 1fr); }
  .dgf-team { grid-template-columns: repeat(3, 1fr); }
  .dgf-cards { grid-template-columns: repeat(3, 1fr); }
  .dgf-trackgrid { grid-template-columns: repeat(4, 1fr); }
}

/* ───────────────────────── reduced motion ───────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .dgf-root *, .dgf-root *::before, .dgf-root *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }
  .dgf-reveal { opacity: 1 !important; transform: none !important; }
  .dgf-glow { animation: none !important; }
}
`;
