---
paths:
  - 'resources/js/pages/News/**'
---

# News

## News live likes/comments use public quotes.{id} channels
News QuoteCard subscribes with `useEchoPublic` to `quotes.{quote.id}` listening to '.QuoteReactionChanged' (updates likesCount state) and '.QuoteCommentCreated' (prepends comment, dedup by id). Payload types QuoteReactionChanged/QuoteCommentCreated live in pages/News/types.ts. Keep likesCount/comments in local state synced from the quote prop (prevQuote pattern) so broadcasts and Inertia reloads coexist.
