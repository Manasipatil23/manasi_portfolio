import React, { useState, useRef, useEffect } from 'react';
import { Mail, MapPin, Linkedin, Github, Code2, Copy, Check, Download, ArrowUpRight, ArrowUp } from 'lucide-react';
import { personalInfo } from '../../data/resumeData';
import SplitLetters from '../ui/SplitLetters';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection({ onOpenResumeModal }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  // Only confirm when the copy worked (the Clipboard API is missing on insecure origins)
  const handleCopy = () => {
    navigator.clipboard?.writeText(personalInfo.email)
      .then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2200);
      })
      .catch(() => {});
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll-triggered entrance for the contact card
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 44 },
        {
          opacity: 1, y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 88%',
            once: true,
          },
        }
      );

      // Stagger the inner grid items
      const innerItems = cardRef.current.querySelectorAll('.contact-item');
      gsap.fromTo(innerItems,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
          delay: 0.3,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 88%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Contact Card */}
      <div ref={cardRef} className="card-blue p-7 sm:p-12 relative overflow-hidden shadow-lg mb-12">
        
        {/* Subtle Background Paper Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none paper-texture" />

        {/* Decorative coral accent circle top-right */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#E9784F]/10 -translate-y-1/3 translate-x-1/3 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (7 cols): Heading and Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <img
              src="/images/manasi.webp"
              alt="Manasi Patil"
              width="400"
              height="400"
              loading="lazy"
              className="contact-item w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-2 ring-[#E9784F] ring-offset-4 ring-offset-[#174B79] shadow-lg mb-5"
            />
            <div className="contact-item flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E9784F]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FFAF94] font-bold">
                Open to Opportunities
              </span>
            </div>

            <SplitLetters
              as="h2"
              text="Hiring for data engineering or analytics roles? Let's talk."
              variant="typewriter"
              className="font-headline font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug mb-3"
            />

            <p className="contact-item font-body text-xs sm:text-sm text-[#F5F0E8]/80 leading-relaxed max-w-lg mb-6">
              I'm looking for a 6-month internship now and full-time roles from July 2027, preferably in Mumbai. Data engineering first, then data analytics and ML.
            </p>

            {/* Direct Contact Actions */}
            <div className="contact-item flex flex-wrap items-center gap-2.5">
              {/* Primary LinkedIn Button in Coral Accent */}
              <a
                href={personalInfo.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#E9784F] hover:bg-[#D86438] text-white font-mono text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
              >
                <Linkedin className="w-4 h-4 fill-current" />
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* GitHub Button */}
              <a
                href={personalInfo.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#F5F0E8]/10 hover:bg-[#F5F0E8]/20 text-[#F5F0E8] border border-[#F5F0E8]/20 font-mono text-xs uppercase tracking-[0.16em] font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#E9784F]"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              {/* LeetCode Button */}
              <a
                href={personalInfo.socials.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#F5F0E8]/10 hover:bg-[#F5F0E8]/20 text-[#F5F0E8] border border-[#F5F0E8]/20 font-mono text-xs uppercase tracking-[0.16em] font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#E9784F]"
              >
                <Code2 className="w-4 h-4" />
                <span>LeetCode</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Contact details */}
          <div className="lg:col-span-5 flex flex-col gap-3 bg-[#0F3354]/60 p-5 sm:p-6 rounded-2xl border border-[#F5F0E8]/15">
            <span className="contact-item font-mono text-[11px] uppercase tracking-[0.18em] text-[#FFAF94] font-bold block mb-0.5">
              Contact Details
            </span>

            {/* Email with copy button */}
            <div className="contact-item p-3 rounded-xl bg-[#174B79]/80 border border-[#F5F0E8]/15 flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 truncate font-mono text-xs text-[#F5F0E8]">
                <Mail className="w-3.5 h-3.5 text-[#E9784F] shrink-0" />
                <a href={`mailto:${personalInfo.email}`} className="truncate hover:underline">
                  {personalInfo.email}
                </a>
              </div>
              <button
                onClick={handleCopy}
                className="p-1 rounded-md hover:bg-white/10 text-[#F5F0E8]/80 hover:text-white transition-colors shrink-0"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Location */}
            <div className="contact-item p-3 rounded-xl bg-[#174B79]/80 border border-[#F5F0E8]/15 flex items-center gap-2 font-mono text-xs text-[#F5F0E8]">
              <MapPin className="w-3.5 h-3.5 text-[#E9784F] shrink-0" />
              <span>{personalInfo.location}</span>
            </div>

            {/* Download Resume Button */}
            <button
              onClick={onOpenResumeModal}
              className="contact-item mt-1 w-full py-2.5 rounded-xl bg-[#F5F0E8] hover:bg-white text-[#174B79] font-mono text-xs uppercase tracking-[0.14em] font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-[#E9784F]" />
              <span>View Resume</span>
            </button>
          </div>

        </div>
      </div>

      {/* Editorial Footer */}
      <footer className="pt-6 border-t border-[#D9C9B7] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[#174B79]/80">
        <div>
          <span className="font-bold text-[#174B79]">Manasi Patil</span> • Data Engineering & Analytics • B.Tech Computer Engineering '27
        </div>

        <div className="flex items-center gap-5">
          <a
            href={personalInfo.socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#174B79] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={personalInfo.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#174B79] transition-colors"
          >
            GitHub
          </a>
          <a
            href={personalInfo.socials.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#174B79] transition-colors"
          >
            LeetCode
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-[#174B79] transition-colors ml-1"
            aria-label="Back to top of page"
          >
            <ArrowUp className="w-3 h-3 text-[#E9784F]" />
            <span>Top</span>
          </button>
        </div>
      </footer>
    </section>
  );
}
