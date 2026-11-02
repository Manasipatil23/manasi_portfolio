import React, { useEffect, useRef } from 'react';
import { projectsData } from '../../data/resumeData';
import { Github, ArrowUpRight, CheckCircle2, Lock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../ui/SectionHeader';
import ArchitectureFlow from './ArchitectureFlow';

gsap.registerPlugin(ScrollTrigger);

function RepoLink({ project }) {
  if (!project.githubUrl) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-dashed border-[#D9C9B7] text-[#174B79]/80 font-mono text-xs shrink-0 self-start">
        <Lock className="w-3.5 h-3.5" />
        <span>{project.repoNote}</span>
      </span>
    );
  }

  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D9C9B7] bg-[#F5F0E8] hover:bg-white text-[#174B79] font-mono text-xs font-semibold transition-all shrink-0 self-start focus:outline-none focus:ring-2 focus:ring-[#E9784F] hover:shadow-sm"
    >
      <Github className="w-3.5 h-3.5" />
      <span>View Repo</span>
      <ArrowUpRight className="w-3 h-3 opacity-70" />
    </a>
  );
}

function Label({ children, className = 'text-[#174B79]/80' }) {
  return (
    <span className={`font-mono text-[11px] uppercase tracking-wider font-bold block mb-1.5 ${className}`}>
      {children}
    </span>
  );
}

function CaseStudy({ project, index }) {
  return (
    <article
      id={`project-${project.id}`}
      className="case-study card-editorial p-5 sm:p-8 scroll-mt-28"
      aria-labelledby={`project-${project.id}-title`}
    >
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-5 mb-6 border-b border-[#D9C9B7]">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[#E9784F] font-bold block mb-1">
            0{index + 1} · {project.year}
          </span>
          <h3 id={`project-${project.id}-title`} className="font-headline font-bold text-xl sm:text-2xl text-[#174B79]">
            {project.title}
          </h3>
          <p className="font-body text-sm text-[#24699A] font-medium mt-0.5">
            {project.tagline}
          </p>
        </div>
        <RepoLink project={project} />
      </header>

      {/* Problem + Outcome */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div>
          <Label className="text-[#E9784F]">Problem</Label>
          <p className="font-body text-sm text-[#174B79]/90 leading-relaxed">{project.problem}</p>
        </div>
        <div>
          <Label className="text-[#24699A]">Outcome</Label>
          <p className="font-body text-sm text-[#174B79]/90 leading-relaxed">{project.outcome}</p>
        </div>
      </div>

      {/* Architecture */}
      <div className="mb-6">
        <ArchitectureFlow stages={project.architecture} label="How the data flows" />
      </div>

      {/* What I built + design choices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <Label>What I built</Label>
          <ul className="space-y-2">
            {project.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E9784F] shrink-0 mt-1" />
                <p className="font-body text-sm text-[#174B79]/90 leading-relaxed">{bullet}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Label>Design choices</Label>
          <ul className="space-y-2">
            {project.decisions.map((d) => (
              <li key={d} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#174B79] mt-2 shrink-0" />
                <p className="font-body text-sm text-[#174B79]/90 leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Real code excerpts, only when added in resumeData */}
      {project.codeSnippets?.length > 0 && (
        <div className="mb-6 space-y-3">
          <Label>From the code</Label>
          {project.codeSnippets.map((snip) => (
            <figure key={snip.title} className="rounded-xl overflow-hidden border border-[#0F3354]">
              <figcaption className="px-4 py-2 bg-[#0F3354] text-[#F5F0E8]/80 font-mono text-[11px]">
                {snip.title}
              </figcaption>
              <pre className="p-4 bg-[#0E2F4D] text-[#F5F0E8] font-mono text-xs leading-relaxed overflow-x-auto">
                <code>{snip.code}</code>
              </pre>
            </figure>
          ))}
        </div>
      )}

      {/* Stack */}
      <div className="pt-4 border-t border-[#D9C9B7] flex flex-wrap items-center gap-1.5">
        <span className="font-mono text-xs text-[#174B79]/80 mr-1">Stack:</span>
        {project.stack.map((t) => (
          <span
            key={t}
            className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-[#F5F0E8] border border-[#D9C9B7] text-[#174B79]"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);

  // —— Scroll-triggered entrance per case study ——
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.case-study').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        kicker="01 • Selected Work"
        title="Projects"
        intro="Three projects across the data stack: a SQL warehouse, an analytics platform, and an ML research pipeline."
      />

      {/* Jump links */}
      <nav aria-label="Projects" className="flex flex-wrap gap-2 mb-8">
        {projectsData.map((p, idx) => (
          <a
            key={p.id}
            href={`#project-${p.id}`}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#D9C9B7] bg-[#FAF7F2] hover:border-[#174B79] text-[#174B79] font-mono text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#E9784F]"
          >
            <span className="text-[#E9784F] font-bold">0{idx + 1}</span>
            {p.title.split('—')[0].trim()}
          </a>
        ))}
      </nav>

      <div className="space-y-8">
        {projectsData.map((project, idx) => (
          <CaseStudy key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}
