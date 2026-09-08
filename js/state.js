// =============================================
// CIRCLE — App State
// =============================================

const State = (() => {
  const data = {
    currentIntent: null,
    connectedUsers: new Set(),
    joinedCircles: new Set([2, 4]), // pre-joined
    joinedActivities: new Set([2, 6]), // pre-joined
    activeConversation: null,
    conversationMessages: {},
    searchQuery: '',
    discoverFilter: 'all',
    circlesFilter: 'all',
    activitiesFilter: 'all',
    notifications: { matches: 3, messages: 5 },
    currentProfileTab: 'about',
    profileData: {
      name: "Alex Rivera", handle: "@alexr",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=you&backgroundColor=b6e3f4",
      bio: "Product engineer & tinkerer. I build tools that help creative people do their best work. Currently exploring the intersection of AI and human creativity.",
      location: "New York, NY",
      intents: ["Build", "Create"],
      skills: ["TypeScript", "React", "Node.js", "Product Design", "AI Tools"],
      connections: 87, circles: 4, activities: 12,
      joined: "Aug 2025"
    }
  };

  // Initialize conversation messages from CONVERSATIONS
  CONVERSATIONS.forEach(conv => {
    data.conversationMessages[conv.id] = [...conv.messages];
  });

  return {
    get: (key) => data[key],
    set: (key, val) => { data[key] = val; },
    toggle: (setKey, id) => {
      if (data[setKey].has(id)) {
        data[setKey].delete(id);
        return false;
      } else {
        data[setKey].add(id);
        return true;
      }
    },
    has: (setKey, id) => data[setKey].has(id),
    addMessage: (convId, msg) => {
      if (!data.conversationMessages[convId]) data.conversationMessages[convId] = [];
      data.conversationMessages[convId].push(msg);
    },
    getMessages: (convId) => data.conversationMessages[convId] || [],
    decrementBadge: (type) => {
      if (data.notifications[type] > 0) {
        data.notifications[type]--;
        updateBadges();
      }
    }
  };
})();

function updateBadges() {
  const mb = document.getElementById('matches-badge');
  const msgb = document.getElementById('messages-badge');
  if (mb) {
    const count = State.get('notifications').matches;
    mb.textContent = count;
    mb.style.display = count > 0 ? 'inline-flex' : 'none';
  }
  if (msgb) {
    const count = State.get('notifications').messages;
    msgb.textContent = count;
    msgb.style.display = count > 0 ? 'inline-flex' : 'none';
  }
  // Bottom nav badge
  const bb = document.querySelector('.bottom-badge');
  if (bb) {
    const count = State.get('notifications').messages;
    bb.textContent = count;
    bb.style.display = count > 0 ? 'inline-flex' : 'none';
  }
}
