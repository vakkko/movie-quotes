# Movie Quotes

A full-stack web application for discovering, sharing, and discussing memorable movie quotes. Users build a personal library of movies, attach quotes with artwork, and interact with the community through likes, comments, and real-time notifications.

Built with **Laravel 13 + Inertia v3 + React 19**, featuring bilingual content (English / Georgian) and live updates over WebSockets.

## Features

- **Authentication** via email/password (with email verification) and Google OAuth.
- **Password reset** using signed, expiring links.
- **Movie & quote management** with image uploads, editing, and deletion.
- **Social interactions** — like/unlike quotes and comment on them.
- **Real-time updates** over WebSockets for new quotes, comments, reactions, notifications, and deletions.
- **Bilingual content** (English / Georgian) for both UI and stored data.
- **Media handling** with Spatie Media Library (posters, quote images, avatars).
- **Custom error pages** for 403 and 404 responses.

## Pages

### `/` — Landing

- Hero section with a **scroll-driven "sticky quotes" showcase**: each random quote (three are fetched) is a full-screen panel that reveals as you scroll, with the quote text translating upward.
- "Get started" opens the authentication modal (login / register) for guests, or links straight to the news feed when signed in.
- **Modal-based auth**: login, register, and create-password flows without leaving the page, plus Google sign-in.
- **Status modals** for verification outcomes: expired verification link, verification email sent, and "email not verified" warning with a resend action.

### `/news` — News feed

- Community feed of quotes, newest first, with **cursor-based infinite scroll** (5 quotes per page).
- **New quotes appear at the top instantly** — a `QuoteCreated` broadcast on the public `news` channel prepends the quote for every connected user, without a page reload.
- Quotes deleted elsewhere are **removed from the feed in real time** via a `QuoteDeleted` broadcast.
- **Search bar** with 500 ms debounce. Search matches quote text and movie titles in both locales; `@term` searches movies only, `#term` (or plain text) searches quotes and movies. A "no results" state is shown when nothing matches.
- **Add quote** modal with English and Georgian textareas, an image upload, and a movie dropdown (or a fixed movie when opened from a movie page).
- Each quote card shows the author, quote text with movie title and year, poster, and reaction bar.
- **Comments on a card show only the first 3**, with a **"Show more comments"** button that reveals 3 more at a time. New comments added by others arrive in real time.

### `/movies` — Movie library

- Grid of the signed-in user's movies (3 columns, responsive down to 1) with poster, title, year, and quote count, using **infinite scroll** (12 per page).
- **Client-side search** (500 ms debounce) across English and Georgian titles.
- **Add movie** modal with bilingual title/description/director fields, genre selection, release date, and poster upload.
- New movies created elsewhere **appear at the top live**; deleted movies disappear live, all over the private user channel.

### `/movies/{movie}` — Movie detail

- Movie header with poster, title, year, genre pills, director, and description.
- Owners see **edit** and **delete** actions (edit reuses the movie modal; delete asks for confirmation and returns to the library).
- Quote section listing the movie's quotes newest first, each with its own dropdown for owners to delete.
- Owners can **add a quote directly from the movie page**, with the movie pre-selected.

### `/news/quotes/{quote}` — Quote view / editor

- Full-page quote view showing the quote card with reactions and comments.
- **Inline editing** of the English and Georgian text and the quote image, with a "Save changes" action; opening with `?edit=1` starts in edit mode.
- **Delete** action with a confirmation dialog; on success the user is returned to the news feed.
- Authorized through the quote policy, so only the owner can edit or delete.

### `/profile` — Profile

- Edit username, email, password, and avatar.
- **Email changes** go through a pending flow: the new address is stored as `pending_email` and a confirmation notification is sent; the email then updates once verified.
- Email and password fields are hidden for Google-authenticated accounts.
- **Responsive editing**: inline rows on desktop, per-field edit modals with a save confirmation on mobile.

### Header (global) — Live notifications

- Bell icon with a **live unread badge** fed by `NotificationCreated` broadcasts on the private `App.Models.User.{id}` channel.
- Dropdown lists notifications with actor, type (comment / reaction), relative time, and a "new" marker for unread items.
- Clicking a notification marks it read and navigates to the related quote; **mark all as read** is available from the dropdown header.
- The header also holds the **language switch** (Eng / Geo), the auth actions, and the mobile menu and search entry point.

## Tech Stack

