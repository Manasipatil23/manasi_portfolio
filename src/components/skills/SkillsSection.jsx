import React from 'react';
import { skillEvidence, evidenceLabels, otherSkills } from '../../data/resumeData';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

// Each skill links to the project, role or certificate where it was used
export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        kicker="04 • Skills"
        title="Skills, with Evidence"
        intro="Each skill links to where I used it. Select one to jump to that project or role."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {skillEvidence.map((group) => (
          <div key={group.group} className="card-editorial p-5 sm:p-6">
            <h3 className="font-headline font-bold text-base text-[#174B79] pb-2.5 mb-3 border-b border-[#D9C9B7]">
              {group.group}
            </h3>
            <dl className="divide-y divide-[#D9C9B7]/60">
              {group.skills.map((skill) => (
                <div key={skill.name} className="py-2 flex flex-wrap sm:flex-nowrap items-baseline gap-x-3 gap-y-1 sm:gap-4">
                  <dt className="font-body text-sm font-semibold text-[#174B79] sm:w-56 sm:shrink-0">
                    {skill.name}
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {skill.where.map((id) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        className="group inline-flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded-md bg-[#F5F0E8] border border-[#D9C9B7] text-[#174B79] hover:border-[#E9784F] hover:text-[#E9784F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E9784F]"
                      >
                        {evidenceLabels[id]}
                        <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                      </a>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <span className="font-mono text-xs uppercase tracking-wider text-[#174B79]/80 font-bold block mb-2">
          Also worked with
        </span>
        <p className="font-body text-sm text-[#174B79]/90 leading-relaxed">
          {otherSkills.join(' · ')}
        </p>
      </div>
    </section>
  );
}
