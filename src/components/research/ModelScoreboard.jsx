import React, { useEffect, useRef, useState } from 'react';

const METRICS = [
  { key: 'accuracy', label: 'Accuracy' },
  { key: 'precision', label: 'Precision' },
  { key: 'recall', label: 'Recall' },
  { key: 'f1', label: 'F1' },
];

// Bars grow in when scrolled into view and re-animate when the metric changes
export default function ModelScoreboard({ models }) {
  const [metric, setMetric] = useState('accuracy');
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

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
                  {value == null ? '—' : `${approx ? '≈' : ''}${Math.round(value * 1000) / 10}%`}
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-[#F5F0E8] border border-[#D9C9B7] overflow-hidden">
                <div
                  className={`h-full rounded-full ${idx === 0 && value != null ? 'bg-[#E9784F]' : 'bg-[#174B79]'}`}
                  style={{
                    width: visible && value != null ? width(value) : '0%',
                    transition: 'width 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
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
