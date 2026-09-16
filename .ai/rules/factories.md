---
paths:
  - 'database/factories/*.php'
---

# Factories

## Factory media: download a real image from picsum, fallback to local fixture
Movie/Quote factories attach media in afterCreating: first `addMediaFromUrl("https://picsum.photos/seed/{movie|quote}-{id}/1920/1080")`, and on any Throwable they fall back to `addMediaFromString(file_get_contents(tests/fixtures/test-image.png))->usingFileName('test-image.png')`. This gives real seed/display photos when the network is up and keeps the Pest suite reliable when it is down (fast failure falls through to the 1x1 transparent pixel). Spatie's addMedia($path) MOVES the source file into the media disk, which would delete a shared fixture - never pass a repo file path to addMedia(); addMediaFromString copies a string and never touches the fixture.