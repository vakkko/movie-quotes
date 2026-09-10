<?php

namespace App\Http\Resources;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property-read int $id
 * @property-read string $quote
 * @property-read string $image_url
 * @property-read Movie|null $movie
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
            'image_url' => $this->image_url,
            'created_at' => $this->created_at,
            'movie' => $this->whenLoaded('movie', fn () => MovieResource::make($this->movie)->resolve()),
            'user' => $this->whenLoaded('user', fn () => [
                'id' => $this->user->id,
                'username' => $this->user->username,
                'avatar' => $this->user->avatar_url,
            ]),
            'comments' => $this->whenLoaded('comments', fn () => $this->comments->map(fn ($comment) => [
                'id' => $comment->id,
                'body' => $comment->body,
                'created_at' => $comment->created_at,
                'user' => [
                    'id' => $comment->user->id,
                    'username' => $comment->user->username,
                    'avatar' => $comment->user->avatar_url,
                ],
            ])),
            'likes_count' => $this->whenCounted('likes'),
            'comments_count' => $this->whenCounted('comments'),
            'is_liked' => $this->relationLoaded('likedByUsers')
                ? $this->likedByUsers->contains('id', $request->user()?->id)
                : false,
        ];
    }
}
