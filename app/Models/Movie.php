<?php

namespace App\Models;

use Database\Factories\MovieFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @use HasFactory<MovieFactory>
 */
#[Fillable('title_en', 'title_ka', 'image_url', 'released_at', 'genre', 'description_en', 'description_ka', 'director_en', 'director_ka', )]
class Movie extends Model
{
    /** @use HasFactory<MovieFactory> */
    use HasFactory;

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
}
