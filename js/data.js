// =============================================
// CIRCLE — Mock Data
// =============================================

const USERS = [
  {
    id: 1, name: "Priya Menon", handle: "@priyam", location: "Bengaluru, India",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya&backgroundColor=b6e3f4",
    bio: "Full-stack dev building AI-powered productivity tools. Let's co-create something that matters.",
    intents: ["Build", "Learn"], skills: ["React", "Python", "LLMs", "Figma"],
    match: 97, online: true, connections: 142, circles: 5,
    joined: "Mar 2025", verified: true,
    activity: "Building a note-taking AI with RAG"
  },
  {
    id: 2, name: "Marcus Webb", handle: "@marcusw", location: "Austin, TX",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus&backgroundColor=ffd5dc",
    bio: "Game designer turned indie hacker. I ship games on weekends and learn everything I can weekdays.",
    intents: ["Play", "Build"], skills: ["Unity", "C#", "Game Design", "Blender"],
    match: 91, online: false, connections: 89, circles: 3,
    joined: "Jan 2025", verified: false,
    activity: "Jam participant — Retro Pixel Horror"
  },
  {
    id: 3, name: "Lena Fischer", handle: "@lenaf", location: "Berlin, Germany",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lena&backgroundColor=c0aede",
    bio: "Creative technologist. I make digital art that talks back. Exploring generative systems and chaos.",
    intents: ["Create", "Explore"], skills: ["p5.js", "TouchDesigner", "WebGL", "Sound Design"],
    match: 88, online: true, connections: 213, circles: 7,
    joined: "Feb 2025", verified: true,
    activity: "Generative visuals for music festival"
  },
  {
    id: 4, name: "Jamal Osei", handle: "@jamalo", location: "Accra, Ghana",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jamal&backgroundColor=d1d4f9",
    bio: "Teaching CS to underrepresented youth in West Africa. Also learning ML on the side.",
    intents: ["Learn", "Discuss"], skills: ["Python", "Teaching", "Data Science", "Storytelling"],
    match: 85, online: true, connections: 67, circles: 4,
    joined: "Apr 2025", verified: true,
    activity: "Building open-source ML curriculum"
  },
  {
    id: 5, name: "Sofia Reyes", handle: "@sofiar", location: "Mexico City, Mexico",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sofia&backgroundColor=ffdfbf",
    bio: "UX researcher obsessed with inclusive design. Currently exploring spatial computing.",
    intents: ["Explore", "Discuss"], skills: ["UX Research", "Figma", "Spatial UI", "A/B Testing"],
    match: 82, online: false, connections: 178, circles: 6,
    joined: "Dec 2024", verified: true,
    activity: "Vision Pro UX pattern library"
  },
  {
    id: 6, name: "Kenji Nakamura", handle: "@kenjin", location: "Tokyo, Japan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kenji&backgroundColor=b6e3f4",
    bio: "Open-source rustacean & WebAssembly evangelist. I discuss systems programming.",
    intents: ["Build", "Discuss"], skills: ["Rust", "WASM", "Systems", "Performance"],
    match: 79, online: false, connections: 321, circles: 9,
    joined: "Nov 2024", verified: true,
    activity: "WASM runtime for edge computing"
  },
  {
    id: 7, name: "Aisha Kamara", handle: "@aishak", location: "Lagos, Nigeria",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha&backgroundColor=c0aede",
    bio: "Afrobeats meets code. Music producer learning to build tools for African creatives.",
    intents: ["Create", "Build"], skills: ["Ableton", "JavaScript", "Audio APIs", "Music Theory"],
    match: 76, online: true, connections: 55, circles: 2,
    joined: "Jun 2025", verified: false,
    activity: "Collaborative beat-making web app"
  },
  {
    id: 8, name: "Dmitri Volkov", handle: "@dvolkov", location: "Amsterdam, Netherlands",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dmitri&backgroundColor=ffd5dc",
    bio: "Philosophy PhD student building ethics tools for AI researchers. Wants to discuss everything.",
    intents: ["Discuss", "Learn"], skills: ["Ethics", "Philosophy", "Writing", "Research"],
    match: 73, online: false, connections: 98, circles: 4,
    joined: "May 2025", verified: false,
    activity: "AI Ethics reading circle — Session 8"
  },
  {
    id: 9, name: "Yuna Park", handle: "@yunap", location: "Seoul, South Korea",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=yuna&backgroundColor=d1d4f9",
    bio: "K-indie musician and audio engineer. I explore sound design and live performance technology.",
    intents: ["Explore", "Create", "Play"], skills: ["Max/MSP", "Ableton", "Electronics", "Photography"],
    match: 71, online: true, connections: 189, circles: 5,
    joined: "Feb 2025", verified: true,
    activity: "Live looping performance rig"
  },
  {
    id: 10, name: "Omar Hassan", handle: "@omarh", location: "Dubai, UAE",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=omar&backgroundColor=ffdfbf",
    bio: "Founder of two climate tech startups. I build things that have a positive impact.",
    intents: ["Build", "Explore"], skills: ["Product", "Fundraising", "Climate Tech", "System Design"],
    match: 68, online: false, connections: 407, circles: 11,
    joined: "Oct 2024", verified: true,
    activity: "Carbon credit marketplace MVP"
  },
  {
    id: 11, name: "Zoe Chen", handle: "@zoec", location: "San Francisco, CA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zoe&backgroundColor=b6e3f4",
    bio: "Mobile indie dev & speedrunner. I play games to break them, then rebuild them better.",
    intents: ["Play", "Build"], skills: ["Swift", "Kotlin", "Mobile Games", "Speedrunning"],
    match: 65, online: true, connections: 134, circles: 6,
    joined: "Mar 2025", verified: false,
    activity: "iOS city-builder with procedural maps"
  },
  {
    id: 12, name: "Rafael Santos", handle: "@rafaels", location: "São Paulo, Brazil",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rafael&backgroundColor=c0aede",
    bio: "Community builder and hackathon organizer. Learning new things at every event I run.",
    intents: ["Learn", "Explore", "Discuss"], skills: ["Community", "Event Management", "Portuguese", "Marketing"],
    match: 62, online: false, connections: 521, circles: 14,
    joined: "Sep 2024", verified: true,
    activity: "Global Hack weekend — 3 cities"
  }
];

