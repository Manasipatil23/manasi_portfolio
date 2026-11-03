import React, { useState } from 'react';
import { researchData, experienceData } from '../../data/resumeData';
import SectionHeader from '../ui/SectionHeader';
import ArchitectureFlow from '../projects/ArchitectureFlow';
import ModelScoreboard from './ModelScoreboard';
import FigureCarousel from './FigureCarousel';

const internship = experienceData.find((e) => e.id === 'ml-research');

export default function ResearchSection() {
  // Phones show the figures or the scoreboard, one at a time
  const [view, setView] = useState('figures');

  return (
    <section id="research" className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeader
        kicker="02 • ML Research"
        title="Mapping malaria risk from space"
        titleVariant="scramble"
        intro={`${internship.role}, ${internship.organisation} ${internship.affiliation} · ${internship.period} · ${researchData.team}. Satellite imagery in, risk maps out.`}
      />

      <div className="mb-5 lg:mb-6">
        <ArchitectureFlow stages={researchData.pipeline} label="Pipeline" />
      </div>

      <div className="lg:hidden flex mb-3 rounded-full border border-[#D9C9B7] bg-[#FAF7F2] p-1" role="tablist">
        {[['figures', 'Figures'], ['scores', 'Model scores']].map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={view === key}
            onClick={() => setView(key)}
            className={`flex-1 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E9784F] ${
              view === key ? 'bg-[#174B79] text-[#F5F0E8]' : 'text-[#174B79]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className={`${view === 'figures' ? 'grid' : 'hidden'} lg:grid`}>
          <FigureCarousel slides={researchData.slides} />
        </div>
        <div className={`${view === 'scores' ? 'grid' : 'hidden'} lg:grid`}>
          <ModelScoreboard models={researchData.models} />
        </div>
      </div>
    </section>
  );
}
