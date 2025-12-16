import { ReactNode } from 'react';
import { cx } from '@/lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
}

export function Section({ id, className, title, eyebrow, children }: SectionProps) {
  return (
    <section id={id} className={cx('py-16 sm:py-20', className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {eyebrow && <p className="text-sm uppercase tracking-[0.2em] text-seaglass mb-3">{eyebrow}</p>}
        {title && <h2 className="font-display text-3xl sm:text-4xl text-white mb-6">{title}</h2>}
        {children}
      </div>
    </section>
  );
}
