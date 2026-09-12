<?php

namespace App\Http\Requests;

use App\Http\Requests\Traits\ImageRules;
use App\Http\Requests\Traits\QuoteRules;
use Illuminate\Foundation\Http\FormRequest;

class StoreQuoteRequest extends FormRequest
{
    use ImageRules, QuoteRules;

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return array_merge($this->quoteRules(), [
            'movie_id' => ['required', 'exists:movies,id'],
            'image' => $this->requiredImageRules(),
        ]);
    }
}
