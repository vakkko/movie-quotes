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
     * @return array<string, array<int, string>>
     */
    protected function movieRules(): array
    {
        return [
            ...$this->localizedRules('title', 255),
            'genre' => ['required', 'string', 'max:255'],
            'released_at' => ['required', 'date'],
            ...$this->localizedRules('director', 255),
            ...$this->localizedRules('description', 1000),
        ];
    }
}
