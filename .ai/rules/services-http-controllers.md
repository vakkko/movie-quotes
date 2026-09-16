---
paths:
  - 'app/Events/**,app/Services/NewsControllerService.php,app/Http/Controllers/MovieController.php'
---

# Services Http Controllers

## QuoteCreated/MovieCreated broadcast on add
New-movie/new-quote live updates: QuoteCreated broadcasts on PUBLIC channel 'news' (all users prepend to News feed); MovieCreated broadcasts on PRIVATE channel App.Models.User.{owner_id} (owner updates Movies list + News add-quote dropdown). Both are ShouldBroadcastNow + ShouldDispatchAfterCommit, dispatched via broadcast($event)->toOthers() in createQuote/MovieController::store after media attach. Frontend: News.tsx listens useEchoPublic('news','.QuoteCreated') + useEcho(private,'.MovieCreated'); Movies.tsx listens for '.MovieCreated' and prepends with id-dedupe. Payloads carry both en/ka variants; clients pick by props.locale.
