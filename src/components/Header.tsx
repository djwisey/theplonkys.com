'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from './ThemeToggle';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/gigs', label: 'Gigs' },
  { href: '/music', label: 'Music' },
  { href: '/news', label: 'News' },
  { href: '/media', label: 'Media' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 backdrop-blur bg-ocean/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl text-white">
          The Plonkys
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-seaglass ${pathname === item.href ? 'text-seaglass' : ''}`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
        <button
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-white md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
        >
          <Bars3Icon className="h-5 w-5" />
          Menu
        </button>
      </div>
      {open && (
        <div className="md:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/60" onClick={() => setOpen(false)}></div>
          <div
            ref={dialogRef}
            className="fixed inset-y-0 right-0 w-72 bg-ocean p-6 shadow-xl border-l border-white/10 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <p className="font-display text-lg text-white">Menu</p>
              <button aria-label="Close menu" onClick={() => setOpen(false)}>
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded px-2 py-1 text-base ${pathname === item.href ? 'text-seaglass' : 'text-slate-100'} hover:text-amber`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
