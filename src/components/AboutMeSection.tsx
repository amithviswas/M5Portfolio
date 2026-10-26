import Image from 'next/image';
import Section from '@/components/Section';
import { projectsData } from '@/lib/data';

const record = [
  { k: 'Joined Accenture', v: '2026' },
  { k: 'Projects built', v: String(projectsData.length) },
  { k: 'Key certifications', v: '5+' },
];

export default function AboutMeSection() {
  return (
    <Section
      id="about"
      index="01"
      title="About"
      tone="paper-2"
      lead="D. Amith Viswas Reddy: engineer at Accenture who turns repetitive work into reliable tools."
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <figure className="md:col-span-5 lg:col-span-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-3">
            <Image
              src="/images/profile/portrait.jpg"
              alt="Portrait of Amith Viswas Reddy"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-[50%_20%]"
            />
          </div>
          <figcaption className="mt-3 text-[15px] text-ink-3">
            <span className="mono">Fig. A</span> Amith, Hyderabad
          </figcaption>
        </figure>

        <div className="flex flex-col md:col-span-7 lg:col-span-7 lg:col-start-6">
          <h3 className="text-[1.65rem] font-semibold leading-tight tracking-[-0.02em] md:text-[2rem]">
            D. Amith Viswas Reddy
          </h3>
          <div className="mt-6 max-w-[62ch] space-y-5 text-[1.125rem] leading-[1.6]">
            <p>
              Associate Software Engineer at <strong className="font-semibold">Accenture, Hyderabad</strong>. I build
              AI-powered web apps, agents and automations: from team-memory tools and agent workflows to Telegram bots
              and RPA with UiPath.
            </p>
            <p>
              B.Tech in Computer Science from Lovely Professional University (2022–2026). I work with{' '}
              <strong className="font-semibold">Python, Next.js, TypeScript and FastAPI</strong>, and enjoy turning
              repetitive work into simple, reliable tools.
            </p>
            <p className="text-ink-2">
              Explore my{' '}
              <a href="#projects" className="link font-semibold text-ink">projects</a> or download my full{' '}
              <a href="#resume" className="link font-semibold text-ink">resume</a>.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-px bg-paper-3 md:mt-auto">
            {record.map((r) => (
              <div key={r.k} className="flex flex-col-reverse justify-end bg-paper-2 pr-3 pt-4 first:pl-0 [&:not(:first-child)]:pl-4">
                <dt className="mt-2 text-[15px] leading-snug text-ink-2">{r.k}</dt>
                <dd className="display tnum text-[2.25rem] md:text-[2.5rem] lg:text-[3.25rem]">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
