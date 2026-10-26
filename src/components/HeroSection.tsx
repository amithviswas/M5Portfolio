"use client";

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { projectsData } from '@/lib/data';
import { cn } from '@/lib/utils';

export const RESUME_URL =
  'https://drive.google.com/file/d/1KGfnTG-dXnwmolefmNbpA7a5DrxeI0Le/view?usp=drive_link';

const FEATURED = projectsData.slice(0, 6);
const PLATE_MS = 5200;

const spec = [
  { k: 'Role', v: 'Associate Software Engineer, Accenture' },
  { k: 'Based in', v: 'Hyderabad, India' },
  { k: 'Education', v: 'B.Tech CSE, LPU, 2022–2026' },
  { k: 'Works in', v: 'Python · Next.js · TypeScript · FastAPI' },
];

function FigurePlate() {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const go = useCallback(
    (next: number) => {
      setIdx((cur) => {
        if (cur === next) return cur;
        setPrev(cur);
        return next;
      });
    },
    []
  );

  const stopped = paused || hovering || reduced;

  useEffect(() => {
    if (stopped) return;
    timer.current = setTimeout(() => go((idx + 1) % FEATURED.length), PLATE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [idx, stopped, go]);

  const p = FEATURED[idx];
  const href = p.projectUrl ?? p.repoUrl;

  return (
    <figure
      className={cn('flex flex-col', stopped && 'plate-paused')}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
      aria-roledescription="carousel"
      aria-label="Selected projects"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
        {FEATURED.map((proj, i) => {
          const isCur = i === idx;
          const isPrev = i === prev;
          return (
            <div
              key={isCur ? `cur-${idx}` : proj.id}
              className={cn(
                'absolute inset-0',
                isCur ? 'plate-current z-20' : isPrev ? 'z-10' : 'z-0 opacity-0'
              )}
              aria-hidden={!isCur}
            >
              <Image
                src={proj.imageUrl}
                alt={isCur ? `${proj.title}: ${proj.description}` : ''}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>

      <div className="relative h-[3px] w-full bg-paper-3" aria-hidden="true">
        <div key={`bar-${idx}`} className="plate-progress absolute inset-0 bg-ink" style={{ ['--plate-ms' as string]: `${PLATE_MS}ms` }} />
      </div>

      <figcaption className="mt-4 grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-3">
        <div className="min-w-0" aria-live={stopped ? 'polite' : 'off'}>
          <p className="text-[15px] text-ink-3">
            <span className="mono text-[13.5px]">Fig. {String(idx + 1).padStart(2, '0')}</span> of {FEATURED.length}, selected work
          </p>
          <p className="mt-1 text-lg font-semibold leading-snug tracking-[-0.01em]">
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="link">
                {p.title}
              </a>
            ) : (
              p.title
            )}
          </p>
          <p className="mono mt-1 text-[13px] text-ink-2">{p.technologies.join(' / ')}</p>
        </div>
        <div className="flex items-center gap-1">
          {FEATURED.map((proj, i) => (
            <button
              key={proj.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${proj.title}`}
              aria-current={i === idx ? 'true' : undefined}
              className={cn(
                'mono hidden h-9 w-9 items-center justify-center text-[13px] transition-colors duration-150 sm:flex',
                i === idx ? 'bg-ink text-paper' : 'text-ink-2 hover:bg-paper-2'
              )}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go((idx + 1) % FEATURED.length)}
            className="flex h-9 items-center px-3 text-[14px] font-semibold hover:bg-paper-2 sm:hidden"
            aria-label="Next project"
          >
            Next
          </button>
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            className="ml-1 flex h-9 items-center border-2 border-ink px-3 text-[14px] font-semibold transition-colors duration-150 hover:bg-ink hover:text-paper"
            aria-pressed={paused}
          >
            {paused || reduced ? 'Play' : 'Pause'}
          </button>
        </div>
      </figcaption>
    </figure>
  );
}

export default function HeroSection() {
  return (
    <section id="home" className="relative pb-20 pt-10 md:pb-28 md:pt-14 lg:pb-32">
      <div className="wrap">
        <h1 className="display text-[clamp(2.75rem,11vw,6.5rem)] [font-variation-settings:'wdth'_100] sm:[font-variation-settings:'wdth'_118]">
          Amith Viswas Reddy
        </h1>

        <div className="mt-10 grid gap-12 md:mt-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          <div className="lg:col-span-5 lg:row-start-1">
            <p className="max-w-[30ch] text-[1.45rem] font-medium leading-[1.3] tracking-[-0.015em] md:text-[1.7rem]">
              I build AI-powered apps, agents and automations, and turn repetitive work into simple, reliable tools.
            </p>
            <p className="mt-5 max-w-[46ch] text-ink-2">
              Hi, I&apos;m Amith, an Associate Software Engineer at Accenture, Hyderabad. Take a look at my projects below.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-mark">View projects</a>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                Download resume
              </a>
              <a href="#contact" className="inline-flex min-h-[52px] items-center px-2 font-semibold underline decoration-1 underline-offset-[0.25em] transition-colors duration-150 hover:bg-mark">
                Contact me
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <FigurePlate />
          </div>

          <dl className="text-[15px] lg:col-span-5 lg:row-start-2 lg:self-end">
            {spec.map((row) => (
              <div key={row.k} className="spec-row grid grid-cols-[7.5rem_1fr] gap-4 py-2.5">
                <dt className="text-ink-3">{row.k}</dt>
                <dd className="font-medium">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
