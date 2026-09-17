<?php

namespace App\Http\Resources;

use App\Models\Movie;
use App\Models\QuoteComment;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

/**
 * @property-read int $id
 * @property-read string $quote
 * @property-read string $image_url
 * @property-read Movie|null $movie
 * @property-read Carbon|null $created_at
 * @property-read User|null $user
 * @property-read Collection<int, QuoteComment>|null $comments
 * @property-read Collection<int, User>|null $likedByUsers
 *
 * @method string getFirstMediaUrl(string $collectionName = 'default', string $conversionName = '')
 * @method bool relationLoaded(string $key)
 */
class QuoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quote' => $this->quote,
            'image_url' => $this->getFirstMediaUrl('image'),
            'created_at' => $this->created_at,
            'movie' => $this->whenLoaded('movie', fn () => MovieResource::make($this->movie)->resolve()),
            'user' => $this->whenLoaded('user', fn () => UserResource::make($this->user)->resolve()),
            'comments' => $this->whenLoaded('comments', fn () => $this->comments->map(fn ($comment) => [
                'id' => $comment->id,
                'body' => $comment->body,
                'created_at' => $comment->created_at,
                'user' => UserResource::make($comment->user)->resolve(),
            ])->all()),
            'likes_count' => $this->whenCounted('likes'),
            'comments_count' => $this->whenCounted('comments'),
            'is_liked' => $this->relationLoaded('likedByUsers')
                ? $this->likedByUsers->contains('id', $request->user()?->id)
                : false,
        ];
    }
}
