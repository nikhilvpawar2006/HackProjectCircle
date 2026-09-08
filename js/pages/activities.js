// =============================================
// ACTIVITIES PAGE
// =============================================

Router.register('activities', function(el) {
  let activeFilter = 'all';

  const FILTERS = ['all', 'Build', 'Create', 'Learn', 'Explore', 'Play', 'Discuss'];

  function filteredActivities() {
    if (activeFilter === 'all') return ACTIVITIES_DATA;
    if (activeFilter === 'joined') return ACTIVITIES_DATA.filter(a => State.has('joinedActivities', a.id));
    return ACTIVITIES_DATA.filter(a => a.intent.toLowerCase() === activeFilter.toLowerCase());
  }

  function renderActivities() {
    const grid = el.querySelector('#activities-grid');
    const activities = filteredActivities();

    if (activities.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          <h3>No activities here</h3>
          <p>Explore a different filter</p>
        </div>`;
      return;
    }

    grid.innerHTML = activities.map(act => {
      const isJoined = State.has('joinedActivities', act.id);
      const joined = act.totalSpots - act.spots;
      const pct = Math.round((joined / act.totalSpots) * 100);
      return `
        <article class="activity-card reveal" aria-label="${act.title} activity">
          <div class="activity-header">
            <div class="activity-icon">${act.emoji}</div>
            <div style="flex:1;min-width:0;">
              <div class="activity-title">${act.title}</div>
              <div class="activity-by">by <span style="color:var(--purple-400);">${act.by}</span> ${act.byHandle}</div>
            </div>
            <span class="tag tag-${act.intent.toLowerCase()}">${act.intent}</span>
          </div>

          <p class="activity-detail">${act.desc}</p>

          <div class="activity-meta">
            <div class="activity-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              ${act.date}
            </div>
            <div class="activity-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              ${act.time}
            </div>
            <div class="activity-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${act.format}
            </div>
            <div class="activity-meta-item" style="color:var(--text-secondary);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
              ${act.difficulty}
            </div>
          </div>

          <!-- Progress -->
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
              <span class="text-sm text-muted">${joined} / ${act.totalSpots} joined</span>
              <span class="spots-left">${act.spots} spots left</span>
            </div>
            <div class="match-bar" style="width:100%;">
              <div class="match-bar-fill" style="width:${pct}%"></div>
            </div>
          </div>

          <div class="activity-footer">
            <div style="display:flex;flex-wrap:wrap;gap:6px;">
              ${act.tags.map(t => `<span class="tag tag-neutral">${t}</span>`).join('')}
            </div>
            <button
              class="btn btn-sm ${isJoined ? 'btn-connected' : 'btn-primary'} activity-join-btn"
              data-aid="${act.id}"
              aria-label="${isJoined ? 'Leave' : 'Join'} ${act.title}"
            >
              ${isJoined ? '✓ Joined' : 'Join Activity'}
            </button>
          </div>
        </article>
      `;
    }).join('');

    grid.querySelectorAll('.activity-join-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const aid = parseInt(btn.dataset.aid);
        const act = ACTIVITIES_DATA.find(a => a.id === aid);
        const joined = State.toggle('joinedActivities', aid);
        btn.textContent = joined ? '✓ Joined' : 'Join Activity';
        btn.className = `btn btn-sm ${joined ? 'btn-connected' : 'btn-primary'} activity-join-btn`;
        showToast(
          joined ? `Joined "${act.title}"! 🎉 Check Messages for details.` : `Left "${act.title}"`,
          joined ? 'success' : 'info'
        );
        if (activeFilter === 'joined') renderActivities();
      });
    });

    requestAnimationFrame(() => {
      grid.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('revealed'), i * 70);
      });
    });
  }

  el.innerHTML = `
    <header class="reveal">
      <h1 class="page-title">Activities</h1>
      <p class="page-subtitle">Things happening in your intent space. Join, show up, do the thing.</p>
    </header>

    <!-- Upcoming highlight -->
    <div class="card reveal" style="background:linear-gradient(135deg,rgba(168,85,247,0.12),rgba(6,182,212,0.06));border-color:var(--border-purple);display:flex;align-items:center;gap:20px;margin-bottom:28px;flex-wrap:wrap;">
      <div style="font-size:2.5rem;">⚡</div>
      <div style="flex:1;min-width:200px;">
        <div style="font-weight:700;font-size:1rem;margin-bottom:4px;">48-Hour AI Hackathon starts in 5 days</div>
        <div class="text-sm text-muted">92 people have already joined. Build anything AI-powered.</div>
      </div>
      <button class="btn btn-primary" id="quick-join-hack-btn">Join Now</button>
    </div>

    <div class="filter-row reveal" role="group" aria-label="Filter activities">
      <button class="filter-pill active" data-filter="all">All Activities</button>
      <button class="filter-pill" data-filter="joined">✓ Joined</button>
      ${INTENT_DATA.map(i => `
        <button class="filter-pill" data-filter="${i.label}">${i.emoji} ${i.label}</button>
      `).join('')}
    </div>

    <div class="grid-auto" id="activities-grid" role="list" aria-label="Activities list">
    </div>

    <!-- Host Activity CTA -->
    <div class="card reveal" style="margin-top:32px;text-align:center;padding:36px;border-color:var(--border-cyan);">
      <div style="font-size:2.5rem;margin-bottom:12px;">⚡</div>
      <h2 style="font-family:var(--font-display);font-size:1.3rem;font-weight:800;margin-bottom:8px;">Host an Activity</h2>
      <p class="text-sm text-muted" style="margin-bottom:20px;max-width:360px;margin-left:auto;margin-right:auto;">
        A workshop, a game jam, a reading club. If you want to do it with people, post it.
      </p>
      <button class="btn btn-primary" id="host-activity-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Host an Activity
      </button>
    </div>
  `;

  renderActivities();

  el.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      activeFilter = pill.dataset.filter;
      el.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderActivities();
    });
  });

  el.querySelector('#quick-join-hack-btn')?.addEventListener('click', () => {
    const joined = State.toggle('joinedActivities', 1);
    showToast(joined ? 'Joined the AI Hackathon! 🚀' : 'Left the hackathon', joined ? 'success' : 'info');
  });

  el.querySelector('#host-activity-btn')?.addEventListener('click', () => {
    showToast('Activity hosting coming soon! ⚡', 'info');
  });
});
