import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  /** Section number in the spec sheet, e.g. "02" */
  index?: string;
  title?: string;
  /** One-line claim set opposite the title */
  lead?: ReactNode;
  tone?: 'paper' | 'paper-2' | 'ink';
}

export default function Section({ id, className, children, index, title, lead, tone = 'paper' }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full py-20 md:py-28 lg:py-32',
        tone === 'paper-2' && 'bg-paper-2',
        tone === 'ink' && 'bg-ink text-paper',
        className
      )}
    >
      <div className="wrap">
        {title && (
          <header
            className={cn(
              'sec-head mb-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-5 md:mb-16',
              tone === 'ink' && '!border-paper'
            )}
          >
            <h2 className="display flex items-baseline gap-4 text-[2.35rem] [font-variation-settings:'wdth'_108] sm:text-6xl sm:[font-variation-settings:'wdth'_118] lg:text-[5.25rem]">
              {index && (
                <span className="mono shrink-0 translate-y-[-0.1em] text-base font-medium tracking-normal md:text-lg" aria-hidden="true">
                  {index}
                </span>
              )}
              <span>{title}</span>
            </h2>
            {lead && (
              <p
                className={cn(
                  'max-w-[40ch] pb-1 text-lg leading-snug md:text-xl',
                  tone === 'ink' ? 'text-paper/85' : 'text-ink-2'
                )}
              >
                {lead}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
