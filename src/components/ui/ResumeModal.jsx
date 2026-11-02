import React, { useEffect, useRef } from 'react';
import { X, Printer, Mail, MapPin, Linkedin, Github, Code2, Download } from 'lucide-react';
import { personalInfo, educationData, categorizedSkills, experienceData, projectsData, certificationsData } from '../../data/resumeData';

// Like the PDF: projects already covered by an Experience entry (e.g. the research) aren't repeated
const resumeProjects = projectsData.filter(
  (p) => !experienceData.some((exp) => exp.caseStudy === `project-${p.id}`)
);

export default function ResumeModal({ isOpen, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  // Escape to close, keep Tab focus inside the dialog, restore focus on close
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll('a[href], button:not([disabled])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      data-lenis-prevent
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0F3354]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:static print:block print:p-0 print:bg-transparent print:backdrop-blur-none print:overflow-visible"
    >
      <div ref={panelRef} className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#D9C9B7] text-slate-800 p-6 sm:p-10 max-h-[94vh] overflow-y-auto print:max-w-none print:max-h-none print:overflow-visible print:rounded-none print:shadow-none print:p-0 print:border-none">
        
        {/* Controls Bar (Hidden during print) */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E9784F]" />
            <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#174B79]">
              Resume
            </span>
          </div>

          <div className="flex items-center gap-2">
            {personalInfo.resumePdfUrl && (
              <a
                href={personalInfo.resumePdfUrl}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#174B79] hover:bg-[#0F3354] text-white font-mono text-xs font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            )}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#E9784F]" />
              <span>Print / Save PDF</span>
            </button>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close Resume"
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Header */}
        <div className="text-center pb-5 border-b border-slate-300">
          <h1 id="resume-modal-title" className="font-headline font-extrabold text-3xl sm:text-4xl text-[#174B79] uppercase tracking-wide">
            {personalInfo.name}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-600 font-mono mt-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#E9784F]" />
              {personalInfo.location}
            </span>
            <span>|</span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-[#E9784F]" />
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                {personalInfo.email}
              </a>
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs font-mono font-semibold text-[#174B79] mt-2">
            <a href={personalInfo.socials.linkedin.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1 text-[#E9784F]">
              <Linkedin className="w-3 h-3" /> LinkedIn
            </a>
            <span>•</span>
            <a href={personalInfo.socials.github.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <Github className="w-3 h-3" /> GitHub
            </a>
            <span>•</span>
            <a href={personalInfo.socials.leetcode.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <Code2 className="w-3 h-3" /> LeetCode
            </a>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-5 pb-5 border-b border-slate-200">
          <h2 className="font-headline font-bold text-xs uppercase tracking-widest text-[#174B79] mb-1.5">
            Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-body">
            {personalInfo.summary}
          </p>
        </div>

        {/* Education */}
        <div className="mt-5 pb-5 border-b border-slate-200">
          <h2 className="font-headline font-bold text-xs uppercase tracking-widest text-[#174B79] mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {educationData.map((edu, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{edu.institution}</h3>
                  <div className="text-xs text-slate-700">
                    <span className="font-semibold">{edu.degree}</span>
                    {edu.scoreLabel && (
                      <span> | {edu.scoreLabel}: <strong className="text-[#174B79]">{edu.scoreValue}/{edu.scoreMax}</strong></span>
                    )}
                  </div>
                </div>
                <div className="text-xs text-slate-500 font-mono sm:text-right shrink-0">
                  <div>{edu.location || "Mumbai, India"}</div>
                  <div>{edu.period}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills */}
        <div className="mt-5 pb-5 border-b border-slate-200">
          <h2 className="font-headline font-bold text-xs uppercase tracking-widest text-[#174B79] mb-3">
            Technical Skills
          </h2>
          <div className="space-y-2 text-xs">
            {categorizedSkills.map((cat, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                <span className="font-bold text-slate-900 sm:w-52 shrink-0 font-mono">
                  {cat.category}:
                </span>
                <span className="text-slate-700">
                  {cat.skills.join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mt-5 pb-5 border-b border-slate-200">
          <h2 className="font-headline font-bold text-xs uppercase tracking-widest text-[#174B79] mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experienceData.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 inline">{exp.role}</h3>
                    <div className="text-xs text-slate-700 font-medium">
                      {exp.organisation} {exp.affiliation && <span className="text-[#174B79]">({exp.affiliation})</span>}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 font-mono sm:text-right shrink-0">
                    <div>{exp.period}</div>
                    <div>{exp.location}</div>
                  </div>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mt-5 pb-5 border-b border-slate-200">
          <h2 className="font-headline font-bold text-xs uppercase tracking-widest text-[#174B79] mb-3">
            Projects
          </h2>
          <div className="space-y-4">
            {resumeProjects.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <div className="text-xs">
                    <h3 className="font-bold text-sm text-slate-900 inline">{proj.title}</h3>
                    <span className="text-slate-500 font-mono ml-2">| {proj.stack.join(', ')}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{proj.year}</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700">
                  {proj.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Achievements */}
        <div className="mt-5">
          <h2 className="font-headline font-bold text-xs uppercase tracking-widest text-[#174B79] mb-2.5">
            Certifications & Achievements
          </h2>
          <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700">
            {certificationsData.map((cert, cIdx) => (
              <li key={cIdx} className="leading-relaxed">
                <span className="font-semibold text-slate-900">{cert.title}</span> — {cert.issuer} {cert.period !== 'Certified' && `(${cert.period})`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
