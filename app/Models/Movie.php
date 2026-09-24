<?php

namespace App\Models;

use Database\Factories\MovieFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Translatable\HasTranslations;

/**
 * @property-read int $id
 * @property-read string $title
 * @property-read Carbon|null $released_at
 * @property-read array<int, string> $genre
 * @property-read string|null $description
 * @property-read string $director
 *
 * @use HasFactory<MovieFactory>
 */
#[Fillable(['user_id', 'title', 'released_at', 'genre', 'description', 'director'])]
class Movie extends Model implements HasMedia
{
    /** @use HasFactory<MovieFactory> */
    use HasFactory;

    use HasTranslations;
    use InteractsWithMedia;

    public const string DEFAULT_IMAGE_URL = '/images/defaultMovie.webp';

    /** @var array<int, string> */
    public array $translatable = ['title', 'description', 'director'];

    protected $casts = [
        'released_at' => 'datetime',
        'genre' => 'array',
    ];

    /** @return HasMany<Quote, $this> */
    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class);
    }

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('poster')->singleFile();
    }

    public function getImageUrlAttribute(): string
    {
        $url = $this->getFirstMediaUrl('poster');

        return $url !== '' ? $url : asset(self::DEFAULT_IMAGE_URL);
    }
}
