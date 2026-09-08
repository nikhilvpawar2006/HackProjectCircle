// =============================================
// DISCOVER PAGE
// =============================================

Router.register('discover', function(el) {
  let searchQuery = '';
  let activeFilter = 'all';

  function filteredUsers() {
    return USERS.filter(u => {
      const matchesSearch = !searchQuery ||
        u.name.toLowerCase().includes(searchQuery) ||
        u.handle.toLowerCase().includes(searchQuery) ||
        u.bio.toLowerCase().includes(searchQuery) ||
        u.skills.some(s => s.toLowerCase().includes(searchQuery)) ||
        u.intents.some(i => i.toLowerCase().includes(searchQuery));
      const matchesFilter = activeFilter === 'all' ||
        u.intents.map(i => i.toLowerCase()).includes(activeFilter.toLowerCase());
      return matchesSearch && matchesFilter;
    });
  }

  function renderUsers() {
    const grid = el.querySelector('#people-grid');
    const users = filteredUsers();

    if (users.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <h3>No matches found</h3>
          <p>Try adjusting your search or filter</p>
        </div>`;
      return;
    }

    grid.innerHTML = users.map(user => `
      <article class="person-card reveal" data-uid="${user.id}" aria-label="${user.name} profile card">
        <div class="person-header">
          <div class="avatar avatar-lg" style="position:relative;">
            <img src="${user.avatar}" alt="${user.name}" loading="lazy"/>
            ${user.online ? '<div class="online-dot"></div>' : ''}
          </div>
          <div class="person-info">
            <div class="person-name">
              ${user.name}
              ${user.verified ? '<svg style="display:inline;width:14px;height:14px;vertical-align:middle;color:var(--cyan-400);" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>' : ''}
            </div>
            <div class="person-handle">${user.handle}</div>
            <div class="person-location">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              ${user.location}
            </div>
          </div>
          <button
            class="btn btn-icon btn-sm ${State.has('connectedUsers', user.id) ? 'btn-connected' : 'btn-secondary'} person-connect-btn"
            data-uid="${user.id}"
            aria-label="${State.has('connectedUsers', user.id) ? 'Connected to' : 'Connect with'} ${user.name}"
            title="${State.has('connectedUsers', user.id) ? 'Connected' : 'Connect'}"
          >
            ${State.has('connectedUsers', user.id)
              ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>'
              : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
            }
          </button>
        </div>

        <p class="person-bio">${user.bio}</p>

        <div class="person-skills">
          ${user.intents.map(i => `<span class="tag tag-${i.toLowerCase()}">${i}</span>`).join('')}
          ${user.skills.slice(0,3).map(s => `<span class="tag tag-skill">${s}</span>`).join('')}
          ${user.skills.length > 3 ? `<span class="tag tag-neutral">+${user.skills.length-3}</span>` : ''}
        </div>

        <div class="person-footer">
          <div class="person-match">
            <span class="match-label">Compatibility</span>
            <div class="match-row">
              <div class="match-bar" style="width:80px;">
                <div class="match-bar-fill" style="width:${user.match}%"></div>
              </div>
              <span class="match-pct">${user.match}%</span>
            </div>
          </div>
          <button
            class="btn btn-ghost btn-sm msg-btn"
            data-uid="${user.id}"
            aria-label="Message ${user.name}"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Message
          </button>
        </div>
      </article>
    `).join('');

    // Re-attach events
    grid.querySelectorAll('.person-connect-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const uid = parseInt(btn.dataset.uid);
        const user = USERS.find(u => u.id === uid);
        const connected = State.toggle('connectedUsers', uid);
        btn.className = `btn btn-icon btn-sm ${connected ? 'btn-connected' : 'btn-secondary'} person-connect-btn`;
        btn.innerHTML = connected
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
        showToast(connected ? `Connected with ${user.name}! 🎉` : `Removed ${user.name}`, connected ? 'success' : 'info');
      });
    });

    grid.querySelectorAll('.msg-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const uid = parseInt(btn.dataset.uid);
        const conv = CONVERSATIONS.find(c => c.userId === uid);
        if (conv) {
          State.set('activeConversation', conv.id);
          Router.navigate('messages');
        } else {
          showToast('Opening new message...', 'info');
          Router.navigate('messages');
        }
      });
    });

    // Scroll reveal
    requestAnimationFrame(() => {
      grid.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('revealed'), i * 50);
      });
    });
  }

  el.innerHTML = `
    <header class="reveal">
      <h1 class="page-title">Discover People</h1>
      <p class="page-subtitle">Find people who want to do the same thing as you.</p>
    </header>

    <div class="search-wrap reveal" role="search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input
        class="search-input"
        id="discover-search"
        type="search"
        placeholder="Search by name, skill, intent..."
        aria-label="Search people"
        autocomplete="off"
        value="${searchQuery}"
      />
    </div>

    <div class="filter-row reveal" role="group" aria-label="Filter by intent">
      <button class="filter-pill ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">All Intents</button>
      ${INTENT_DATA.map(i => `
        <button class="filter-pill ${activeFilter === i.label ? 'active' : ''}" data-filter="${i.label}">
          ${i.emoji} ${i.label}
        </button>
      `).join('')}
    </div>

    <div id="results-count" class="text-sm text-muted mb-4" aria-live="polite">
      Showing ${USERS.length} people
    </div>

    <div class="people-grid" id="people-grid" role="list" aria-label="People list">
    </div>
  `;

  renderUsers();

  // Search
  const searchInput = el.querySelector('#discover-search');
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.toLowerCase().trim();
    const count = filteredUsers().length;
    el.querySelector('#results-count').textContent = `Showing ${count} people`;
    renderUsers();
  });

  // Filters
  el.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      activeFilter = pill.dataset.filter;
      el.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const count = filteredUsers().length;
      el.querySelector('#results-count').textContent = `Showing ${count} people`;
      renderUsers();
    });
  });
});
