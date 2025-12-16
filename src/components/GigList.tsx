'use client';

import { useMemo, useState } from 'react';
import { Gig } from '@/lib/types';
import { GigCard } from './GigCard';

interface GigListProps {
  gigs: Gig[];
}

export function GigList({ gigs }: GigListProps) {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState<'all' | string>('all');

  const years = useMemo(() => {
    const set = new Set<string>();
    gigs.forEach((gig) => set.add(new Date(gig.date).getFullYear().toString()));
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [gigs]);

  const filtered = useMemo(() => {
    return gigs.filter((gig) => {
      const matchQuery = `${gig.venue} ${gig.town}`.toLowerCase().includes(query.toLowerCase());
      const matchYear = year === 'all' || new Date(gig.date).getFullYear().toString() === year;
      return matchQuery && matchYear;
    });
  }, [gigs, query, year]);

  const upcoming = filtered.filter((g) => g.status === 'upcoming');
  const past = filtered.filter((g) => g.status === 'past');

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        <input
          type="search"
          placeholder="Search by venue or town"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-sm rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-seaglass focus:outline-none"
        />
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-seaglass focus:outline-none"
        >
          <option value="all">All years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {upcoming.map((gig) => (
          <GigCard key={gig.id} gig={gig} />
        ))}
      </div>
      {past.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Past shows</p>
          <div className="grid gap-6 md:grid-cols-2">
            {past.map((gig) => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
