import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  action?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'light',
  action,
}: SectionHeadingProps) {
  const ref = useReveal<HTMLDivElement>();
  const center = align === 'center';
  return (
    <div
      ref={ref}
      className={`reveal flex flex-col gap-6 ${
        center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className="max-w-2xl">
        <p className={`eyebrow ${tone === 'dark' ? 'text-gold' : 'text-bark'}`}>{eyebrow}</p>
        <h2
          className={`mt-3 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.05] tracking-tight ${
            tone === 'dark' ? 'text-cream' : 'text-forest'
          }`}
        >
          {title}
        </h2>
        {intro && (
          <p
            className={`mt-4 text-[15px] sm:text-base leading-relaxed ${
              tone === 'dark' ? 'text-sage' : 'text-muted'
            }`}
          >
            {intro}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
