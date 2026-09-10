<?php

namespace App\Http\Requests;

use App\Http\Requests\Traits\ImageRules;
use App\Http\Requests\Traits\MovieRules;
use Illuminate\Foundation\Http\FormRequest;

class StoreMovieRequest extends FormRequest
{
    use ImageRules, MovieRules;

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return array_merge($this->movieRules(), [
            'image' => $this->requiredImageRules(),
        ]);
    }
}
