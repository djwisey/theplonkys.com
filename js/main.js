const root = document.documentElement;

async function loadJSON(path) {
  const res = await fetch(path);
  return res.json();
}

function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
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

function renderHero(config) {
  document.title = `${config.bandName} | Official Site`;
  document.getElementById('hero-location').textContent = config.location;
  document.getElementById('hero-title').textContent = config.heroHeadline || config.tagline;
  document.getElementById('hero-description').textContent = config.description;
  document.getElementById('hero-listen').href = config.heroCTA.listen;
  document.getElementById('hero-tour').href = config.heroCTA.tour;

  const heroTags = document.getElementById('hero-tags');
  heroTags.innerHTML = '';
  ['Rap', 'Rock', 'Pop'].forEach((tag) => {
    const pill = document.createElement('span');
    pill.className = 'pill';
    pill.textContent = tag;
    heroTags.appendChild(pill);
  });

  const socials = [
    { name: 'Facebook', url: config.socials.facebook },
    { name: 'Instagram', url: config.socials.instagram },
    { name: 'YouTube', url: config.socials.youtube },
    { name: 'TikTok', url: config.socials.tiktok },
  ];

  const heroSocials = document.getElementById('hero-socials');
  const contactSocials = document.getElementById('contact-socials');
  const footerSocials = document.getElementById('footer-socials');
  [heroSocials, contactSocials, footerSocials].forEach((container) => (container.innerHTML = ''));

  socials.forEach((social) => {
    if (!social.url) return;
    const pill = document.createElement('a');
    pill.href = social.url;
    pill.target = '_blank';
    pill.rel = 'noreferrer';
    pill.className = 'pill';
    pill.textContent = social.name;
    heroSocials.appendChild(pill.cloneNode(true));
    contactSocials.appendChild(pill.cloneNode(true));
    footerSocials.appendChild(pill);
  });
}

function renderStory(config) {
  document.getElementById('story-summary').textContent = config.tagline;
  document.getElementById('about-description').textContent = config.description;
  document.getElementById('booking-email').textContent = config.bookingEmail;
  document.getElementById('booking-email').href = `mailto:${config.bookingEmail}`;

  const statList = document.getElementById('stat-list');
  statList.innerHTML = '';
  if (config.momentum?.metrics) {
    config.momentum.metrics.forEach((metric) => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${metric.label}</span><strong>${metric.value}</strong>`;
      statList.appendChild(li);
    });
  }

  const memberGrid = document.getElementById('member-cards');
  memberGrid.innerHTML = '';
  config.members.forEach((member) => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.textContent = `${member.name} — ${member.role}`;
    memberGrid.appendChild(chip);
  });
}

function renderRelease(config) {
  const release = config.latestRelease;
  document.getElementById('release-title').textContent = release.title;
  document.getElementById('release-date').textContent = release.date;
  document.getElementById('release-cover').src = release.cover;
  document.getElementById('release-cta').href = release.cta;

  const tracklist = document.getElementById('tracklist');
  tracklist.innerHTML = '';
  release.tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${track}`;
    tracklist.appendChild(li);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
}

function renderTour(tour) {
  const list = document.getElementById('tour-list');
  list.innerHTML = '';
  tour.forEach((show) => {
    const card = document.createElement('article');
    card.className = 'tour-card';
    card.innerHTML = `
      <div>
        <time datetime="${show.date}">${formatDate(show.date)}</time>
        <p class="muted">${show.time}</p>
      </div>
      <div>
        <h3>${show.city}</h3>
        <p class="muted">${show.venue}</p>
        <div class="chip-row"><span class="chip">${show.region}</span><span class="chip">${show.status}</span></div>
      </div>
      <a class="btn ghost" href="${show.ticketUrl}" target="_blank" rel="noreferrer">Tickets</a>
    `;
    list.appendChild(card);
  });
}

function initForms() {
  const contact = document.getElementById('contact-form');
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

async function init() {
  initNav();
  initForms();

  const config = await loadJSON('data/config.json');
  renderHero(config);
  renderStory(config);
  renderRelease(config);

  const tour = await loadJSON('data/tour.json');
  renderTour(tour);
}

document.addEventListener('DOMContentLoaded', init);