const CIRCLES_DATA = [
  {
    id: 1, name: "AI Builders Lab", emoji: "🤖",
    intent: "Build",
    desc: "A circle for people actively building AI-powered products. We share weekly progress, blockers, and wins.",
    members: 247, maxMembers: 300, joined: false, tags: ["AI", "Shipping", "Accountability"],
    activity: "Weekly shipping standup every Friday",
    banner: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(6,182,212,0.2))"
  },
  {
    id: 2, name: "Generative Artists", emoji: "🎨",
    intent: "Create",
    desc: "Algorithmic art, creative code, and digital expression. From p5.js to shader wizardry.",
    members: 183, maxMembers: 250, joined: true, tags: ["Generative", "Creative Code", "Art"],
    activity: "Monthly showcase + critique session",
    banner: "linear-gradient(135deg, rgba(236,72,153,0.3), rgba(168,85,247,0.2))"
  },
  {
    id: 3, name: "Philosophy of Tech", emoji: "🧠",
    intent: "Discuss",
    desc: "We read, argue, and occasionally agree about technology, ethics, and the human condition.",
    members: 94, maxMembers: 120, joined: false, tags: ["Ethics", "Philosophy", "Discussion"],
    activity: "Bi-weekly virtual Socratic sessions",
    banner: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(99,102,241,0.2))"
  },
  {
    id: 4, name: "Indie Game Jam", emoji: "🎮",
    intent: "Play",
    desc: "Monthly 72-hour game jams. No experience required — only curiosity and a laptop.",
    members: 312, maxMembers: 500, joined: true, tags: ["Game Dev", "Jams", "Fun"],
    activity: "Jam #14 starts in 3 days",
    banner: "linear-gradient(135deg, rgba(234,179,8,0.25), rgba(249,115,22,0.2))"
  },
  {
    id: 5, name: "ML Study Group", emoji: "📚",
    intent: "Learn",
    desc: "Reading Andrej Karpathy's work, papers, and building neural nets from scratch. All levels welcome.",
    members: 156, maxMembers: 200, joined: false, tags: ["ML", "Reading", "Papers"],
    activity: "Reading: Attention is All You Need",
    banner: "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(6,182,212,0.2))"
  },
  {
    id: 6, name: "Digital Nomad Network", emoji: "🌍",
    intent: "Explore",
    desc: "People working from everywhere. Visa advice, coworking spots, and actual community.",
    members: 429, maxMembers: 600, joined: false, tags: ["Travel", "Remote", "Community"],
    activity: "City meetup: Lisbon this month",
    banner: "linear-gradient(135deg, rgba(16,185,129,0.25), rgba(6,182,212,0.2))"
  }
];

