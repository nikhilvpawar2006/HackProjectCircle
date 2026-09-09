import type { Activity, Circle, Intent, Post, User } from './types'

export const intents: { name: Intent; color: string; icon: string; prompt: string }[] = [
  { name: 'Build', color: '#a855f7', icon: '✦', prompt: 'make something real' },
  { name: 'Learn', color: '#38bdf8', icon: '⌁', prompt: 'go deeper together' },
  { name: 'Create', color: '#fb7185', icon: '◈', prompt: 'turn ideas into form' },
  { name: 'Explore', color: '#34d399', icon: '◎', prompt: 'follow your curiosity' },
  { name: 'Play', color: '#facc15', icon: '✺', prompt: 'make room for fun' },
  { name: 'Discuss', color: '#c084fc', icon: '◌', prompt: 'think out loud' },
]

export const currentUser: User = {
  id: 0, name: 'Alex Rivera', handle: '@alexr',
  avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Alex&backgroundColor=b6e3f4',
  bio: 'Designing thoughtful tools for curious people.', intents: ['Build', 'Explore'],
  skills: ['Product design', 'React', 'Writing'], location: 'Pune, India', online: true, verified: true,
}

export const users: User[] = [
  { id: 1, name: 'Priya Menon', handle: '@priyam', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Priya&backgroundColor=ffd5dc', bio: 'Building an AI note-taking studio for people who think in fragments.', intents: ['Build', 'Learn'], skills: ['AI', 'React', 'Python'], location: 'Bengaluru', online: true, verified: true },
  { id: 2, name: 'Lena Fischer', handle: '@lenaf', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Lena&backgroundColor=c0aede', bio: 'Creative technologist making digital art that talks back.', intents: ['Create', 'Explore'], skills: ['WebGL', 'p5.js', 'Sound'], location: 'Berlin', online: true, verified: true },
  { id: 3, name: 'Marcus Webb', handle: '@marcusw', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Marcus&backgroundColor=ffd5dc', bio: 'Indie games, tiny teams, and the joy of shipping.', intents: ['Play', 'Build'], skills: ['Unity', 'Game design', 'C#'], location: 'Austin', online: false },
  { id: 4, name: 'Jamal Osei', handle: '@jamalo', avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Jamal&backgroundColor=d1d4f9', bio: 'Teaching CS and learning ML in public.', intents: ['Learn', 'Discuss'], skills: ['Python', 'Teaching', 'ML'], location: 'Accra', online: true, verified: true },
]

export const posts: Post[] = [
  { id: 1, author: users[0], body: 'I finally got the first version of semantic search feeling useful. The trick was asking: what would a human expect to find here, not what keywords did they type?', intent: 'Build', topic: 'AI / Product', time: '18 min', likes: 84, comments: 12, saves: 28 },
  { id: 2, author: users[1], body: 'A small reminder: constraints are not the opposite of creativity. They are the little frame that lets an idea become visible.', intent: 'Create', topic: 'Creative practice', time: '1 hr', likes: 146, comments: 19, saves: 51 },
  { id: 3, author: users[3], body: 'Starting a gentle reading circle for people curious about how technology changes the stories we tell. First pick: The Dawn of Everything.', intent: 'Discuss', topic: 'Reading circle', time: '3 hr', likes: 43, comments: 8, saves: 16 },
]

export const circles: Circle[] = [
  { id: 1, name: 'AI Builders Lab', description: 'Ship small, learn loudly, and keep each other moving.', intent: 'Build', members: 247, online: 31, accent: '#a855f7', joined: true },
  { id: 2, name: 'Generative Artists', description: 'Creative code, digital expression, and friendly critique.', intent: 'Create', members: 183, online: 18, accent: '#fb7185' },
  { id: 3, name: 'Slow Tech Society', description: 'A thoughtful space for better questions about technology.', intent: 'Discuss', members: 94, online: 9, accent: '#38bdf8' },
  { id: 4, name: 'Weekend Game Lab', description: 'Tiny teams. Playful experiments. One weekend at a time.', intent: 'Play', members: 312, online: 42, accent: '#facc15', joined: true },
]

export const activities: Activity[] = [
  { id: 1, title: '48-hour AI build sprint', description: 'Build a tiny thing that makes someone’s day easier. Teams of 1–4.', intent: 'Build', date: 'Sep 14–16, 2026', location: 'Online · async', participants: 72, capacity: 100, accent: '#a855f7' },
  { id: 2, title: 'Creative code open studio', description: 'Bring a sketch, a question, or just your curiosity. No polished work required.', intent: 'Create', date: 'Sep 18, 2026 · 7:00 PM', location: 'Online · 90 min', participants: 28, capacity: 40, accent: '#fb7185', joined: true },
  { id: 3, title: 'The good internet salon', description: 'A live conversation about designing online spaces that feel more human.', intent: 'Discuss', date: 'Sep 21, 2026 · 6:30 PM', location: 'Pune · The Reading Room', participants: 17, capacity: 30, accent: '#38bdf8' },
]

export const intentColor = (intent: Intent) => intents.find((item) => item.name === intent)?.color ?? '#a855f7'
