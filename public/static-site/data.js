const band = {
  name: 'The Plonkys',
  tagline: 'Tidal melodies, windswept strings, and songs crafted on the edge of the North Sea.',
  bio: 'The Plonkys blend fiddle-led melodies with atmospheric guitars, writing songs shaped by Shetland tides and long solstice nights.',
  socials: [
    { label: 'Instagram', url: 'https://instagram.com', icon: '📸' },
    { label: 'Spotify', url: 'https://open.spotify.com', icon: '🎧' },
    { label: 'YouTube', url: 'https://youtube.com', icon: '▶️' },
  ],
  members: [
    { name: 'Isla Thomsen', role: 'Vocals / Guitar', bio: 'Songwriter drawing on island stories and vivid imagery.' },
    { name: 'Calum Reid', role: 'Fiddle', bio: 'Fiddle textures that sit between trad roots and cinematic swells.' },
    { name: 'Mara Gunn', role: 'Bass / Synth', bio: 'Anchors the low end with warm synth beds and melodic bass.' },
    { name: 'Euan Kerr', role: 'Percussion', bio: 'Subtle grooves with brushes, mallets, and coastal field textures.' },
  ],
  pressContacts: [
    { label: 'Booking', value: 'booking@theplonkys.com', type: 'email' },
    { label: 'Press', value: 'press@theplonkys.com', type: 'email' },
  ],
  embeds: {
    spotify: 'https://open.spotify.com/artist/placeholder',
    youtube: 'https://youtube.com/playlist?list=placeholder',
    appleMusic: 'https://music.apple.com/artist/placeholder',
  },
  epk: {
    pressPhotos: '/downloads/press-photos.zip',
    techRider: '/downloads/the-plonkys-tech-rider.pdf',
    logo: '/downloads/the-plonkys-logo-pack.zip',
  },
  quotes: [
    { quote: 'Full of salt air and late-night warmth.', source: 'Northern Notes' },
    { quote: 'A cinematic sweep without losing the trad heart.', source: 'Coastal Sound' },
    { quote: 'Songs that feel like bonfire embers in the wind.', source: 'Island Weekly' },
  ],
};

const gigs = [
  {
    id: 'lerwick-hall',
    date: '2025-02-14',
    time: '20:00',
    venue: 'Mareel',
    town: 'Lerwick',
    ticketsUrl: 'https://tickets.example.com/plonkys-lerwick',
    notes: 'Winter lights show with special guests.',
    status: 'upcoming',
  },
  {
    id: 'scalloway',
    date: '2025-03-22',
    time: '19:30',
    venue: 'Scalloway Hall',
    town: 'Scalloway',
    ticketsUrl: 'https://tickets.example.com/plonkys-scalloway',
    notes: 'All-ages show. Local food pop-up.',
    status: 'upcoming',
  },
  {
    id: 'aberdeen',
    date: '2024-11-08',
    time: '21:00',
    venue: 'The Blue Lamp',
    town: 'Aberdeen',
    ticketsUrl: 'https://tickets.example.com/plonkys-aberdeen',
    notes: 'Ferry-weekender warmup set.',
    status: 'past',
  },
];

const newsPosts = [
  {
    slug: 'new-single',
    title: "New single 'Harbour Lights' out now",
    date: '2024-10-01',
    excerpt: 'A tidal new track recorded between foggy mornings and late-night sessions.',
    body:
      'We recorded Harbour Lights on a calm night in Lerwick, layering fiddle swells with field recordings from the harbour. Give it a listen and let us know what you think.',
    links: [
      { label: 'Spotify', url: 'https://open.spotify.com' },
      { label: 'YouTube', url: 'https://youtube.com' },
    ],
  },
  {
    slug: 'autumn-tour',
    title: 'Autumn ferry tour',
    date: '2024-09-10',
    excerpt: 'Sailing south with new songs, island stories, and cozy rooms.',
    body:
      "We're hopping ferries and taking the songs south for a string of autumn dates. Expect stripped-back sets, new arrangements, and a few yet-to-be-released tunes.",
    links: [{ label: 'Get in touch', url: '/contact' }],
  },
];

const releases = [
  {
    title: 'Salt & Strings',
    description: 'An EP of windswept folk textures with modern edges.',
    cover: '/placeholder-cover-1.png',
    links: [
      { label: 'Spotify', url: 'https://open.spotify.com' },
      { label: 'Apple Music', url: 'https://music.apple.com' },
    ],
  },
  {
    title: 'Harbour Lights (Live)',
    description: 'Live session captured on a long midsummer night.',
    cover: '/placeholder-cover-2.png',
    links: [
      { label: 'Bandcamp', url: 'https://bandcamp.com' },
      { label: 'YouTube', url: 'https://youtube.com' },
    ],
  },
];

export { band, gigs, newsPosts, releases };
