---
paths:
  - 'resources/js/pages/News/**'
---

# News

## News live likes/comments use public quotes.{id} channels
News QuoteCard subscribes with `useEchoPublic` to `quotes.{quote.id}` listening to '.QuoteReactionChanged' (updates likesCount state) and '.QuoteCommentCreated' (prepends comment, dedup by id). Payload types QuoteReactionChanged/QuoteCommentCreated live in pages/News/types.ts. Keep likesCount/comments in local state synced from the quote prop (prevQuote pattern) so broadcasts and Inertia reloads coexist.

## News search state lifted to News.tsx
useDebouncedSearch for the News feed lives in News.tsx (not SearchBarAndAddQuote), so the page can read the live `search` term for the empty state. When a non-empty search returns zero quotes (no liveQuotes and no quotes.data results), render NoSearchResults. Live quotes still render regardless of the search term.
