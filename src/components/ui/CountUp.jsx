import React, { useEffect, useRef, useState } from 'react';

// A number that races up from 0 every time it scrolls into view (down or back up).
// Screen readers and no-motion users get the final value straight away.
export default function CountUp({ value, decimals = 2, duration = 1200, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setShown(0);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
      else setVisible(false);
    }, { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) { setShown(0); return; }
    let frame;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setShown(value * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [visible, value, duration]);

  const final = value.toFixed(decimals);
  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={final}>
      <span aria-hidden="true">{shown.toFixed(decimals)}</span>
    </span>
  );
}
