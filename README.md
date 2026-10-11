# Zelino

**One link for your whole career.**

Zelino is a self-hosted portfolio builder. Each account gets a public page at
`/<username>` showing a summary, work experience, and skills — and an editor at
`/edit` to maintain it. No templates, no page builder, just structured data
rendered well.

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack, React Compiler) |
| API | [oRPC](https://orpc.unnoq.com) end-to-end typed router |
| Auth | [Better Auth](https://better-auth.com) (Google OAuth + email/password) |
| Database | PostgreSQL via [Drizzle ORM](https://orm.drizzle.team) |
| Data fetching | [TanStack Query](https://tanstack.com/query) + [nuqs](https://nuqs.dev) |
| UI | [Tailwind CSS v4](https://tailwindcss.com) + [Base UI](https://base-ui.com) (shadcn-style registry) |
| File uploads | [EdgeStore](https://edgestore.dev) |
| Validation | [Zod](https://zod.dev) v4 |
| Lint / format | [Biome](https://biomejs.dev) |
| Runtime | Bun (or Node.js ≥ 20) |

---

## Features

- **Public portfolio** at `/<username>` — SEO/OpenGraph metadata, responsive
  two-column layout, scroll-spy section nav, and a matching loading skeleton.
- **Live editor** at `/edit` — tabbed editor for about, experience, and skills,
  with optimistic-feeling saves and inline validation.
- **Auth** — Google OAuth and email/password, with a route guard on `/edit`.
- **Account deletion** — typed-username confirmation, cascading session cleanup.
- **Dark mode**, reduced-motion support, and full keyboard navigation.

---

## Getting started

### Requirements

- [Bun](https://bun.sh) ≥ 1.0 (or Node.js ≥ 20)
- A PostgreSQL database (local, Neon, Supabase, …)

### Setup

```bash
git clone https://github.com/soheilghanbary/zelino.git
cd zelino
bun install

cp .env.example .env
```

Fill in `.env`:

```bash
# Public URL of the deployed app
NEXT_PUBLIC_URL=http://localhost:3000

# PostgreSQL connection string
DATABASE_URL=postgresql://user:password@localhost:5432/zelino

# Auth signing secret — generate with: openssl rand -base64 32
AUTH_SECRET=

# Optional: Google OAuth. Set both or neither.
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Then create the schema and start the dev server:

```bash
bun run db:push   # push the Drizzle schema to your database
bun run dev
```

Open <http://localhost:3000>, sign up, and land in the editor.

> **Note** — if you enable Google OAuth, add your callback URL in the Google
> console: `${NEXT_PUBLIC_URL}/api/auth/callback/google`.

---

## Scripts

| Script | Description |
| --- | --- |
| `dev` | Start the dev server |
| `build` | Production build |
| `start` | Serve the production build |
| `typecheck` | `tsc --noEmit` |
| `lint` | Biome lint |
| `lint:fix` | Biome check with autofixes |
| `fmt` | Biome format |
| `db:gen` | Generate Drizzle migrations from the schema |
| `db:push` | Push the schema straight to the database |
| `db:std` | Open Drizzle Studio |

---

## Project structure

```
zelino/
├── drizzle.config.ts       # Drizzle config
├── next.config.ts          # Next.js config
├── biome.json              # Lint / format config
├── src/
│   ├── proxy.ts            # Route guard for /edit
│   ├── app/                # Routes
│   │   ├── page.tsx        # Landing page
│   │   ├── login/          # Sign in / sign up
│   │   ├── edit/           # Portfolio editor (session required)
│   │   ├── [username]/     # Public portfolio page
│   │   └── api/            # auth, rpc (oRPC), edgestore handlers
│   ├── components/         # Shared UI
│   │   ├── ui/             # Base UI / shadcn-style primitives
│   │   └── providers/      # React Query, theme, EdgeStore
│   ├── features/           # Feature modules
│   │   ├── auth/           # Login form, OAuth
│   │   ├── career/         # Editor: about, experience, skills, delete
│   │   └── profile/        # Public read model: queries + presentational UI
│   ├── lib/
│   │   ├── auth/           # Better Auth server + client
│   │   ├── db/             # Drizzle client, schema, relations
│   │   ├── edgestore/      # EdgeStore client + server
│   │   └── orpc/           # Router, context, server/client setup
│   └── styles/globals.css  # Tailwind v4 theme tokens
```

### Where things live

The codebase is organised by **feature**, not by layer. Each feature owns its
API handlers, its components, and its schemas:

- `features/profile` is **read-only** — it queries a profile and renders the
  public page. It never mutates.
- `features/career` is **write-only** — it owns every mutation behind the
  editor, including account deletion.

A profile's derived state (display name, which sections exist, how a bare
domain becomes a URL) lives in `features/profile/lib.ts`, so the page and its
sidebar navigation can never disagree about it.

---

## Data model

Drizzle's PostgreSQL schema is defined in `src/lib/db/schema.ts`:

- `user` — Better Auth identity plus portfolio fields (`full_name`,
  `job_title`, `tagline`, `summary`, `skills`, `work_experiences`, `location`,
  `phone`, `github_url`, `linkedin_url`, `portfolio_url`, `open_to_work`,
  `username`).
- `session`, `account`, `verification` — Better Auth tables, all cascading from
  `user`.

`skills` and `work_experiences` are `jsonb` columns whose shapes are declared in
`src/lib/db/parse.ts`, so the editor and the public page validate against the
same contract.

---

## License

MIT © [Soheil Ghanbary](https://github.com/soheilghanbary)