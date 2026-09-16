<?php

namespace App\Http\Requests\Traits;

trait MovieRules
{
    /**
     * @return array<string, array<int, string>>
     */
    protected function localizedRules(string $attribute, int $maxLength): array
    {
        return [
            "{$attribute}_en" => ['required', 'string', "max:{$maxLength}"],
            "{$attribute}_ka" => ['required', 'string', "max:{$maxLength}"],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function mappedAttributes(): array
    {
        return [
            'title' => [
                'en' => $this->input('title_en'),
                'ka' => $this->input('title_ka'),
            ],
            'director' => [
                'en' => $this->input('director_en'),
                'ka' => $this->input('director_ka'),
            ],
            'description' => [
                'en' => $this->input('description_en'),
                'ka' => $this->input('description_ka'),
            ],
            'genre' => $this->input('genre'),
            'released_at' => $this->input('released_at'),
        ];
    }

    /**
     * @return array<string, array<int, string>>
     */
    protected function movieRules(): array
    {
        return [
            ...$this->localizedRules('title', 255),
            'genre' => ['required', 'array', 'min:1'],
            'genre.*' => ['required', 'string', 'max:255'],
            'released_at' => ['required', 'date'],
            ...$this->localizedRules('director', 255),
            ...$this->localizedRules('description', 1000),
        ];
    }
}
