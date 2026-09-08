# CIRCLE

CIRCLE is an intent-based social experience for finding people who want to do the same things you do. Choose an intent such as **Build**, **Learn**, **Create**, **Play**, **Explore**, or **Discuss**, then discover people, circles, and activities around that shared goal.

## Features

- Intent-based home dashboard
- Discover people with match scores, skills, and activity details
- Join and browse interest-based circles
- Find and join online or in-person activities
- Matches and messaging views
- Editable profile view
- Responsive desktop sidebar and mobile navigation
- Hash-based client-side routing
- Toast notifications, badges, keyboard support, and reduced-friction mobile navigation

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts: Outfit and Inter
- DiceBear avatars for mock profile images

This is a static front-end prototype. It does not currently connect to a backend or persist data between page refreshes.

## Run Locally

No installation or build step is required.

### Option 1: Open the file

Open `index.html` in a modern browser.

### Option 2: Use a local server

From the project directory, run any static file server. For example, with Python:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

## Project Structure

```text
circle/
├── index.html              # Application shell and navigation
├── css/
│   └── styles.css          # Visual styles and responsive layout
└── js/
    ├── app.js              # Application startup, toasts, and mobile sidebar
    ├── data.js             # Mock users, circles, activities, and conversations
    ├── router.js            # Hash-based page registration and navigation
    ├── state.js             # In-memory application state
    └── pages/               # Render functions for each application view
        ├── activities.js
        ├── circles.js
        ├── discover.js
        ├── home.js
        ├── matches.js
        ├── messages.js
        └── profile.js
```

## Navigation

Views are available through URL hashes:

- `#home`
- `#discover`
- `#matches`
- `#circles`
- `#activities`
- `#messages`
- `#profile`

## Development Notes

Each page registers a render function with `Router`. Shared mock data lives in `data.js`, while temporary interaction state is managed by `State` in `state.js`. To add a new view, create a page module, register it with the router, and add its navigation link to `index.html`.

The interface loads fonts and avatar images from external services, so an internet connection is recommended for the complete visual experience.