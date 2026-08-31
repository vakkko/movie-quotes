<?php

namespace App\Models;

use Database\Factories\QuoteFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

/**
 * @use HasFactory<QuoteFactory>
 */
#[Fillable(['user_id', 'movie_id', 'quote', 'image_url'])]
#[Hidden('created_at', 'updated_at')]

class Quote extends Model
{
    /** @use HasFactory<QuoteFactory> */
    use HasFactory;

    use HasTranslations;

    /** @var array<int, string> */
    public array $translatable = ['quote'];

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** @return BelongsTo<Movie, $this> */
    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class);
    }

    /** @return HasMany<QuoteComment, $this> */
    public function comments(): HasMany
    {
        return $this->hasMany(QuoteComment::class);
    }

    /** @return HasMany<QuoteLike, $this> */
    public function likes(): HasMany
    {
        return $this->hasMany(QuoteLike::class);
    }

    /** @return BelongsToMany<User, $this> */
    public function likedByUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'quote_likes');
    }
}
