---
paths:
  - resources/views/app.blade.php
---

# Views

## CSRF meta tag required in root template for Inertia POSTs
resources/views/app.blade.php MUST include <meta name="csrf-token" content="{{ csrf_token() }}"> in the <head>. Inertia reads this meta tag to attach the X-CSRF-TOKEN header on POST/PUT/DELETE requests. Without it every form POST (e.g. /register) fails with HTTP 419 (CSRF token mismatch).
