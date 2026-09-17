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
 *
 * @method string getFirstMediaUrl(string $collectionName = 'default', string $conversionName = '')
 * @method mixed getTranslation(string $key, string $locale, bool $useFallbackLocale = true)
 */
class MovieShowResource extends JsonResource
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
            'release_date' => $this->released_at?->format('Y-m-d'),
            'image_url' => $this->getFirstMediaUrl('poster'),
            'genres' => $this->genre,
            'description' => $this->description,
            'director' => $this->director,
            'title_en' => $this->getTranslation('title', 'en'),
            'title_ka' => $this->getTranslation('title', 'ka'),
            'director_en' => $this->getTranslation('director', 'en'),
            'director_ka' => $this->getTranslation('director', 'ka'),
            'description_en' => $this->getTranslation('description', 'en'),
            'description_ka' => $this->getTranslation('description', 'ka'),
            'quotes_count' => $this->whenCounted('quotes'),
            'quotes' => QuoteResource::collection($this->whenLoaded('quotes')),
        ];
    }
}
