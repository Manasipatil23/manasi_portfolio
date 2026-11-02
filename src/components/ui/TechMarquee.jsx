import React from 'react';

const STACK = [
  'SQL Server', 'T-SQL', 'Python', 'Pandas', 'Power BI', 'ETL', 'Star Schema', 'FastAPI',
  'MongoDB', 'PyTorch', 'Scikit-learn', 'DeepLabV3+', 'React', 'Git', 'Docker', 'AWS',
];

// Endless strip of the stack; the list is rendered twice so the loop is seamless. Pauses on hover.
export default function TechMarquee() {
  const items = [...STACK, ...STACK];
  return (
    <div
      className="marquee relative overflow-hidden border-y border-[#D9C9B7] bg-[#FAF7F2]/70 py-3.5"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
      aria-label={`Tools I work with: ${STACK.join(', ')}`}
      role="img"
    >
      <div className="marquee-track flex w-max items-center gap-6" aria-hidden="true">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-6 font-mono text-sm uppercase tracking-[0.14em] text-[#174B79] whitespace-nowrap">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-[#E9784F]" />
          </span>
        ))}
      </div>
    </div>
  );
}
