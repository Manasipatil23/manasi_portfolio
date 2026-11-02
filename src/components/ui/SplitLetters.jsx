import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*<>/';

// Builds a paused timeline for one style. `chars` are the per-letter spans.
const VARIANTS = {
  // Letters flip upright from below, left to right
  rise: (tl, chars) =>
    tl.fromTo(chars,
      { opacity: 0, yPercent: 60, rotateX: -70 },
      { opacity: 1, yPercent: 0, rotateX: 0, duration: 0.55, ease: 'power3.out', stagger: 0.022 }),

  // Letters slide in from the left with a slant
  slide: (tl, chars) =>
    tl.fromTo(chars,
      { opacity: 0, x: -28, skewX: -18 },
      { opacity: 1, x: 0, skewX: 0, duration: 0.5, ease: 'power3.out', stagger: 0.025 }),

  // Letters drop from above with a bounce, spreading out from the centre
  wave: (tl, chars) =>
    tl.fromTo(chars,
      { opacity: 0, yPercent: -120 },
      { opacity: 1, yPercent: 0, duration: 0.7, ease: 'bounce.out', stagger: { each: 0.035, from: 'center' } }),

  // Letters come into focus from a blur, in random order
  blur: (tl, chars) =>
    tl.fromTo(chars,
      { opacity: 0, scale: 1.6, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out', stagger: { each: 0.03, from: 'random' } }),

  // Letters appear one at a time behind a blinking cursor
  typewriter: (tl, chars) =>
    tl.fromTo(chars,
      { opacity: 0 },
      { opacity: 1, duration: 0.01, stagger: 0.035, ease: 'none' }),

  // Random characters "decode" into the real letters, left to right
  scramble: (tl, chars) => {
    const finals = chars.map((c) => c.dataset.char);
    const state = { p: 0 };
    return tl.fromTo(state, { p: 0 }, {
      p: 1,
      duration: 1.1,
      ease: 'none',
      onUpdate: () => {
        chars.forEach((c, i) => {
          if (finals[i] === ' ') return;
          const settleAt = 0.25 + (i / chars.length) * 0.7;
          c.textContent = state.p >= settleAt
            ? finals[i]
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          c.style.opacity = state.p >= settleAt ? '1' : '0.55';
        });
      },
    });
  },
};

// Text whose letters animate in every time it scrolls into view (down or back up).
// Screen readers get the plain text; the per-letter spans are hidden from them.
export default function SplitLetters({ text, as: Tag = 'span', className = '', variant = 'rise' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const chars = [...el.querySelectorAll('.split-char')];

    // Lock each letter's width so scrambled glyphs don't make the line jitter
    if (variant === 'scramble') {
      chars.forEach((c) => {
        c.style.width = `${c.getBoundingClientRect().width}px`;
        c.style.textAlign = 'center';
      });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      VARIANTS[variant](tl, chars);

      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        end: 'bottom 8%',
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart(),
        // Hide again once fully off screen so the next entry starts from scratch
        onLeave: () => tl.pause(0),
        onLeaveBack: () => tl.pause(0),
      });
    }, el);

    return () => {
      ctx.revert();
      chars.forEach((c) => { c.textContent = c.dataset.char; c.style.opacity = ''; });
    };
  }, [text, variant]);

  // Words stay unbroken so lines only wrap between words
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className} aria-label={text} style={{ perspective: '600px' }}>
      {words.map((word, w) => (
        <React.Fragment key={w}>
          <span className="inline-block whitespace-nowrap" aria-hidden="true">
            {[...word].map((ch, i) => (
              <span key={i} data-char={ch} className="split-char inline-block will-change-transform" style={{ transformOrigin: '50% 100%' }}>
                {ch}
              </span>
            ))}
          </span>
          {w < words.length - 1 && ' '}
        </React.Fragment>
      ))}
      {variant === 'typewriter' && <span className="typewriter-caret" aria-hidden="true" />}
    </Tag>
  );
}
