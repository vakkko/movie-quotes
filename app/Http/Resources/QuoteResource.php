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
            'movie' => $this->whenLoaded('movie', fn () => MovieResource::make($this->movie)->resolve()),
        ];
    }
}
