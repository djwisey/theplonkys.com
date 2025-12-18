const prefersLight = window.matchMedia('(prefers-color-scheme: light)');
const root = document.documentElement;

function setTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    document.getElementById('theme-toggle').textContent = 'Dark';
  } else {
    root.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
    document.getElementById('theme-toggle').textContent = 'Light';
  }
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  const theme = saved || (prefersLight.matches ? 'light' : 'dark');
  setTheme(theme);
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

  const sections = document.querySelectorAll('main section[id]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const navLink = document.querySelector(`.nav__list a[href="#${id}"]`);
        if (navLink) {
          navLink.classList.toggle('active', entry.isIntersecting && entry.intersectionRatio > 0.2);
        }
      });
    },
    { threshold: [0.2, 0.5, 0.8] }
  );
  sections.forEach((section) => observer.observe(section));
}

async function loadConfig() {
  const res = await fetch('data/config.json');
  return res.json();
}

async function loadJSON(path) {
  const res = await fetch(path);
  return res.json();
}

function renderHero(config) {
  document.title = `${config.bandName} | Official Site`;
  document.getElementById('hero-location').textContent = config.location;
  document.getElementById('hero-title').textContent = config.heroHeadline || config.tagline;
  document.getElementById('hero-description').textContent = config.description;
  const heroActions = document.querySelectorAll('.hero__actions a');
  const { listen, tour, merch } = config.heroCTA;
  if (heroActions[0]) heroActions[0].href = listen;
  if (heroActions[1]) heroActions[1].href = tour;
  if (heroActions[2]) heroActions[2].href = merch;
  const socialContainer = document.getElementById('hero-socials');
  const contactSocials = document.getElementById('contact-socials');
  const footerSocials = document.getElementById('footer-socials');

  const socials = [
    { name: 'Facebook', url: config.socials.facebook },
    { name: 'Instagram', url: config.socials.instagram },
    { name: 'YouTube', url: config.socials.youtube },
    { name: 'TikTok', url: config.socials.tiktok },
  ];

  socials.forEach((social) => {
    if (!social.url) return;
    const pill = document.createElement('a');
    pill.href = social.url;
    pill.target = '_blank';
    pill.rel = 'noreferrer';
    pill.className = 'pill';
    pill.textContent = social.name;
    socialContainer.appendChild(pill.cloneNode(true));
    contactSocials.appendChild(pill.cloneNode(true));
    footerSocials.appendChild(pill);
  });
}

function renderRelease(config) {
  const release = config.latestRelease;
  document.getElementById('release-title').textContent = release.title;
  document.getElementById('release-date').textContent = release.date;
  document.getElementById('release-cover').src = release.cover;
  document.getElementById('release-cta').href = release.cta;
  const tracklist = document.getElementById('tracklist');
  release.tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${track}`;
    tracklist.appendChild(li);
  });
}

function renderMembers(config) {
  const container = document.getElementById('member-cards');
  config.members.forEach((member) => {
    const card = document.createElement('div');
    card.className = 'member reveal';
    card.innerHTML = `<strong>${member.name}</strong><span class="muted">${member.role}</span>`;
    container.appendChild(card);
  });
  document.getElementById('about-description').textContent = config.description;
  document.getElementById('booking-email').textContent = config.bookingEmail;
  document.getElementById('booking-email').href = `mailto:${config.bookingEmail}`;
}

function renderNotice(notice) {
  const bar = document.getElementById('notice-bar');
  if (!notice || !notice.message) {
    bar.style.display = 'none';
    return;
  }

  const span = document.createElement('span');
  span.textContent = notice.message;
  bar.appendChild(span);

  if (notice.linkText && notice.linkUrl) {
    const cta = document.createElement('a');
    cta.href = notice.linkUrl;
    cta.target = '_blank';
    cta.rel = 'noreferrer';
    cta.className = 'notice__cta';
    cta.innerHTML = `${notice.linkText} →`;
    bar.appendChild(cta);
  }
}

function renderMomentum(momentum) {
  if (!momentum) return;
  const statGrid = document.getElementById('stat-grid');
  const ctas = document.getElementById('momentum-ctas');
  statGrid.innerHTML = '';
  ctas.innerHTML = '';

  momentum.metrics.forEach((metric) => {
    const card = document.createElement('article');
    card.className = 'stat-card reveal';
    card.innerHTML = `<strong>${metric.value}</strong><p>${metric.label}</p><p class="muted">${metric.detail}</p>`;
    statGrid.appendChild(card);
  });

  momentum.ctas.forEach((cta) => {
    const pill = document.createElement('a');
    pill.href = cta.href;
    pill.className = 'pill';
    pill.textContent = cta.label;
    ctas.appendChild(pill);
  });
}

function renderHighlights(highlights) {
  if (!Array.isArray(highlights)) return;
  const grid = document.getElementById('highlight-grid');
  grid.innerHTML = '';

  highlights.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'highlight reveal';
    card.innerHTML = `
      <span class="pill">${item.eyebrow}</span>
      <h3>${item.title}</h3>
      <p>${item.copy}</p>
      <a class="btn subtle highlight__cta" href="${item.ctaUrl}" target="_blank" rel="noreferrer">${item.ctaText}</a>
    `;
    grid.appendChild(card);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
}

function buildFilters(regions) {
  const filterWrap = document.getElementById('tour-filters');
  const allBtn = document.createElement('button');
  allBtn.textContent = 'All';
  allBtn.dataset.filter = 'all';
  allBtn.classList.add('active');
  filterWrap.appendChild(allBtn);

  regions.forEach((region) => {
    const btn = document.createElement('button');
    btn.textContent = region;
    btn.dataset.filter = region;
    filterWrap.appendChild(btn);
  });
}

function renderTour(tour) {
  const list = document.getElementById('tour-list');
  list.innerHTML = '';
  const regions = [...new Set(tour.map((show) => show.region))];
  buildFilters(regions);

  const renderCards = (filter) => {
    list.innerHTML = '';
    tour
      .filter((show) => (filter === 'all' ? true : show.region === filter))
      .forEach((show) => {
        const card = document.createElement('article');
        card.className = 'tour-card reveal';
        card.innerHTML = `
          <div>
            <time datetime="${show.date}">${formatDate(show.date)}</time>
            <p class="muted">${show.time}</p>
          </div>
          <div>
            <h3>${show.city}</h3>
            <p class="muted">${show.venue}</p>
          </div>
          <div class="meta">
            <span class="chip">${show.region}</span>
            <span class="chip">${show.status}</span>
          </div>
          <a class="btn primary" href="${show.ticketUrl}" target="_blank" rel="noreferrer">Tickets</a>
        `;
        list.appendChild(card);
      });
  };

  renderCards('all');

  document.querySelectorAll('#tour-filters button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#tour-filters button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(btn.dataset.filter);
      revealElements();
    });
  });
}

function renderMerch(items) {
  const grid = document.getElementById('merch-grid');
  grid.innerHTML = '';
  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card merch-card reveal';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy" />
      <div>
        <h3>${item.title}</h3>
        <p class="price">${item.price}</p>
      </div>
      <a class="btn ghost" href="${item.url}" target="_blank" rel="noreferrer">Buy</a>
    `;
    grid.appendChild(card);
  });
}

