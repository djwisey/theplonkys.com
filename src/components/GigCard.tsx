import Link from 'next/link';
import { Gig } from '@/lib/types';
import { formatDateDisplay } from '@/lib/utils';
import { googleCalendarLink, icsFile } from '@/lib/calendar';

interface GigCardProps {
  gig: Gig;
}

export function GigCard({ gig }: GigCardProps) {
  const google = googleCalendarLink(gig);
  const ics = icsFile(gig);
  return (
    <article className="flex flex-col justify-between rounded-xl border border-white/5 bg-white/5 p-5 shadow-lg shadow-black/10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-seaglass">{gig.town}</p>
          <h3 className="font-display text-xl text-white">{gig.venue}</h3>
          <p className="text-slate-300">{formatDateDisplay(gig.date)} · {gig.time}</p>
          {gig.notes && <p className="mt-2 text-slate-200">{gig.notes}</p>}
        </div>
        {gig.ticketsUrl && (
          <Link
            href={gig.ticketsUrl}
            target="_blank"
            className="rounded-full bg-seaglass px-4 py-2 text-sm font-semibold text-ocean hover:bg-amber"
          >
            Tickets
          </Link>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-300">
        <a href={google} className="hover:text-seaglass" target="_blank" rel="noreferrer">
          Add to Google Calendar
        </a>
        <a
          href={`data:text/calendar;charset=utf8,${encodeURIComponent(ics)}`}
          download={`${gig.venue}-${gig.date}.ics`}
          className="hover:text-amber"
        >
          Download .ics
        </a>
      </div>
    </article>
  );
}
