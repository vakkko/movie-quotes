---
name: realtime-optimistic-ui
description: "Use when adding or debugging live updates and optimistic UI in this app: broadcasting events, Echo/Reverb/Pusher subscriptions, useEchoPublic or useEcho, X-Socket-ID, live likes/comments/notifications, real-time movie or quote creation/deletion, or Inertia infinite scroll feeds. Triggers on broadcast, Echo, Pusher, Reverb, websocket, real-time, live notification, optimistic, useHttp, InfiniteScroll."
---

# Realtime & Optimistic UI

Laravel broadcasting + `@laravel/echo-react` drive live updates. The exact payload/echo wiring is documented per feature in `.ai/rules`; this skill maps the shape.

## Channels in use

| Channel | Event | Who listens |
| --- | --- | --- |
| public `news` | `QuoteCreated` | everyone on the News feed (prepend) |
| public `quotes.{id}` | `QuoteReactionChanged`, `QuoteCommentCreated` | everyone on that quote card |
| private `App.Models.User.{id}` | `MovieCreated`, `NotificationCreated`, delete events | that user's Movies list / notifications |

Private channels require `BroadcastServiceProvider` with `Broadcast::routes()` in `bootstrap/providers.php`. See `.ai/rules/bootstrap.md`.

## Backend

- Dispatch with `broadcast($event)->toOthers()` after media is attached / the row is committed.
- Events implement `ShouldBroadcastNow` **and** `ShouldDispatchAfterCommit`.
- Payloads carry both `en`/`ka` variants; the client picks by `props.locale`. See `.ai/rules/services-http-controllers.md`.

## Frontend

- Subscribe with `useEchoPublic('news', '.QuoteCreated', ...)` or `useEcho(private, '.MovieCreated', ...)`; payload types live in the page's `types.ts`.
- Keep local state synced from the Inertia prop (a `prevQuote` pattern) so broadcasts and full-page reloads coexist. Dedup prepended items by `id`.
- **You must send `X-Socket-ID` manually.** Echo only auto-attaches it to axios; this app uses Inertia `router` / `useHttp`. Get it from `useSocketId()` and pass `headers: { 'X-Socket-ID': socketId }` (omit when undefined), otherwise the actor receives their own event. See `.ai/rules/services.md`.

## Optimistic updates

- Likes/comments use `useHttp` and update local state immediately, returning JSON (`{ is_liked, likes_count }` / created comment) when `$request->expectsJson()`. Do not fall back to `router.post` or full reloads.
- Feeds use `Inertia::scroll(...cursorPaginate(...))` with 500ms-debounced search re-visits using `only` + `reset`. Cursor ordering needs a unique tiebreaker (`created_at` then `id`). See `.ai/rules/controllers.md`, `.ai/rules/news.md`.

## Verify

Run the relevant feature tests (e.g. `CreateQuoteBroadcastTest`, `DeleteMovieBroadcastTest`) via `php artisan config:clear && php artisan test --compact --filter=Broadcast`. See the `project-verification` skill.
