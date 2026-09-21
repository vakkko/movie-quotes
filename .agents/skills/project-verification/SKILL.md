---
name: project-verification
description: "Use when running, choosing, or debugging the build, lint, format, type-check, or test commands for this project; when the Pest suite fails or returns 419 errors; when a frontend change is not visible; or when preparing a change for review. Triggers on run tests, php artisan test, pest, pint, phpstan, eslint, prettier, tsc, build, config cache, wayfinder generate, ci check."
---

# Project Verification

Run the narrowest command that proves your change, then widen. Never claim completion without running the relevant check.

## Critical ordering (read first)

- **Always `php artisan config:clear` before `php artisan test`.** A cached config makes web POST tests fail with 419 CSRF mismatches and breaks session/error lookups. Do not run `php artisan config:cache` before testing. See `.ai/rules/tests.md`.
- **There is no GD extension**, so `UploadedFile::fake()->image()` throws. Use `tests/fixtures/test-image.png`, and copy it to a temp path before uploading because spatie's `addMedia($path)` moves (deletes) the source. See `.ai/rules/tests.md`.

## Backend / PHP

```bash
php artisan config:clear
php artisan test --compact --filter=SomeTestName     # narrowest
php artisan test --compact tests/Feature/SomeTest.php # one file
vendor/bin/pint --dirty --format agent               # format changed PHP (required before finalizing)
vendor/bin/phpstan analyse                            # static analysis
```

Create tests with `php artisan make:test --pest SomeFeatureTest` (no `Feature/` prefix in the name).

## Frontend / TS

```bash
npm run lint:check     # eslint
npm run format:check   # prettier
npm run types:check    # tsc --noEmit
npm run build          # if the UI change is not visible, or to reproduce a Vite manifest error
php artisan wayfinder:generate   # after adding/changing routes or controller actions
```

## Full stack

```bash
composer run dev        # runs `php artisan dev` (server + vite + queue + pail)
composer run ci:check   # eslint + prettier + tsc + phpstan + test (the review gate)
```

## Database

Prefer the Boost `database-query` tool for read-only inspection and `database-schema` before writing a migration, instead of raw SQL in tinker.

## Reporting

State which commands you ran and their result. If a check could not run, say so explicitly rather than assuming it passes.
