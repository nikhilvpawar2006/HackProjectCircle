// =============================================
// HOME PAGE
// =============================================

Router.register('home', function(el) {
  const profile = State.get('profileData');
  const currentIntent = State.get('currentIntent');

  el.innerHTML = `
    <!-- Hero Section -->
    <div class="home-hero reveal">
      <div class="hero-eyebrow">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/></svg>
        REIMAGINE SOCIAL
      </div>
      <h1 class="hero-title">
        Don't follow people.<br/>
        <span class="gradient-text">Find your people.</span>
      </h1>
      <p class="hero-sub">
        Choose what you want to do — build, learn, create, or play — and CIRCLE finds others who want the same thing.
      </p>
      <div class="hero-actions">
        <button class="btn btn-primary" id="hero-discover-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          Discover People
        </button>
        <button class="btn btn-secondary" id="hero-circles-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
          Browse Circles
        </button>
      </div>
    </div>

    <!-- Intent Section -->
    <section class="intent-section reveal" aria-labelledby="intent-heading">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 id="intent-heading" class="section-title">What do you want to do today?</h2>
          <p class="text-sm text-muted">Your intent shapes who you meet and what you'll find.</p>
        </div>
        ${currentIntent ? `<span class="tag tag-intent">Currently: ${currentIntent}</span>` : ''}
      </div>
      <div class="intent-grid" id="intent-grid">
        ${INTENT_DATA.map(intent => `
          <button
            class="intent-card ${currentIntent === intent.label ? 'selected' : ''}"
            data-intent="${intent.label}"
            aria-pressed="${currentIntent === intent.label}"
            aria-label="Set intent to ${intent.label}"
          >
            <span class="intent-emoji" aria-hidden="true">${intent.emoji}</span>
            <span class="intent-name">${intent.label}</span>
            <span class="intent-count">${intent.count}</span>
          </button>
        `).join('')}
      </div>
    </section>

    <!-- Stats Row -->
    <section class="stats-row reveal" aria-label="Platform statistics">
      <div class="stat-card">
        <span class="stat-value" id="stat-users">26.1K</span>
        <span class="stat-label">Active Doers</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">847</span>
        <span class="stat-label">Active Circles</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">3,200+</span>
        <span class="stat-label">Activities This Month</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">94%</span>
        <span class="stat-label">Match Satisfaction</span>
      </div>
    </section>

    <!-- Two Column: Activity + Suggested -->
    <div class="grid-2 reveal">
      <!-- Activity Feed -->
      <div>
        <h2 class="section-title mb-4">Your Circle Activity</h2>
        <div class="card" id="feed-container">
          ${FEED_ITEMS.map(item => `
            <div class="feed-item">
              <div class="feed-dot"></div>
              <div>
                <div class="feed-text">${item.text}</div>
                <div class="feed-time">${item.time}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Suggested People -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="section-title">Suggested For You</h2>
          <button class="btn btn-ghost btn-sm" data-page="discover">See all</button>
        </div>
        <div class="flex" style="flex-direction:column;gap:12px;" id="suggested-people">
          ${USERS.slice(0,3).map(user => `
            <div class="card" style="padding:16px;display:flex;align-items:center;gap:14px;">
              <div class="avatar avatar-md" style="position:relative;flex-shrink:0;">
                <img src="${user.avatar}" alt="${user.name}" loading="lazy"/>
                ${user.online ? '<div class="online-dot"></div>' : ''}
              </div>
              <div style="flex:1;min-width:0;">
                <div style="font-weight:700;font-size:0.875rem;">${user.name}</div>
                <div class="text-muted" style="font-size:0.75rem;margin-bottom:5px;">${user.intents.map(i => `<span class="tag tag-${i.toLowerCase()}" style="padding:2px 8px;font-size:0.68rem;">${i}</span>`).join(' ')}</div>
                <div style="display:flex;align-items:center;gap:6px;font-size:0.75rem;color:var(--cyan-400);">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  ${user.match}% match
                </div>
              </div>
              <button
                class="btn btn-sm ${State.has('connectedUsers', user.id) ? 'btn-connected' : 'btn-primary'} home-connect-btn"
                data-uid="${user.id}"
                aria-label="${State.has('connectedUsers', user.id) ? 'Connected' : 'Connect'} with ${user.name}"
              >
                ${State.has('connectedUsers', user.id) ? 'Connected' : 'Connect'}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <section class="reveal mt-4" aria-label="Quick actions">
      <h2 class="section-title mb-4">Jump Back In</h2>
      <div class="grid-3">
        <div class="card" style="background:linear-gradient(135deg,rgba(168,85,247,0.12),rgba(6,182,212,0.06));border-color:var(--border-purple);cursor:pointer;" data-page="activities" role="button" tabindex="0" aria-label="Go to activities">
          <div style="font-size:2rem;margin-bottom:12px;">⚡</div>
          <div style="font-weight:700;margin-bottom:6px;">48h AI Hackathon</div>
          <div class="text-sm text-muted">Starts in 5 days · 92 joined</div>
          <div class="btn btn-primary btn-sm" style="margin-top:14px;width:fit-content;">View Activity</div>
        </div>
        <div class="card" style="cursor:pointer;" data-page="circles" role="button" tabindex="0" aria-label="Go to circles">
          <div style="font-size:2rem;margin-bottom:12px;">🎨</div>
          <div style="font-weight:700;margin-bottom:6px;">Generative Artists</div>
          <div class="text-sm text-muted">Monthly showcase coming up</div>
          <div class="btn btn-secondary btn-sm" style="margin-top:14px;width:fit-content;">View Circle</div>
        </div>
        <div class="card" style="cursor:pointer;" data-page="matches" role="button" tabindex="0" aria-label="Go to matches">
          <div style="font-size:2rem;margin-bottom:12px;">💜</div>
          <div style="font-weight:700;margin-bottom:6px;">3 New Matches</div>
          <div class="text-sm text-muted">People aligned with your intent</div>
          <div class="btn btn-secondary btn-sm" style="margin-top:14px;width:fit-content;">See Matches</div>
        </div>
      </div>
    </section>
  `;

  // Intent selection
  el.querySelectorAll('.intent-card').forEach(card => {
    card.addEventListener('click', () => {
      const intent = card.dataset.intent;
      const previous = State.get('currentIntent');
      State.set('currentIntent', intent === previous ? null : intent);

      el.querySelectorAll('.intent-card').forEach(c => {
        c.classList.remove('selected');
        c.setAttribute('aria-pressed', 'false');
      });
      if (intent !== previous) {
        card.classList.add('selected');
        card.setAttribute('aria-pressed', 'true');
      }

      const current = State.get('currentIntent');
      updateNavIntent(current);

      if (current) {
        showToast(`Intent set to "${current}" 🎯`, 'success');
      } else {
        showToast('Intent cleared', 'info');
      }
    });
  });

  // Navigation buttons
  el.querySelector('#hero-discover-btn')?.addEventListener('click', () => Router.navigate('discover'));
  el.querySelector('#hero-circles-btn')?.addEventListener('click', () => Router.navigate('circles'));

  // Connect buttons
  el.querySelectorAll('.home-connect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const uid = parseInt(btn.dataset.uid);
      const user = USERS.find(u => u.id === uid);
      const connected = State.toggle('connectedUsers', uid);
      btn.textContent = connected ? 'Connected' : 'Connect';
      btn.className = `btn btn-sm ${connected ? 'btn-connected' : 'btn-primary'} home-connect-btn`;
      showToast(connected ? `Connected with ${user.name}! 🎉` : `Disconnected from ${user.name}`, connected ? 'success' : 'info');
    });
  });

  // Animate stat counter
  animateCounter('stat-users', 0, 26100, 1200, v => (v/1000).toFixed(1) + 'K');
});

function updateNavIntent(intent) {
  const label = document.getElementById('nav-intent-label');
  if (label) label.textContent = intent ? `Intent: ${intent}` : 'No intent set';
}

function animateCounter(id, from, to, duration, format) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = format(Math.round(from + (to - from) * eased));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
