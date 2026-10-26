import Image from 'next/image';
import Section from '@/components/Section';

const achievements = [
  {
    id: 'achieve-unyc',
    title: 'Event Manager at UNYC Events',
    organization: 'Vitharkh, Samvaad, Vachan, Clash of Words',
    description:
      'Successfully managed and coordinated multiple large-scale events (Vitharkh, Samvaad, Vachan, Clash of Words), each with 150-200 participants. Responsibilities included planning, execution, and post-event analysis, ensuring smooth operations and high attendee satisfaction.',
    impactLabel: 'Participants per event series',
    impactValue: '150–200+',
    imageUrl: '/images/achievements/unyc.jpg',
    alt: 'Amith with the UNYC events team',
  },
  {
    id: 'achieve-academor',
    title: 'Outstanding Performance Award',
    organization: 'Academor',
    description:
      'Recognized for exceptional performance and leadership in data-driven projects. Spearheaded initiatives that directly contributed to a significant boost in client satisfaction metrics through innovative data analysis and solution implementation using ML.',
    impactLabel: 'Client satisfaction boost',
    impactValue: '40%',
    imageUrl: '/images/achievements/academor.jpg',
    alt: 'Academor Certificate of Outstanding Performance awarded to D Amith Viswas Reddy',
  },
];

export default function AchievementsSection() {
  return (
    <Section
      id="achievements"
      index="04"
      title="Achievements"
      tone="paper-2"
      lead="Leading people at scale, and results a client could measure."
    >
      <div className="grid gap-14 md:grid-cols-2 md:gap-8 lg:gap-12">
        {achievements.map((a) => (
          <article key={a.id} className="flex flex-col">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-3">
              <Image src={a.imageUrl} alt={a.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-1 border-b-4 border-ink pb-4">
              <p className="display tnum whitespace-nowrap text-[2.6rem] sm:text-[3.25rem] md:text-[2.75rem] lg:text-[3.25rem] xl:text-[4rem]">{a.impactValue}</p>
              <p className="max-w-[16ch] pb-1 text-right text-[15px] leading-snug text-ink-2">{a.impactLabel}</p>
            </div>
            <h3 className="mt-5 text-[1.5rem] font-semibold leading-tight tracking-[-0.02em]">{a.title}</h3>
            <p className="mt-1 text-[15px] font-medium text-ink-2">{a.organization}</p>
            <p className="mt-4 max-w-[60ch] leading-[1.6]">{a.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
