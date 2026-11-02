import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Text whose letters rise in one after another when it scrolls into view.
// Screen readers get the plain text; the per-letter spans are hidden from them.
export default function SplitLetters({ text, as: Tag = 'span', className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.querySelectorAll('.split-char'),
        { opacity: 0, yPercent: 60, rotateX: -70 },
        {
          opacity: 1,
          yPercent: 0,
          rotateX: 0,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.022,
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [text]);

  // Words stay unbroken so lines only wrap between words
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className} aria-label={text} style={{ perspective: '600px' }}>
      {words.map((word, w) => (
        <React.Fragment key={w}>
          <span className="inline-block whitespace-nowrap" aria-hidden="true">
            {[...word].map((ch, i) => (
              <span key={i} className="split-char inline-block will-change-transform" style={{ transformOrigin: '50% 100%' }}>
                {ch}
              </span>
            ))}
          </span>
          {w < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </Tag>
  );
}
