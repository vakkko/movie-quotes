---
name: project-commands
description: "Use when running or operating this project: starting the dev environment, building assets, running migrations or seeders, inspecting the database, linking storage or repairing media, running the queue, configuring Pusher/broadcasting env vars, regenerating Wayfinder routes, or understanding the deploy pipeline. Triggers on dev server, serve, artisan dev, migrate, seed, database, storage link, media repair, queue worker, pusher, broadcasting env, build, setup, deploy. For tests, lint, format, and type-check commands use the project-verification skill instead."
---

# Project Commands

How to run and operate this app. Stack facts: MySQL (`DB_DATABASE=movie_quotes`), `QUEUE_CONNECTION=database`, `CACHE_STORE=database`, `BROADCAST_CONNECTION=pusher`, media disk `public`. Configuration lives in `config/`; read values with `php artisan config:show <key>`.

## First-time setup

```bash
composer setup   # composer install, .env, key:generate, migrate, npm install, npm run build
```

## Daily development

```bash
composer run dev   # delegates to `php artisan dev`
php artisan dev:list   # show the 4 dev processes
```

`php artisan dev` runs: `serve` + `queue:listen --tries=1 --timeout=0` + `pail --timeout=0` (logs) + `npm run dev` (Vite). Start it before manual testing so live broadcasts, queued work, and frontend HMR all run.

## Frontend assets

```bash
npm run dev     # Vite HMR
npm run build   # production build; run this when a UI change is not reflected
```

## Database

```bash
php artisan migrate
php artisan migrate:fresh --seed
```

`DatabaseSeeder` creates `test@example.com` plus 5 users with movies, quotes, likes, comments, and notifications. Prefer the Boost `database-schema` and `database-query` tools for inspection over raw SQL/tinker.

## Media

```bash
php artisan storage:link     # media library uses the `public` disk
php artisan media:repair     # re-download missing movie/quote images from the placeholder service
```

## Broadcasting (Pusher)

`BROADCAST_CONNECTION=pusher` needs `PUSHER_*` and the matching `VITE_PUSHER_*` vars in `.env`; without the Vite ones the frontend Echo client connects with an empty key. Private channels also require `BroadcastServiceProvider` with `Broadcast::routes()` in `bootstrap/providers.php`. See the `realtime-optimistic-ui` skill.

## Routes (Wayfinder)

```bash
php artisan wayfinder:generate   # after adding/changing routes or controller actions
```

## Deploy pipeline

CI (`.github/workflows/tests.yml`) runs `composer setup`, `npm run build`, then `composer ci:check` against MySQL 8. Deploy runs `migrate --force` then `optimize:clear` + `config:cache` + `route:cache` + `view:cache` on the server — but never run `config:cache` locally before tests (see `project-verification`).

## Checks

Tests, Pint, PHPStan, ESLint, Prettier, and `tsc` commands live in the `project-verification` skill.
