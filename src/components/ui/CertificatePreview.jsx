import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Eye, X, ShieldCheck } from 'lucide-react';

// "View certificate" button that opens the certificate image in a pop-up.
// Rendered into <body> so animated (transformed) parent cards can't trap the overlay.
export default function CertificatePreview({ certificate, className = '' }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);
  const { image, title, verifyUrl } = certificate;

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#E9784F] hover:text-[#D86438] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9784F] rounded ${className}`}
      >
        <Eye className="w-3.5 h-3.5" />
        View certificate
      </button>

      {open && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          data-lenis-prevent
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          className="fixed inset-0 z-[80] bg-[#0F3354]/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8 print:hidden"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close certificate"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#E9784F]"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={image}
            alt={`Certificate: ${title}`}
            className="max-w-full max-h-[80vh] object-contain rounded-lg bg-white shadow-2xl"
          />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-center">
            <p className="font-body text-sm text-white/90 font-semibold">{title}</p>
            {verifyUrl && (
              <a
                href={verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] focus:outline-none focus:ring-2 focus:ring-[#E9784F]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#E9784F]" />
                Verify on Coursera
              </a>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
