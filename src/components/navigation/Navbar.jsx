import React, { useState, useEffect } from 'react';
import { Linkedin, Github, FileText, Mail, Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../../data/resumeData';
import ResumeLink from '../ui/ResumeLink';

export default function Navbar({ onOpenResumeModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Research', href: '#research', id: 'research' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight the section crossing a thin band ~25% down the viewport
  useEffect(() => {
    let footerVisible = false;
    let bandSection = 'home';

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) bandSection = entry.target.id;
        });
        if (!footerVisible) setActiveSection(bandSection);
      },
      { rootMargin: '-25% 0px -74% 0px' }
    );

    // The short Contact section never reaches the band, so the footer coming into view selects it
    const footerObserver = new IntersectionObserver(([entry]) => {
      footerVisible = entry.isIntersecting;
      setActiveSection(footerVisible ? 'contact' : bandSection);
    });

    ['home', ...navLinks.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
    const footer = document.querySelector('footer');
    if (footer) footerObserver.observe(footer);

    return () => {
      sectionObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 print:hidden ${
        isScrolled
          ? 'bg-[#F5F0E8]/80 backdrop-blur-xl backdrop-saturate-150 py-3.5 border-b border-white/40 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <a
          href="#home"
          className="group flex flex-col focus:outline-none focus:ring-2 focus:ring-[#E9784F] rounded-md"
        >
          <span className="font-headline font-extrabold text-base sm:text-xl tracking-tight whitespace-nowrap text-[#174B79] group-hover:text-[#E9784F] transition-colors">
            MANASI PATIL
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#174B79]/80 hidden sm:block whitespace-nowrap">
            Data Engineering • Somaiya '27
          </span>
        </a>

        {/* Conventional Editorial Nav Links (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-7"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`font-mono text-xs uppercase tracking-[0.16em] transition-all relative py-1 focus:outline-none focus:ring-1 focus:ring-[#E9784F] ${
                  isActive
                    ? 'text-[#174B79] font-bold'
                    : 'text-[#174B79]/80 hover:text-[#174B79]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E9784F]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Icons & Resume Button */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* LinkedIn Badge (Coral Accent) */}
          <a
            href={personalInfo.socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={personalInfo.socials.linkedin.ariaLabel}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E9784F] hover:bg-[#D86438] text-white font-mono text-xs font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#174B79]"
          >
            <Linkedin className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 opacity-90 hidden sm:inline" />
          </a>

          {/* GitHub Icon Link */}
          <a
            href={personalInfo.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={personalInfo.socials.github.ariaLabel}
            className="p-1.5 rounded-full text-[#174B79] hover:bg-[#174B79]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E9784F]"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Email Icon Link */}
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Email Manasi Patil"
            className="hidden sm:inline-flex p-1.5 rounded-full text-[#174B79] hover:bg-[#174B79]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E9784F]"
          >
            <Mail className="w-4 h-4" />
          </a>

          {/* Resume: opens the PDF when there is one, otherwise the resume modal */}
          <ResumeLink
            onOpenResumeModal={onOpenResumeModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D9C9B7] bg-[#FAF7F2] hover:bg-white text-[#174B79] font-mono text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#E9784F]"
          >
            <FileText className="w-3.5 h-3.5 text-[#E9784F]" />
            <span className="sr-only sm:not-sr-only">Resume</span>
          </ResumeLink>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#174B79] rounded-lg hover:bg-[#174B79]/10 focus:outline-none focus:ring-2 focus:ring-[#E9784F]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-4 p-5 bg-[#FAF7F2] rounded-2xl border border-[#D9C9B7] shadow-lg flex flex-col gap-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#174B79]/80 pb-2 border-b border-[#D9C9B7]">
            Navigation
          </div>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 font-mono text-sm text-[#174B79] hover:text-[#E9784F] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#D9C9B7] flex flex-wrap items-center justify-between gap-3">
            <a
              href={personalInfo.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[#E9784F] font-bold flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn ↗
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="font-mono text-xs text-[#174B79] font-semibold flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
            <ResumeLink
              onOpenResumeModal={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal?.();
              }}
              className="font-mono text-xs text-[#174B79] font-semibold"
            >
              Resume (PDF)
            </ResumeLink>
          </div>
        </div>
      )}
    </header>
  );
}
