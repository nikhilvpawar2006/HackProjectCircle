// =============================================
// CIRCLE — Router
// =============================================

const Router = (() => {
  const pages = {};
  let currentPage = 'home';

  function register(name, renderFn) {
    pages[name] = renderFn;
  }

  function navigate(pageName, smooth = true) {
    if (!pages[pageName]) pageName = 'home';
    currentPage = pageName;

    // Update nav links
    document.querySelectorAll('.nav-link, .bottom-nav-item, .mobile-profile-btn').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.page === pageName) link.classList.add('active');
    });

    // Render page
    const main = document.getElementById('main-content');
    main.innerHTML = `<section class="page active" id="page-${pageName}" aria-label="${pageName} page"></section>`;
    const pageEl = main.querySelector('.page');
    pages[pageName](pageEl);

    // Update URL hash
    window.location.hash = pageName;

    // Scroll to top
    main.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });

    // Close mobile sidebar
    closeSidebar();

    // Scroll reveal
    requestAnimationFrame(() => setupReveal(pageEl));
  }

  function setupReveal(container) {
    const items = container.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('revealed'), i * 60);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(el => observer.observe(el));
  }

  function current() { return currentPage; }

  return { register, navigate, current };
})();

// Hash routing
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '') || 'home';
  Router.navigate(hash);
});

// Handle all nav link clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-page]');
  if (link) {
    e.preventDefault();
    Router.navigate(link.dataset.page);
  }
});
