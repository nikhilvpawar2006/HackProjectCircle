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
        <div class="flex items-center justify-between mb-4">
          <h2 class="section-title">Your Feed</h2>
        </div>
        
        <!-- Post Composer -->
        <div class="post-composer">
          <textarea id="post-composer-input" placeholder="What are you building or thinking about today?"></textarea>
          <div class="post-composer-footer">
            <div class="text-sm text-muted flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              Attach
            </div>
            <button class="btn btn-primary btn-sm" id="create-post-btn">Post</button>
          </div>
        </div>

        <!-- Dynamic Feed Container -->
        <div id="dynamic-feed-container">
          <!-- Posts injected by JS -->
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

  // Feed rendering
  function renderFeed() {
    const feedContainer = el.querySelector('#dynamic-feed-container');
    if (!feedContainer) return;
    const posts = State.get('userPosts') || [];
    
    if (posts.length === 0) {
      feedContainer.innerHTML = '<div class="empty-state">No posts yet. Start the conversation!</div>';
      return;
    }

    feedContainer.innerHTML = posts.map(post => {
      const isLiked = State.has('likedPosts', post.id);
      return `
        <div class="post-card reveal">
          <div class="post-header">
            <div class="avatar avatar-sm"><img src="${post.authorAvatar}" alt="${post.authorName}"></div>
            <div>
              <div class="post-author-name">${post.authorName}</div>
              <div class="post-author-handle">${post.authorHandle}</div>
            </div>
            <div class="post-time">${post.time}</div>
          </div>
          <div class="post-content">${post.content}</div>
          <div class="post-actions">
            <button class="post-action-btn like-btn ${isLiked ? 'liked' : ''}" data-id="${post.id}" aria-label="${isLiked ? 'Unlike' : 'Like'} post">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <span>${post.likes || 0}</span>
            </button>
            <button class="post-action-btn comment-btn" data-id="${post.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>${post.comments || 0}</span>
            </button>
            <button class="post-action-btn share-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              Share
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach feed listeners
    feedContainer.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.dataset.id);
        const isLiked = State.toggle('likedPosts', id);
        
        // Find post and update like count locally
        const posts = State.get('userPosts');
        const post = posts.find(p => p.id === id);
        if (post) {
          post.likes = isLiked ? post.likes + 1 : post.likes - 1;
        }
        
        renderFeed(); // Re-render to update UI
      });
    });

    feedContainer.querySelectorAll('.comment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Comments coming soon!', 'info');
      });
    });
    
    feedContainer.querySelectorAll('.share-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Link copied to clipboard', 'success');
      });
    });

    // Trigger reveal animations
    setTimeout(() => {
      feedContainer.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    }, 50);
  }

  renderFeed();

  // Handle post creation
  const composerBtn = el.querySelector('#create-post-btn');
  const composerInput = el.querySelector('#post-composer-input');
  
  if (composerBtn && composerInput) {
    composerBtn.addEventListener('click', () => {
      const content = composerInput.value.trim();
      if (!content) {
        showToast('Please enter something to post.', 'warning');
        return;
      }
      
      const profile = State.get('profileData');
      const newPost = {
        id: Date.now(),
        userId: 0, // 0 for current user
        authorName: profile.name,
        authorHandle: profile.handle,
        authorAvatar: profile.avatar,
        content: content,
        time: "Just now",
        likes: 0,
        comments: 0,
        intent: State.get('currentIntent') || 'Discuss'
      };
      
      const posts = State.get('userPosts');
      posts.unshift(newPost); // add to top
      State.set('userPosts', posts);
      
      composerInput.value = ''; // clear input
      renderFeed(); // update feed
      showToast('Post published successfully! 🎉', 'success');
    });
  }

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
