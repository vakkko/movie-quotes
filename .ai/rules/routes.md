---
paths:
  - routes/web.php
---

# Routes

## Auth redirects to home, not /login
Auth is modal-based on the landing page; /login and /register are POST-only routes. There is NO GET /login page. Configure `redirectGuestsTo(fn () => route('home'))` in bootstrap/app.php so the `auth` middleware redirects unauthenticated users home instead of a non-existent GET /login (which 405s). For email verification links, apply `signed` middleware BEFORE `auth` so the InvalidSignatureException handler can show the expired-link modal even for guests.
