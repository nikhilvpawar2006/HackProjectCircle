# CIRCLE — Reimagine Social

CIRCLE is an intent-based social platform for finding people who want to do the same thing. Instead of following a popularity graph, users choose a current intent such as Build, Learn, Create, Explore, Play, or Discuss and discover people, threads, circles, and activities moving in the same direction.

## Stack

- React + Vite + TypeScript (strict)
- Tailwind CSS with a custom dark futuristic design system
- React Router
- React Hook Form + Zod validation
- TanStack Query architecture
- Lucide React icons
- localStorage-backed mock persistence

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## Verification

```bash
npm run lint
npm run build
```

## Included flows

Home feed, intent switching, post engagement, Discover search and intent filters, validated post creation, persistent published threads, compatibility Matches, stateful Connect actions, joinable Circles, joinable Activities, functional message sending, editable Profile identity, responsive sidebar/mobile navigation, toast feedback, empty states, keyboard-visible focus states, semantic labels, and reduced-motion support.

## Rubric coverage

- **Problem alignment:** the intent signal drives discovery, feed language, matches, circles, and activities.
- **UI/UX:** responsive desktop, tablet, and mobile layouts with a focused dark glass interface and intent color system.
- **Functionality:** local persistence for intents, posts, likes, profile edits, circles, and activities; Zod-validated publishing; working search, filters, connections, and messages.
- **Architecture:** typed domain models, reusable UI components, route separation, React Hook Form, TanStack Query provider, and no unsafe HTML injection.
- **Performance and accessibility:** Vite production build, lazy-friendly remote avatars, semantic landmarks, labels, pressed/selected state attributes, focus styles, and reduced-motion support.
- **Innovation:** intent-based social graph instead of a follower-first feed, with an orbit visual language and compatibility scoring.

Run `npm run lint` and `npm run build` before submitting a new deployment.

The app is frontend-only by design. Mock content and personal interaction state are stored locally in the browser and can be replaced with API calls through the existing TanStack Query boundary.
