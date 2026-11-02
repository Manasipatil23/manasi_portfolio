import React from 'react';
import { educationData, certificationsData } from '../../data/resumeData';
import SectionHeader from '../ui/SectionHeader';

export default function EducationSection() {
  return (
    <section id="education" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeader kicker="04 • Education" title="Education & Certifications" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {educationData.map((edu, idx) => {
          const isHonours = idx === 1;
          return (
            <div key={edu.degree} className={`card-editorial p-6 flex flex-col justify-between ${isHonours ? 'border-[#E9784F]/40' : ''}`}>
              <div>
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#D9C9B7]">
                  <span className={`font-mono text-xs uppercase tracking-wider font-bold ${isHonours ? 'text-[#E9784F]' : 'text-[#174B79]'}`}>
                    {isHonours ? 'Honours Specialization' : 'Degree'}
                  </span>
                  <span className="font-mono text-xs text-[#174B79]/80">{edu.period}</span>
                </div>

                <h3 className="font-headline font-bold text-lg text-[#174B79]">{edu.degree}</h3>
                <p className="font-body text-sm text-[#24699A] font-medium mt-0.5">
                  {edu.institution} • {edu.location}
                </p>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className={`font-headline font-extrabold text-2xl ${isHonours ? 'text-[#E9784F]' : 'text-[#174B79]'}`}>
                    {isHonours ? edu.scoreValue.toFixed(1) : edu.scoreValue.toFixed(2)}
                  </span>
                  <span className="font-mono text-xs text-[#174B79]/80">
                    / {edu.scoreMax.toFixed(1)} {edu.scoreLabel}
                  </span>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#D9C9B7] flex flex-wrap gap-1.5 text-xs font-mono text-[#174B79]">
                {edu.highlights.map((h) => (
                  <span key={h} className="px-2 py-0.5 rounded bg-[#F5F0E8] border border-[#D9C9B7]">{h}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-8">
        <span className="font-mono text-xs uppercase tracking-wider text-[#174B79] font-bold block mb-3">
          Certifications
        </span>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {certificationsData.map((c) => (
            <li key={c.title} className="card-editorial p-4 text-xs">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#174B79]/80 mb-1">
                <span className="font-bold text-[#E9784F]">{c.issuer}</span>
                <span>{c.period}</span>
              </div>
              <h4 className="font-headline font-bold text-sm text-[#174B79] leading-snug">{c.title}</h4>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
