import { band, gigs, newsPosts, releases } from './data.js';

const $ = (selector) => document.querySelector(selector);
const formatDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' });

function renderSocials(container, socials) {
  container.innerHTML = socials
    .map(
      (social) =>
        `<a class="social-chip" href="${social.url}" target="_blank" rel="noreferrer">${social.icon} ${social.label}</a>`
    )
    .join('');
}

function renderGigs() {
  const upcomingContainer = $('#gig-list');
  const upcoming = gigs
    .filter((gig) => gig.status === 'upcoming')
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (!upcoming.length) {
    upcomingContainer.innerHTML = '<p class="muted">More dates arriving soon.</p>';
    return;
  }

  upcomingContainer.innerHTML = upcoming
    .map(
      (gig) => `
        <article class="card gig-card">
          <div class="chip">${gig.town}</div>
          <h3>${gig.venue}</h3>
          <p class="gig-meta">${formatDate(gig.date)} · ${gig.time}</p>
          <p class="gig-meta">${gig.notes}</p>
          <div class="button-row">
            <a class="btn btn-primary" href="${gig.ticketsUrl}" target="_blank" rel="noreferrer">Tickets</a>
          </div>
        </article>
      `
    )
    .join('');
}

function renderNews() {
  const container = $('#news-list');
  const sorted = [...newsPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  container.innerHTML = sorted
    .map(
      (post) => `
        <article class="card news-card">
          <p class="news-date">${formatDate(post.date)}</p>
          <h3>${post.title}</h3>
          <p class="gig-meta">${post.excerpt}</p>
          <p class="gig-meta">${post.body}</p>
          <div class="news-actions">
            ${post.links
              .map((link) => `<a class="badge-link" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`)
              .join('')}
          </div>
        </article>
      `
    )
    .join('');
}

function renderMembers() {
  const container = $('#member-grid');
  container.innerHTML = band.members
    .map(
      (member) => `
        <article class="card member-card">
          <p class="member-role">${member.role}</p>
          <h4>${member.name}</h4>
          <p class="gig-meta">${member.bio}</p>
        </article>
      `
    )
    .join('');
}

function renderQuotes() {
  const html = band.quotes
    .map((quote) => `<p class="quote"><strong>“${quote.quote}”</strong><br/><span class="gig-meta">${quote.source}</span></p>`)
    .join('');

  const mainList = $('#quote-list');
  const highlight = $('#quote-highlight');

  if (mainList) mainList.innerHTML = html;
  if (highlight) highlight.innerHTML = html;
}

function renderEmbeds() {
  const embeds = [
    { title: 'Spotify', url: band.embeds.spotify },
    { title: 'Apple Music', url: band.embeds.appleMusic },
    { title: 'YouTube', url: band.embeds.youtube },
  ];

  $('#embed-grid').innerHTML = embeds
    .map(
      (embed) => `
        <div class="embed">
          <p class="news-date">${embed.title}</p>
          <div class="frame"></div>
          <a class="badge-link" href="${embed.url}" target="_blank" rel="noreferrer">Open in ${embed.title}</a>
        </div>
      `
    )
    .join('');
}

function renderReleases() {
  $('#release-grid').innerHTML = releases
    .map(
      (release) => `
        <article class="card">
          <div class="release-cover"></div>
          <h3>${release.title}</h3>
          <p class="gig-meta">${release.description}</p>
          <div class="news-actions">
            ${release.links
              .map((link) => `<a class="badge-link" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`)
              .join('')}
          </div>
        </article>
      `
    )
    .join('');
}

function renderContacts() {
  $('#contact-cards').innerHTML = band.pressContacts
    .map(
      (contact) => `
        <article class="card">
          <p class="news-date">${contact.label}</p>
          <h3>${contact.value}</h3>
          <p class="gig-meta">${contact.type === 'email' ? 'Email' : 'Link'}</p>
        </article>
      `
    )
    .join('');
}

function wireMenu() {
  const drawer = $('#mobile-drawer');
  const toggle = $('#menu-toggle');
  const closeButton = $('#close-menu');
  const links = drawer.querySelectorAll('a');

  const close = () => drawer.classList.remove('open');
  toggle?.addEventListener('click', () => drawer.classList.toggle('open'));
  closeButton?.addEventListener('click', close);
  links.forEach((link) => link.addEventListener('click', close));
}

function init() {
  $('#band-bio').textContent = band.bio;
  $('#tagline').textContent = band.tagline;
  $('#band-name').textContent = band.name;
  renderSocials($('#social-links'), band.socials);
  renderSocials($('#footer-socials'), band.socials);
  renderGigs();
  renderNews();
  renderMembers();
  renderQuotes();
  renderEmbeds();
  renderReleases();
  renderContacts();
  wireMenu();
}

document.addEventListener('DOMContentLoaded', init);
