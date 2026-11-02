import React from 'react';
import { personalInfo } from '../../data/resumeData';

// Opens the resume PDF in a new tab; without a PDF it opens the resume modal instead
export default function ResumeLink({ onOpenResumeModal, className, children }) {
  if (personalInfo.resumePdfUrl) {
    return (
      <a
        href={personalInfo.resumePdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onOpenResumeModal} className={className}>
      {children}
    </button>
  );
}
