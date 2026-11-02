import React, { useEffect, useRef } from 'react';
import { experienceData } from '../../data/resumeData';
import CertificatePreview from '../ui/CertificatePreview';
import { Calendar, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.timeline-entry').forEach((entry) => {
        gsap.fromTo(entry,
          { opacity: 0, x: -24 },
          {
            opacity: 1, x: 0, duration: 0.65, ease: 'power3.out',
            scrollTrigger: { trigger: entry, start: 'top 88%', once: true },
          }
        );
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader kicker="03 • Experience" title="Work & Research" titleVariant="slide" />

      <ol ref={timelineRef} className="relative pl-5 sm:pl-8 border-l-2 border-[#D9C9B7] space-y-7">
        {experienceData.map((exp) => (
          <li key={exp.id} id={`exp-${exp.id}`} className="timeline-entry relative group scroll-mt-28">
            {/* Node dot */}
            <div className="absolute -left-[27px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#174B79] bg-[#F5F0E8] group-hover:bg-[#E9784F] group-hover:border-[#E9784F] transition-colors" />

            <div className="card-editorial p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 mb-3 border-b border-[#D9C9B7]">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#E9784F] font-bold">
                    {exp.tag}
                  </span>
                  <h3 className="font-headline font-bold text-xl text-[#174B79] mt-1">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-semibold text-[#24699A] mt-0.5">
                    {exp.organisation} {exp.affiliation && <span className="text-[#174B79]/80 font-medium">({exp.affiliation})</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-[#174B79]/80 shrink-0">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#E9784F]" />
                    {exp.period}
                  </span>
                  <span>•</span>
                  <span>{exp.location}</span>
                </div>
              </div>

              {exp.brief ? (
                <p className="font-body text-sm text-[#174B79]/90 leading-relaxed mb-3">{exp.brief}</p>
              ) : (
                <ul className="space-y-2 mb-4">
                  {exp.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E9784F] mt-2 shrink-0" />
                      <p className="font-body text-sm text-[#174B79]/90 leading-relaxed">{b}</p>
                    </li>
                  ))}
                </ul>
              )}

              {(exp.caseStudy || exp.certificate) && (
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4">
              {exp.caseStudy && (
                <a
                  href={`#${exp.caseStudy}`}
                  className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#E9784F] hover:text-[#D86438] focus:outline-none focus:ring-2 focus:ring-[#E9784F] rounded"
                >
                  {exp.caseStudyLabel || 'Read the case study'}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
              {exp.certificate && <CertificatePreview certificate={exp.certificate} />}
                </div>
              )}

              <div className="pt-3 border-t border-[#D9C9B7] flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-xs text-[#174B79]/80 mr-1">Tools:</span>
                {exp.technologies.map((t) => (
                  <span key={t} className="font-mono text-xs px-2 py-0.5 rounded bg-[#F5F0E8] border border-[#D9C9B7] text-[#174B79]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
