---
paths:
  - 'app/Models/*.php'
  - app/Models/Movie.php
  - app/Models/User.php
---

# Models

## Translatable models store JSON translations (spatie)
Bilingual fields are stored as single JSON columns ({en, ka}) via spatie/laravel-translatable HasTranslations; declare them in the model's public $translatable array. Read localized values with the attribute accessor ($movie->title) or getTranslation('title', 'en'). Do not add *_en/*_ka columns.

## Spatie Media Library collections for Movie/Quote images
Movie and Quote implement HasMedia + InteractsWithMedia with singleFile() collections 'poster' (Movie) and 'image' (Quote). There is no image_url column anymore. Each model exposes a read accessor `image_url` (getImageUrlAttribute) that returns getFirstMediaUrl(collection) or the default placeholder asset (Quote::DEFAULT_IMAGE_URL -> /images/defaultQuote.png, Movie::DEFAULT_IMAGE_URL -> /images/defaultMovie.png) when the model has no media; always use `$model->image_url` when serializing images (resources, broadcast payloads, JSON) so the frontend never receives an empty src. Replace/upsert images with clearMediaCollection(...)->addMedia($file)->toMediaCollection(...).

## Genres stored as JSON array column
Genres are stored as a JSON array in the `genre` column on the movies table (cast to `array`). They are NOT a comma-separated string and NOT a separate/pivot table. Validation requires `genre` to be a non-empty array of strings; resources return `$this->genre` directly.

## User avatar_media consistency: accessor + media library only
User avatar dropped the avatar_url DB column (migration 2026_09_23_091059). All three media models (Movie 'poster', Quote 'image', User 'avatar') now expose a single source of truth: an `image_url`/`avatar_url` accessor calling getFirstMediaUrl(collection) with a fallback to a DEFAULT_IMAGE_URL asset. User has `protected $appends = ['avatar_url']` so serialization (Inertia shared user, events) still carries the key. Google OAuth downloads the avatar into the 'avatar' collection via addMediaFromUrl (tolerated failure -> default asset) - never write remote URLs to a column. When eager-loading users/comments/actors for feeds load 'user.media' (accessor uses the preloaded `media` relation, avoiding N+1) and stop selecting avatar_url in select() lists.