const ACTIVITIES_DATA = [
  {
    id: 1, title: "48-Hour AI Hackathon", emoji: "⚡",
    intent: "Build",
    by: "Omar Hassan", byHandle: "@omarh",
    desc: "Build anything AI-powered in 48 hours. Teams of 1-4. Prizes for most impactful, most creative, and best solo build.",
    date: "Sep 14-16, 2026", time: "9:00 AM - Async",
    format: "Online", spots: 8, totalSpots: 100, joined: false,
    tags: ["AI", "Hackathon", "Competition"],
    difficulty: "All Levels"
  },
  {
    id: 2, title: "Creative Code Workshop", emoji: "🎨",
    intent: "Create",
    by: "Lena Fischer", byHandle: "@lenaf",
    desc: "Learn p5.js and generative art from scratch. We'll build three visual pieces together.",
    date: "Sep 12, 2026", time: "2:00 PM CET",
    format: "Online", spots: 4, totalSpots: 20, joined: true,
    tags: ["p5.js", "Generative", "Workshop"],
    difficulty: "Beginner Friendly"
  },
  {
    id: 3, title: "ML Paper Reading Club", emoji: "📖",
    intent: "Learn",
    by: "Priya Menon", byHandle: "@priyam",
    desc: "This week: Anthropic's Constitutional AI paper. We annotate, discuss, and debate implications.",
    date: "Sep 11, 2026", time: "7:00 PM IST",
    format: "Online", spots: 12, totalSpots: 30, joined: false,
    tags: ["ML", "Papers", "Discussion"],
    difficulty: "Intermediate"
  },
  {
    id: 4, title: "Urban Exploration Walk", emoji: "🏙️",
    intent: "Explore",
    by: "Rafael Santos", byHandle: "@rafaels",
    desc: "A photo walk through São Paulo's street art districts. Bring a camera — any kind.",
    date: "Sep 15, 2026", time: "10:00 AM BRT",
    format: "In Person · São Paulo", spots: 18, totalSpots: 25, joined: false,
    tags: ["Photography", "Urban", "Offline"],
    difficulty: "Casual"
  },
  {
    id: 5, title: "Game Design Critique", emoji: "🎮",
    intent: "Play",
    by: "Marcus Webb", byHandle: "@marcusw",
    desc: "Bring a game prototype. We give structured, kind, and useful feedback. No toxicity — just growth.",
    date: "Sep 13, 2026", time: "6:00 PM CST",
    format: "Online", spots: 3, totalSpots: 8, joined: false,
    tags: ["Game Design", "Critique", "Feedback"],
    difficulty: "All Levels"
  },
  {
    id: 6, title: "AI Ethics Roundtable", emoji: "⚖️",
    intent: "Discuss",
    by: "Dmitri Volkov", byHandle: "@dvolkov",
    desc: "Topic: Who is responsible when AI systems cause harm? Bring your strongest argument.",
    date: "Sep 17, 2026", time: "8:00 PM CEST",
    format: "Online", spots: 6, totalSpots: 15, joined: true,
    tags: ["Ethics", "AI", "Debate"],
    difficulty: "Thoughtful"
  }
];

