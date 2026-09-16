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
Movie and Quote implement HasMedia + InteractsWithMedia with singleFile() collections 'poster' (Movie) and 'image' (Quote). There is no image_url column anymore; derive URLs via $model->getFirstMediaUrl('poster'|'image'). Replace/upsert images with clearMediaCollection(...)->addMedia($file)->toMediaCollection(...).

## Genres stored as JSON array column
Genres are stored as a JSON array in the `genre` column on the movies table (cast to `array`). They are NOT a comma-separated string and NOT a separate/pivot table. Validation requires `genre` to be a non-empty array of strings; resources return `$this->genre` directly.

## User avatar uses Spatie Media Library, display URL stays in avatar_url column
User implements HasMedia + InteractsWithMedia with a singleFile() 'avatar' media collection (same pattern as Movie 'poster'). Uploaded avatars are stored via clearMediaCollection('avatar')->addMedia($file)->toMediaCollection('avatar') in ProfileController@update, which then persists getFirstMediaUrl('avatar') into the avatar_url column. Keep the avatar_url string column as the display source: it's read by many eager-loaded selects (user:id,...,avatar_url), API resources, and Google OAuth sets it to Google's external URL (no local file, no media row) - don't drop the column and don't store remote URLs in media.
