import { useEffect } from 'react';
import Lenis from 'lenis';

export function useBaselineLogic() {
  useEffect(() => {
    // ===== ADAPTIVE REM SCALE-UP =====
    function scaleFont() {
      const FONT_BASE = 16, BASE_W = 1920, COEF = 0.6666;
      const html = document.documentElement;
      function update() {
        if (window.innerWidth > BASE_W) {
          const reduction = ((BASE_W - window.innerWidth) / BASE_W) * 100 * COEF;
          const size = FONT_BASE - (FONT_BASE * reduction) / 100;
          if (size > FONT_BASE) html.style.fontSize = size + "px";
          else html.style.removeProperty("font-size");
        } else {
          html.style.removeProperty("font-size");
        }
      }
      update();
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }
    const cleanupFont = scaleFont();

    window.scrollTo(0, 0);

    // ===== LENIS SETUP =====
    const lenis = new Lenis({ smoothWheel: true });
    let rafId;
    function raf(t) {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    function lockScroll() {
      lenis.stop();
      document.body.classList.add('scroll-locked');
    }
    function unlockScroll() {
      lenis.start();
      document.body.classList.remove('scroll-locked');
    }

    // ===== REDUCED MOTION =====
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ===== EASINGS =====
    function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
    function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
    function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

    // ===== TWEEN =====
    function tween(from, to, duration, easing, onUpdate, onComplete) {
      if (prefersReduced) { onUpdate(to); if (onComplete) onComplete(); return; }
      const start = performance.now();
      function step(now) {
        const t = Math.min((now - start) / duration, 1);
        onUpdate(from + (to - from) * easing(t));
        if (t < 1) requestAnimationFrame(step);
        else if (onComplete) onComplete();
      }
      requestAnimationFrame(step);
    }

    // ===== SPRING HELPER =====
    class Spring {
      constructor(tension, friction, initial = 0) {
        this.tension = tension;
        this.friction = friction;
        this.x = initial;
        this.v = 0;
        this.target = initial;
        this._raf = null;
        this._cb = null;
      }
      to(target, cb) {
        this.target = target;
        if (cb) this._cb = cb;
        if (!this._raf) this._step = this._step.bind(this);
        if (this._raf) cancelAnimationFrame(this._raf);
        this._last = performance.now();
        this._raf = requestAnimationFrame(this._step);
      }
      _step(now) {
        const dt = Math.min((now - this._last) / 1000, 0.064);
        this._last = now;
        const { tension, friction, target } = this;
        this.v += (-tension * (this.x - target) - friction * this.v) * dt;
        this.x += this.v * dt;
        if (this._cb) this._cb(this.x);
        const settled = Math.abs(this.x - target) < 0.001 && Math.abs(this.v) < 0.001;
        if (!settled) this._raf = requestAnimationFrame(this._step);
        else {
          this.x = target;
          if (this._cb) this._cb(this.x);
          this._raf = null;
        }
      }
    }

    // ===== CLIP MASK WORD REVEAL =====
    function revealWords(innerEls, { stagger = 140, duration = 1100, easing = easeOutExpo, baseDelay = 0 } = {}) {
      innerEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(115%)';
        const delay = baseDelay + i * stagger;
        setTimeout(() => {
          tween(0, 1, duration, easing, () => {
            el.style.transform = `translateY(${115 - 115 * easing(1)}%)`;
            el.style.opacity = '1';
          });
        }, delay);
      });
    }

    // ===== CLIP MASK LINE REVEAL =====
    function revealLines(innerEls, { stagger = 120, duration = 950, easing = easeOutExpo, baseDelay = 0 } = {}) {
      innerEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(115%)';
        const delay = baseDelay + i * stagger;
        setTimeout(() => {
          const startTime = performance.now();
          function step(now) {
            const t = Math.min((now - startTime) / duration, 1);
            const e = easing(t);
            el.style.transform = `translateY(${115 - 115 * e}%)`;
            el.style.opacity = String(Math.min(e * 2, 1));
            if (t < 1) requestAnimationFrame(step);
            else { el.style.transform = 'translateY(0)'; el.style.opacity = '1'; }
          }
          if (prefersReduced) { el.style.transform = 'translateY(0)'; el.style.opacity = '1'; }
          else requestAnimationFrame(step);
        }, delay);
      });
    }

    // ===== INVIEW OBSERVER =====
    const inviewObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delayIn = parseFloat(el.dataset.delayIn || 0);
          const fromY = parseFloat(el.dataset.fromY || 0);
          const fromScale = parseFloat(el.dataset.fromScale || 1);
          const tension = parseFloat(el.dataset.tension || 200);
          const friction = parseFloat(el.dataset.friction || 26);
          const onReveal = el._onReveal;
          inviewObserver.unobserve(el);
          setTimeout(() => {
            if (onReveal) { onReveal(el); return; }
            animateInview(el, { fromY, fromScale, tension, friction });
          }, delayIn);
        }
      });
    }, { threshold: 0.1 });

    function animateInview(el, { fromY = 28, fromScale = 1, tension = 200, friction = 26 } = {}) {
      if (prefersReduced) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        return;
      }
      const sp = new Spring(tension, friction, fromY);
      const spScale = fromScale !== 1 ? new Spring(tension, friction, fromScale) : null;
      sp.to(0, y => {
        const sc = spScale ? spScale.x : 1;
        el.style.opacity = String(Math.min(1, 1 - Math.abs(y) / (Math.abs(fromY) + 1)));
        el.style.transform = `translateY(${y}px) scale(${sc})`;
      });
      if (spScale) spScale.to(1);
    }

    function registerInview(el, opts = {}) {
      if (!el) return;
      el.style.opacity = '0';
      el.dataset.fromY = opts.fromY || 28;
      el.dataset.fromScale = opts.fromScale || 1;
      el.dataset.tension = opts.tension || 200;
      el.dataset.friction = opts.friction || 26;
      el.dataset.delayIn = opts.delayIn || 0;
      if (opts.onReveal) el._onReveal = opts.onReveal;
      inviewObserver.observe(el);
    }

    // ===== HOVER SPRING (desktop only) =====
    function hoverSpring(el, { fromX = 0, toX = 0, fromY = 0, toY = 0, fromScale = 1, toScale = 1, fromOpacity = 1, toOpacity = 1, tension = 300, friction = 22, target }) {
      if (!el || window.innerWidth <= 768) return;
      const applyEl = target || el;
      const spX = new Spring(tension, friction, fromX);
      const spY = new Spring(tension, friction, fromY);
      const spS = new Spring(tension, friction, fromScale);
      const spO = new Spring(tension, friction, fromOpacity);
      function apply() {
        applyEl.style.transform = `translateX(${spX.x}px) translateY(${spY.x}px) scale(${spS.x})`;
        applyEl.style.opacity = spO.x;
      }
      const enter = () => {
        spX.to(toX, apply); spY.to(toY, apply); spS.to(toScale, apply); spO.to(toOpacity, apply);
      };
      const leave = () => {
        spX.to(fromX, apply); spY.to(fromY, apply); spS.to(fromScale, apply); spO.to(fromOpacity, apply);
      };
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    }

    // ===== LOADER =====
    const loader = document.getElementById('loader');
    const loaderWordmark = document.getElementById('loader-wordmark');
    const loaderFill = document.getElementById('loader-fill');
    const MIN_VISIBLE = prefersReduced ? 200 : 1400;
    const MAX_VISIBLE = 2600;
    const EXIT_MS = prefersReduced ? 1 : 850;

    lockScroll();

    if (loaderWordmark) {
      setTimeout(() => {
        const sp = new Spring(200, 22, 16);
        loaderWordmark.style.opacity = '0';
        loaderWordmark.style.transform = 'translateY(1rem)';
        sp.to(0, y => {
          loaderWordmark.style.transform = `translateY(${y}px)`;
          loaderWordmark.style.opacity = String(Math.max(0, Math.min(1, 1 - Math.abs(y) / 16)));
        });
        loaderWordmark.style.opacity = '0.01';
      }, 50);
    }

    if (loaderFill) {
      setTimeout(() => {
        if (prefersReduced) { loaderFill.style.transform = 'scaleX(1)'; return; }
        const fillDuration = MIN_VISIBLE - 120;
        tween(0, 1, fillDuration, easeInOutCubic, v => {
          loaderFill.style.transform = `scaleX(${v})`;
        });
      }, 120);
    }

    let loaderReady = false;

    function triggerLoaderExit() {
      if (loaderReady) return;
      loaderReady = true;
      unlockScroll();
      onLoaderReady();
      if (!loader) return;
      if (prefersReduced) {
        loader.style.display = 'none';
        return;
      }
      tween(0, -105, EXIT_MS, easeInOutCubic, v => {
        loader.style.transform = `translateY(${v}%)`;
      }, () => {
        loader.style.display = 'none';
      });
    }

    const minTimer = setTimeout(triggerLoaderExit, MIN_VISIBLE);
    const maxTimer = setTimeout(triggerLoaderExit, MAX_VISIBLE);

    // ===== HERO REVEAL (gated on loader) =====
    function onLoaderReady() {
      // Title words
      const titleInners = document.querySelectorAll('#hero-title .word-inner');
      revealWords([...titleInners], { stagger: 140, duration: 1100, easing: easeOutExpo, baseDelay: 0 });

      // Tagline lines
      const taglineInners = document.querySelectorAll('.hero-tagline .line-inner');
      revealLines([...taglineInners], { stagger: 110, duration: 900, easing: easeOutExpo, baseDelay: 350 });

      // Collection slider inview
      const slider = document.getElementById('collection-slider');
      if (slider) {
        setTimeout(() => {
          if (prefersReduced) { slider.style.opacity = '1'; slider.style.transform = 'none'; return; }
          const sp = new Spring(200, 26, 28);
          sp.to(0, y => {
            slider.style.opacity = String(Math.max(0, 1 - Math.abs(y) / 28));
            slider.style.transform = `translateY(${y}px)`;
          });
        }, 650);
      }

      // Membership card inview
      const mCard = document.getElementById('membership-card');
      if (mCard) {
        setTimeout(() => {
          if (prefersReduced) { mCard.style.opacity = '1'; mCard.style.transform = 'none'; return; }
          const sp = new Spring(200, 26, 28);
          sp.to(0, y => {
            mCard.style.opacity = String(Math.max(0, 1 - Math.abs(y) / 28));
            mCard.style.transform = `translateY(${y}px)`;
          });
        }, 780);
      }
    }

    // ===== HERO PARALLAX =====
    const heroParallax = document.getElementById('hero-parallax');
    const heroSection = document.getElementById('hero');
    lenis.on('scroll', () => {
      if (!heroSection || !heroParallax) return;
      const rect = heroSection.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = Math.max(0, Math.min(1, 1 - rect.bottom / (rect.height + vh)));
      heroParallax.style.transform = `translateY(${progress * 12}%)`;
    });

    // ===== COLLECTION SLIDER =====
    const collectionSlides = [
      { img: 'https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/2.webp', brand: 'Baseline Pro', title: 'Featured Gear', cta: 'Shop the kit', alt: 'Player driving a backhand on a hard court' },
      { img: 'https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/3.webp', brand: 'Court Series', title: 'Summer Drop', cta: 'View the line', alt: 'Player stretching for a forehand on clay' },
      { img: 'https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/5.webp', brand: 'Academy Kit', title: 'Junior Range', cta: 'Browse juniors', alt: 'Player set in a ready stance on clay' },
    ];
    let collectionIdx = 0;
    let collectionTimer = null;

    function updateCollectionDots(idx) {
      const dots = document.querySelectorAll('#collection-dots .dot-btn');
      dots.forEach((d, i) => d.setAttribute('aria-current', i === idx ? 'true' : 'false'));
    }

    function goToCollection(idx, animate = true) {
      collectionIdx = (idx + collectionSlides.length) % collectionSlides.length;
      const slide = collectionSlides[collectionIdx];
      const card = document.getElementById('collection-card');
      const img = document.getElementById('collection-card-img');
      const brand = document.getElementById('collection-brand');
      const title = document.getElementById('collection-title');
      const cta = document.getElementById('collection-cta');
      if (!card || !img || !brand || !title || !cta) return;
      if (!animate || prefersReduced) {
        img.src = slide.img; img.alt = slide.alt;
        brand.textContent = slide.brand;
        title.textContent = slide.title;
        cta.textContent = slide.cta + ' →';
        updateCollectionDots(collectionIdx);
        return;
      }
      const spOut = new Spring(210, 24, 1);
      spOut.to(0, v => {
        card.style.opacity = v;
        card.style.transform = `translateY(${(1 - v) * 16}px) scale(${0.96 + v * 0.04})`;
      });
      setTimeout(() => {
        img.src = slide.img; img.alt = slide.alt;
        brand.textContent = slide.brand;
        title.textContent = slide.title;
        cta.textContent = slide.cta + ' →';
        updateCollectionDots(collectionIdx);
        const spIn = new Spring(210, 24, 0);
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px) scale(0.96)';
        spIn.to(1, v => {
          card.style.opacity = v;
          card.style.transform = `translateY(${(1 - v) * 16}px) scale(${0.96 + v * 0.04})`;
        });
      }, 250);
    }

    function startCollectionAutoplay() {
      clearInterval(collectionTimer);
      collectionTimer = setInterval(() => {
        goToCollection(collectionIdx + 1);
      }, 3800);
    }

    document.querySelectorAll('#collection-dots .dot-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => { goToCollection(i); startCollectionAutoplay(); });
    });

    // ===== TRUST CAROUSEL =====
    const trustSlides = [
      { words: ['Expert', 'Result-', 'Driven', 'Coaching'], img: 'https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/5.webp', name: 'Marco Vidal', role: 'Head Coach', alt: 'Head coach set in a ready stance on clay' },
      { words: ['Sharper', 'Faster', 'Stronger', 'Player'], img: 'https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/4.webp', name: 'Elena Sokolova', role: 'Performance Coach', alt: 'Performance coach following through on a serve' },
      { words: ['Future', 'Champions', 'Start', 'Here'], img: 'https://api.getlayers.ai/storage/v1/object/public/public/assets/baseline-88535e4000/1.webp', name: 'James Okoro', role: 'Juniors Lead', alt: 'Juniors lead waiting to return on clay' },
    ];
    let trustIdx = 0;
    const ghostWordEls = [
      document.getElementById('ghost-w0'),
      document.getElementById('ghost-w1'),
      document.getElementById('ghost-w2'),
      document.getElementById('ghost-w3'),
    ];

    function revealGhostWords() {
      ghostWordEls.forEach(el => {
        if (!el) return;
        const inner = el.querySelector('.word-inner');
        if (!inner) return;
        inner.style.transform = 'translateY(115%)';
        inner.style.opacity = '0';
        setTimeout(() => {
          revealLines([inner], { duration: 700, easing: easeOutExpo, baseDelay: 0 });
        }, 50);
      });
    }

    function updateTrustDots(idx) {
      const dots = document.querySelectorAll('#trust-dots .dot-btn');
      dots.forEach((d, i) => d.setAttribute('aria-current', i === idx ? 'true' : 'false'));
    }

    function goToTrust(idx) {
      trustIdx = (idx + trustSlides.length) % trustSlides.length;
      const slide = trustSlides[trustIdx];
      const words = slide.words;
      ghostWordEls.forEach((el, i) => {
        if (!el) return;
        const inner = el.querySelector('.word-inner');
        if (inner) inner.textContent = words[i];
      });
      revealGhostWords();
      const photo = document.getElementById('coach-photo');
      const nameEl = document.getElementById('coach-name');
      const roleEl = document.getElementById('coach-role');
      if (!photo || !nameEl || !roleEl) return;
      if (prefersReduced) {
        photo.src = slide.img; photo.alt = slide.alt;
        nameEl.textContent = slide.name; roleEl.textContent = slide.role;
        updateTrustDots(trustIdx);
        return;
      }
      const spO = new Spring(260, 26, 1);
      spO.to(0, v => { photo.style.opacity = v; });
      setTimeout(() => {
        photo.src = slide.img; photo.alt = slide.alt;
        nameEl.textContent = slide.name; roleEl.textContent = slide.role;
        updateTrustDots(trustIdx);
        const spIn = new Spring(260, 26, 0);
        photo.style.opacity = '0';
        spIn.to(1, v => { photo.style.opacity = v; });
      }, 200);
    }

    const trustPrev = document.getElementById('trust-prev');
    const trustNext = document.getElementById('trust-next');
    if (trustPrev) trustPrev.addEventListener('click', () => goToTrust(trustIdx - 1));
    if (trustNext) trustNext.addEventListener('click', () => goToTrust(trustIdx + 1));
    document.querySelectorAll('#trust-dots .dot-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => goToTrust(i));
    });

    if (trustPrev) hoverSpring(trustPrev, { target: trustPrev.querySelector('svg'), fromScale: 1, toScale: 1.15, tension: 320, friction: 18 });
    if (trustNext) hoverSpring(trustNext, { target: trustNext.querySelector('svg'), fromScale: 1, toScale: 1.15, tension: 320, friction: 18 });

    // ===== INVIEW REGISTRATIONS =====
    registerInview(document.getElementById('pct-badge'), { fromY: 0, fromScale: 0.9, tension: 220, friction: 22 });
    registerInview(document.getElementById('trust-badge-card'), { fromY: 24, tension: 200, friction: 26, delayIn: 120 });

    const coachCardEl = document.getElementById('coach-card');
    if (coachCardEl) {
      coachCardEl.style.opacity = '0';
      coachCardEl.style.transform = 'translateY(3.75rem) scale(0.92)';
      registerInview(coachCardEl, {
        fromY: 60, fromScale: 0.92, tension: 170, friction: 26,
        onReveal: (el) => {
          if (prefersReduced) { el.style.opacity = '1'; el.style.transform = 'rotate(6deg)'; return; }
          const spY = new Spring(170, 26, 60);
          const spS = new Spring(170, 26, 0.92);
          const spO = new Spring(170, 26, 0);
          function apply() {
            el.style.opacity = String(spO.x);
            el.style.transform = `translateY(${spY.x}px) scale(${spS.x}) rotate(6deg)`;
          }
          spY.to(0, apply);
          spS.to(1, apply);
          spO.to(1, apply);
        }
      });
    }

    document.querySelectorAll('.program-row-inner').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(1.625rem)';
      registerInview(el, { fromY: 26, tension: 190, friction: 26, delayIn: i * 90 });
    });

    const progTitle = document.getElementById('programs-title');
    if (progTitle) {
      const lines = progTitle.querySelectorAll('.line-inner');
      progTitle.style.opacity = '0';
      registerInview(progTitle, {
        onReveal: () => {
          progTitle.style.opacity = '1';
          revealLines([...lines], { stagger: 120, duration: 950, easing: easeOutExpo });
        }
      });
    }

    const facIcon = document.getElementById('facilities-icon');
    if (facIcon) {
      facIcon.style.opacity = '0';
      facIcon.style.transform = 'scale(0.85)';
      registerInview(facIcon, { fromY: 0, fromScale: 0.85, tension: 240, friction: 20 });
    }

    const facTitle = document.getElementById('facilities-title');
    if (facTitle) {
      const lines = facTitle.querySelectorAll('.line-inner');
      facTitle.style.opacity = '0';
      registerInview(facTitle, {
        onReveal: () => {
          facTitle.style.opacity = '1';
          revealLines([...lines], { stagger: 120, duration: 950, easing: easeOutExpo });
        }
      });
    }

    const bodyEl = document.getElementById('facilities-body');
    if (bodyEl) {
      const text = bodyEl.textContent;
      const words = text.trim().split(/\s+/);
      bodyEl.innerHTML = words.map(w => `<span class="word-span" style="opacity:0;transform:translateY(1.125rem);display:inline-block;margin-right:0.25em">${w}</span>`).join('');
      const spans = bodyEl.querySelectorAll('.word-span');
      registerInview(bodyEl, {
        delayIn: 250,
        onReveal: () => {
          if (prefersReduced) { spans.forEach(s => { s.style.opacity = '1'; s.style.transform = 'none'; }); return; }
          spans.forEach((s, i) => {
            setTimeout(() => {
              tween(0, 1, 700, easeOutQuart, t => {
                s.style.opacity = String(t);
                s.style.transform = `translateY(${1.125 * (1 - easeOutQuart(t))}rem)`;
              });
            }, i * 28);
          });
        }
      });
    }

    document.querySelectorAll('.court-card').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(3rem)';
      registerInview(el, { fromY: 48, tension: 180, friction: 26, delayIn: i * 140 });
      if (window.innerWidth > 768) {
        const img = el.querySelector('img');
        if (img) {
          const spScale = new Spring(300, 22, 1);
          el.addEventListener('mouseenter', () => { spScale.to(1.03, v => { img.style.transform = `scale(${v})`; }); });
          el.addEventListener('mouseleave', () => { spScale.to(1, v => { img.style.transform = `scale(${v})`; }); });
        }
      }
    });

    document.querySelectorAll('.stat-cell').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(1.875rem)';
      registerInview(el, { fromY: 30, tension: 180, friction: 24, delayIn: i * 110 });
    });

    const statTitle = document.getElementById('stats-title');
    if (statTitle) {
      const lines = statTitle.querySelectorAll('.line-inner');
      statTitle.style.opacity = '0';
      registerInview(statTitle, {
        onReveal: () => {
          statTitle.style.opacity = '1';
          revealLines([...lines], { stagger: 120, duration: 950, easing: easeOutExpo });
        }
      });
    }

    document.querySelectorAll('.testimonial-card').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(2.5rem)';
      registerInview(el, { fromY: 40, tension: 180, friction: 26, delayIn: i * 120 });
      if (window.innerWidth > 768) {
        const spY = new Spring(300, 22, 0);
        el.addEventListener('mouseenter', () => { spY.to(-8, v => { el.style.transform = `translateY(${v}px)`; }); });
        el.addEventListener('mouseleave', () => { spY.to(0, v => { el.style.transform = `translateY(${v}px)`; }); });
      }
    });

    const testTitle = document.getElementById('testimonials-title');
    if (testTitle) {
      const lines = testTitle.querySelectorAll('.line-inner');
      testTitle.style.opacity = '0';
      registerInview(testTitle, {
        onReveal: () => {
          testTitle.style.opacity = '1';
          revealLines([...lines], { stagger: 120, duration: 950, easing: easeOutExpo });
        }
      });
    }

    const fBookBtn = document.getElementById('footer-book-btn');
    if (fBookBtn) {
      registerInview(fBookBtn, {
        fromY: 20, tension: 200, friction: 24, delayIn: 150,
        onReveal: (el) => {
          if (prefersReduced) { el.style.opacity = '1'; el.style.transform = 'none'; return; }
          const sp = new Spring(200, 24, 20);
          sp.to(0, y => {
            el.style.opacity = String(Math.max(0, 1 - Math.abs(y) / 20));
            el.style.transform = `translateY(${y}px)`;
          });
        }
      });
    }

    const fHeadline = document.querySelector('.footer-cta-headline');
    if (fHeadline) {
      const lines = fHeadline.querySelectorAll('.line-inner');
      fHeadline.style.opacity = '0';
      registerInview(fHeadline, {
        onReveal: () => {
          fHeadline.style.opacity = '1';
          revealLines([...lines], { stagger: 120, duration: 950, easing: easeOutExpo });
        }
      });
    }

    const trustSection = document.getElementById('trust');
    if (trustSection) {
      const ghostWords = [
        { el: document.getElementById('ghost-w0'), fromX: -3, toX: 3 },
        { el: document.getElementById('ghost-w1'), fromX: 3, toX: -3 },
        { el: document.getElementById('ghost-w2'), fromX: -2, toX: 4 },
        { el: document.getElementById('ghost-w3'), fromX: 4, toX: -3 },
      ];
      lenis.on('scroll', () => {
        const rect = trustSection.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 1 - (rect.bottom) / (rect.height + vh)));
        ghostWords.forEach(({ el, fromX, toX }) => {
          if (!el) return;
          const x = fromX + (toX - fromX) * progress;
          el.style.transform = `translateX(${x}%)`;
        });
      });
    }

    document.querySelectorAll('.program-row').forEach(row => {
      const arrow = row.querySelector('.program-arrow-wrap');
      if (!arrow || window.innerWidth <= 768) return;
      const spX = new Spring(300, 20, 0);
      const spO = new Spring(300, 20, 0.55);
      row.addEventListener('mouseenter', () => {
        spX.to(8, x => { arrow.style.transform = `translateX(${x}px)`; });
        spO.to(1, o => { arrow.style.opacity = String(o); });
      });
      row.addEventListener('mouseleave', () => {
        spX.to(0, x => { arrow.style.transform = `translateX(${x}px)`; });
        spO.to(0.55, o => { arrow.style.opacity = String(o); });
      });
    });

    document.querySelectorAll('.pill-btn').forEach(btn => {
      const svg = btn.querySelector('svg');
      if (!svg || window.innerWidth <= 768) return;
      const sp = new Spring(320, 20, 0);
      btn.addEventListener('mouseenter', () => sp.to(5, x => { svg.style.transform = `translateX(${x}px)`; }));
      btn.addEventListener('mouseleave', () => sp.to(0, x => { svg.style.transform = `translateX(${x}px)`; }));
    });

    // ===== MODAL LOGIC =====
    let modalOpen = false;
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalPanel = document.getElementById('modal-panel');
    const modalForm = document.getElementById('modal-form');
    const modalSuccess = document.getElementById('modal-success');

    function openModal() {
      if (modalOpen || !modalOverlay || !modalBackdrop || !modalPanel) return;
      modalOpen = true;
      lockScroll();
      modalOverlay.style.pointerEvents = 'auto';
      modalOverlay.setAttribute('aria-hidden', 'false');
      modalBackdrop.style.opacity = '0';
      modalPanel.style.opacity = '0';
      modalPanel.style.transform = 'translateY(1.75rem) scale(0.96)';

      const bsp = new Spring(240, 30, 0);
      bsp.to(1, v => { modalBackdrop.style.opacity = String(v); });

      const pspY = new Spring(240, 26, 1.75);
      const pspS = new Spring(240, 26, 0.96);
      const pspO = new Spring(240, 26, 0);
      function applyPanel() {
        modalPanel.style.opacity = String(pspO.x);
        modalPanel.style.transform = `translateY(${pspY.x}rem) scale(${pspS.x})`;
      }
      pspY.to(0, applyPanel);
      pspS.to(1, applyPanel);
      pspO.to(1, applyPanel);

      setTimeout(() => {
        const lines = document.querySelectorAll('#modal-heading .line-inner');
        revealLines([...lines], { stagger: 90, duration: 800, easing: easeOutExpo });
        setTimeout(() => {
          const fn = document.getElementById('field-name');
          if (fn) fn.focus();
        }, 120);
      }, 200);
    }

    function closeModal() {
      if (!modalOpen || !modalOverlay || !modalBackdrop || !modalPanel) return;
      modalOpen = false;
      unlockScroll();
      const bsp = new Spring(240, 30, 1);
      bsp.to(0, v => { modalBackdrop.style.opacity = String(v); });
      const pspO = new Spring(240, 26, 1);
      const pspY = new Spring(240, 26, 0);
      function applyPanel() {
        modalPanel.style.opacity = String(pspO.x);
        modalPanel.style.transform = `translateY(${pspY.x}rem) scale(${1 - (1 - pspO.x) * 0.04})`;
      }
      pspO.to(0, applyPanel);
      pspY.to(1.75, applyPanel);
      setTimeout(() => {
        modalOverlay.style.pointerEvents = 'none';
        modalOverlay.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
          if (modalForm) {
            modalForm.reset();
            modalForm.style.display = '';
          }
          if (modalSuccess) modalSuccess.style.display = 'none';
          const subBtn = document.getElementById('form-submit-btn');
          if (subBtn) {
            subBtn.textContent = 'Request a visit';
            subBtn.disabled = false;
          }
          document.querySelectorAll('#modal-heading .line-inner').forEach(el => {
            el.style.transform = 'translateY(115%)';
            el.style.opacity = '0';
          });
        }, 350);
      }, 400);
    }

    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    const mCloseBtn = document.getElementById('modal-close-btn');
    if (mCloseBtn) mCloseBtn.addEventListener('click', closeModal);
    const hBookBtn = document.getElementById('header-book-btn');
    if (hBookBtn) hBookBtn.addEventListener('click', openModal);
    if (fBookBtn) fBookBtn.addEventListener('click', openModal);

    if (mCloseBtn) {
      const svg = mCloseBtn.querySelector('svg');
      if (svg) {
        const sp = new Spring(300, 18, 0);
        mCloseBtn.addEventListener('mouseenter', () => sp.to(90, v => { svg.style.transform = `rotate(${v}deg)`; }));
        mCloseBtn.addEventListener('mouseleave', () => sp.to(0, v => { svg.style.transform = `rotate(${v}deg)`; }));
      }
    }

    if (modalForm) {
      modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('form-submit-btn');
        if (submitBtn) {
          submitBtn.textContent = 'Sending…';
          submitBtn.disabled = true;
        }
        const nameVal = document.getElementById('field-name') ? document.getElementById('field-name').value.trim() : '';
        const firstName = nameVal.split(' ')[0] || 'there';
        setTimeout(() => {
          modalForm.style.display = 'none';
          const successMsg = document.getElementById('success-message');
          if (successMsg) successMsg.textContent = `Thanks, ${firstName} — our team will be in touch to lock in your visit.`;
          if (modalSuccess) modalSuccess.style.display = 'block';
        }, 900);
      });
    }
    const succBtn = document.getElementById('success-done-btn');
    if (succBtn) succBtn.addEventListener('click', closeModal);

    // ===== MENU LOGIC =====
    let menuOpen = false;
    const menuOverlay = document.getElementById('menu-overlay');
    const menuBackdrop = document.getElementById('menu-backdrop');
    const menuPanel = document.getElementById('menu-panel');
    const menuLinks = document.querySelectorAll('.menu-link');

    function openMenu() {
      if (menuOpen || !menuOverlay || !menuBackdrop || !menuPanel) return;
      menuOpen = true;
      lockScroll();
      menuOverlay.style.pointerEvents = 'auto';
      menuOverlay.setAttribute('aria-hidden', 'false');
      const bBtn = document.getElementById('burger-btn');
      if (bBtn) bBtn.setAttribute('aria-expanded', 'true');

      menuBackdrop.style.opacity = '0';
      menuPanel.style.opacity = '0';
      menuPanel.style.transform = 'translateY(-1.5rem)';

      const bsp = new Spring(260, 30, 0);
      bsp.to(1, v => { menuBackdrop.style.opacity = String(v); });

      const pspY = new Spring(220, 28, -1.5);
      const pspO = new Spring(220, 28, 0);
      function applyPanel() {
        menuPanel.style.opacity = String(pspO.x);
        menuPanel.style.transform = `translateY(${pspY.x}rem)`;
      }
      pspY.to(0, applyPanel);
      pspO.to(1, applyPanel);

      menuLinks.forEach((link, i) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(1.75rem)';
        const delay = 120 + i * 70;
        setTimeout(() => {
          const sp = new Spring(200, 26, 1.75);
          const spO = new Spring(200, 26, 0);
          sp.to(0, v => {
            link.style.transform = `translateY(${v}rem)`;
            link.style.opacity = String(spO.x);
          });
          spO.to(1);
        }, delay);
      });
    }

    function closeMenu() {
      if (!menuOpen || !menuOverlay || !menuBackdrop || !menuPanel) return;
      menuOpen = false;
      unlockScroll();
      const bBtn = document.getElementById('burger-btn');
      if (bBtn) bBtn.setAttribute('aria-expanded', 'false');
      const bsp = new Spring(260, 30, 1);
      bsp.to(0, v => { menuBackdrop.style.opacity = String(v); });
      const pspO = new Spring(220, 28, 1);
      pspO.to(0, v => {
        menuPanel.style.opacity = String(v);
        menuPanel.style.transform = `translateY(${-(1 - v) * 1.5}rem)`;
      });
      setTimeout(() => {
        menuOverlay.style.pointerEvents = 'none';
        menuOverlay.setAttribute('aria-hidden', 'true');
        menuLinks.forEach(l => { l.style.opacity = '0'; l.style.transform = 'translateY(1.75rem)'; });
      }, 350);
    }

    const burgerBtn = document.getElementById('burger-btn');
    if (burgerBtn) burgerBtn.addEventListener('click', openMenu);
    const menuCloseBtn = document.getElementById('menu-close-btn');
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
    if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);

    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        closeMenu();
        setTimeout(() => {
          const target = document.querySelector(href);
          if (target) lenis.scrollTo(target, { offset: -20 });
        }, 400);
      });
    });

    const mBookBtn = document.getElementById('menu-book-btn');
    if (mBookBtn) {
      mBookBtn.addEventListener('click', () => {
        closeMenu();
        setTimeout(openModal, 400);
      });
    }

    if (menuCloseBtn) {
      const svg = menuCloseBtn.querySelector('svg');
      if (svg) {
        const sp = new Spring(300, 18, 0);
        menuCloseBtn.addEventListener('mouseenter', () => sp.to(90, v => { svg.style.transform = `rotate(${v}deg)`; }));
        menuCloseBtn.addEventListener('mouseleave', () => sp.to(0, v => { svg.style.transform = `rotate(${v}deg)`; }));
      }
    }

    document.querySelectorAll('.header-nav a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        if (target) lenis.scrollTo(target, { offset: -20 });
      });
    });

    const keyListener = (e) => {
      if (e.key === 'Escape') {
        if (modalOpen) closeModal();
        else if (menuOpen) closeMenu();
      }
    };
    document.addEventListener('keydown', keyListener);

    const autoplayTimer = setTimeout(() => { startCollectionAutoplay(); }, 1500);
    const ghostTimer = setTimeout(revealGhostWords, 100);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      clearTimeout(autoplayTimer);
      clearTimeout(ghostTimer);
      clearInterval(collectionTimer);
      document.removeEventListener('keydown', keyListener);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
