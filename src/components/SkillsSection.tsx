import Section from '@/components/Section';

type Row = { area: string; skill: string; note?: string; cert?: boolean; usedIn?: string };

const groups: { area: string; rows: Row[] }[] = [
  {
    area: 'Languages',
    rows: [
      { area: 'Language', skill: 'Python', usedIn: 'LinkedIn Automation Agent, CrimeScope, PDF Helper Bot' },
      { area: 'Language', skill: 'TypeScript & JavaScript', usedIn: 'ContextMesh, NeuralFlow, CareerCompass' },
    ],
  },
  {
    area: 'Frontend',
    rows: [{ area: 'Frontend', skill: 'Next.js & React', usedIn: 'ContextMesh, NeuralFlow, CareerCompass, CrimeScope' }],
  },
  {
    area: 'Backend',
    rows: [{ area: 'Backend', skill: 'FastAPI & Django', usedIn: 'CrimeScope (FastAPI)' }],
  },
  {
    area: 'AI',
    rows: [
      { area: 'AI', skill: 'AI Agents & LLM APIs', usedIn: 'NeuralFlow, LinkedIn Automation Agent, CareerCompass' },
      { area: 'AI', skill: 'Prompt Engineering', usedIn: 'LinkedIn Automation Agent, CareerCompass' },
    ],
  },
  {
    area: 'Automation',
    rows: [
      { area: 'Automation', skill: 'UiPath RPA', note: 'Certified', cert: true },
      { area: 'Automation', skill: 'Telegram Bots', usedIn: 'PDF Helper Bot' },
    ],
  },
  {
    area: 'Data',
    rows: [
      { area: 'Data', skill: 'SQL & PostgreSQL', usedIn: 'ContextMesh (Supabase)' },
      { area: 'Data', skill: 'Tableau', note: 'Data visualization' },
    ],
  },
  {
    area: 'DevOps',
    rows: [
      { area: 'DevOps', skill: 'Docker & Linux', usedIn: 'PDF Helper Bot' },
      { area: 'DevOps', skill: 'Git & GitHub Actions', usedIn: 'LinkedIn Automation Agent' },
    ],
  },
  {
    area: 'Deployment',
    rows: [{ area: 'Deployment', skill: 'Vercel, Netlify & Render', usedIn: 'ContextMesh, NeuralFlow, CareerCompass' }],
  },
  {
    area: 'CRM',
    rows: [{ area: 'CRM', skill: 'Salesforce', note: 'Trained' }],
  },
  {
    area: 'Testing',
    rows: [{ area: 'Testing', skill: 'Software Testing', note: 'NPTEL certified', cert: true }],
  },
  {
    area: 'Spoken',
    rows: [{ area: 'Languages', skill: 'English, Hindi, Telugu, Japanese', note: 'Spoken' }],
  },
];

const total = groups.reduce((n, g) => n + g.rows.length, 0);

export default function SkillsSection() {
  return (
    <Section
      id="skills"
      index="02"
      title="Skills"
      lead={`${total} working skills across ${groups.length} areas, each tied to the project it was used in or the course that certified it.`}
    >
      <table className="w-full border-collapse text-left max-md:block">
        <caption className="sr-only">Skills by area, with notes and the projects they were used in</caption>
        <thead className="max-md:hidden">
          <tr className="text-[15px] text-ink-3">
            <th scope="col" className="w-[16%] pb-3 font-normal">Area</th>
            <th scope="col" className="w-[30%] pb-3 font-normal">Skill</th>
            <th scope="col" className="w-[16%] pb-3 font-normal">Note</th>
            <th scope="col" className="pb-3 font-normal">Applied in</th>
          </tr>
        </thead>
        {groups.map((g) => (
          <tbody key={g.area} className="spec-row group max-md:block max-md:py-4">
            {g.rows.map((r, i) => (
              <tr key={r.skill} className="transition-colors duration-150 hover:bg-paper-2 max-md:grid max-md:grid-cols-[6.5rem_1fr] max-md:gap-x-3 max-md:py-1.5 max-md:hover:bg-transparent">
                <th
                  scope="row"
                  className={`align-top text-[15px] font-normal text-ink-3 md:py-3.5 ${i > 0 ? 'max-md:invisible md:text-transparent' : ''}`}
                >
                  {g.area === 'Spoken' ? 'Languages' : g.area}
                </th>
                <td className="align-top text-[1.2rem] font-semibold leading-snug tracking-[-0.01em] md:py-3 md:text-[1.35rem]">
                  {r.skill}
                </td>
                <td className="align-top text-[15px] max-md:col-start-2 max-md:empty:hidden md:py-3.5">
                  {r.note &&
                    (r.cert ? (
                      <span className="bg-mark px-1.5 py-0.5 font-medium text-ink">{r.note}</span>
                    ) : (
                      <span className="text-ink-2">{r.note}</span>
                    ))}
                </td>
                <td className="mono align-top text-[13px] leading-relaxed text-ink-2 max-md:col-start-2 max-md:empty:hidden md:py-4">
                  {r.usedIn}
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </Section>
  );
}
