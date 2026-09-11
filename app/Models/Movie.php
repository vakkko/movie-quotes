<?php

namespace App\Models;

use Database\Factories\MovieFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Translatable\HasTranslations;

/**
 * @use HasFactory<MovieFactory>
 */
#[Fillable(['user_id', 'title', 'released_at', 'genre', 'description', 'director'])]
class Movie extends Model implements HasMedia
{
    /** @use HasFactory<MovieFactory> */
    use HasFactory;

    use HasTranslations;
    use InteractsWithMedia;

    /** @var array<int, string> */
    public array $translatable = ['title', 'description', 'director'];

    protected $casts = [
        'released_at' => 'datetime',
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
}
