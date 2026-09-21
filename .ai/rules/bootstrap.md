---
paths:
  - bootstrap/providers.php
---

# Bootstrap

## BroadcastServiceProvider required for private channels
The app broadcasts on PrivateChannels (App.Models.User.{id}) for live notifications. This requires the /broadcasting/auth route, registered only when a BroadcastServiceProvider with Broadcast::routes() is in bootstrap/providers.php. Without it, Echo connects to Pusher but subscriptions 404 and no live notifications arrive.
