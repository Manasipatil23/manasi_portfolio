import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

const INTERVAL_MS = 4500;

// Self-advancing slideshow of research figures; pauses on hover/focus, click to enlarge
export default function FigureCarousel({ slides }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [zoomed, setZoomed] = useState(null);
  const closeRef = useRef(null);

  const go = useCallback((delta) => {
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || zoomed !== null || reduced) return;
    const id = setTimeout(() => go(1), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [index, paused, zoomed, go]);

  // Lightbox keyboard: Escape closes, arrows move
  useEffect(() => {
    if (zoomed === null) return;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') setZoomed(null);
      if (e.key === 'ArrowRight') setZoomed((z) => (z + 1) % slides.length);
      if (e.key === 'ArrowLeft') setZoomed((z) => (z - 1 + slides.length) % slides.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [zoomed, slides.length]);

  const slide = slides[index];

  return (
    <div
      className="card-editorial p-4 sm:p-5 h-full flex flex-col"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Research figures"
    >
      {/* Stage: all slides stacked, the active one fades and slides in */}
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-white border border-[#D9C9B7]">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setZoomed(i)}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
            aria-label={`Enlarge: ${s.title}`}
            className="absolute inset-0 flex items-center justify-center p-2 transition-all duration-700 ease-out focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#E9784F]"
            style={{
              opacity: i === index ? 1 : 0,
              transform: i === index ? 'translateX(0) scale(1)' : `translateX(${i < index ? '-6%' : '6%'}) scale(0.98)`,
              pointerEvents: i === index ? 'auto' : 'none',
            }}
          >
            <img src={s.src} alt={s.title} loading="lazy" className="max-w-full max-h-full object-contain" />
          </button>
        ))}

        <span className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 border border-[#D9C9B7] text-[#174B79] pointer-events-none">
          <Maximize2 className="w-3.5 h-3.5" />
        </span>

        {/* Progress bar for the auto-advance */}
        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#D9C9B7]/60">
          <div
            key={`${index}-${paused}`}
            className="h-full bg-[#E9784F] carousel-progress"
            style={{ animationDuration: `${INTERVAL_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
          />
        </div>
      </div>

      {/* Caption + controls */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div aria-live="polite" className="min-w-0">
          <p className="font-headline font-bold text-sm text-[#174B79]">{slide.title}</p>
          <p className="font-body text-xs text-[#174B79]/80 leading-relaxed mt-0.5">{slide.caption}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button type="button" onClick={() => go(-1)} aria-label="Previous figure" className="p-2 rounded-full border border-[#D9C9B7] hover:border-[#174B79] text-[#174B79] focus:outline-none focus:ring-2 focus:ring-[#E9784F]">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next figure" className="p-2 rounded-full border border-[#D9C9B7] hover:border-[#174B79] text-[#174B79] focus:outline-none focus:ring-2 focus:ring-[#E9784F]">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Choose figure">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={s.title}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#E9784F] ${i === index ? 'w-6 bg-[#E9784F]' : 'w-1.5 bg-[#174B79]/30 hover:bg-[#174B79]/60'}`}
          />
        ))}
      </div>

      {/* Lightbox */}
      {zoomed !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={slides[zoomed].title}
          data-lenis-prevent
          onClick={(e) => e.target === e.currentTarget && setZoomed(null)}
          className="fixed inset-0 z-[70] bg-[#0F3354]/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setZoomed(null)}
            aria-label="Close figure"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#E9784F]"
          >
            <X className="w-5 h-5" />
          </button>
          <img src={slides[zoomed].src} alt={slides[zoomed].title} className="max-w-full max-h-[80vh] object-contain rounded-lg bg-white" />
          <p className="mt-4 text-center font-body text-sm text-white/90 max-w-2xl">
            <span className="font-semibold">{slides[zoomed].title}.</span> {slides[zoomed].caption}
          </p>
        </div>
      )}
    </div>
  );
}
