# StudioSpace Client

The web frontend for StudioSpace, a peer-to-peer marketplace for booking creative spaces by the hour: photography studios, sound stages, podcast rooms, music suites, and art workshops.

There is one account type, so every user can both book studios and list their own.

The API lives in a separate repo: [studio-space-server](https://github.com/hasnat-sumit/studio-space-server).

## Features

- **Browse:** search and filter studios by category, price, and capacity, with shareable URLs.
- **Studio pages:** photo gallery, amenities, host details, reviews, and availability.
- **Booking:** request a time slot and see an estimated total. Times that are already booked are flagged.
- **Accounts:** email and password sign-in, plus optional Google sign-in.
- **Dashboard:** hosting and booking stats, listing management, booking requests, and profile settings.
- **Light and dark themes**, and layouts that work at phone width.

## Tech stack

- Next.js 16 (App Router, Turbopack, Cache Components, React Compiler)
- React 19 and TypeScript
- Tailwind CSS v4
- shadcn/ui on Base UI
- Better Auth client

## Getting started

You need Node.js 22.12 or newer (the server requires it) and a running copy of the API.

```bash
git clone https://github.com/hasnat-sumit/studio-space.git
cd studio-space
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

The default `CLIENT_URL` on the server is `http://localhost:3000`. If you run the client on another port, change that value too, or the API will reject sign-ins and other writes.

## Environment variables

| Variable | Example | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api` | API base URL, including `/api`, with no trailing slash |

This value is bundled into the browser code, so never put a secret in it. It is also read at build time, so rebuild after changing it.

If it is unset, public pages show sample data and sign-in is unavailable. This is useful for working on the UI without the API.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type-check the project |

## Pages

| Route | Page | Sign-in required |
| --- | --- | --- |
| `/` | Home | No |
| `/studios` | Explore Studios | No |
| `/studios/[id]` | Studio details, booking, and reviews | To book or review |
| `/how-it-works` | How It Works | No |
| `/about` | About Us | No |
| `/login`, `/register` | Sign in and create an account | No |
| `/dashboard` | Overview | Yes |
| `/dashboard/studios` | My Studio Listings | Yes |
| `/dashboard/studios/new` | Add New Studio | Yes |
| `/dashboard/studios/[id]/edit` | Edit a listing | Yes |
| `/dashboard/bookings` | My Bookings and requests for my studios | Yes |
| `/dashboard/profile` | My Profile | Yes |

## Project structure

```
src/
├── app/            Routes and layouts, with route-specific components in _components/
├── components/
│   ├── ui/         Generated shadcn/ui primitives (don't edit by hand)
│   ├── layout/     Navbar and footer
│   ├── home/       Homepage sections
│   ├── auth/       Shared sign-in components
│   └── shared/     Reusable components
├── hooks/          React hooks
├── lib/            API calls, auth client, and helpers
└── types/          Shared TypeScript types
```

`AGENTS.md` has the detailed conventions for working in this codebase.

## How it connects to the API

`next.config.ts` rewrites `/api/*` to `NEXT_PUBLIC_API_URL`. The browser only ever calls this site's own `/api` path, which keeps the session cookie first-party. Server components call the API directly.

Don't add routes under `src/app/api` or send browser requests straight to the API, because either one breaks this setup.

## Deployment

1. Deploy the API first.
2. Set `NEXT_PUBLIC_API_URL` on the client to `https://<api-domain>/api`, then build.
3. On the API, set both `CLIENT_URL` and `BETTER_AUTH_URL` to this site's URL.

The [server README](https://github.com/hasnat-sumit/studio-space-server#deployment) has the full list of API settings.

## Known limitations

- **Payments:** nothing is charged. Payment is arranged with the host.
- **Photos:** hosts paste `images.unsplash.com` links, because there are no file uploads.
- **Password reset:** "Forgot password" is a placeholder, because no email service is connected.
- **Homepage claims:** the figures in `src/components/home/hero.tsx` ("2,400+" studios, "120" cities, "12k+" bookings) and its "verified" wording are placeholders, not real data.
