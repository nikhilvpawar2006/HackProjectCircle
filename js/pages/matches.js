// =============================================
// MATCHES PAGE
// =============================================

Router.register('matches', function(el) {
  const topMatch = USERS[0]; // Priya — 97%
  const otherMatches = USERS.slice(1, 7);

  el.innerHTML = `
    <header class="reveal">
      <h1 class="page-title">Your Matches</h1>
      <p class="page-subtitle">People who share your intent, skills, and energy. The algorithm is just the start.</p>
    </header>

    <!-- Top Match -->
    <section aria-label="Best match" class="reveal">
      <h2 class="section-title mb-4">✨ Best Match This Week</h2>
      <div class="match-featured">
        <div class="match-featured-avatar">
          <div class="avatar" style="width:90px;height:90px;border:3px solid var(--purple-500);">
            <img src="${topMatch.avatar}" alt="${topMatch.name}" />
          </div>
          <div class="match-best-badge">🏆 Top Pick</div>
        </div>
        <div class="match-featured-info" style="flex:1;">
          <div class="match-featured-name">${topMatch.name}</div>
          <div class="match-featured-handle">${topMatch.handle} · ${topMatch.location}</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">
            ${topMatch.intents.map(i => `<span class="tag tag-${i.toLowerCase()}">${i}</span>`).join('')}
            ${topMatch.skills.slice(0,3).map(s => `<span class="tag tag-skill">${s}</span>`).join('')}
          </div>
          <p class="match-featured-why">"${topMatch.bio}"</p>
          <div style="margin-bottom:16px;">
            <div class="text-sm text-muted" style="margin-bottom:4px;">Currently: ${topMatch.activity}</div>
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn btn-primary" id="featured-connect-btn" data-uid="${topMatch.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              ${State.has('connectedUsers', topMatch.id) ? 'Connected ✓' : 'Connect'}
            </button>
            <button class="btn btn-secondary" id="featured-msg-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              Message
            </button>
          </div>
        </div>
        <div style="text-align:center;flex-shrink:0;">
          <div class="match-score-big" aria-label="${topMatch.match} percent match">${topMatch.match}%</div>
          <div class="text-sm text-muted">compatibility</div>
          <div class="match-bar" style="width:80px;margin:10px auto 0;">
            <div class="match-bar-fill" style="width:${topMatch.match}%"></div>
          </div>
          <div style="margin-top:12px;font-size:0.75rem;color:var(--text-muted);">
            Shared intents<br/>Complementary skills<br/>Active on same schedule
          </div>
        </div>
      </div>
    </section>

    <!-- Why These Matches -->
    <section class="reveal" aria-label="Why you matched">
      <h2 class="section-title mb-4">Why You're Matching</h2>
      <div class="grid-3" style="margin-bottom:36px;">
        <div class="card" style="text-align:center;">
          <div style="font-size:1.8rem;margin-bottom:8px;">🎯</div>
          <div style="font-weight:700;margin-bottom:4px;">Shared Intent</div>
          <div class="text-sm text-muted">You both want to Build. That's the foundation.</div>
        </div>
        <div class="card" style="text-align:center;">
          <div style="font-size:1.8rem;margin-bottom:8px;">⚡</div>
          <div style="font-weight:700;margin-bottom:4px;">Skill Complement</div>
          <div class="text-sm text-muted">You fill gaps in each other's skill sets.</div>
        </div>
        <div class="card" style="text-align:center;">
          <div style="font-size:1.8rem;margin-bottom:8px;">🌍</div>
          <div style="font-weight:700;margin-bottom:4px;">Circle Overlap</div>
          <div class="text-sm text-muted">You've joined some of the same circles.</div>
        </div>
      </div>
    </section>

    <!-- Other Matches -->
    <section aria-label="More matches" class="reveal">
      <h2 class="section-title mb-4">More Matches For You</h2>
      <div class="people-grid" id="matches-grid">
        ${otherMatches.map(user => `
          <article class="person-card" data-uid="${user.id}" aria-label="${user.name} match card">
            <div class="person-header">
              <div class="avatar avatar-lg" style="position:relative;">
                <img src="${user.avatar}" alt="${user.name}" loading="lazy"/>
                ${user.online ? '<div class="online-dot"></div>' : ''}
              </div>
              <div class="person-info">
                <div class="person-name">${user.name}</div>
                <div class="person-handle">${user.handle}</div>
                <div class="person-location">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  ${user.location}
                </div>
              </div>
            </div>
            <p class="person-bio">${user.bio}</p>
            <div class="person-skills">
              ${user.intents.map(i => `<span class="tag tag-${i.toLowerCase()}">${i}</span>`).join('')}
              ${user.skills.slice(0,2).map(s => `<span class="tag tag-skill">${s}</span>`).join('')}
            </div>
            <div class="person-footer">
              <div class="person-match">
                <span class="match-label">Match</span>
                <div class="match-row">
                  <div class="match-bar" style="width:60px;">
                    <div class="match-bar-fill" style="width:${user.match}%"></div>
                  </div>
                  <span class="match-pct">${user.match}%</span>
                </div>
              </div>
              <div style="display:flex;gap:8px;">
                <button
                  class="btn btn-icon btn-sm btn-secondary msg-match-btn"
                  data-uid="${user.id}"
                  aria-label="Message ${user.name}"
                  title="Message"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </button>
                <button
                  class="btn btn-sm ${State.has('connectedUsers', user.id) ? 'btn-connected' : 'btn-primary'} match-connect-btn"
                  data-uid="${user.id}"
                  aria-label="${State.has('connectedUsers', user.id) ? 'Connected to' : 'Connect with'} ${user.name}"
                >
                  ${State.has('connectedUsers', user.id) ? '✓' : '+'}
                </button>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;

  // Featured connect
  el.querySelector('#featured-connect-btn')?.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const uid = topMatch.id;
    const connected = State.toggle('connectedUsers', uid);
    btn.textContent = connected ? 'Connected ✓' : 'Connect';
    btn.className = `btn ${connected ? 'btn-connected' : 'btn-primary'}`;
    if (connected) btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Connected ✓';
    showToast(connected ? `Connected with ${topMatch.name}! 🎉` : 'Disconnected', connected ? 'success' : 'info');
  });

  el.querySelector('#featured-msg-btn')?.addEventListener('click', () => {
    State.set('activeConversation', 1);
    Router.navigate('messages');
  });

  // Match connect buttons
  el.querySelectorAll('.match-connect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const uid = parseInt(btn.dataset.uid);
      const user = USERS.find(u => u.id === uid);
      const connected = State.toggle('connectedUsers', uid);
      btn.textContent = connected ? '✓' : '+';
      btn.className = `btn btn-sm ${connected ? 'btn-connected' : 'btn-primary'} match-connect-btn`;
      showToast(connected ? `Connected with ${user.name}!` : `Removed ${user.name}`, connected ? 'success' : 'info');
    });
  });

  // Message buttons
  el.querySelectorAll('.msg-match-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const uid = parseInt(btn.dataset.uid);
      const conv = CONVERSATIONS.find(c => c.userId === uid);
      if (conv) State.set('activeConversation', conv.id);
      Router.navigate('messages');
    });
  });
});
