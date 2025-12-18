const siteData = {
  bandName: 'The Plonkys',
  location: 'Shetland Islands, Scotland',
  tagline: 'Big hooks. No filler.',
  description: 'Straight, heavy, and loud—built for rooms that like to move.',
  bookingEmail: 'booking@theplonkys.com',
  socials: {
    facebook: 'https://www.facebook.com',
    instagram: 'https://www.instagram.com',
  },
  members: [
    { name: 'Mads M.', role: 'Vocals / Hype' },
    { name: 'Alex K.', role: 'Guitar / Hooks' },
    { name: 'Leo R.', role: 'Drums / Thunder' },
    { name: 'Fin J.', role: 'Bass / Low end' },
  ],
  gigs: [
    { date: '2025-07-12', city: 'Glasgow', venue: 'The Cathouse', region: 'Scotland', status: 'Tickets live', time: '8:00 PM', ticketUrl: '#' },
    { date: '2025-07-26', city: 'Aberdeen', venue: 'Unit 51', region: 'Scotland', status: 'Low tickets', time: '9:00 PM', ticketUrl: '#' },
    { date: '2025-08-14', city: 'Edinburgh', venue: 'Sneaky Pete’s', region: 'Scotland', status: 'On sale soon', time: '8:30 PM', ticketUrl: '#' },
  ],
  tracks: [
    { title: 'Reading Between The Lines', length: '3:21' },
    { title: 'Night Ferry', length: '2:55' },
    { title: 'North Sea Static', length: '3:05' },
    { title: 'Kinetic', length: '2:38' },
  ],
};

function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('.nav__list a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function createSocialButtons(container) {
  if (!container) return;
  container.innerHTML = '';

  const socials = [
    { name: 'Facebook', url: siteData.socials.facebook, icon: 'assets/icons/facebook.svg' },
    { name: 'Instagram', url: siteData.socials.instagram, icon: 'assets/icons/instagram.svg' },
  ];

  socials.forEach((social) => {
    const btn = document.createElement('a');
    btn.className = 'social-button';
    btn.href = social.url;
    btn.target = '_blank';
    btn.rel = 'noreferrer';
    btn.innerHTML = `<img src="${social.icon}" alt="${social.name} logo">${social.name}`;
    container.appendChild(btn);
  });
}

function renderMembers(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  siteData.members.forEach((member) => {
    const card = document.createElement('article');
    card.className = 'member-card';
    card.innerHTML = `<strong>${member.name}</strong><p class="muted">${member.role}</p>`;
    container.appendChild(card);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
}

function renderHome() {
  if (document.body.dataset.page !== 'home') return;
  document.title = `${siteData.bandName} | About`;

  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) heroTitle.textContent = siteData.tagline;

  const heroDesc = document.getElementById('hero-description');
  if (heroDesc) heroDesc.textContent = siteData.description;

  const heroLocation = document.getElementById('hero-location');
  if (heroLocation) heroLocation.textContent = siteData.location;

  renderMembers('member-grid');
}

function renderGigs() {
  if (document.body.dataset.page !== 'gigs') return;
  document.title = `${siteData.bandName} | Gigs`;
  const list = document.getElementById('gigs-list');
  if (!list) return;
  list.innerHTML = '';

  siteData.gigs.forEach((gig) => {
    const card = document.createElement('article');
    card.className = 'list-card';
    card.innerHTML = `
      <div class="list-card__header">
        <div>
          <p class="eyebrow">${formatDate(gig.date)}</p>
          <h3>${gig.city}</h3>
          <p class="muted">${gig.venue} • ${gig.time}</p>
        </div>
        <div class="list-card__meta">
          <span class="chip">${gig.region}</span>
          <span class="chip">${gig.status}</span>
        </div>
      </div>
      <div class="cta-row">
        <a class="btn" href="${gig.ticketUrl}" target="_blank" rel="noreferrer">Tickets</a>
        <a class="btn ghost" href="index.html">About the band</a>
      </div>
    `;
    list.appendChild(card);
  });
}

function renderListen() {
  if (document.body.dataset.page !== 'listen') return;
  document.title = `${siteData.bandName} | Listen`;
  const tracklist = document.getElementById('listen-tracklist');
  if (!tracklist) return;
  tracklist.innerHTML = '';

  siteData.tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${track.title} — ${track.length}`;
    tracklist.appendChild(li);
  });
}

function renderContact() {
  if (document.body.dataset.page !== 'contact') return;
  document.title = `${siteData.bandName} | Contact`;
  const emailLink = document.getElementById('booking-email');
  if (emailLink) {
    emailLink.textContent = siteData.bookingEmail;
    emailLink.href = `mailto:${siteData.bookingEmail}`;
  }

  createSocialButtons(document.getElementById('contact-socials'));
  initForms();
}

function renderFooter() {
  const footerSocials = document.getElementById('footer-socials');
  createSocialButtons(footerSocials);
}

function initForms() {
  const contact = document.getElementById('contact-form');
  if (!contact) return;
  const contactNote = contact.querySelector('.form-note');
  contact.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contact.name.value.trim();
    const email = contact.email.value.trim();
    const message = contact.message.value.trim();
    let valid = true;

    contact.querySelectorAll('.error').forEach((err) => (err.textContent = ''));

    if (!name) {
      contact.querySelector('#name + .error').textContent = 'Name is required';
      valid = false;
    }
    if (!email || !email.includes('@')) {
      contact.querySelector('#email + .error').textContent = 'Valid email needed';
      valid = false;
    }
    if (!message) {
      contact.querySelector('#message + .error').textContent = 'Add a quick note';
      valid = false;
    }

    if (!valid) return;

    contactNote.textContent = 'Sent! Expect a quick reply.';
    contact.reset();
  });
}

function init() {
  initNav();
  renderFooter();
  renderHome();
  renderGigs();
  renderListen();
  renderContact();
}

document.addEventListener('DOMContentLoaded', init);
