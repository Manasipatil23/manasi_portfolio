import React, { useEffect, useRef, useState } from 'react';

const METRICS = [
  { key: 'accuracy', label: 'Accuracy' },
  { key: 'precision', label: 'Precision' },
  { key: 'recall', label: 'Recall' },
  { key: 'f1', label: 'F1' },
];

const COUNT_MS = 1000;

// Bars grow and numbers count up every time the board scrolls into view, and again when the metric changes
export default function ModelScoreboard({ models }) {
  const [metric, setMetric] = useState('accuracy');
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0); // 0 → 1 progress of the count-up
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= 0.3) setVisible(true);
      // Reset only once fully off screen, so the next visit replays from zero
      else if (!entry.isIntersecting) setVisible(false);
    }, { threshold: [0, 0.3] });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) {
      setCount(0);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(1);
      return;
    }
    let raf;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      setCount(1 - Math.pow(1 - t, 3)); // ease-out
      if (t < 1) raf = requestAnimationFrame(step);
    };
    setCount(0);
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, metric]);

  const sorted = [...models].sort((a, b) => (b[metric] ?? -1) - (a[metric] ?? -1));
  // Scale from 0.7 so the differences between models are visible
  const floor = 0.7;
  const width = (v) => `${Math.max(0, (v - floor) / (1 - floor)) * 100}%`;

  return (
    <div ref={ref} className="card-editorial p-5 sm:p-6 h-full flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h3 className="font-headline font-bold text-lg text-[#174B79]">Model scoreboard</h3>
        <div role="group" aria-label="Metric" className="inline-flex p-1 rounded-full bg-[#F5F0E8] border border-[#D9C9B7]">
          {METRICS.map((m) => (
            <button
              key={m.key}
              type="button"
              aria-pressed={metric === m.key}
              onClick={() => setMetric(m.key)}
              className={`px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#E9784F] ${
                metric === m.key ? 'bg-[#174B79] text-[#F5F0E8]' : 'text-[#174B79]/80 hover:text-[#174B79]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <ol className="space-y-3.5 flex-1">
        {sorted.map((m, idx) => {
          const value = m[metric];
          const approx = m.approx?.includes(metric);
          return (
            <li key={m.name} className="transition-all duration-500">
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <span className="font-body text-sm font-semibold text-[#174B79]">
                  {m.name}
                  <span className="font-normal text-[#174B79]/80"> · {m.kind}</span>
                </span>
                <span className="font-mono text-sm font-bold text-[#174B79] tabular-nums">
                  {value == null ? '—' : `${approx ? '≈' : ''}${(Math.round(value * count * 1000) / 10).toFixed(value * 1000 % 10 ? 1 : 0)}%`}
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-[#F5F0E8] border border-[#D9C9B7] overflow-hidden">
                <div
                  className={`h-full rounded-full ${idx === 0 && value != null ? 'bg-[#E9784F]' : 'bg-[#174B79]'}`}
                  style={{
                    width: visible && value != null ? width(value) : '0%',
                    // Snap back to empty while off screen; grow smoothly when shown
                    transition: visible ? 'width 0.9s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
                    transitionDelay: `${idx * 70}ms`,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-4 font-body text-xs text-[#174B79]/80 leading-relaxed">
        Bars start at 70%. DeepLabV3+ is scored per pixel (23.1M test pixels); the others classify 64×64 patches, and the hybrid
        model was tested on 200 patches, so the setups differ. ≈ marks values given as approximate on the slides.
      </p>
    </div>
  );
}
