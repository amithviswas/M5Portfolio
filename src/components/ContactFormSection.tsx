"use client";

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Section from '@/components/Section';
import { useToast } from '@/hooks/use-toast';
import { RESUME_URL } from '@/components/HeroSection';

interface IFormInput {
  name: string;
  email: string;
  message: string;
}

const socialLinks = [
  { name: 'GitHub', handle: 'github.com/amithviswas', href: 'https://github.com/amithviswas', ariaLabel: "Amith Viswas Reddy's GitHub Profile" },
  { name: 'LinkedIn', handle: 'in/amith-viswas-reddy', href: 'https://www.linkedin.com/in/amith-viswas-reddy/', ariaLabel: "Amith Viswas Reddy's LinkedIn Profile" },
  { name: 'Resume', handle: 'PDF on Google Drive', href: RESUME_URL, ariaLabel: "Download Amith Viswas Reddy's resume" },
];

export default function ContactFormSection() {
  const { toast } = useToast();
  const [sent, setSent] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const res = await fetch('https://formsubmit.co/ajax/amithviswas0909@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          _subject: `Portfolio message from ${data.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      toast({ title: 'Message sent', description: "Thanks for reaching out. I'll reply soon." });
      setSent(true);
      reset();
    } catch {
      toast({
        title: "Couldn't send your message",
        description: 'Please email me directly at amithviswas0909@gmail.com.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Section
      id="contact"
      index="07"
      title="Contact"
      tone="ink"
      lead="Write about a role, a project idea, or just to say hi."
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <a
            href="mailto:amithviswas0909@gmail.com"
            className="block break-words text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] underline decoration-paper/40 decoration-2 underline-offset-[0.2em] transition-colors duration-150 hover:text-mark hover:decoration-mark sm:text-[1.9rem] lg:text-[2.15rem]"
          >
            amithviswas0909@gmail.com
          </a>
          <a
            href="tel:+919143336888"
            className="mono tnum mt-4 inline-block text-[1.05rem] text-paper/85 transition-colors duration-150 hover:text-mark"
          >
            +91 91433 36888
          </a>

          <ul className="mt-12">
            {socialLinks.map((l) => (
              <li key={l.name} className="border-t border-paper/20 last:border-b">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={l.ariaLabel}
                  className="group flex items-baseline justify-between gap-4 py-4 transition-colors duration-150 hover:text-mark"
                >
                  <span className="text-[1.15rem] font-semibold">{l.name}</span>
                  <span className="mono truncate text-[13px] text-paper/70 group-hover:text-mark">
                    {l.handle} <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="lg:col-span-6 lg:col-start-7"
          aria-label="Send a message"
        >
          <h3 className="text-[1.5rem] font-semibold tracking-[-0.02em]">Send a message</h3>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-[15px] text-paper/80">Your name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                className="field"
                placeholder="Your name"
                aria-invalid={errors.name ? 'true' : 'false'}
                {...register('name', { required: 'Please add your name.' })}
              />
              {errors.name && <p className="mt-2 text-[14px] text-[#ff9f92]">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="text-[15px] text-paper/80">Your email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                className="field"
                placeholder="you@example.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                {...register('email', {
                  required: 'Please add your email so I can reply.',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'That email looks incomplete. Check it and try again.',
                  },
                })}
              />
              {errors.email && <p className="mt-2 text-[14px] text-[#ff9f92]">{errors.email.message}</p>}
            </div>
          </div>
          <div className="mt-8">
            <label htmlFor="message" className="text-[15px] text-paper/80">Your message</label>
            <textarea
              id="message"
              rows={5}
              className="field resize-y"
              placeholder="A role, a project idea, or just to say hi…"
              aria-invalid={errors.message ? 'true' : 'false'}
              {...register('message', { required: 'Please write a short message.' })}
            />
            {errors.message && <p className="mt-2 text-[14px] text-[#ff9f92]">{errors.message.message}</p>}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button type="submit" className="btn btn-mark min-w-[11rem]" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send message'}
            </button>
            <p className="text-[15px] text-paper/75" aria-live="polite">
              {sent ? 'Sent. I’ll reply to the email you gave.' : 'Goes straight to my inbox.'}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
