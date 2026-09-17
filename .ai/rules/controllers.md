---
paths:
    - 'app/Http/Controllers/**'
    - app/Http/Controllers/VerifyEmailController.php
    - app/Http/Controllers/NewsController.php
    - app/Http/Controllers/ToggleLikeController.php
---

# Controllers

## Auto-login on register so email verify link works

AuthController::register must call Auth::login($user) after creating the user. The verification.verify route is wrapped in the auth middleware, and EmailVerificationRequest::fulfill() resolves the user via $this->user(). Without auto-login the newly registered (unauthenticated) user gets redirected by the auth middleware before fulfill() runs, so email_verified_at is never updated.

## Google OAuth: verified email + generated username

GoogleAuthController treats Google email as verified (sets email_verified_at = now, never sends verification mail) and, for new users, generates a unique lowercase alphanumeric 15-char-max username via uniqueUsername() (as a last resort). Matches users by email via firstOrNew so a Google login logs into an existing email account.

## Verify email expiry: check in controller, not exception handler

Handle expired email-verification links manually in VerifyEmailController::__invoke, NOT via the InvalidSignatureException exception-handler redirect. A `->with(...)` flash returned from an exceptions `render` closure does NOT persist to the next request in Laravel 13, so redirecting from the exception handler silently loses the verify_expired flag. Instead, omit the `signed` middleware on the route and call `$request->hasValidSignature()` in the controller, where session flash data persists normally. Also redirect guests to `route('home')` (via redirectGuestsTo) because /login and /register are POST-only modal routes with no GET pages.

## News quotes feed uses Inertia v3 infinite scroll

The /news quotes feed is loaded via `Inertia::scroll(QuoteResource::collection(Quote::...->cursorPaginate(3)))` (cursor pagination, not paginate), and the React page wraps content in `<InfiniteScroll data="quotes">` consuming `quotes.data`. When changing News, keep this paginated + scroll pattern (append-only feed). The Landing page deliberately stays `inRandomOrder()->limit(3)`.

## Cursor pagination needs a unique tiebreaker column

`cursorPaginate()` requires a unique ordering. Ordering only by a non-unique column (e.g. `created_at`, which can tie) produces cursors that skip every row in the duplicate bucket after the first page, then return an empty page with `nextPage: null`, killing the infinite scroll feed. Order by the non-unique column first, then a unique column: `->orderByDesc('created_at')->orderByDesc('id')`. Also remember quotes table `created_at` is seeded with a single timestamp for many rows.

## News feed search filters via search query param

The /news feed accepts a `search` query param. `@term` filters by movie title (translatable), `#term` by quote text. Plain text searches for both, quotes and movies, Match against both en/ka JSON subpaths. The frontend debounces 500ms and re-visits with `only: ['quotes']` + `reset: ['quotes']` so the InfiniteScroll feed resets to page 1. Empty term (bare `@` or `#`) means no filter.

## News quote store + localized movie dropdown titles

Quote creation lives in NewsController@store (POST /news/quotes, name news.quotes.store) guarded by Auth::check() -> abort(403). It stores image to 'quotes' disk and creates the quote with a translatable {en, ka} array via the authenticated user's quotes() relation. When building the movie dropdown list for AddQuote, localize titles with $movie->getTranslation('title', app()->getLocale()) so the frontend receives a single string, not the raw JSON object.

## Comment store: JSON on AJAX (no refresh), back() fallback, guest 403, Send button on typing

POST /news/quotes/{quote}/comments (news.quotes.comments.store) is handled by NewsController@storeComment with a manual Auth::check() abort(403), creates via $user->comments()->create (body validated by StoreQuoteCommentRequest). When $request->expectsJson() it returns the created comment as JSON (201) so the feed updates without a page reload; otherwise it returns back() as a fallback. Frontend UserComment submits via useHttp and prepends the returned comment into local QuoteCard state; the Send button only renders while data.body.trim() is non-empty.

## Like toggle returns JSON on AJAX for optimistic UI

The like endpoint returns { is_liked, likes_count } when $request->expectsJson() (see frontend QuoteCard handleLike), and back() otherwise. Feed likes are optimistic via useHttp with manual X-Socket-ID header; don't revert to router.post or full page reloads, or likes feel slow.
