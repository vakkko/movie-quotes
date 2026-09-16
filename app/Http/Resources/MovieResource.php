<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

/**
 * @property-read int $id
 * @property-read string $title
 * @property-read Carbon|null $released_at
 * @property-read array<int, string> $genre
 * @property-read string|null $description
 * @property-read string $director
 */
class MovieResource extends JsonResource
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
            'title' => $this->title,
            'released_at' => $this->released_at->year,
            'image_url' => $this->getFirstMediaUrl('poster'),
            'genres' => $this->genre,
            'description' => $this->description,
            'director' => $this->director,
            'quotes_count' => $this->whenCounted('quotes'),
        ];
    }
}
