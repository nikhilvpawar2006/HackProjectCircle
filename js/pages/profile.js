// =============================================
// PROFILE PAGE
// =============================================

Router.register('profile', function(el) {
  const profile = State.get('profileData');
  let activeTab = State.get('currentProfileTab') || 'about';

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'circles', label: 'Circles' },
    { id: 'activities', label: 'Activities' },
    { id: 'connections', label: 'Connections' }
  ];

  function renderTabContent() {
    const tc = el.querySelector('#tab-content');
    if (activeTab === 'about') {
      tc.innerHTML = `
        <div class="grid-2">
          <div>
            <h2 class="section-title mb-4">Skills & Interests</h2>
            <div class="card">
              <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;">
                ${profile.skills.map(s => `<span class="tag tag-skill">${s}</span>`).join('')}
              </div>
              <button class="btn btn-secondary btn-sm" id="add-skill-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Skill
              </button>
            </div>

            <h2 class="section-title mb-4 mt-4">My Intents</h2>
            <div class="card" style="display:flex;flex-wrap:wrap;gap:10px;">
              ${INTENT_DATA.map(i => `
                <button
                  class="filter-pill ${profile.intents.includes(i.label) ? 'active' : ''} intent-toggle-btn"
                  data-intent="${i.label}"
                  aria-pressed="${profile.intents.includes(i.label)}"
                >
                  ${i.emoji} ${i.label}
                </button>
              `).join('')}
            </div>
          </div>

          <div>
            <h2 class="section-title mb-4">Currently Working On</h2>
            <div class="card">
              <div style="display:flex;align-items:center;gap:12px;padding-bottom:16px;border-bottom:1px solid var(--border-subtle);margin-bottom:16px;">
                <div style="font-size:1.8rem;">🛠️</div>
                <div>
                  <div style="font-weight:700;margin-bottom:4px;">AI Creativity Assistant</div>
                  <div class="text-sm text-muted">Building · In Progress</div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:12px;">
                <div style="font-size:1.8rem;">📖</div>
                <div>
                  <div style="font-weight:700;margin-bottom:4px;">Learning Rust</div>
                  <div class="text-sm text-muted">Learning · Week 3 of 8</div>
                </div>
              </div>
            </div>

            <h2 class="section-title mb-4 mt-4">Bio</h2>
            <div class="card">
              <p class="text-sm" style="color:var(--text-secondary);line-height:1.7;margin-bottom:14px;">${profile.bio}</p>
              <button class="btn btn-secondary btn-sm" id="edit-bio-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                Edit Bio
              </button>
            </div>
          </div>
        </div>
      `;

      tc.querySelector('#add-skill-btn')?.addEventListener('click', () => {
        showToast('Skill editor coming soon! 🛠️', 'info');
      });
      tc.querySelector('#edit-bio-btn')?.addEventListener('click', () => {
        showToast('Bio editor coming soon! ✍️', 'info');
      });

      tc.querySelectorAll('.intent-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const intent = btn.dataset.intent;
          const idx = profile.intents.indexOf(intent);
          if (idx >= 0) {
            profile.intents.splice(idx, 1);
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
            showToast(`Removed "${intent}" from your intents`, 'info');
          } else {
            profile.intents.push(intent);
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            showToast(`Added "${intent}" to your intents 🎯`, 'success');
          }
        });
      });

    } else if (activeTab === 'circles') {
      const myCircles = CIRCLES_DATA.filter(c => State.has('joinedCircles', c.id));
      tc.innerHTML = `
        <h2 class="section-title mb-4">Your Circles (${myCircles.length})</h2>
        ${myCircles.length === 0
          ? `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle></svg><h3>No circles yet</h3><p>Join a circle to see it here</p><button class="btn btn-primary btn-sm mt-4" data-page="circles">Browse Circles</button></div>`
          : `<div class="grid-3">${myCircles.map(c => `
            <div class="card" style="text-align:center;padding:20px;">
              <div style="font-size:2rem;margin-bottom:8px;">${c.emoji}</div>
              <div style="font-weight:700;margin-bottom:4px;">${c.name}</div>
              <div class="text-sm text-muted">${c.members} members</div>
              <span class="tag tag-${c.intent.toLowerCase()}" style="margin-top:10px;">${c.intent}</span>
            </div>
          `).join('')}</div>`
        }
      `;

    } else if (activeTab === 'activities') {
      const myActs = ACTIVITIES_DATA.filter(a => State.has('joinedActivities', a.id));
      tc.innerHTML = `
        <h2 class="section-title mb-4">Your Activities (${myActs.length})</h2>
        ${myActs.length === 0
          ? `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg><h3>No activities yet</h3><p>Join an activity to see it here</p><button class="btn btn-primary btn-sm mt-4" data-page="activities">Browse Activities</button></div>`
          : `<div class="grid-3">${myActs.map(a => `
            <div class="card">
              <div style="font-size:1.8rem;margin-bottom:10px;">${a.emoji}</div>
              <div style="font-weight:700;margin-bottom:4px;">${a.title}</div>
              <div class="text-sm text-muted">${a.date}</div>
              <span class="tag tag-${a.intent.toLowerCase()}" style="margin-top:10px;">${a.intent}</span>
            </div>
          `).join('')}</div>`
        }
      `;

    } else if (activeTab === 'connections') {
      const connectedIds = [...State.get('connectedUsers')];
      const connectedUsers = USERS.filter(u => connectedIds.includes(u.id));
      tc.innerHTML = `
        <h2 class="section-title mb-4">Connections (${connectedUsers.length})</h2>
        ${connectedUsers.length === 0
          ? `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg><h3>No connections yet</h3><p>Head to Discover to find people</p><button class="btn btn-primary btn-sm mt-4" data-page="discover">Discover People</button></div>`
          : `<div class="people-grid">${connectedUsers.map(u => `
            <div class="card" style="display:flex;align-items:center;gap:14px;padding:16px;">
              <div class="avatar avatar-md" style="position:relative;">
                <img src="${u.avatar}" alt="${u.name}" loading="lazy"/>
                ${u.online ? '<div class="online-dot"></div>' : ''}
              </div>
              <div style="flex:1;min-width:0;">
                <div style="font-weight:700;font-size:0.9rem;">${u.name}</div>
                <div class="text-muted" style="font-size:0.78rem;">${u.handle}</div>
                <div style="display:flex;gap:5px;margin-top:5px;flex-wrap:wrap;">
                  ${u.intents.map(i => `<span class="tag tag-${i.toLowerCase()}" style="font-size:0.68rem;padding:2px 8px;">${i}</span>`).join('')}
                </div>
              </div>
              <button
                class="btn btn-sm btn-ghost msg-conn-btn"
                data-uid="${u.id}"
                aria-label="Message ${u.name}"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </button>
            </div>
          `).join('')}</div>`
        }
      `;

      tc.querySelectorAll('.msg-conn-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const uid = parseInt(btn.dataset.uid);
          const conv = CONVERSATIONS.find(c => c.userId === uid);
          if (conv) State.set('activeConversation', conv.id);
          Router.navigate('messages');
        });
      });
    }
  }

  el.innerHTML = `
    <!-- Profile Header -->
    <div class="profile-header-card reveal">
      <div class="profile-avatar-wrap">
        <div class="profile-avatar-lg">
          <img src="${profile.avatar}" alt="${profile.name}" />
        </div>
        <div class="profile-online-badge" aria-label="Online"></div>
      </div>
      <div class="profile-info">
        <h1 class="profile-name">${profile.name}</h1>
        <div class="profile-handle-full">${profile.handle} · ${profile.location} · Joined ${profile.joined}</div>
        <p class="profile-bio-full">${profile.bio}</p>
        <div class="profile-tags">
          ${profile.intents.map(i => `<span class="tag tag-${i.toLowerCase()}">${i}</span>`).join('')}
        </div>
        <div class="profile-stats-row">
          <div class="profile-stat">
            <div class="profile-stat-val">${profile.connections}</div>
            <div class="profile-stat-lbl">Connections</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-val">${profile.circles}</div>
            <div class="profile-stat-lbl">Circles</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-val">${profile.activities}</div>
            <div class="profile-stat-lbl">Activities</div>
          </div>
        </div>
        <div class="profile-actions">
          <button class="btn btn-primary" id="edit-profile-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Edit Profile
          </button>
          <button class="btn btn-secondary" id="share-profile-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            Share Profile
          </button>
          <button class="btn btn-secondary" id="settings-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Settings
          </button>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="profile-tabs reveal" role="tablist" aria-label="Profile sections">
      ${tabs.map(t => `
        <button
          class="profile-tab ${activeTab === t.id ? 'active' : ''}"
          data-tab="${t.id}"
          role="tab"
          aria-selected="${activeTab === t.id}"
          aria-controls="tab-content"
          id="tab-btn-${t.id}"
        >${t.label}</button>
      `).join('')}
    </div>

    <!-- Tab Content -->
    <div id="tab-content" class="reveal" role="tabpanel"></div>
  `;

  renderTabContent();

  // Tab switching
  el.querySelectorAll('.profile-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      State.set('currentProfileTab', activeTab);
      el.querySelectorAll('.profile-tab').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderTabContent();
    });
  });

  el.querySelector('#edit-profile-btn')?.addEventListener('click', () => {
    const p = State.get('profileData');
    const modalHtml = `
      <div class="flex justify-between items-center mb-4">
        <h2 class="modal-title">Edit Profile</h2>
        <button class="modal-close-btn" aria-label="Close modal">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label">Name</label>
        <input type="text" id="edit-name" class="form-input" value="${p.name}">
      </div>
      <div class="form-group">
        <label class="form-label">Handle</label>
        <input type="text" id="edit-handle" class="form-input" value="${p.handle}">
      </div>
      <div class="form-group">
        <label class="form-label">Location</label>
        <input type="text" id="edit-location" class="form-input" value="${p.location}">
      </div>
      <div class="form-group">
        <label class="form-label">Bio</label>
        <textarea id="edit-bio" class="form-input">${p.bio}</textarea>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary modal-close-btn" style="position:static;">Cancel</button>
        <button class="btn btn-primary" id="save-profile-btn">Save Changes</button>
      </div>
    `;
    
    // Using global openModal
    if (typeof openModal === 'function') {
      openModal(modalHtml);
      
      // Save listener
      document.getElementById('save-profile-btn')?.addEventListener('click', () => {
        p.name = document.getElementById('edit-name').value;
        p.handle = document.getElementById('edit-handle').value;
        p.location = document.getElementById('edit-location').value;
        p.bio = document.getElementById('edit-bio').value;
        
        State.set('profileData', p);
        closeModal();
        showToast('Profile updated!', 'success');
        Router.navigate('profile'); // Re-render profile
      });
    }
  });
  el.querySelector('#share-profile-btn')?.addEventListener('click', () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    showToast('Profile link copied! 🔗', 'success');
  });
  el.querySelector('#settings-btn')?.addEventListener('click', () => {
    showToast('Settings coming soon! ⚙️', 'info');
  });
});
