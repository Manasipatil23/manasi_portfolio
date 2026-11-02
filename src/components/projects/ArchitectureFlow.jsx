import React from 'react';

// Left-to-right data flow for a case study (swipes sideways on small screens).
// A small dot travels along each connector to show the direction data moves.
export default function ArchitectureFlow({ stages, label }) {
  return (
    <figure className="rounded-2xl border border-[#D9C9B7] bg-[#F5F0E8]/60 p-4 sm:p-5">
      <figcaption className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#174B79]/80 mb-3">
        {label}
      </figcaption>

      <ol className="flex flex-row items-stretch gap-0 overflow-x-auto snap-x snap-mandatory -mx-1 px-1 pb-1">
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
                <span
                  className="flow-dot absolute w-1.5 h-1.5 rounded-full bg-[#E9784F]"
                  style={{ animationDelay: `${idx * 0.35}s` }}
                />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </figure>
  );
}
