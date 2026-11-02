import React, { useCallback, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/navigation/Navbar';
import HeroSection from './components/hero/HeroSection';
import ProjectsSection from './components/projects/ProjectsSection';
import ExperienceSection from './components/experience/ExperienceSection';
import SkillsSection from './components/skills/SkillsSection';
import EducationSection from './components/education/EducationSection';
import ContactSection from './components/contact/ContactSection';
import ResumeModal from './components/ui/ResumeModal';

gsap.registerPlugin(ScrollTrigger);

// 1px beige rule between sections
function Divider() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rule-beige" />
    </div>
  );
}

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const openResumeModal = useCallback(() => setIsResumeModalOpen(true), []);
  const closeResumeModal = useCallback(() => setIsResumeModalOpen(false), []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
        // Smooth in-page links (nav, project jump links, skill evidence); targets use scroll-mt-* to clear the fixed header
        anchors: true,
      });

      // Connect Lenis to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F5F0E8] text-[#174B79] selection:bg-[#E9784F]/20 selection:text-[#174B79]">
      
      {/* Subtle organic paper texture overlay across page */}
      <div className="fixed inset-0 pointer-events-none opacity-30 paper-texture z-0 print:hidden" />

      {/* Keyboard users can jump straight past the header */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#174B79] focus:text-white focus:font-mono focus:text-xs print:hidden"
      >
        Skip to content
      </a>

      {/* Glassmorphism Navbar */}
      <Navbar onOpenResumeModal={openResumeModal} />

      {/* Main Editorial Content Flow */}
      <main id="main" className={`relative z-10 w-full ${isResumeModalOpen ? 'print:hidden' : ''}`}>
        <HeroSection onOpenResumeModal={openResumeModal} />

        <Divider />

        <ProjectsSection />


        <Divider />
        <ExperienceSection />
        <Divider />
        <SkillsSection />
        <Divider />
        <EducationSection />

        <ContactSection onOpenResumeModal={openResumeModal} />
      </main>

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={closeResumeModal}
      />
    </div>
  );
}
