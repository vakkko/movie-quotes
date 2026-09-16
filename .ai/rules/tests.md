---
paths:
  - 'tests/**'
---

# Tests

## config:cache breaks the Pest suite - clear config before testing
Do NOT run `php artisan config:cache` before running the Pest test suite. Cached config breaks web POST tests in this app (register/verification return 419 CSRF mismatch and errors/session lookups fail) because ValidateCsrfToken/runningUnitTests detection conflicts with the cached config. Always `php artisan config:clear` before `php artisan test`.

## No GD: build fake images from a PNG fixture
GD is not installed, so UploadedFile::fake()->image() throws. tests/fixtures/test-image.png (a 1x1 PNG) is committed and referenced by MovieFactory/QuoteFactory fallbacks and the CreateQuote/CreateMovie broadcast tests. Spatie addMedia($path) MOVES the uploaded file, so a shared fixture passed to a request is deleted on first use — copy it to a temp path first (tempnam + file_put_contents in beforeEach, unlink in afterEach) and upload that copy.
