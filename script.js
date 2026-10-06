(() => {
  const root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  // ---- Open / closed status (store time is America/New_York) ----
  const OPEN = 6 * 60; // 6:00 AM
  const CLOSE = 22 * 60; // 10:00 PM
  const nyClock = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  });

  function minutesNow() {
    const parts = nyClock.formatToParts(new Date());
    const get = (type) => Number(parts.find((p) => p.type === type).value);
    return get('hour') * 60 + get('minute');
  }

  function renderStatus() {
    const now = minutesNow();
    const open = now >= OPEN && now < CLOSE;
    const closingSoon = open && CLOSE - now <= 30;
    const state = open ? (closingSoon ? 'soon' : 'open') : 'closed';
    const label = { open: 'Open now', soon: 'Closing soon', closed: 'Closed now' }[state];
    const detail = open ? 'until 10 PM' : 'opens 6 AM';

    document.querySelectorAll('[data-open-status]').forEach((el) => {
      el.dataset.state = state;
      el.querySelector('[data-status-label]').textContent = label;
      el.querySelector('[data-status-detail]').textContent = detail;
    });
  }

  renderStatus();
  setInterval(renderStatus, 60 * 1000);

  // ---- Mobile menu ----
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }

  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  // ---- Header shadow once the page scrolls ----
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile action bar appears once the hero buttons scroll away ----
  const bar = document.querySelector('.action-bar');
  const heroActions = document.querySelector('.hero__actions');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      bar.classList.toggle('is-visible', !entry.isIntersecting && entry.boundingClientRect.top < 0);
    }).observe(heroActions);
  } else {
    bar.classList.add('is-visible');
  }

  // ---- Footer year ----
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
