<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable('title_en', 'title_ka', 'image_url', 'released_at', 'genre', 'description_en', 'description_ka', 'director_en', 'director_ka', )]
class Movie extends Model
{
    use HasFactory;

    protected $casts = [
        'released_at' => 'datetime',
    ];

    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