function renderPress(quotes) {
  const track = document.getElementById('press-track');
  quotes.forEach((quote) => {
    const card = document.createElement('article');
    card.className = 'press-quote reveal';
    card.innerHTML = `<blockquote>“${quote.quote}”</blockquote><cite>${quote.source}</cite>`;
    track.appendChild(card);
  });

  let index = 0;
  const prev = document.getElementById('press-prev');
  const next = document.getElementById('press-next');

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  prev.addEventListener('click', () => {
    index = (index - 1 + quotes.length) % quotes.length;
    update();
  });
  next.addEventListener('click', () => {
    index = (index + 1) % quotes.length;
    update();
  });

  setInterval(() => {
    index = (index + 1) % quotes.length;
    update();
  }, 8000);
}

function initLightbox() {
  const grid = document.getElementById('photo-grid');
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  const close = document.querySelector('.lightbox__close');

  grid.querySelectorAll('figure').forEach((figure) => {
    figure.classList.add('reveal');
    figure.addEventListener('click', () => {
      const image = figure.querySelector('img');
      img.src = image.src;
      caption.textContent = figure.querySelector('figcaption').textContent;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  close.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

function revealElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function initForms(config) {
  const newsletter = document.getElementById('newsletter-form');
  const newsletterNote = newsletter.querySelector('.form-note');
  newsletter.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletter.email.value;
    if (!email || !email.includes('@')) {
      newsletterNote.textContent = 'Enter a valid email to join the list.';
      return;
    }
    newsletterNote.textContent = 'Thanks! You are on the list.';
    newsletter.reset();
  });

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
      contact.querySelector('#message + .error').textContent = 'Drop us a line';
      valid = false;
    }

    if (!valid) return;

    contactNote.textContent = 'Sent! Expect a quick reply.';
    contact.reset();
  });

  if (config.newsletterAction) {
    newsletter.setAttribute('action', config.newsletterAction);
  }
}

function initThemeToggle() {
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    setTheme(isLight ? 'dark' : 'light');
  });
}

function init() {
  initTheme();
  initThemeToggle();
  initNav();
  initLightbox();

  loadConfig().then((config) => {
    renderNotice(config.notice);
    renderHero(config);
    renderRelease(config);
    renderMembers(config);
    renderPress(config.pressQuotes);
    renderMomentum(config.momentum);
    renderHighlights(config.highlights);
    initForms(config);
    revealElements();
  });

  loadJSON('data/tour.json').then((tour) => {
    renderTour(tour);
    revealElements();
  });
  loadJSON('data/merch.json').then((items) => {
    renderMerch(items);
    revealElements();
  });
}

document.addEventListener('DOMContentLoaded', init);