const CONVERSATIONS = [
  {
    id: 1, userId: 1, name: "Priya Menon", handle: "@priyam",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya&backgroundColor=b6e3f4",
    online: true, unread: 2,
    messages: [
      { id: 1, from: "them", text: "Hey! Saw you're into building AI tools too. What stack are you using?", time: "9:14 AM" },
      { id: 2, from: "me", text: "Mostly React + FastAPI + LangChain. You?", time: "9:17 AM" },
      { id: 3, from: "them", text: "Similar! I've been experimenting with LlamaIndex for the RAG pipeline. It's been wild.", time: "9:18 AM" },
      { id: 4, from: "me", text: "Oh nice. What's your context window strategy for long docs?", time: "9:20 AM" },
      { id: 5, from: "them", text: "Chunking + metadata filtering. But I want to try HyDE retrieval. Have you?", time: "9:21 AM" },
      { id: 6, from: "them", text: "Also — want to be accountability partners? I'm trying to ship something this month.", time: "9:22 AM" }
    ]
  },
  {
    id: 2, userId: 3, name: "Lena Fischer", handle: "@lenaf",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lena&backgroundColor=c0aede",
    online: true, unread: 0,
    messages: [
      { id: 1, from: "them", text: "Your creative coding background looks amazing btw 🔥", time: "Yesterday" },
      { id: 2, from: "me", text: "Thanks! Your generative art work is on another level.", time: "Yesterday" },
      { id: 3, from: "them", text: "Come to my workshop on Friday — it's beginner-friendly I promise 😄", time: "Yesterday" },
      { id: 4, from: "me", text: "Definitely joining! I RSVP'd already.", time: "Yesterday" }
    ]
  },
  {
    id: 3, userId: 4, name: "Jamal Osei", handle: "@jamalo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jamal&backgroundColor=d1d4f9",
    online: true, unread: 1,
    messages: [
      { id: 1, from: "me", text: "Your open-source ML curriculum for West Africa is inspiring.", time: "Mon" },
      { id: 2, from: "them", text: "Thank you! It's a passion project. We have 200 students now.", time: "Mon" },
      { id: 3, from: "me", text: "Would love to contribute some Python exercises.", time: "Mon" },
      { id: 4, from: "them", text: "That would be incredible. Let's hop on a call this week?", time: "2h ago" }
    ]
  },
  {
    id: 4, userId: 7, name: "Aisha Kamara", handle: "@aishak",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha&backgroundColor=c0aede",
    online: true, unread: 2,
    messages: [
      { id: 1, from: "them", text: "Ok I heard about CIRCLE from Rafael and I had to join", time: "Today" },
      { id: 2, from: "me", text: "Welcome!! What are you building?", time: "Today" },
      { id: 3, from: "them", text: "A collaborative beatmaking web app for African producers. Need a dev partner 👀", time: "Today" }
    ]
  },
  {
    id: 5, userId: 9, name: "Yuna Park", handle: "@yunap",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=yuna&backgroundColor=d1d4f9",
    online: true, unread: 0,
    messages: [
      { id: 1, from: "them", text: "Love that we're both into Max/MSP and audio tech 🎵", time: "Tue" },
      { id: 2, from: "me", text: "Such a niche crossover! What are you working on currently?", time: "Tue" },
      { id: 3, from: "them", text: "Building a live looping rig that responds to audience energy. Wild project.", time: "Tue" }
    ]
  }
];

const FEED_ITEMS = [
  { text: "<strong>Priya Menon</strong> sent you a connection request", time: "2 min ago" },
  { text: "<strong>AI Builders Lab</strong> is hosting a sprint — 3 spots open", time: "15 min ago" },
  { text: "You matched with <strong>Kenji Nakamura</strong> on intent: Build", time: "1 hour ago" },
  { text: "<strong>Lena Fischer</strong>'s Creative Code Workshop starts in 2 days", time: "2 hours ago" },
  { text: "<strong>Indie Game Jam #14</strong> begins in 3 days — you're registered", time: "Yesterday" },
  { text: "5 new people joined your intent: <strong>Build</strong> this week", time: "Yesterday" }
];

const INTENT_DATA = [
  { label: "Build", emoji: "🔨", count: "4,821 builders" },
  { label: "Learn", emoji: "📚", count: "6,103 learners" },
  { label: "Create", emoji: "✨", count: "3,517 creators" },
  { label: "Explore", emoji: "🌍", count: "2,948 explorers" },
  { label: "Play", emoji: "🎮", count: "3,209 players" },
  { label: "Discuss", emoji: "💬", count: "5,432 thinkers" }
];
