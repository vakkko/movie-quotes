<?php

namespace App\Http\Requests\Traits;

trait QuoteRules
{
    /**
     * @return array<string, mixed>
     */
    protected function quoteRules(): array
    {
        return [
            'quote_en' => ['required', 'string', 'max:1000'],
            'quote_ka' => ['required', 'string', 'max:1000'],
        ];
    }
}
