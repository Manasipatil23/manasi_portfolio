import React, { useEffect, useRef } from 'react';
import { ArrowDown, Mail, FileText } from 'lucide-react';
import { personalInfo } from '../../data/resumeData';
import ResumeLink from '../ui/ResumeLink';
import MedallionStack from './MedallionStack';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onOpenResumeModal }) {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const textColRef = useRef(null);
  const kickerRef = useRef(null);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);
  const bioRef = useRef(null);
  const ctasRef = useRef(null);
  const credentialsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // —— ENTRANCE: stagger text elements in on mount ——
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(kickerRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65 }
      )
      .fromTo(nameRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.75 },
        '-=0.35'
      )
      .fromTo(taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65 },
        '-=0.4'
      )
      .fromTo(bioRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      )
      .fromTo(ctasRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55 },
        '-=0.25'
      )
      .fromTo(credentialsRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.2'
      )
      .fromTo(visualRef.current,
        { opacity: 0, scale: 0.94, y: 24 },
        { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power2.out' },
        '-=0.8'
      );

      // —— PARALLAX: 3D stack drifts up slower than scroll ——
      if (window.innerWidth >= 768) {
        gsap.to(visualRef.current, {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        // text column drifts very slightly the opposite way for depth
        gsap.to(textColRef.current, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.8,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[82vh] pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center overflow-hidden"
    >
      {/* Editorial 2-Column Balanced Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
        
        {/* Left Column (7 cols): Typography, Name, Introduction & Clear Actions */}
        <div ref={textColRef} className="lg:col-span-8 flex flex-col items-start pr-0 lg:pr-6">
          
          {/* Editorial Kicker with vertical line (BLOOM reference style) */}
          <div ref={kickerRef} className="flex items-center gap-2.5 mb-5">
            <span className="w-[1.5px] h-4 bg-[#E9784F]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#174B79] font-bold">
              {personalInfo.headline}
            </span>
          </div>

          {/* Confident, Editorial Name & Headline */}
          <h1 ref={nameRef} className="font-headline font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#174B79] tracking-tight leading-[1.08] mb-4">
            Manasi Patil
          </h1>

          <p ref={taglineRef} className="font-headline font-semibold text-xl sm:text-2xl text-[#24699A] leading-snug mb-5 max-w-xl">
            I build the data pipelines and warehouses that analytics runs on, and the ML that sits on top of them.
          </p>

          {/* Short, Meaningful Introduction strictly from Resume */}
          <div ref={bioRef} className="max-w-xl mb-7">
            <p className="font-body text-sm sm:text-base text-[#174B79]/85 leading-relaxed">
              I've built a Bronze–Silver–Gold data warehouse in SQL Server that consolidates CRM and ERP data into a star schema, automated satellite-image processing in Python in a two-person ML research team with Universiti Teknologi Malaysia, and built a FastAPI analytics service for campus placements. B.Tech Computer Engineering '27 at K J Somaiya.
            </p>

            {/* Availability */}
            <div className="mt-4 inline-flex items-start sm:items-center gap-2.5 px-3.5 py-2 rounded-xl border border-[#D9C9B7] bg-[#FAF7F2] font-mono text-xs text-[#174B79]">
              <span className="w-2 h-2 mt-1 sm:mt-0 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
              {/* Stacked on phones; one line with separators from sm up */}
              <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-y-0.5">
                <li className="font-semibold">{personalInfo.availability.internship}</li>
                <li className="sm:before:content-['·'] sm:before:mx-2 sm:before:text-[#174B79]/50">{personalInfo.availability.fullTime}</li>
                <li className="sm:before:content-['·'] sm:before:mx-2 sm:before:text-[#174B79]/50">{personalInfo.availability.location}</li>
              </ul>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div ref={ctasRef} className="flex flex-wrap items-center gap-3 mb-8">
            {/* Circular Arrow Button */}
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#174B79] hover:bg-[#0F3354] text-[#F5F0E8] font-mono text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E9784F]"
            >
              <span className="w-5 h-5 rounded-full border border-[#F5F0E8]/40 flex items-center justify-center group-hover:border-[#E9784F] group-hover:translate-x-0.5 transition-all">
                <ArrowDown className="w-3 h-3 text-[#F5F0E8] group-hover:text-[#E9784F]" />
              </span>
              <span>Explore Projects</span>
            </a>

            {/* Email (LinkedIn is already in the header and contact section) */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#E9784F] hover:bg-[#D86438] text-white font-mono text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#174B79]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Me</span>
            </a>

            {/* Resume PDF (falls back to the resume modal) */}
            <ResumeLink
              onOpenResumeModal={onOpenResumeModal}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-[#D9C9B7] hover:border-[#174B79] bg-[#FAF7F2] hover:bg-white text-[#174B79] font-mono text-xs uppercase tracking-[0.16em] font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#E9784F]"
            >
              <FileText className="w-3.5 h-3.5 text-[#E9784F]" />
              <span>Resume (PDF)</span>
            </ResumeLink>
          </div>

          {/* Quick Credential Highlights Strip */}
          <div ref={credentialsRef} className="pt-5 border-t border-[#D9C9B7] w-full grid grid-cols-3 gap-4 font-mono text-xs text-[#174B79]">
            <div>
              <span className="text-[#174B79]/80 text-[11px] block uppercase tracking-wider">Academic Merit</span>
              <span className="font-bold text-sm sm:text-base text-[#174B79]">9.33 / 10 CGPA</span>
            </div>
            <div>
              <span className="text-[#174B79]/80 text-[11px] block uppercase tracking-wider">Data Science Honours</span>
              <span className="font-bold text-sm sm:text-base text-[#E9784F]">10.0 / 10 CGPA</span>
            </div>
            <div>
              <span className="text-[#174B79]/80 text-[11px] block uppercase tracking-wider">ML Research</span>
              <span className="font-bold text-sm sm:text-base text-[#174B79]">UTM collab · 2025–26</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Beautiful Transparent Botanical Rose Spray */}
        {/* 3D medallion stack (desktop only, so the phone hero stays short) */}
        <div className="hidden lg:flex lg:col-span-4 relative items-center justify-center">
          <div ref={visualRef} className="w-full will-change-transform">
            <MedallionStack />
          </div>
        </div>

      </div>
    </section>
  );
}
