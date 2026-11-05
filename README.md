# StudioSpace

**Live site:** add the deployed URL here

StudioSpace is a peer-to-peer marketplace for booking creative spaces by the hour: photo studios, sound stages, podcast rooms, music suites, and art workshops.

There is one account type, so every user can both book studios and list their own.

The API lives in a separate repo: [studio-space-server](https://github.com/hasnat-sumit/studio-space-server).

## Examiner test credentials

| Email | Password |
| --- | --- |
| `examiner@studiospace.dev` | `Examiner123` |

## Features

- **Browse:** search and filter studios by category, price, and capacity, with shareable URLs.
- **Studio pages:** photo carousel, amenities, host details, reviews, and availability.
- **Booking:** request a time slot and see the total up front. Overlapping bookings are rejected with a clear message.
- **Listings:** add, update, and delete your own studios, and upload photos to imgbb or paste an image URL.
- **Accounts:** email and password or Google sign-in, with the session kept in a signed JWT in an HttpOnly cookie.
- **Dashboard:** hosting and booking stats, booking requests, and profile settings.
- **Light and dark themes**, and layouts that work on phones, tablets, and desktops.

## Tech stack

- Next.js 16 (App Router, Turbopack, Cache Components, React Compiler)
- React 19 and TypeScript
- Tailwind CSS v4
- shadcn/ui on Base UI
- Swiper
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
| `/terms` | Terms of Use | No |
| `/login`, `/register` | Log in and create an account | No |
| `/dashboard` | Overview | Yes |
| `/add-studio` | Add New Studio | Yes |
| `/my-listings` | My Studio Listings | Yes |
| `/studios/edit/[id]` | Update a listing | Yes |
| `/my-bookings` | My Bookings and requests for my studios | Yes |
| `/dashboard/profile` | My Profile | Yes |

## Project structure

```
src/
├── app/            Routes and layouts, with route-specific components in _components/
│   └── (account)/  Signed-in pages, behind one guard and sidebar
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
