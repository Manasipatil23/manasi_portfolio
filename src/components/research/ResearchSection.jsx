import React from 'react';
import { researchData, experienceData } from '../../data/resumeData';
import SectionHeader from '../ui/SectionHeader';
import ArchitectureFlow from '../projects/ArchitectureFlow';
import ModelScoreboard from './ModelScoreboard';
import FigureCarousel from './FigureCarousel';

const internship = experienceData.find((e) => e.id === 'ml-research');

export default function ResearchSection() {
  return (
    <section id="research" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeader
        kicker="02 • ML Research"
        title="Mapping malaria risk from space"
        titleVariant="scramble"
        intro={`${internship.role}, ${internship.organisation} ${internship.affiliation} · ${internship.period} · ${researchData.team}. Satellite imagery in, risk maps out.`}
      />

      <div className="mb-6">
        <ArchitectureFlow stages={researchData.pipeline} label="Pipeline" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <FigureCarousel slides={researchData.slides} />
        <ModelScoreboard models={researchData.models} />
      </div>
    </section>
  );
}
