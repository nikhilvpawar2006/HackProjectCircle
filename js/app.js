// =============================================
// CIRCLE — Main App Entry
// =============================================

// ── Toast System ──────────────────────────────
function showToast(message, type = 'success', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = {
    success: '✓',
    info: 'ℹ',
    warning: '⚠',
    error: '✕'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || icons.info}</div>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  const remove = () => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  const timer = setTimeout(remove, duration);
  toast.addEventListener('click', () => { clearTimeout(timer); remove(); });
}

// ── Global Modal System ────────────────────────
function openModal(contentHtml) {
  const container = document.getElementById('modal-container');
  const contentArea = document.getElementById('modal-content-area');
  if (!container || !contentArea) return;
  
  contentArea.innerHTML = contentHtml;
  container.removeAttribute('aria-hidden');
  
  // Close buttons inside modal
  contentArea.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
}

function closeModal() {
  const container = document.getElementById('modal-container');
  if (container) {
    container.setAttribute('aria-hidden', 'true');
  }
}

// Close modal when clicking backdrop
document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }
});

// Close on escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ── Mobile Sidebar ─────────────────────────────
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const hamburger = document.getElementById('hamburger');
const sidebarClose = document.getElementById('sidebar-close');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  overlay.removeAttribute('aria-hidden');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', openSidebar);
sidebarClose?.addEventListener('click', closeSidebar);
overlay?.addEventListener('click', closeSidebar);

// Close sidebar on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSidebar();
});

// ── Keyboard navigation for intent pill ────────
document.querySelector('.intent-pill')?.addEventListener('click', () => {
  Router.navigate('home');
});

// ── Init App ───────────────────────────────────
function init() {
  // Read initial page from URL hash or default to home
  const startPage = (window.location.hash.replace('#', '') || 'home');

  // Set initial nav intent label
  updateNavIntent(State.get('currentIntent'));

  // Update badges
  updateBadges();

  // Navigate to start page
  Router.navigate(startPage, false);

  // Ambient background particles (optional subtle effect)
  createAmbientEffect();
}

// ── Ambient Background Effect ──────────────────
function createAmbientEffect() {
  const canvas = document.createElement('canvas');
  canvas.id = 'ambient-canvas';
  canvas.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.35;
  `;
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = ['rgba(168,85,247,', 'rgba(6,182,212,', 'rgba(192,132,252,'];

  // Create particles
  for (let i = 0; i < 18; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 180 + 60,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.06 + 0.02,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -p.r) p.x = canvas.width + p.r;
      if (p.x > canvas.width + p.r) p.x = -p.r;
      if (p.y < -p.r) p.y = canvas.height + p.r;
      if (p.y > canvas.height + p.r) p.y = -p.r;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      grad.addColorStop(0, p.color + p.alpha + ')');
      grad.addColorStop(1, p.color + '0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });
    animFrame = requestAnimationFrame(draw);
  }
  draw();
}

// ── Run App ────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);

// ── Skip link for accessibility ────────────────
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'sr-only';
skipLink.style.cssText = `
  position: fixed; top: -999px; left: 0; z-index: 9999;
  padding: 8px 16px; background: var(--purple-500); color: white;
  border-radius: 0 0 8px 0; font-weight: 600;
  transition: top 0.2s;
`;
skipLink.addEventListener('focus', () => { skipLink.style.top = '0'; });
skipLink.addEventListener('blur', () => { skipLink.style.top = '-999px'; });
document.body.prepend(skipLink);

// ── Global error handler ───────────────────────
window.addEventListener('error', (e) => {
  console.error('[CIRCLE]', e.message);
});

// ── Resize handler for responsive sidebar ──────
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeSidebar();
  }
});
