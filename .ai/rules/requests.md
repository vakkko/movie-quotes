---
paths:
  - 'app/Http/Requests/**'
---

# Requests

## Empty strings become null in web requests
Laravel's ConvertEmptyStringsToNull middleware nulls out empty string input for web requests. Never put `string` or `current_password` rules on fields sent empty (e.g. profile password fields when not changing password) — they'll fail as "must be a string"/"password is incorrect". Gate password validation with `sometimes(...)` on `$this->filled('password')` and keep the base rules `nullable`.
