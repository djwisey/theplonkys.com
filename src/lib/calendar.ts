import { Gig } from './types';

export function googleCalendarLink(gig: Gig) {
  const start = new Date(`${gig.date}T${gig.time}:00`);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${gig.venue} — The Plonkys`,
    dates: `${formatDate(start)}/${formatDate(end)}`,
    details: gig.notes || 'Live with The Plonkys',
    location: `${gig.venue}, ${gig.town}`,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

export function icsFile(gig: Gig) {
  const start = new Date(`${gig.date}T${gig.time}:00`);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Plonkys//Gigs//EN',
    'BEGIN:VEVENT',
    `UID:${gig.id}@theplonkys.com`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(start)}`,
    `DTEND:${formatDate(end)}`,
    `SUMMARY:${gig.venue} — The Plonkys`,
    `LOCATION:${gig.venue}, ${gig.town}`,
    `DESCRIPTION:${gig.notes || ''}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n');
}

function formatDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}
