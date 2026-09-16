---
paths:
  - 'app/Services/*.php'
---

# Services

## Actor-exclusion needs manual X-Socket-ID header on Inertia requests
Quote live updates (likes count, comments) broadcast on PUBLIC channel `quotes.{id}` from QuoteLikeService/QuoteCommentService via `broadcast(new Event)->toOthers()` + ShouldDispatchAfterCommit. To exclude the actor, the client MUST send the `X-Socket-ID` header manually (Echo only auto-attaches it to axios; this app uses Inertia router.post / useHttp). Use `useSocketId()` from @laravel/echo-react and pass `headers: { 'X-Socket-ID': socketId }` (omit when undefined). Without it, the actor receives their own event.
