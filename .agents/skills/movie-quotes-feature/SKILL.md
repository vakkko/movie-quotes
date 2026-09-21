---
name: movie-quotes-feature
description: "Use when building or changing an end-to-end feature in this movie-quotes app that spans backend and frontend: adding or editing movies, quotes, comments, or likes; creating a route, controller, service, FormRequest, event, or API Resource; adding an Inertia page or React component under resources/js/pages; wiring Wayfinder routes; or adding a Pest feature test for the flow. Triggers on movie, quote, comment, like, news, landing, profile, notifications, full-stack, end-to-end."
---

# Movie Quotes Feature Workflow

Bilingual (en/ka) movie & quote sharing app: Laravel 13 + Inertia v3 + React 19 + Tailwind v4 + spatie translatable/media + Pusher/Reverb broadcasting. This skill is the index for how a feature is added here; the exact rules live in `.ai/rules`.

## Before writing anything

1. Open `.ai/rules/index.md` and read every rule file whose glob matches a path you will touch. These capture non-obvious traps (cursor pagination tiebreakers, media-library file moves, config-cache test failures). Do not re-derive them.
2. Find the sibling feature you are mirroring (Movie, Quote, News, Profile) and follow its structure rather than inventing a new one.
3. Load `laravel-best-practices` for backend decisions, `inertia-react-development` for client-side patterns, `wayfinder-development` for route wiring, `testing-best-practices` before tests.

## Backend pipeline

Work in this order; each layer has a project convention.

1. **Migration** — bilingual fields are JSON columns (`{en, ka}`), never `_en`/`_ka` columns; genres are a JSON array column, not a pivot. See `.ai/rules/models.md`, `.ai/rules/migrations` inside `laravel-best-practices`.
2. **Model + factory** — `HasTranslations` + `InteractsWithMedia`; declare `$translatable` and `singleFile()` collections (`poster` for Movie, `image` for Quote, `avatar` for User). Factories attach media in `afterCreating` with a picsum URL and a local fixture fallback. See `.ai/rules/factories.md`, `.ai/rules/models.md`.
3. **FormRequest** — validation in `app/Http/Requests`, shared field rules in `Traits/`. Empty strings arrive as `null` (`ConvertEmptyStringsToNull`), so gate optional password/string rules with `sometimes(...)`. See `.ai/rules/requests.md`.
4. **Controller / Service** — thin controller, authorize with a policy; multi-step domain logic goes in `app/Services` (e.g. like/comment). Controllers return `Inertia::render`, `back()`, or a JSON payload when `$request->expectsJson()` for AJAX. See `.ai/rules/controllers.md`, `.ai/rules/services.md`.
5. **Event + broadcast** — new content broadcasts so other clients update live; use `broadcast($event)->toOthers()` and `ShouldBroadcastNow` + `ShouldDispatchAfterCommit`. See the `realtime-optimistic-ui` skill and `.ai/rules/services-http-controllers.md`.
6. **API Resource** — send already-localized scalar strings server-side (`getTranslation(...)`); never ship raw translation JSON to a page. See `.ai/rules/controllers.md`.
7. **Route** — add inside the `auth.check` group in `routes/web.php` and use named routes. Auth is modal-based: there is no GET `/login`, only POST. See `.ai/rules/routes.md`.

## Frontend pipeline

1. **Wayfinder** — import typed route functions from `@/actions/...` or `@/routes/...`; never hardcode URLs. Example: `import { store as storeMovieRoute } from '@/actions/App/Http/Controllers/MovieController'`.
2. **Page** — one folder per page under `resources/js/pages/<Feature>/`, attached via `Component.layout = (page) => <DefaultLayout>{page}</DefaultLayout>`.
3. **Hook** — component-specific logic lives in a co-located hook (`useMovie.ts`, `useNews.ts`) exporting `useX`. Reuse the shared `useAddMovieOrQuote` for create/edit forms; do not create per-feature form hooks. See `.ai/rules/pages.md`, `.ai/rules/js.md`.
4. **UI** — shadcn/ui components in `resources/js/components/ui/`; `cn()` from `@/lib/utils`. Every user-facing string goes through `t()` from `useTranslation` with keys added to both `lang/en.php` and `lang/ka.php`. Read the shared user from `page.props.user`, not `auth.user`. See `.ai/rules/js.md`, `.ai/rules/resources.md`.
5. **Client validation** — pure validators per form (`movieValidation.ts`), built on `createFieldValidator` from `@/lib/validation`; submit handlers must call `e.preventDefault()`. See `.ai/rules/lib.md`.

## Test the change

Add a Pest feature test under `tests/Feature` (or `tests/Feature/Services` for a service). Use model factories; no GD so use `tests/fixtures/test-image.png`. Then run the verification commands from the `project-verification` skill (`php artisan config:clear` first). See `.ai/rules/tests.md`.
