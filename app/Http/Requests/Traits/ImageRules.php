<?php

namespace App\Http\Requests\Traits;

trait ImageRules
{
    /**
     * @return array<int, string>
     */
    protected function requiredImageRules(): array
    {
        return ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'];
    }

    /**
     * @return array<int, string>
     */
    protected function optionalImageRules(): array
    {
        return ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'];
    }
}
