import Image from 'next/image';
import Section from '@/components/Section';

const certifications = [
  {
    title: 'NPTEL Certification in Software Testing',
    issuer: 'NPTEL (IIT Kharagpur)',
    image: '/images/certifications/nptel.jpg',
    description:
      'Completed a comprehensive course and examination on software testing methodologies and practices, covering various testing levels, techniques, black-box and white-box testing, test case design, and automated test tools.',
  },
  {
    title: 'Internship at Academor',
    issuer: 'Academor',
    image: '/images/certifications/academor.jpg',
    description:
      'Successfully completed an internship program focusing on data-driven projects and real-world web development, gaining hands-on experience in data analysis, problem-solving, front-end technologies, and teamwork in an agile environment.',
  },
  {
    title: 'Full Stack Development using Python and Django',
    issuer: 'CipherSchools',
    image: '/images/certifications/cipherschools.jpg',
    description:
      'Mastered full-stack web development principles using Python and Django framework, including front-end and back-end technologies, and integrating databases effectively.',
  },
];

export default function CertificationsSection() {
  return (
    <Section
      id="certifications"
      index="05"
      title="Certifications"
      lead="Testing, web development and data work, each backed by a certificate."
    >
      <ol>
        {certifications.map((c) => (
          <li key={c.title} className="spec-row grid gap-5 py-8 md:grid-cols-12 md:gap-8">
            <p className="text-[15px] font-medium text-ink-2 md:col-span-3 md:pt-1.5">{c.issuer}</p>
            <div className="md:col-span-6">
              <h3 className="text-[1.4rem] font-semibold leading-tight tracking-[-0.02em] md:text-[1.65rem]">{c.title}</h3>
              <p className="mt-3 max-w-[58ch] leading-[1.6] text-ink-2">{c.description}</p>
            </div>
            <div className="relative aspect-[7/5] w-full max-w-[22rem] overflow-hidden bg-paper-2 md:col-span-3 md:max-w-none">
              <Image
                src={c.image}
                alt={`${c.title} certificate`}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-contain p-2"
              />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
