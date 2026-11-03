import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { skillEvidence, evidenceLabels, evidenceSubtitles, otherSkills } from '../../data/resumeData';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const SOURCES = Object.keys(evidenceLabels);
const SKILLS = skillEvidence.flatMap((g) => g.skills.map((s) => ({ ...s, group: g.group })));

// Skills drawn as a lineage graph: each skill is wired to the project, role or
// certificate that proves it. Hover (or tap) either end to trace the links.
export default function SkillsSection() {
  const graphRef = useRef(null);
  const srcRefs = useRef({});
  const skillRefs = useRef({});
  const [paths, setPaths] = useState([]);
  const [active, setActive] = useState(null); // { src } or { skill }

  // Recompute the curves whenever the layout changes size
  const measure = useCallback(() => {
    const box = graphRef.current?.getBoundingClientRect();
    if (!box || window.innerWidth < 768) { setPaths([]); return; }
    const next = [];
    SKILLS.forEach((skill) => skill.where.forEach((src) => {
      const a = srcRefs.current[src]?.getBoundingClientRect();
      const b = skillRefs.current[skill.name]?.getBoundingClientRect();
      if (!a || !b) return;
      const x1 = a.right - box.left;
      const y1 = a.top + a.height / 2 - box.top;
      const x2 = b.left - box.left;
      const y2 = b.top + b.height / 2 - box.top;
      const mx = (x1 + x2) / 2;
      next.push({ key: `${src}-${skill.name}`, src, skill: skill.name, d: `M${x1} ${y1}C${mx} ${y1},${mx} ${y2},${x2} ${y2}` });
    }));
    setPaths(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(graphRef.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  const linkOn = (src, skill) =>
    active && (active.src ? active.src === src : active.skill === skill);
  const srcOn = (src) =>
    active && (active.src ? active.src === src : SKILLS.find((s) => s.name === active.skill).where.includes(src));
  const skillOn = (skill) =>
    active && (active.skill ? active.skill === skill.name : skill.where.includes(active.src));
  const fade = (on) => (active && !on ? 'opacity-25' : 'opacity-100');

  // On touch screens the first tap traces the links, the second follows the link
  const onSourceClick = (e, src) => {
    if (window.matchMedia('(hover: none)').matches && active?.src !== src) {
      e.preventDefault();
      setActive({ src });
    }
  };

  return (
    <section id="skills" className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        kicker="04 • Skills"
        title="Skills, with Evidence"
        titleVariant="connect"
        titleUnderline
        intro="Every skill is wired to where I used it. Hover or tap either side to trace the links; select a source to jump there."
      />

      <div
        ref={graphRef}
        className="relative card-editorial p-4 sm:p-6 md:grid md:grid-cols-[200px_1fr] md:gap-16"
        onMouseLeave={() => setActive(null)}
      >
        {/* Lines (desktop and tablet only) */}
        <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          {paths.map((p) => {
            const on = linkOn(p.src, p.skill);
            return (
              <path
                key={p.key}
                d={p.d}
                fill="none"
                className={`transition-[stroke,opacity] duration-300 ${on ? 'lineage-on' : ''}`}
                stroke={on ? '#E9784F' : '#E3D6C6'}
                strokeWidth={on ? 1.6 : 1}
                opacity={active && !on ? 0 : 1}
              />
            );
          })}
        </svg>

        {/* Sources: a column on desktop, a swipeable row on phones */}
        <nav aria-label="Where the skills were used" className="relative z-10 flex md:flex-col md:justify-around gap-2.5 no-scrollbar overflow-x-auto md:overflow-visible mb-4 md:mb-0 -mx-1 px-1">
          {SOURCES.map((src) => {
            const on = srcOn(src);
            return (
              <a
                key={src}
                ref={(el) => { srcRefs.current[src] = el; }}
                href={`#${src}`}
                onMouseEnter={() => setActive({ src })}
                onFocus={() => setActive({ src })}
                onBlur={() => setActive(null)}
                onClick={(e) => onSourceClick(e, src)}
                className={`group shrink-0 block rounded-lg px-3 py-2.5 bg-[#174B79] border-2 transition-all duration-300 focus:outline-none ${fade(on)} ${
                  on ? 'border-[#E9784F] md:translate-x-1' : 'border-transparent'
                }`}
              >
                <span className="flex items-center justify-between gap-2 font-mono text-xs font-semibold text-[#F5F0E8] whitespace-nowrap">
                  {evidenceLabels[src]}
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </span>
                <span className="block font-mono text-[10px] text-[#FFAF94] whitespace-nowrap">{evidenceSubtitles[src]}</span>
              </a>
            );
          })}
        </nav>

        {/* Skills, grouped */}
        <div className="relative z-10 space-y-4 md:max-w-2xl md:self-center">
          {skillEvidence.map((group) => (
            <div key={group.group}>
              <h3 className="w-fit pr-2 bg-[#FAF7F2] font-mono text-[11px] uppercase tracking-[0.16em] font-bold text-[#E9784F] mb-1.5">
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => {
                  const on = skillOn(skill);
                  return (
                    <li
                      key={skill.name}
                      ref={(el) => { skillRefs.current[skill.name] = el; }}
                      tabIndex={0}
                      title={skill.name}
                      onMouseEnter={() => setActive({ skill: skill.name })}
                      onFocus={() => setActive({ skill: skill.name })}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive({ skill: skill.name })}
                      // Chips stay opaque when faded so the links pass cleanly behind them
                      className={`cursor-default rounded-full px-3 py-1 font-mono text-xs border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9784F] ${
                        on
                          ? 'bg-[#FFE6DB] border-[#E9784F] text-[#174B79]'
                          : active
                            ? 'bg-[#FAF7F2] border-[#EDE3D6] text-[#174B79]/30'
                            : 'bg-[#FAF7F2] border-[#D9C9B7] text-[#174B79]'
                      }`}
                    >
                      {skill.short}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <span className="font-mono text-xs uppercase tracking-wider text-[#174B79]/80 font-bold block mb-2">
          Also worked with
        </span>
        <p className="font-body text-sm text-[#174B79]/90 leading-relaxed">
          {otherSkills.join(' · ')}
        </p>
      </div>
    </section>
  );
}
