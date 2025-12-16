import Link from 'next/link';
import { ReactNode } from 'react';
import { cx } from '@/lib/utils';

interface CTASectionProps {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  icon?: ReactNode;
  className?: string;
}

export function CTASection({ title, description, primary, secondary, icon, className }: CTASectionProps) {
  return (
    <div
      className={cx(
        'relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-ocean via-[#0f243a] to-[#0b1b2b] p-8 shadow-glow',
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(58,166,161,0.12),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(247,178,103,0.12),transparent_30%)]" />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          {icon && <div className="text-seaglass">{icon}</div>}
          <div>
            <h3 className="font-display text-2xl text-white">{title}</h3>
            <p className="text-slate-200 mt-1 max-w-2xl">{description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            className={cx(
              'inline-flex items-center justify-center rounded-full bg-seaglass px-5 py-3 text-sm font-semibold text-ocean shadow-lg shadow-seaglass/30 transition hover:-translate-y-0.5 hover:bg-amber'
            )}
            href={primary.href}
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white hover:border-seaglass" href={secondary.href}>
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
