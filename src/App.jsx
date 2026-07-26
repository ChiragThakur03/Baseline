import React from 'react';
import { useBaselineLogic } from './useBaselineLogic';

export default function App() {
  useBaselineLogic();

  return (
    <>

  {/*  ===== LOADER =====  */}
  <div id="loader">
    <div id="loader-wordmark">
      <svg className="tennis-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M4.8 5.6A9 9 0 0 0 4.8 18.4" />
        <path d="M19.2 5.6a9 9 0 0 1 0 12.8" />
      </svg>
      Baseline
    </div>
    <div id="loader-track">
      <div id="loader-fill"></div>
    </div>
  </div>

  {/*  ===== FULLSCREEN MENU =====  */}
  <div id="menu-overlay" aria-hidden="true">
    <div className="menu-backdrop" id="menu-backdrop"></div>
    <div className="menu-panel" id="menu-panel">
      <div className="menu-inner">
        <div className="menu-top">
          <div className="menu-brand">
            <svg className="tennis-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M4.8 5.6A9 9 0 0 0 4.8 18.4" />
              <path d="M19.2 5.6a9 9 0 0 1 0 12.8" />
            </svg>
            Baseline
          </div>
          <button className="menu-close-btn" id="menu-close-btn" aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className="menu-nav" aria-label="Main navigation">
          <a href="#programs" className="menu-link" data-menu-link>Programs</a>
          <a href="#facilities" className="menu-link" data-menu-link>Facilities</a>
          <a href="#testimonials" className="menu-link" data-menu-link>Reviews</a>
          <a href="#contact" className="menu-link" data-menu-link>Contact</a>
        </nav>
        <div className="menu-bottom">
          <button className="pill-btn pill-btn-light" id="menu-book-btn">
            Book a Visit
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <div className="menu-social">
            <a href="#instagram">Instagram</a>
            <a href="#x">X</a>
            <a href="#youtube">YouTube</a>
            <a href="#linkedin">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/*  ===== CONTACT MODAL =====  */}
  <div id="modal-overlay" role="presentation" aria-hidden="true">
    <div className="modal-backdrop" id="modal-backdrop"></div>
    <div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-heading" id="modal-panel">
      <div className="modal-header">
        <div className="eyebrow eyebrow-dark">
          <span className="eyebrow-dot"></span>
          Book a visit
        </div>
        <button className="modal-close-btn" id="modal-close-btn" aria-label="Close modal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <h2 id="modal-heading" className="modal-title">
          <span className="line-clip"><span className="line-inner" id="modal-line-1">Come see</span></span>
          <span className="line-clip"><span className="line-inner" id="modal-line-2">the courts</span></span>
        </h2>
      </div>
      <form className="modal-form" id="modal-form" novalidate>
        <div className="form-field">
          <label className="form-label" htmlFor="field-name">Full name</label>
          <input className="form-input" type="text" id="field-name" name="name" placeholder="Alex Rivera"
            autoComplete="name" />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="field-email">Email</label>
          <input className="form-input" type="email" id="field-email" name="email" placeholder="you@email.com"
            autoComplete="email" />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="field-message">What would you like to play?</label>
          <textarea className="form-textarea" id="field-message" name="message" rows="3"
            placeholder="I'd love to try a private lesson on the clay courts…"></textarea>
        </div>
        <button className="form-submit" type="submit" id="form-submit-btn">Request a visit</button>
      </form>
      <div className="modal-success" id="modal-success">
        <div className="success-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
            strokeLinecap="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="success-title">Request received</p>
        <p className="success-sub" id="success-message">Thanks — our team will be in touch to lock in your visit.</p>
        <button className="success-done" id="success-done-btn">Done</button>
      </div>
    </div>
  </div>

  {/*  ===== MAIN CONTENT =====  */}
  <main>

    {/*  ===== HERO =====  */}
    <section id="hero">
      <div className="hero-bg-wrap">
        <div className="hero-bg-inner" id="hero-parallax">
          <img
            src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/hero/hero-court.webp"
            alt="Player lunging for a shot on a hard court" fetchpriority="high" loading="eager" />
          <div className="hero-bg-overlay"></div>
        </div>
      </div>

      <header>
        <nav className="header-nav" aria-label="Site navigation">
          <a href="#programs">Programs &amp; Coaches</a>
          <a href="#facilities">Club &amp; Events</a>
        </nav>
        <div className="header-brand">
          <div className="brand-inner">
            <svg className="tennis-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M4.8 5.6A9 9 0 0 0 4.8 18.4" />
              <path d="M19.2 5.6a9 9 0 0 1 0 12.8" />
            </svg>
            Baseline
          </div>
        </div>
        <div className="header-right">
          <button className="header-book-btn" id="header-book-btn">Book a Visit</button>
          <button className="burger-btn" id="burger-btn" aria-label="Open menu" aria-expanded="false">
            <div className="burger-lines">
              <div className="burger-line"></div>
              <div className="burger-line"></div>
            </div>
          </button>
        </div>
      </header>

      <div className="hero-title-block">
        <h1 id="hero-title">
          <span className="word-clip"><span className="word-inner">Own</span></span>
          <span className="word-clip"><span className="word-inner">The</span></span>
          <span className="word-clip"><span className="word-inner">Court</span></span>
        </h1>
      </div>

      <div className="hero-bottom">
        <p className="hero-tagline" aria-label="Show Up, Level Up">
          <span className="line-clip"><span className="line-inner">Show Up,</span></span>
          <span className="line-clip"><span className="line-inner">Level Up</span></span>
        </p>

        <div className="hero-right-cluster">
          {/*  Collection Slider  */}
          <div className="collection-slider" id="collection-slider">
            <div id="collection-card-wrap">
              <article className="collection-card" id="collection-card">
                <img className="collection-card-img" id="collection-card-img"
                  src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/2.webp"
                  alt="Player driving a backhand on a hard court" loading="lazy" />
                <div className="collection-card-body">
                  <span className="collection-brand" id="collection-brand">Baseline Pro</span>
                  <span className="collection-title" id="collection-title">Featured Gear</span>
                  <a href="#" className="collection-cta" id="collection-cta">Shop the kit →</a>
                </div>
              </article>
            </div>
            <div className="carousel-dots dots-light" id="collection-dots">
              <button className="dot-btn" aria-current="true" aria-label="Slide 1"><span className="dot-pill"></span></button>
              <button className="dot-btn" aria-label="Slide 2"><span className="dot-pill"></span></button>
              <button className="dot-btn" aria-label="Slide 3"><span className="dot-pill"></span></button>
            </div>
          </div>

          {/*  Membership Card  */}
          <article className="membership-card" id="membership-card">
            <div className="membership-left">
              <div>
                <div className="membership-value">9K+</div>
                <div className="membership-avatars">
                  <div className="membership-avatar" style={{ background: '#5790e6' }}></div>
                  <div className="membership-avatar" style={{ background: '#c2e029' }}></div>
                  <div className="membership-avatar" style={{ background: '#0b6e97' }}></div>
                  <div className="membership-avatar" style={{ background: '#ffffff' }}></div>
                </div>
              </div>
              <div className="membership-caption">Members on court</div>
            </div>
            <img className="membership-img"
              src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/1.webp"
              alt="Player waiting to return on a clay court" loading="lazy" />
          </article>
        </div>
      </div>
    </section>

    {/*  ===== TRUST SECTION =====  */}
    <section id="trust">
      <div className="trust-badges">
        <div className="pct-badge" id="pct-badge">
          <div className="pct-value">100%</div>
          <div className="pct-caption">Coaching built around your game</div>
        </div>
        <article className="trust-badge-card" id="trust-badge-card">
          <div className="trust-index-chip">#01</div>
          <div className="trust-card-text">
            <div className="trust-card-title">Trusted by serious players</div>
            <div className="trust-card-body">From first-timers to nationally ranked juniors, players train here because the
              progress shows up on the scoreboard.</div>
          </div>
        </article>
      </div>

      <h2 id="trust-title" aria-hidden="true">
        <div className="ghost-row">
          <span className="ghost-word" id="ghost-w0"><span className="word-clip"><span
                className="word-inner">Expert</span></span></span>
          <span className="ghost-card-spacer"></span>
          <span className="ghost-word" id="ghost-w1"><span className="word-clip"><span
                className="word-inner">Result-</span></span></span>
        </div>
        <div className="ghost-row">
          <span className="ghost-word ink" id="ghost-w2"><span className="word-clip"><span
                className="word-inner">Driven</span></span></span>
          <span className="ghost-card-spacer"></span>
          <span className="ghost-word" id="ghost-w3"><span className="word-clip"><span
                className="word-inner">Coaching</span></span></span>
        </div>
      </h2>

      <div className="coach-wrap">
        <figure className="coach-card" id="coach-card">
          <img className="coach-photo" id="coach-photo"
            src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/5.webp"
            alt="Head coach set in a ready stance on clay" loading="lazy" />
          <figcaption className="coach-caption">
            <div className="coach-name" id="coach-name">Marco Vidal</div>
            <div className="coach-role" id="coach-role">Head Coach</div>
          </figcaption>
        </figure>
      </div>

      <div className="trust-controls">
        <button className="arrow-btn arrow-btn-outline" id="trust-prev" aria-label="Previous coach">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" style={{ transform: 'scaleX(-1)' }}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <div className="carousel-dots dots-dark" id="trust-dots">
          <button className="dot-btn" aria-current="true" aria-label="Coach 1"><span className="dot-pill"></span></button>
          <button className="dot-btn" aria-label="Coach 2"><span className="dot-pill"></span></button>
          <button className="dot-btn" aria-label="Coach 3"><span className="dot-pill"></span></button>
        </div>
        <button className="arrow-btn arrow-btn-solid" id="trust-next" aria-label="Next coach">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>

    {/*  ===== PROGRAMS =====  */}
    <section id="programs">
      <div className="eyebrow eyebrow-dark">
        <span className="eyebrow-dot"></span>
        Training programs
      </div>
      <h2 id="programs-title">
        <span className="line-clip"><span className="line-inner">Built for</span></span>
        <span className="line-clip"><span className="line-inner">every level</span></span>
      </h2>
      <ul className="programs-list">
        <li><a className="program-row" href="#junior">
            <div className="program-row-inner">
              <span className="program-index">01</span>
              <div className="program-text">
                <div className="program-name">Junior Development</div>
                <div className="program-desc">Fundamentals, footwork, and match play for ages 6–14.</div>
              </div>
              <div className="program-arrow-wrap" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </div>
          </a></li>
        <li><a className="program-row" href="#performance">
            <div className="program-row-inner">
              <span className="program-index">02</span>
              <div className="program-text">
                <div className="program-name">Performance Squad</div>
                <div className="program-desc">High-volume training for competitive and ranked players.</div>
              </div>
              <div className="program-arrow-wrap" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </div>
          </a></li>
        <li><a className="program-row" href="#adult">
            <div className="program-row-inner">
              <span className="program-index">03</span>
              <div className="program-text">
                <div className="program-name">Adult Clinics</div>
                <div className="program-desc">Small-group sessions to sharpen technique and fitness.</div>
              </div>
              <div className="program-arrow-wrap" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </div>
          </a></li>
        <li><a className="program-row" href="#private">
            <div className="program-row-inner">
              <span className="program-index">04</span>
              <div className="program-text">
                <div className="program-name">Private Coaching</div>
                <div className="program-desc">One-to-one sessions tailored to your goals and schedule.</div>
              </div>
              <div className="program-arrow-wrap" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </div>
          </a></li>
      </ul>
    </section>

    {/*  ===== FACILITIES =====  */}
    <section id="facilities">
      <div className="facilities-grid">
        <div className="facilities-intro">
          <img className="facilities-icon" id="facilities-icon"
            src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/3.webp"
            alt="Player stretching for a forehand on clay" loading="lazy" />
          <h2 id="facilities-title">
            <span className="line-clip"><span className="line-inner">Tour Our</span></span>
            <span className="line-clip"><span className="line-inner">World-Class</span></span>
            <span className="line-clip"><span className="line-inner">Courts</span></span>
          </h2>
          <p className="facilities-body" id="facilities-body">Reserve a court for focused practice, squad drills, or private
            sessions — and train in the same conditions you'll compete in.</p>
        </div>
        <div className="court-cards">
          <figure className="court-card" id="court-card-0">
            <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/1.webp"
              alt="Player on the baseline of an outdoor clay court" loading="lazy" />
            <figcaption className="court-caption clay">
              <div className="court-name">Redline Clay</div>
              <div className="court-desc">A fast outdoor clay court tuned for long, physical rallies.</div>
            </figcaption>
          </figure>
          <figure className="court-card" id="court-card-1">
            <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/4.webp"
              alt="Player following through on a blue hard court" loading="lazy" />
            <figcaption className="court-caption blue">
              <div className="court-name">Harbor Court</div>
              <div className="court-desc">A sheltered hard court built for precision and night play.</div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    {/*  ===== STATS =====  */}
    <section id="stats">
      <div className="eyebrow eyebrow-light">
        <span className="eyebrow-dot"></span>
        By the numbers
      </div>
      <h2 id="stats-title">
        <span className="line-clip"><span className="line-inner">A club that</span></span>
        <span className="line-clip"><span className="line-inner">keeps score</span></span>
      </h2>
      <dl className="stats-grid">
        <div className="stat-cell" id="stat-0">
          <dd>
            <div className="stat-value">24</div>
          <dt className="stat-label">Certified coaches</dt>
          </dd>
        </div>
        <div className="stat-cell" id="stat-1">
          <dd>
            <div className="stat-value">12</div>
          <dt className="stat-label">Championship courts</dt>
          </dd>
        </div>
        <div className="stat-cell" id="stat-2">
          <dd>
            <div className="stat-value">9K+</div>
          <dt className="stat-label">Members training</dt>
          </dd>
        </div>
        <div className="stat-cell" id="stat-3">
          <dd>
            <div className="stat-value">15</div>
          <dt className="stat-label">Years on the baseline</dt>
          </dd>
        </div>
      </dl>
    </section>

    {/*  ===== TESTIMONIALS =====  */}
    <section id="testimonials">
      <div className="eyebrow eyebrow-dark">
        <span className="eyebrow-dot"></span>
        What players say
      </div>
      <h2 id="testimonials-title">
        <span className="line-clip"><span className="line-inner">Loved by</span></span>
        <span className="line-clip"><span className="line-inner">the locker room</span></span>
      </h2>
      <ul className="testimonials-grid">
        <li>
          <article className="testimonial-card" id="test-0">
            <div>
              <div className="testimonial-quote-mark">"</div>
              <blockquote className="testimonial-quote">I added a level to my serve in one season. The coaching is detailed
                and it actually sticks.</blockquote>
            </div>
            <figcaption className="testimonial-author">
              <div className="testimonial-name">Priya Anand</div>
              <div className="testimonial-role">Performance Squad</div>
            </figcaption>
          </article>
        </li>
        <li>
          <article className="testimonial-card" id="test-1">
            <div>
              <div className="testimonial-quote-mark">"</div>
              <blockquote className="testimonial-quote">Best courts in the city and a team that treats every member like a
                competitor.</blockquote>
            </div>
            <figcaption className="testimonial-author">
              <div className="testimonial-name">Lukas Brenner</div>
              <div className="testimonial-role">Adult Clinics</div>
            </figcaption>
          </article>
        </li>
        <li>
          <article className="testimonial-card" id="test-2">
            <div>
              <div className="testimonial-quote-mark">"</div>
              <blockquote className="testimonial-quote">My daughter went from shy beginner to club champion. Worth every
                minute.</blockquote>
            </div>
            <figcaption className="testimonial-author">
              <div className="testimonial-name">Dana Okafor</div>
              <div className="testimonial-role">Parent, Junior Development</div>
            </figcaption>
          </article>
        </li>
      </ul>
    </section>

    {/*  ===== FOOTER =====  */}
    <footer id="contact">
      <div className="footer-cta">
        <div className="footer-cta-text">
          <div className="eyebrow eyebrow-light">
            <span className="eyebrow-dot"></span>
            Get started
          </div>
          <p className="footer-cta-headline">
            <span className="line-clip"><span className="line-inner">Ready to</span></span>
            <span className="line-clip"><span className="line-inner">play?</span></span>
          </p>
        </div>
        <button className="pill-btn pill-btn-light" id="footer-book-btn" style={{ opacity: '0', transform: 'translateY(1.25rem)' }}>
          Book a Visit
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="footer-cols">
        <div className="footer-brand-col">
          <div className="footer-brand-name">
            <svg className="tennis-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M4.8 5.6A9 9 0 0 0 4.8 18.4" />
              <path d="M19.2 5.6a9 9 0 0 1 0 12.8" />
            </svg>
            Baseline
          </div>
          <p className="footer-blurb">A members' tennis club and academy where focused coaching meets championship courts.
          </p>
          <address className="footer-address">
            <a href="mailto:play@baseline.club">play@baseline.club</a>
            <a href="tel:+12125550148">+1 (212) 555-0148</a>
            <span className="footer-address-muted">120 Court Lane, New York</span>
          </address>
        </div>
        <nav className="footer-nav-col" aria-label="Programs">
          <div className="footer-nav-heading">Programs</div>
          <ul className="footer-nav-list">
            <li><a href="#junior">Junior Development</a></li>
            <li><a href="#performance">Performance Squad</a></li>
            <li><a href="#adult">Adult Clinics</a></li>
            <li><a href="#private">Private Coaching</a></li>
          </ul>
        </nav>
        <nav className="footer-nav-col" aria-label="Club">
          <div className="footer-nav-heading">Club</div>
          <ul className="footer-nav-list">
            <li><a href="#membership">Membership</a></li>
            <li><a href="#facilities">Facilities</a></li>
            <li><a href="#club">Events</a></li>
            <li><a href="#shop">Pro Shop</a></li>
          </ul>
        </nav>
        <nav className="footer-nav-col" aria-label="Company">
          <div className="footer-nav-heading">Company</div>
          <ul className="footer-nav-list">
            <li><a href="#about">About</a></li>
            <li><a href="#programs">Coaches</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Baseline Tennis Club. All rights reserved.</span>
        <nav className="footer-social" aria-label="Social media">
          <a href="#instagram">Instagram</a>
          <a href="#x">X</a>
          <a href="#youtube">YouTube</a>
          <a href="#linkedin">LinkedIn</a>
        </nav>
        <nav className="footer-legal" aria-label="Legal">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </nav>
      </div>
    </footer>

  </main>

    </>
  );
}
