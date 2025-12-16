const navLinks = document.querySelectorAll('.nav-links a');
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const toast = document.querySelector('.toast');
const copyEmailBtn = document.getElementById('copy-email');
const bookingEmail = 'booking@theplonkys.com';

// Update gig data here
const gigs = [
  { date: '2024-08-16', venue: 'Mareel', town: 'Lerwick', tickets: 'https://tickets.example.com/mareel' },
  { date: '2024-09-05', venue: 'Festival Big Top', town: 'Shetland Folk Festival', tickets: 'https://tickets.example.com/folkfest' },
  { date: '2024-07-10', venue: 'Harbour Stage', town: 'Scalloway', tickets: 'https://tickets.example.com/harbour' },
  { date: '2024-06-01', venue: 'Student Union', town: 'Aberdeen', tickets: 'https://tickets.example.com/uni' }
];

const gigContainer = document.getElementById('gigs-list');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderGigs(filter = 'all') {
  if (!gigContainer) return;
  gigContainer.innerHTML = '';
  const now = new Date();
  const filtered = gigs.filter((gig) => {
    const gigDate = new Date(gig.date);
    if (filter === 'upcoming') return gigDate >= now;
    if (filter === 'past') return gigDate < now;
    return true;
  });

  filtered
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach((gig) => {
      const card = document.createElement('article');
      card.className = 'gig-card reveal';
      const date = new Date(gig.date);
      const formatted = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
      card.innerHTML = `
        <div class="gig-date">${formatted}</div>
        <div class="gig-meta">${gig.venue} • ${gig.town}</div>
        <a class="btn primary" href="${gig.tickets}" target="_blank" rel="noreferrer">Tickets</a>
      `;
      gigContainer.appendChild(card);
    });

  if (!filtered.length) {
    gigContainer.innerHTML = '<p class="update-note">No shows in this filter yet.</p>';
  }
  observeReveals();
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderGigs(btn.dataset.filter);
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

copyEmailBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(bookingEmail);
    showToast('Booking email copied');
  } catch (err) {
    showToast('Press Ctrl/Cmd+C to copy');
  }
});

navToggle?.addEventListener('click', () => {
  const isOpen = navList.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

function handleScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const options = { rootMargin: '-50% 0px -40% 0px', threshold: 0 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (entry.isIntersecting && link) {
        navLinks.forEach((nav) => nav.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, options);
  sections.forEach((sec) => observer.observe(sec));
}

function applyStoredTheme() {
  const saved = localStorage.getItem('plonkys-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    themeToggle.textContent = saved === 'light' ? '🌞' : '🌙';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  themeToggle.textContent = next === 'light' ? '🌞' : '🌙';
  localStorage.setItem('plonkys-theme', next);
}

themeToggle?.addEventListener('click', toggleTheme);

function smoothNav() {
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth' });
      navList.classList.remove('open');
    });
  });
}

function validateForm() {
  const form = document.querySelector('.contact-form');
  const success = form?.querySelector('.form-success');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const name = form.elements.namedItem('name');
    const email = form.elements.namedItem('email');
    const message = form.elements.namedItem('message');

    const validators = [
      { field: name, error: 'Name is required' },
      { field: email, error: 'Valid email is required', type: 'email' },
      { field: message, error: 'Message is required' }
    ];

    validators.forEach(({ field, error, type }) => {
      const errorEl = field.parentElement.querySelector('.error');
      if (!field.value.trim() || (type === 'email' && !field.value.includes('@'))) {
        errorEl.textContent = error;
        valid = false;
      } else {
        errorEl.textContent = '';
      }
    });

    if (valid && success) {
      success.textContent = 'Thanks! We will be in touch soon.';
      form.reset();
      setTimeout(() => (success.textContent = ''), 4000);
    }
  });
}

function observeReveals() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function init() {
  applyStoredTheme();
  renderGigs('all');
  smoothNav();
  handleScrollSpy();
  validateForm();
  observeReveals();
}

window.addEventListener('DOMContentLoaded', init);
