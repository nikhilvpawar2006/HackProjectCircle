export type Intent = 'Build' | 'Learn' | 'Create' | 'Explore' | 'Play' | 'Discuss'

export type User = {
  id: number
  name: string
  handle: string
  avatar: string
  bio: string
  intents: Intent[]
  skills: string[]
  location: string
  online: boolean
  verified?: boolean
}

export type Post = {
  id: number
  author: User
  body: string
  intent: Intent
  topic: string
  time: string
  likes: number
  comments: number
  saves: number
  liked?: boolean
  saved?: boolean
}

export type Circle = {
  id: number
  name: string
  description: string
  intent: Intent
  members: number
  online: number
  accent: string
  joined?: boolean
}

export type Activity = {
  id: number
  title: string
  description: string
  intent: Intent
  date: string
  location: string
  participants: number
  capacity: number
  accent: string
  joined?: boolean
}
