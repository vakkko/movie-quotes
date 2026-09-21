---
name: social-notifications
description: "Use when changing likes, comments, or notifications in this app: toggling a like, unliking, posting a comment, creating or reading notifications, marking notifications read, the QuoteLike/QuoteComment/Notification models, their services, policies, or routes. Triggers on like, unlike, reaction, comment, notification, unread, mark as read, actor, toggle, QuoteLike, QuoteComment, Notification. For the websocket/transport side see realtime-optimistic-ui."
---

# Social Interactions & Notifications

Domain semantics for likes, comments, and notifications. Transport/websockets live in the `realtime-optimistic-ui` skill; read `.ai/rules/services.md`, `controllers.md`, `notifications.md` before editing.

## Likes

- `QuoteLike` is `(user_id, quote_id)`; `ToggleLikeController` delegates to `QuoteLikeService::toggleLike`.
- Toggle removes an existing like (and deletes the matching `like` notification for the quote owner) or creates one, then broadcasts `QuoteReactionChanged`.
- **Never notify on a self-like** (`$quote->user_id !== $user->id`).
- The endpoint returns `{ is_liked, likes_count }` as JSON when `$request->expectsJson()`; otherwise `back()`. Keep both return paths.

## Comments

- `QuoteComment` is `(quote_id, user_id, body)`; `StoreCommentController` → `QuoteCommentService::addComment`. Body is validated by `StoreQuoteCommentRequest`.
- Broadcasts `QuoteCommentCreated`; creates a `comment` notification for the quote owner only when the commenter is not the owner.
- AJAX returns `{ comment: {...} }` with 201; otherwise `back()`.

## Notifications

- `Notification` columns: `user_id` (recipient), `actor_id`, `type` (`like` | `comment`), `quote_id`, `comment_id`, `is_read` (cast boolean). Relationships: `user`, `actor`, `quote`, `comment`.
- Creation goes through `NotificationCreated`, broadcast on the private `App.Models.User.{id}` channel.
- Reading: `MarkNotificationAsReadController` and `MarkAllNotificationsAsReadController` (PATCH), authorized by `NotificationPolicy@update` (`notification->user_id === user->id`). Return JSON `{ is_read: true }`.
- Routes: `notifications.read`, `notifications.read-all`.

## Adding a new reaction/notification type

1. Add the `type` value and reuse the `Notification` columns; add a migration only if new data is needed.
2. Create via a service that also broadcasts the live event.
3. Update `broadcastWith()` in `NotificationCreated` if the client needs new fields.
4. Add/extend a feature test (e.g. `ToggleLikeControllerTest`, `tests/Feature/Services/*`).

## Verify

`php artisan config:clear && php artisan test --compact --filter=Notification` or the relevant like/comment test. See `project-verification`.
