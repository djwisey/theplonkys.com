export type GigStatus = 'upcoming' | 'past';

export interface Gig {
  id: string;
  date: string;
  time: string;
  venue: string;
  town: string;
  ticketsUrl?: string;
  notes?: string;
  status: GigStatus;
}

export interface NewsFrontMatter {
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
}

export interface BandMember {
  name: string;
  role: string;
  photo?: string;
  bio: string;
}

export interface BandContent {
  bio: string;
  socials: { label: string; url: string; icon?: string }[];
  members: BandMember[];
  pressContacts: { label: string; value: string; type: 'email' | 'phone' | 'link' }[];
  embeds: {
    spotify: string;
    youtube: string;
    appleMusic?: string;
  };
  gallery: { src: string; alt: string }[];
  videos: { title: string; url: string }[];
  quotes: { quote: string; source: string }[];
  epk: { pressPhotos: string; techRider: string; logo: string };
}

export interface Release {
  title: string;
  description: string;
  cover: string;
  links: { label: string; url: string }[];
}
