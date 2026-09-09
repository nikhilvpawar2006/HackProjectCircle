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

Home feed, intent switching, post engagement, Discover search and filters, validated post creation, compatibility Matches, joinable Circles, joinable Activities, Messages UI, Profile identity, responsive sidebar/mobile navigation, toast feedback, and reduced-motion support.

The app is frontend-only by design. Mock content and personal interaction state are stored locally in the browser and can be replaced with API calls through the existing TanStack Query boundary.