**Backend**

- PHP 8.5 / Laravel 13
- Inertia.js v3 (`inertiajs/inertia-laravel`)
- Laravel Socialite (Google OAuth)
- Spatie Media Library
- Spatie Laravel Translatable
- Pusher (broadcasting)
- Laravel Wayfinder (typed route generation)
- MySQL

**Frontend**

- React 19 + TypeScript
- Inertia.js React adapter + Vite
- Tailwind CSS v4
- Radix UI primitives + Lucide icons
- Laravel Echo + Pusher JS
- shadcn-style UI components

**Tooling**

- Pest (testing), Laravel Pint (PHP formatting), PHPStan/Larastan (static analysis)
- ESLint, Prettier, TypeScript (`tsc`)

## Database Schema

The data model covers users, movies, quotes, likes, comments, notifications, and media.

**Diagram:** [DrawSQL — Movie Quotes](https://drawsql.app/teams/vako/diagrams/movie-quotes)

Core relationships:

- `users` has many `movies`, `quotes`, `quote_comments`, `quote_likes`, and `notifications`.
- `movies` belongs to a `user` and has many `quotes`.
- `quotes` belongs to a `user` and a `movie`, and has many `quote_comments` and `quote_likes`.
- `quote_likes` is a pivot between `users` and `quotes` (unique per user/quote).
- `notifications` references a `user`, an `actor`, a `quote`, and an optional `comment`.
- Translatable fields (`movies.title`, `movies.description`, `movies.director`, `quotes.quote`) are stored as JSON keyed by locale.

## Requirements

- PHP **8.3+** (project targets PHP 8.5)
- Composer v2
- Node.js **22+** and npm
- MySQL 8
- A Pusher account (or compatible broadcaster) for real-time features

## Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd vladimer-gabisonia-movie-quotes

# 2. Install dependencies, create .env, generate key, migrate, and build assets
composer setup
```

Or run the steps manually:

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm install
npm run build
```

## Environment

Copy `.env.example` to `.env` and configure at minimum:

```dotenv
APP_NAME="Movie quotes"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=movie_quotes
DB_USERNAME=root
DB_PASSWORD=

# Broadcasting (required for real-time features)
BROADCAST_CONNECTION=pusher
PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

# Google OAuth (optional, enables "Sign in with Google")
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URL="${APP_URL}/auth/google/callback"
```

Mail uses the `log` driver by default; set a real mailer to deliver verification and password-reset emails.

## Development

Start the Laravel server, queue listener, log viewer, and Vite dev server together:

```bash
composer run dev
```

Useful commands:

```bash
php artisan serve        # application only
npm run dev              # Vite dev server
php artisan media:repair # re-download missing movie/quote images
```

## Testing & Code Quality

```bash
composer test        # config clear + Pint + PHPStan + Pest
php artisan test     # Pest suite only
vendor/bin/pint      # format PHP
npm run lint         # ESLint
npm run format       # Prettier
npm run types:check  # TypeScript
```

The full CI check (`composer ci:check`) runs linting, formatting, type checks, and the test suite.

## Deployment

Deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`). Pushing to `main` runs the test suite, builds frontend assets, uploads them to the server, and runs migrations plus Laravel's optimization commands over SSH.

## Project Structure

```
app/
  Events/          Broadcast events (quotes, movies, notifications, reactions)
  Http/
    Controllers/   Inertia controllers for auth, news, movies, profile
    Middleware/    Auth, locale, Inertia shared props
    Requests/      Form request validation (composed via traits)
    Resources/     API/Inertia resource transformers
  Models/          Eloquent models
  Notifications/   Email verification, password reset, email change
  Policies/        Authorization for movies, quotes, users, notifications
  Services/        Business logic (news feed, comments, likes)
database/
  factories/       Model factories
  migrations/      Schema
  seeders/         Seeders
resources/js/
  pages/           Inertia pages: Landing, News, Movies, Movie, Quote, Profile, errors
  components/      Shared UI components
  layouts/         Default layout, header, navigation
  hooks/           Shared React hooks
  routes/          Wayfinder-generated typed route helpers
routes/web.php     Application routes
```

## Localization

Supported locales are **English (`en`)** and **Georgian (`ka`)**. UI strings live in `lang/en.php` and `lang/ka.php` (plus per-locale mail/verification files), and translatable model attributes are stored as JSON per locale via Spatie Translatable.
