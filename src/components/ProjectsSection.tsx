"use client";

import Image from 'next/image';
import { useRef, useState } from 'react';
import Section from '@/components/Section';
import { projectsData } from '@/lib/data';
import type { Project } from '@/lib/types';

const INITIAL_COUNT = 6;

function Links({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-semibold">
      {project.projectUrl && (
        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="link">
          Live site<span aria-hidden="true"> ↗</span>
        </a>
      )}
      {project.repoUrl && (
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="link">
          Source code<span aria-hidden="true"> ↗</span>
        </a>
      )}
    </div>
  );
}

function FeaturedRow({ project, n }: { project: Project; n: number }) {
  return (
    <article className="spec-row grid gap-6 py-8 md:grid-cols-12 md:gap-8 md:py-10">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink md:col-span-5">
        <Image
          src={project.imageUrl}
          alt={`${project.title}: ${project.description}`}
          fill
          sizes="(max-width: 768px) 100vw, 42vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col md:col-span-7 lg:pl-4">
        <p className="mono text-[13px] text-ink-3">P/{String(n).padStart(2, '0')}</p>
        <h3 className="mt-2 text-[1.6rem] font-bold leading-[1.1] tracking-[-0.025em] [font-variation-settings:'wdth'_110] md:text-[2.1rem]">
          {project.title}
        </h3>
        <p className="mt-3 max-w-[60ch] text-[1.0625rem] leading-[1.6]">{project.longDescription}</p>
        <dl className="mt-5 grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-1 text-[15px]">
          <dt className="text-ink-3">Stack</dt>
          <dd className="mono text-[13.5px] leading-relaxed text-ink-2">{project.technologies.join(' / ')}</dd>
        </dl>
        <div className="mt-6">
          <Links project={project} />
        </div>
      </div>
    </article>
  );
}

function ExperimentCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col bg-paper">
      <div className="relative aspect-[2/1] w-full overflow-hidden bg-ink">
        <Image
          src={project.imageUrl}
          alt={`${project.title}: ${project.description}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.2rem] font-semibold leading-snug tracking-[-0.015em]">
          {project.title.replace(/^Experiment:\s*/, '')}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{project.longDescription}</p>
        <p className="mono mt-3 text-[13px] text-ink-2">{project.technologies.join(' / ')}</p>
        <div className="mt-auto pt-4">
          <Links project={project} />
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const featured = projectsData.slice(0, INITIAL_COUNT);
  const rest = projectsData.slice(INITIAL_COUNT);
  const hiddenCount = rest.length;

  return (
    <Section
      id="projects"
      index="03"
      title="Projects"
      lead={`${featured.length} AI and automation builds, plus ${hiddenCount} early front-end experiments.`}
    >
      <div>
        {featured.map((p, i) => (
          <FeaturedRow key={p.id} project={p} n={i + 1} />
        ))}
      </div>

      {showAll && hiddenCount > 0 && (
        <div id="more-projects" className="mt-6 bg-paper-2 p-px">
          <h3 className="px-5 pb-4 pt-6 text-[1.35rem] font-semibold tracking-[-0.015em]">Early experiments</h3>
          <div className="grid gap-px md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <ExperimentCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}

      {hiddenCount > 0 && (
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            ref={toggleRef}
            type="button"
            className="btn btn-ink"
            aria-expanded={showAll}
            aria-controls="more-projects"
            onClick={() => {
              if (showAll) {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
              setShowAll(!showAll);
            }}
          >
            {showAll ? 'Show fewer projects' : `Show ${hiddenCount} more projects`}
          </button>
          {!showAll && (
            <p className="text-[15px] text-ink-2">
              Games, a music player and UI recreations, built while learning front-end.
            </p>
          )}
        </div>
      )}
    </Section>
  );
}
