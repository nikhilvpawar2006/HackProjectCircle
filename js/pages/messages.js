// =============================================
// MESSAGES PAGE
// =============================================

Router.register('messages', function(el) {
  let activeConvId = State.get('activeConversation') || CONVERSATIONS[0].id;

  function renderConvList() {
    const list = el.querySelector('#conv-list-items');
    list.innerHTML = CONVERSATIONS.map(conv => {
      const messages = State.getMessages(conv.id);
      const last = messages[messages.length - 1];
      const isActive = conv.id === activeConvId;
      return `
        <div class="conv-item ${isActive ? 'active' : ''}" data-cid="${conv.id}" role="button" tabindex="0" aria-label="Conversation with ${conv.name}" aria-pressed="${isActive}">
          <div class="avatar avatar-md" style="position:relative;flex-shrink:0;">
            <img src="${conv.avatar}" alt="${conv.name}" loading="lazy"/>
            ${conv.online ? '<div class="online-dot"></div>' : ''}
          </div>
          <div class="conv-info">
            <div class="conv-name">${conv.name}</div>
            <div class="conv-preview">${last ? (last.from === 'me' ? 'You: ' : '') + last.text : 'No messages yet'}</div>
          </div>
          <div>
            <div class="conv-time">${last?.time || ''}</div>
          </div>
          ${conv.unread > 0 ? `<div class="conv-unread">${conv.unread}</div>` : ''}
        </div>
      `;
    }).join('');

    list.querySelectorAll('.conv-item').forEach(item => {
      item.addEventListener('click', () => {
        activeConvId = parseInt(item.dataset.cid);
        State.set('activeConversation', activeConvId);
        renderConvList();
        renderChat();
      });
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') item.click();
      });
    });
  }

  function renderChat() {
    const conv = CONVERSATIONS.find(c => c.id === activeConvId);
    if (!conv) return;

    const chatPanel = el.querySelector('#chat-panel');
    const messages = State.getMessages(activeConvId);

    chatPanel.innerHTML = `
      <div class="chat-header">
        <div class="avatar avatar-md" style="flex-shrink:0;">
          <img src="${conv.avatar}" alt="${conv.name}" loading="lazy"/>
        </div>
        <div class="chat-header-info">
          <div class="chat-header-name">${conv.name}</div>
          <div class="chat-header-status">${conv.online ? '● Online now' : 'Offline'}</div>
        </div>
        <div class="chat-header-actions">
          <button class="chat-header-btn" aria-label="View profile" title="View profile" id="chat-view-profile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>
          </button>
          <button class="chat-header-btn" aria-label="Connect" title="Connect" id="chat-connect-btn">
            ${State.has('connectedUsers', conv.userId)
              ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
              : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
            }
          </button>
          <button class="chat-header-btn" aria-label="More options" title="More options">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
        </div>
      </div>

      <div class="chat-messages" id="chat-messages-list" aria-label="Chat messages" aria-live="polite">
        ${messages.map((msg, i) => `
          <div class="msg-group">
            <div class="msg-row ${msg.from === 'me' ? 'mine' : ''}">
              ${msg.from !== 'me' ? `<div class="avatar avatar-sm"><img src="${conv.avatar}" alt="${conv.name}" loading="lazy"/></div>` : ''}
              <div>
                <div class="msg-bubble">${msg.text}</div>
                ${i === messages.length - 1 || messages[i+1]?.from !== msg.from
                  ? `<div class="msg-time">${msg.time}</div>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="chat-input-area">
        <div class="chat-input-wrap">
          <textarea
            class="chat-input"
            id="chat-input"
            placeholder="Message ${conv.name}..."
            aria-label="Type a message"
            rows="1"
          ></textarea>
          <button class="chat-emoji-btn" aria-label="Add emoji" title="Add emoji" id="emoji-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
          </button>
        </div>
        <button class="send-btn" id="send-btn" aria-label="Send message">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    `;

    // Scroll to bottom
    const msgList = chatPanel.querySelector('#chat-messages-list');
    msgList.scrollTop = msgList.scrollHeight;

    // Send message
    const input = chatPanel.querySelector('#chat-input');
    const sendBtn = chatPanel.querySelector('#send-btn');

    function sendMessage() {
      const text = input.value.trim();
      if (!text) return;

      const msg = { id: Date.now(), from: 'me', text, time: 'Just now' };
      State.addMessage(activeConvId, msg);

      // Add to DOM
      const group = document.createElement('div');
      group.className = 'msg-group';
      group.innerHTML = `
        <div class="msg-row mine">
          <div>
            <div class="msg-bubble">${text}</div>
            <div class="msg-time">Just now</div>
          </div>
        </div>
      `;
      msgList.appendChild(group);
      msgList.scrollTop = msgList.scrollHeight;

      input.value = '';
      input.style.height = 'auto';

      // Update conv list preview
      renderConvList();

      // Simulate reply
      const replies = [
        "That's a great point! 🙌",
        "Absolutely, let's sync up!",
        "I was thinking the same thing!",
        "Can we jump on a call this week?",
        "Love this idea. Let's build it.",
        "Wow, yes! I've been thinking about this too.",
        "When do you want to start? 🚀"
      ];
      setTimeout(() => {
        const reply = { id: Date.now(), from: 'them', text: replies[Math.floor(Math.random() * replies.length)], time: 'Just now' };
        State.addMessage(activeConvId, reply);
        const replyGroup = document.createElement('div');
        replyGroup.className = 'msg-group';
        replyGroup.innerHTML = `
          <div class="msg-row">
            <div class="avatar avatar-sm"><img src="${conv.avatar}" alt="${conv.name}"/></div>
            <div>
              <div class="msg-bubble">${reply.text}</div>
              <div class="msg-time">Just now</div>
            </div>
          </div>
        `;
        msgList.appendChild(replyGroup);
        msgList.scrollTop = msgList.scrollHeight;
      }, 1200 + Math.random() * 800);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    });

    // Emoji button
    chatPanel.querySelector('#emoji-btn')?.addEventListener('click', () => {
      const emojis = ['😊', '🚀', '🔥', '💡', '🎉', '👀', '💪', '🙌', '✨', '💜'];
      input.value += emojis[Math.floor(Math.random() * emojis.length)];
      input.focus();
    });

    // View profile
    chatPanel.querySelector('#chat-view-profile')?.addEventListener('click', () => {
      showToast(`Viewing ${conv.name}'s profile`, 'info');
    });

    // Connect button
    chatPanel.querySelector('#chat-connect-btn')?.addEventListener('click', () => {
      const connected = State.toggle('connectedUsers', conv.userId);
      showToast(connected ? `Connected with ${conv.name}!` : `Removed connection`, connected ? 'success' : 'info');
      renderChat();
    });
  }

  el.innerHTML = `
    <header class="reveal">
      <h1 class="page-title">Messages</h1>
      <p class="page-subtitle">Real conversations with real people who share your intent.</p>
    </header>

    <div class="messages-layout reveal">
      <!-- Conversation List -->
      <div class="conv-list" role="list" aria-label="Conversations">
        <div class="conv-search">
          <div class="search-wrap" style="margin-bottom:0;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input class="search-input" placeholder="Search messages..." aria-label="Search messages" id="msg-search" type="search"/>
          </div>
        </div>
        <div id="conv-list-items"></div>
      </div>

      <!-- Chat Panel -->
      <div class="chat-panel" id="chat-panel" role="region" aria-label="Chat conversation">
        <div class="chat-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <p>Select a conversation to start messaging</p>
        </div>
      </div>
    </div>
  `;

  renderConvList();
  renderChat();

  // Search conversations
  el.querySelector('#msg-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    el.querySelectorAll('.conv-item').forEach(item => {
      const name = item.querySelector('.conv-name').textContent.toLowerCase();
      item.style.display = name.includes(q) ? '' : 'none';
    });
  });
});
