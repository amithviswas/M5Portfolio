import Image from 'next/image';
import Section from '@/components/Section';
import { RESUME_URL } from '@/components/HeroSection';

const contents = ['Internships', 'Projects', 'Certificates', 'Technical skills', 'Education'];

export default function ResumeSection() {
  return (
    <Section id="resume" index="06" title="Resume" tone="paper-2" lead="Everything on this page, in a file you can forward.">
      <div className="grid items-start gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 lg:col-span-4">
          <p className="max-w-[34ch] text-[1.25rem] leading-snug tracking-[-0.01em]">
            Prefer a file? Download my resume as a PDF.
          </p>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn-mark mt-7">
            Download resume (PDF)
          </a>
          <dl className="mt-12 text-[15px]">
            <div className="spec-row grid grid-cols-[6rem_1fr] gap-4 py-2.5">
              <dt className="text-ink-3">Format</dt>
              <dd className="font-medium">PDF</dd>
            </div>
            <div className="spec-row grid grid-cols-[6rem_1fr] gap-4 py-2.5">
              <dt className="text-ink-3">Covers</dt>
              <dd className="font-medium">{contents.join(', ')}</dd>
            </div>
            <div className="spec-row grid grid-cols-[6rem_1fr] gap-4 py-2.5">
              <dt className="text-ink-3">Hosted on</dt>
              <dd className="font-medium">Google Drive</dd>
            </div>
          </dl>
        </div>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block md:col-span-7 lg:col-span-7 lg:col-start-6"
          aria-label="Open the resume PDF"
        >
          <div className="relative aspect-[1200/1000] w-full overflow-hidden bg-white">
            <Image
              src="/images/resume/resume-preview.jpg"
              alt="Preview of Amith Viswas Reddy's resume"
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.015]"
            />
          </div>
          <p className="mt-3 text-[15px] text-ink-3">
            <span className="mono">Fig. R</span> First page, cropped. Opens the full PDF.
          </p>
        </a>
      </div>
    </Section>
  );
}
