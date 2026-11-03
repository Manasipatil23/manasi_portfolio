import React from 'react';
import { educationData, certificationsData } from '../../data/resumeData';
import SectionHeader from '../ui/SectionHeader';
import CountUp from '../ui/CountUp';
import CertificatePreview from '../ui/CertificatePreview';

export default function EducationSection() {
  return (
    <section id="education" className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeader kicker="05 • Education" title="Education & Certifications" titleVariant="blur" />

      <div className="grid grid-cols-2 gap-3 md:gap-5">
        {educationData.map((edu, idx) => {
          const isHonours = idx === 1;
          return (
            <div key={edu.degree} className={`card-editorial p-4 sm:p-6 flex flex-col justify-between ${isHonours ? 'border-[#E9784F]/40' : ''}`}>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 pb-2.5 mb-3 border-b border-[#D9C9B7]">
                  <span className={`font-mono text-xs uppercase tracking-wider font-bold ${isHonours ? 'text-[#E9784F]' : 'text-[#174B79]'}`}>
                    {isHonours ? <>Honours<span className="hidden sm:inline"> Specialization</span></> : 'Degree'}
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-[#174B79]/80">{edu.period}</span>
                </div>

                <h3 className="font-headline font-bold text-sm sm:text-lg text-[#174B79] leading-snug">{edu.degree}</h3>
                <p className="sm:hidden font-body text-xs text-[#24699A] font-medium mt-0.5">{edu.institution.replace(' College of Engineering', '')}</p>
                <p className="hidden sm:block font-body text-sm text-[#24699A] font-medium mt-0.5">
                  {edu.institution} • {edu.location}
                </p>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className={`font-headline font-extrabold text-2xl ${isHonours ? 'text-[#E9784F]' : 'text-[#174B79]'}`}>
                    <CountUp value={edu.scoreValue} decimals={isHonours ? 1 : 2} />
                  </span>
                  <span className="font-mono text-xs text-[#174B79]/80">
                    / {edu.scoreMax.toFixed(1)} {edu.scoreLabel}
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      <div className="pt-8">
        <span className="font-mono text-xs uppercase tracking-wider text-[#174B79] font-bold block mb-3">
          Certifications
        </span>
        {/* Phones: one swipeable row; larger screens: a grid */}
        <ul className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 pb-1">
          {certificationsData.map((c) => (
            <li key={c.title} className="card-editorial p-4 text-xs flex flex-col items-start shrink-0 w-[72%] sm:w-[45%] md:w-auto snap-start">
              <div className="w-full flex items-center justify-between gap-2 font-mono text-[11px] text-[#174B79]/80 mb-1">
                <span className="font-bold text-[#E9784F]">{c.issuer}</span>
                <span>{c.period}</span>
              </div>
              <h4 className="font-headline font-bold text-sm text-[#174B79] leading-snug">{c.title}</h4>
              {c.image && <CertificatePreview certificate={c} className="mt-2.5" />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
