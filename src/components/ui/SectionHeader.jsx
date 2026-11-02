import React from 'react';

// Kicker line + heading + optional intro, shared by every main section
export default function SectionHeader({ kicker, title, intro, aside }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="w-[1.5px] h-4 bg-[#E9784F]" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#174B79] font-bold">
          {kicker}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#174B79] tracking-tight">
            {title}
          </h2>
          {intro && (
            <p className="mt-1.5 text-sm sm:text-base text-[#174B79]/80 max-w-2xl">
              {intro}
            </p>
          )}
        </div>
        {aside}
      </div>
    </div>
  );
}
