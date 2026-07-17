# Coaching Platform — Frontend

A mobile-first Progressive Web App for a coaching classes platform, built with Next.js. Two experiences in one app: a desktop-oriented Admin panel and a mobile-first Student experience.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Actions)
- **UI:** Tailwind CSS + shadcn/ui
- **3D:** Three.js (landing page hero)
- **PWA:** next-pwa (installable, "Add to Home Screen")
- **Deployment:** Docker → Azure App Service
- **CI/CD:** GitHub Actions — automated build + deploy on push to `main`

## Features

**Admin (desktop-oriented, sidebar layout)**
- Course & batch management
- Enrollment approval and offline payment recording
- Bulk attendance marking with per-date prefill
- Material uploads, live class scheduling
- Test creation with nested questions/options
- Dashboard with live business stats
- In-app help/documentation section

**Student (mobile-first, bottom nav)**
- Batch browsing and enrollment requests
- Materials, live class links, attendance history
- Test-taking with auto-scored results
- Notifications

## Architecture Notes

- Auth is handled entirely through Next.js Server Actions — JWT tokens are stored in `httpOnly` cookies (never exposed to client-side JS), and API calls to the Django backend happen server-side, so the backend URL is never exposed to the browser.
- A shared `apiGet` / `apiPost` / `apiPatch` / `apiDelete` wrapper (`lib/api.ts`) standardizes error handling and auth-header injection across all API calls.
- Middleware enforces both authentication and role-based route protection — a student cannot reach `/admin/*` routes and vice versa.
- Student-facing pages are deliberately mobile-first (bottom navigation, single-column cards) since students primarily access the platform on their phones.

## Local Setup

```bash
npm install
cp .env.local.example .env.local   # set API_URL to your backend
npm run dev
```

## Building for Production (PWA testing)

PWA support is disabled in dev mode. To test installability:

```bash
npm run build --webpack
npm run start
```

## Deployment

Runs as a Docker container (Next.js standalone output) on Azure App Service. Every push to `main` triggers an automated build and deploy via GitHub Actions.