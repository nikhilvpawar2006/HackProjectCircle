// =============================================
// CIRCLES PAGE
// =============================================

Router.register('circles', function(el) {
  let activeFilter = 'all';

  function filteredCircles() {
    if (activeFilter === 'all') return CIRCLES_DATA;
    if (activeFilter === 'joined') return CIRCLES_DATA.filter(c => State.has('joinedCircles', c.id));
    return CIRCLES_DATA.filter(c => c.intent.toLowerCase() === activeFilter.toLowerCase());
  }

  function renderCircles() {
    const grid = el.querySelector('#circles-grid');
    const circles = filteredCircles();

    if (circles.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>
          <h3>No circles here</h3>
          <p>Try a different filter</p>
        </div>`;
      return;
    }

    grid.innerHTML = circles.map(circle => {
      const isJoined = State.has('joinedCircles', circle.id);
      const pct = Math.round((circle.members / circle.maxMembers) * 100);
      const mockMembers = [
        "https://api.dicebear.com/7.x/avataaars/svg?seed=a&backgroundColor=b6e3f4",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=b&backgroundColor=ffd5dc",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=c&backgroundColor=c0aede",
      ];
      return `
        <article class="circle-card reveal" aria-label="${circle.name} circle">
          <div class="circle-banner" style="background:${circle.banner};">
            <div class="circle-avatar-wrap">
              <div class="circle-avatar">${circle.emoji}</div>
            </div>
          </div>
          <div class="circle-body">
            <div class="flex items-center gap-2" style="margin-bottom:6px;">
              <div class="circle-name">${circle.name}</div>
              ${isJoined ? '<span class="tag tag-skill" style="font-size:0.65rem;padding:2px 8px;">Joined</span>' : ''}
            </div>
            <div class="circle-desc">${circle.desc}</div>
            <div class="circle-meta">
              <span>
                <svg style="display:inline;width:12px;height:12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                ${circle.members.toLocaleString()} / ${circle.maxMembers.toLocaleString()}
              </span>
              <span class="tag tag-${circle.intent.toLowerCase()}" style="font-size:0.68rem;">${circle.intent}</span>
            </div>

            <!-- Capacity bar -->
            <div style="margin-bottom:14px;">
              <div class="match-bar" style="width:100%;">
                <div class="match-bar-fill" style="width:${pct}%"></div>
              </div>
              <div class="text-sm text-muted" style="margin-top:4px;font-size:0.72rem;">${pct}% capacity · ${circle.activity}</div>
            </div>

            <div class="circle-footer">
              <div class="member-stack">
                ${mockMembers.map((src, i) => `
                  <div class="avatar avatar-sm" style="margin-left:${i > 0 ? '-10px' : '0'};">
                    <img src="${src}" alt="Member" loading="lazy"/>
                  </div>
                `).join('')}
                <span class="member-count">+${circle.members - 3} more</span>
              </div>
              <button
                class="btn btn-sm ${isJoined ? 'btn-connected' : 'btn-primary'} circle-join-btn"
                data-cid="${circle.id}"
                aria-label="${isJoined ? 'Leave' : 'Join'} ${circle.name}"
              >
                ${isJoined ? '✓ Joined' : 'Join Circle'}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    grid.querySelectorAll('.circle-join-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = parseInt(btn.dataset.cid);
        const circle = CIRCLES_DATA.find(c => c.id === cid);
        const joined = State.toggle('joinedCircles', cid);
        btn.textContent = joined ? '✓ Joined' : 'Join Circle';
        btn.className = `btn btn-sm ${joined ? 'btn-connected' : 'btn-primary'} circle-join-btn`;
        showToast(
          joined ? `Joined "${circle.name}" 🎉` : `Left "${circle.name}"`,
          joined ? 'success' : 'info'
        );
        if (activeFilter === 'joined') renderCircles();
      });
    });

    requestAnimationFrame(() => {
      grid.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('revealed'), i * 60);
      });
    });
  }

  el.innerHTML = `
    <header class="reveal">
      <h1 class="page-title">Circles</h1>
      <p class="page-subtitle">Groups of people doing things together. Join your kind of circle.</p>
    </header>

    <div class="filter-row reveal" role="group" aria-label="Filter circles">
      <button class="filter-pill ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">All Circles</button>
      <button class="filter-pill ${activeFilter === 'joined' ? 'active' : ''}" data-filter="joined">
        ✓ Joined
      </button>
      ${INTENT_DATA.map(i => `
        <button class="filter-pill" data-filter="${i.label}">${i.emoji} ${i.label}</button>
      `).join('')}
    </div>

    <div class="grid-auto" id="circles-grid" role="list" aria-label="Circles list">
    </div>

    <!-- Create Circle CTA -->
    <div class="card reveal" style="margin-top:32px;text-align:center;padding:36px;background:var(--grad-subtle);border-color:var(--border-purple);">
      <div style="font-size:2.5rem;margin-bottom:12px;">🌀</div>
      <h2 style="font-family:var(--font-display);font-size:1.3rem;font-weight:800;margin-bottom:8px;">Start a New Circle</h2>
      <p class="text-sm text-muted" style="margin-bottom:20px;max-width:360px;margin-left:auto;margin-right:auto;">
        Have an intent, a recurring activity, or a shared goal? Gather people around it.
      </p>
      <button class="btn btn-primary" id="create-circle-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Create a Circle
      </button>
    </div>
  `;

  renderCircles();

  el.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      activeFilter = pill.dataset.filter;
      el.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderCircles();
    });
  });

  el.querySelector('#create-circle-btn')?.addEventListener('click', () => {
    showToast('Circle creation coming soon! 🌀', 'info');
  });
});
