<?php

namespace App\Http\Requests;

use App\Http\Requests\Traits\ImageRules;
use App\Http\Requests\Traits\QuoteRules;
use Illuminate\Foundation\Http\FormRequest;

class UpdateQuoteRequest extends FormRequest
{
    use ImageRules, QuoteRules;

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return array_merge($this->quoteRules(), [
            'image' => $this->optionalImageRules(),
        ]);
    }
}
