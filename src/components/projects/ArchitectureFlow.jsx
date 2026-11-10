import React, { useEffect, useRef } from 'react';

const STEP_MS = 900; // time for the dot to cross one connector

// Left-to-right data flow for a case study (swipes sideways on small screens).
// One dot relays along the connectors: each starts as the previous one arrives.
export default function ArchitectureFlow({ stages, label }) {
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dots = [...list.querySelectorAll('.flow-dot')];
    const n = dots.length;
    if (!n) return;

    // Every animation shares one cycle (n steps), so the relay stays in sync forever
    const cycle = { duration: n * STEP_MS, iterations: Infinity, easing: 'linear' };
    const slot = 1 / n;
    const anims = [];

    dots.forEach((dot, i) => {
      const start = i * slot;
      const end = start + slot;
      const frames = [
        { offset: 0, left: '0%', opacity: 0 },
        { offset: start, left: '0%', opacity: 0 },
        { offset: start + slot * 0.15, left: '15%', opacity: 1 },
        { offset: end - slot * 0.15, left: '85%', opacity: 1 },
        { offset: end, left: '100%', opacity: 0 },
        { offset: 1, left: '100%', opacity: 0 },
      ].filter((f, idx, all) => idx === 0 || f.offset > all[idx - 1].offset || f.offset === 1);
      anims.push(dot.animate(frames, cycle));
    });

    return () => anims.forEach((a) => a.cancel());
  }, [stages]);

  return (
    <figure className="rounded-2xl border border-[#D9C9B7] bg-[#F5F0E8]/60 p-4 sm:p-5">
      <figcaption className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#174B79]/80 mb-3">
        {label}
      </figcaption>

      <ol ref={listRef} className="flex flex-row items-stretch gap-0 overflow-x-auto snap-x snap-mandatory -mx-1 px-1 pb-1">
        {stages.map((s, idx) => (
          <React.Fragment key={s.stage}>
            <li className="flex-1 min-w-[150px] lg:min-w-0 snap-start rounded-xl border border-[#D9C9B7] bg-[#FAF7F2] p-3">
              <span className="block font-mono text-[11px] uppercase tracking-wider font-bold text-[#E9784F] mb-1.5">
                {s.stage}
              </span>
              <ul className="space-y-1">
                {s.items.map((item) => (
                  <li key={item} className="font-body text-xs text-[#174B79] leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            </li>

            {idx < stages.length - 1 && (
              <li aria-hidden="true" className="flow-connector relative shrink-0 self-center w-6 h-px bg-[#174B79]/30">
                <span className="flow-dot absolute w-1.5 h-1.5 rounded-full bg-[#E9784F]" />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </figure>
  );
}
