"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export const navLinks = [
  { name: 'About', id: 'about', n: '01' },
  { name: 'Skills', id: 'skills', n: '02' },
  { name: 'Projects', id: 'projects', n: '03' },
  { name: 'Achievements', id: 'achievements', n: '04' },
  { name: 'Certifications', id: 'certifications', n: '05' },
  { name: 'Resume', id: 'resume', n: '06' },
  { name: 'Contact', id: 'contact', n: '07' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const hero = document.getElementById('home');
      if (hero && window.scrollY < hero.offsetHeight * 0.6) setActive('');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && window.scrollY > 200) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-paper transition-[box-shadow] duration-200',
        scrolled && 'shadow-[0_1px_0_0_var(--paper-3)]'
      )}
    >
      <nav className="wrap flex h-[var(--nav-h)] items-center justify-between gap-6" aria-label="Main">
        <a href="#home" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/av-logo-ink.png"
            alt=""
            width={46}
            height={36}
            style={{ width: 46, height: 36 }}
            className="object-contain"
            priority
          />
          <span className="text-[15px] font-semibold leading-tight tracking-[-0.01em]">
            Amith Viswas Reddy
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={cn(
                  'flex items-baseline gap-1.5 px-2.5 py-2 text-[15px] font-medium transition-colors duration-150',
                  active === l.id ? 'bg-mark text-ink' : 'text-ink-2 hover:bg-paper-2 hover:text-ink'
                )}
              >
                <span className="mono text-[11px] text-ink-3" aria-hidden="true">{l.n}</span>
                {l.name}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="flex h-11 items-center gap-2 border-2 border-ink px-3 text-[15px] font-semibold lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-4" aria-hidden="true">
            <span className={cn('absolute left-0 h-[2px] w-4 bg-ink transition-transform duration-200', open ? 'top-[5px] rotate-45' : 'top-0')} />
            <span className={cn('absolute left-0 h-[2px] w-4 bg-ink transition-transform duration-200', open ? 'top-[5px] -rotate-45' : 'top-[10px]')} />
          </span>
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t-4 border-ink bg-paper lg:hidden"
      >
        <ul className="wrap py-3">
          {navLinks.map((l) => (
            <li key={l.id} className="spec-row">
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-baseline gap-4 py-4 text-2xl font-semibold tracking-[-0.02em]',
                  active === l.id && 'text-ink'
                )}
              >
                <span className="mono w-7 text-sm font-normal text-ink-3" aria-hidden="true">{l.n}</span>
                <span className={cn(active === l.id && 'bg-mark px-1 -mx-1')}>{l.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
